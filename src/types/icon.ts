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

export const sidebarIconProps = {
  variant: IconVaraint.BULK,
  className: "size-[18px]",
  fill: "#91918e",
}

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
    fill: {
      default: "fill-zinc-500",
      pink: "fill-pink-500",
      orange: "fill-orange-500",
    },
    size: {
      lg: "size-8",
      sm: "size-5",
    },
  },
  defaultVariants: {
    fill: "default",
    size: "sm",
  }
});

