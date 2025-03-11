import { cva } from "class-variance-authority";
import React, { JSX, SVGAttributes } from "react";

export enum IconVaraint {
  BULK = "BULK",
  SOLID = "SOLID",
  STROKE = "STROKE",
}

interface IconBaseProps extends SVGAttributes<SVGAElement> {
  size?: string | number;
  color?: string;
  fill?: string;
  variant?: IconVaraint;
}

export type IconDefinition = Record<IconVaraint, JSX.Element>;

export type IconType = (props: IconBaseProps) => JSX.Element;

export function createIcon(iconDefinition: IconDefinition) {
  return ({
    variant = IconVaraint.STROKE,
    fill = "#37352f",
    className,
    ...svgProps
  }: IconBaseProps ) => {
    const icons = iconDefinition;
    const baseIcon = icons[variant];

    const originalProps = baseIcon.props || {};

    const mergedProps = {
      ...originalProps,
      ...svgProps,
      className: className || originalProps.className,
      ...(variant === IconVaraint.STROKE
        ? { stroke: fill, fill: "none" }
        : { fill }
      )
    };

    return React.cloneElement(baseIcon, mergedProps);
  };
}

export const iconVaraint = cva("",{
  variants: {
    variant: {
      default: "fill-[#91918e]",
      pink: "fill-[#b24b78]",
      orange: "fill-[#c37a38]",
      sky: "fill-sky-600",
    },
    size: {
      lg: "size-8",
      sm: "size-[18px]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  }
});