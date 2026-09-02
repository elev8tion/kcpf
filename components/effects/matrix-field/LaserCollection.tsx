"use client";

import { MatrixField, type MatrixFieldProps } from "./MatrixField";
import { LaserVariants, type LaserVariantsProps, type TraevuLaserVariant } from "./LaserVariants";

export type LaserVariant = "matrix-field" | TraevuLaserVariant;

export type LaserCollectionProps = (MatrixFieldProps | LaserVariantsProps) & {
  variant?: LaserVariant;
};

export function LaserCollection({ variant = "matrix-field", ...props }: LaserCollectionProps) {
  if (variant !== "matrix-field") {
    return <LaserVariants {...(props as LaserVariantsProps)} variant={variant} />;
  }

  return <MatrixField {...props} />;
}
