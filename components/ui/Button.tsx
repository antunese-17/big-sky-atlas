"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "whatsapp";
type ButtonSize = "default" | "large";

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const COMMON_CLASSES =
  "inline-flex items-center justify-center font-body font-[700] text-[13px] tracking-[0.02em] " +
  "transition-all duration-[300ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] " +
  "active:scale-[0.98] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bsa-brasa";

const SIZE_PADDING: Record<ButtonSize, string> = {
  default: "px-6 py-3",
  large: "px-8 py-4",
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "rounded border-none bg-bsa-brasa text-bsa-papel hover:scale-[1.02] hover:brightness-110",
  secondary:
    "rounded border-none bg-bsa-papel text-bsa-carvao hover:scale-[1.02] hover:brightness-95",
  ghost:
    "border-b border-bsa-brasa bg-transparent pb-[3px] text-inherit hover:pb-[5px]",
  whatsapp:
    "rounded border-none bg-[#25D366] text-white gap-2 hover:scale-[1.02] hover:brightness-110",
};

const CURSOR_BY_VARIANT: Record<ButtonVariant, "cta" | "link"> = {
  primary: "cta",
  secondary: "cta",
  ghost: "link",
  whatsapp: "cta",
};

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M11.99 0C5.368 0 0 5.368 0 11.99c0 2.117.554 4.103 1.523 5.83L0 24l6.335-1.493A11.946 11.946 0 0011.99 24C18.612 24 24 18.632 24 12.01 24 5.388 18.612 0 11.99 0zm0 21.818a9.825 9.825 0 01-5.012-1.371l-.36-.214-3.733.979.997-3.648-.235-.374a9.818 9.818 0 01-1.504-5.21c0-5.424 4.415-9.84 9.847-9.84 5.433 0 9.848 4.416 9.848 9.84 0 5.425-4.415 9.838-9.848 9.838z" />
    </svg>
  );
}

export function Button({
  variant = "primary",
  size = "default",
  href,
  external = false,
  className,
  children,
  type,
  onClick,
  ...rest
}: ButtonProps) {
  const classes = cn(
    COMMON_CLASSES,
    variant !== "ghost" && SIZE_PADDING[size],
    VARIANT_CLASSES[variant],
    className,
  );

  const withArrow = variant === "primary" || variant === "secondary";

  const content = (
    <>
      {variant === "whatsapp" ? <WhatsAppIcon /> : null}
      <span>{children}</span>
      {withArrow ? <span aria-hidden="true">{" →"}</span> : null}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        data-cursor={CURSOR_BY_VARIANT[variant]}
        onClick={
          onClick as MouseEventHandler<HTMLAnchorElement> | undefined
        }
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type ?? "button"}
      className={classes}
      data-cursor={CURSOR_BY_VARIANT[variant]}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
}
