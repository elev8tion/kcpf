import { useState } from "react";
import GlassContainer from "./GlassContainer";
import { GlassCard, GlassPanel } from "./GlassContainer";
import GlassButton from "./GlassButton";
import GlassModal, { GlassConfirmModal } from "./GlassModal";
import "../../styles/liquid-glass.css";

/**
 * Showcase component demonstrating all liquid glass variants and animations
 */
export default function LiquidGlassShowcase() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<
    "default" | "frosted" | "ultra" | "gradient-blue" | "gradient-purple" | "gradient-pink" | "gradient-cyan"
  >("frosted");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <GlassContainer variant="frosted" animation="shimmer" padding="2rem">
          <h1 className="text-4xl font-bold text-white mb-2">
            Liquid Glass Components
          </h1>
          <p className="text-white/70 text-lg">
            Enhanced glassmorphism with fluid animations and interactive effects
          </p>
        </GlassContainer>

        {/* Glass Variants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { variant: "default", label: "Default" },
            { variant: "frosted", label: "Frosted" },
            { variant: "ultra", label: "Ultra" },
            { variant: "gradient-blue", label: "Gradient Blue" },
            { variant: "gradient-purple", label: "Gradient Purple" },
            { variant: "gradient-pink", label: "Gradient Pink" },
            { variant: "gradient-cyan", label: "Gradient Cyan" },
          ].map(({ variant, label }) => (
            <GlassCard
              key={variant}
              variant={variant as any}
              animation="glow"
              interactive={true}
              ripple={true}
              onClick={() => setSelectedVariant(variant as any)}
            >
              <h3 className="text-white font-semibold mb-2">{label}</h3>
              <p className="text-white/60 text-sm">
                Click to select this variant
              </p>
            </GlassCard>
          ))}
        </div>

        {/* Animation Types */}
        <GlassPanel
          title="Animation Types"
          subtitle="Different liquid effects for glass components"
          variant="frosted"
          animation="pulse"
          icon="✨"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GlassContainer
              variant="gradient-blue"
              animation="float"
              interactive={true}
              padding="1.5rem"
            >
              <div className="text-white">
                <h4 className="font-semibold mb-1">Float</h4>
                <p className="text-sm text-white/70">
                  Gentle floating motion
                </p>
              </div>
            </GlassContainer>

            <GlassContainer
              variant="gradient-purple"
              animation="pulse"
              interactive={true}
              padding="1.5rem"
            >
              <div className="text-white">
                <h4 className="font-semibold mb-1">Pulse</h4>
                <p className="text-sm text-white/70">Rhythmic scaling effect</p>
              </div>
            </GlassContainer>

            <GlassContainer
              variant="gradient-pink"
              animation="shimmer"
              interactive={true}
              padding="1.5rem"
            >
              <div className="text-white">
                <h4 className="font-semibold mb-1">Shimmer</h4>
                <p className="text-sm text-white/70">
                  Light sweep animation
                </p>
              </div>
            </GlassContainer>
          </div>
        </GlassPanel>

        {/* Button Variants */}
        <GlassPanel
          title="Button Variants"
          subtitle="Interactive buttons with ripple effects and loading states"
          variant="gradient-blue"
          icon="🔘"
        >
          <div className="flex flex-wrap gap-4">
            <GlassButton variant="primary" size="sm">
              Primary Small
            </GlassButton>
            <GlassButton variant="secondary" size="md">
              Secondary Medium
            </GlassButton>
            <GlassButton variant="gradient-purple" size="lg">
              Gradient Large
            </GlassButton>
            <GlassButton
              variant="gradient-pink"
              icon={<span>🚀</span>}
              iconPosition="left"
            >
              With Icon
            </GlassButton>
            <GlassButton variant="outline" loading={true}>
              Loading State
            </GlassButton>
            <GlassButton variant="primary" disabled={true}>
              Disabled
            </GlassButton>
          </div>
        </GlassPanel>

        {/* Interactive Demo */}
        <GlassContainer
          variant={selectedVariant}
          animation="glow"
          interactive={true}
          ripple={true}
          padding="2rem"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Selected Variant: {selectedVariant}
          </h2>
          <p className="text-white/80 mb-6">
            This container is using the {selectedVariant} variant with glow
            animation, interactive hover effects, and ripple on click.
          </p>
          <div className="flex gap-4">
            <GlassButton
              variant="gradient-blue"
              onClick={() => setModalOpen(true)}
            >
              Open Modal
            </GlassButton>
            <GlassButton
              variant="gradient-pink"
              onClick={() => setConfirmModalOpen(true)}
            >
              Open Confirm
            </GlassButton>
          </div>
        </GlassContainer>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GlassCard
            variant="gradient-blue"
            animation="float"
            interactive={true}
          >
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="text-white font-semibold mb-2">7 Variants</h3>
            <p className="text-white/70 text-sm">
              Choose from default, frosted, ultra, and gradient options
            </p>
          </GlassCard>

          <GlassCard
            variant="gradient-purple"
            animation="pulse"
            interactive={true}
          >
            <div className="text-4xl mb-3">✨</div>
            <h3 className="text-white font-semibold mb-2">5 Animations</h3>
            <p className="text-white/70 text-sm">
              Float, pulse, glow, shimmer, and none
            </p>
          </GlassCard>

          <GlassCard
            variant="gradient-pink"
            animation="shimmer"
            interactive={true}
          >
            <div className="text-4xl mb-3">💫</div>
            <h3 className="text-white font-semibold mb-2">Ripple Effects</h3>
            <p className="text-white/70 text-sm">
              Interactive ripple animations on click
            </p>
          </GlassCard>
        </div>
      </div>

      {/* Demo Modal */}
      <GlassModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Liquid Glass Modal"
        subtitle="A beautiful modal with glassmorphism effects"
        variant={selectedVariant}
        animation="glow"
        footer={
          <div className="flex gap-3 justify-end">
            <GlassButton
              variant="outline"
              onClick={() => setModalOpen(false)}
            >
              Close
            </GlassButton>
            <GlassButton
              variant="gradient-blue"
              onClick={() => setModalOpen(false)}
            >
              Confirm
            </GlassButton>
          </div>
        }
      >
        <div className="space-y-4">
          <p className="text-white/90">
            This modal demonstrates the liquid glass effect with smooth
            animations, backdrop blur, and interactive elements.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <GlassContainer
              variant="gradient-blue"
              animation="pulse"
              padding="1rem"
            >
              <div className="text-white text-sm">Feature 1</div>
            </GlassContainer>
            <GlassContainer
              variant="gradient-purple"
              animation="pulse"
              padding="1rem"
            >
              <div className="text-white text-sm">Feature 2</div>
            </GlassContainer>
          </div>
        </div>
      </GlassModal>

      {/* Confirm Modal */}
      <GlassConfirmModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={() => console.log("Confirmed!")}
        title="Confirm Action"
        message="Are you sure you want to proceed with this action? This is a demo of the confirm modal with glass effects."
        variant="default"
        confirmText="Yes, Proceed"
        cancelText="Cancel"
      />
    </div>
  );
}
