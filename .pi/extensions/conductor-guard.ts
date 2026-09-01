// conductor-guard — pi extension port of enforce-section-paths.sh
// Blocks write/edit tool calls that cross conductor section boundaries.
//
// Identity: pi-subagents sets PI_SUBAGENT_CHILD_AGENT in every child session,
// so this extension knows exactly which section owner is editing. In the parent
// session (no child env var) it falls back to .conductor/active.json wave checks.
//
// Fails OPEN: if the section map is missing, this is not a conductor project
// (or the run is over) and nothing is blocked. A broken guard never bricks a repo.

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import * as fs from "node:fs";
import * as path from "node:path";

const realpath = (p: string): string => {
	try {
		return fs.realpathSync(p);
	} catch {
		return path.resolve(p);
	}
};

export default function (pi: ExtensionAPI) {
	pi.on("tool_call", async (event) => {
		if (event.toolName !== "write" && event.toolName !== "edit") return;

		const root = process.cwd();
		const mapPath = path.join(root, ".conductor", "section-map.json");
		if (!fs.existsSync(mapPath)) return; // conductor not set up here → do nothing

		const input = event.input as { path?: string };
		const filePath = input.path || "";
		if (!filePath) return;

		const rel = path.relative(realpath(root), realpath(filePath));
		if (rel.startsWith("..") || path.isAbsolute(rel)) {
			// Outside the project entirely — not conductor's business.
			return;
		}

		// Everyone (orchestrator, any agent) may always touch conductor's own files.
		if (rel === ".conductor-state.md" || rel === ".conductor" || rel.startsWith(".conductor/")) {
			return;
		}

		let smap: Record<string, string[]> = {};
		try {
			smap = JSON.parse(fs.readFileSync(mapPath, "utf-8")).sections ?? {};
		} catch {
			return; // unreadable map → fail open
		}

		const ownerOf = (relPath: string): string | null => {
			for (const [section, globs] of Object.entries(smap)) {
				for (const g of globs ?? []) {
					if (g === "none") continue;
					if (relPath === g) return section;
					if (g.endsWith("/**") && relPath.startsWith(g.slice(0, -3) + "/")) return section;
					// simple fnmatch-style glob support (single pattern, no braces)
					if (g.includes("*") || g.includes("?")) {
						const rx = new RegExp(
							"^" + g.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*\*/g, "\u0000").replace(/\*/g, "[^/]*").replace(/\?/g, ".").replace(/\u0000/g, ".*") + "$",
						);
						if (rx.test(relPath)) return section;
					}
				}
			}
			return null;
		};

		const owner = ownerOf(rel);
		const agent = (process.env.PI_SUBAGENT_CHILD_AGENT || "").trim();

		if (agent) {
			// Child session: enforce per-agent ownership.
			if (agent === "conductor" || agent === "reviewer") {
				return { block: true, reason: `conductor: ${agent} may not edit source files (${rel}).` };
			}
			if (agent in smap) {
				if (owner === agent) return;
				return {
					block: true,
					reason: `conductor: ${rel} belongs to section '${owner ?? "unmapped"}', not '${agent}'. Log a deviation in .conductor-state.md instead of editing it.`,
				};
			}
			return; // unknown agent name → not a conductor agent → don't interfere
		}

		// Parent / no identity: allow only sections with an in-progress work order.
		const activePath = path.join(root, ".conductor", "active.json");
		if (!fs.existsSync(activePath)) return;
		let active: string[] = [];
		try {
			active = JSON.parse(fs.readFileSync(activePath, "utf-8")).active ?? [];
		} catch {
			return; // unreadable active.json → don't interfere
		}
		if (!active.length) return;
		if (owner && active.includes(owner)) return;
		return {
			block: true,
			reason: `conductor: ${rel} is in section '${owner ?? "unmapped"}', which is not active this wave (active: ${active.sort().join(", ")}). Log a deviation instead.`,
		};
	});
}
