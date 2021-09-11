import React from "react";
import { Icon } from ".";
import clsx from "clsx";
import { createPortal } from "react-dom";

type ToastProps = {
  type: "success" | "warning" | "danger";
};
export function Toast({ type }: ToastProps) {
  return createPortal(
    <div
      className={clsx(
        "relative",
        "flex items-center gap-4 p-2 rounded w-80 border-2",
        type === "success" && "bg-white border-green text-green",
        type === "warning" && "bg-yellow border-yellow text-yellow-darkest",
        type === "danger" && "bg-red border-red text-white"
      )}
    >
      <span className="w-8">
        {type === "success" && <Icon.Success />}
        {type === "warning" && <Icon.Warning />}
        {type === "danger" && <Icon.Ban />}
      </span>

      <div>
        <strong>Toast is ready</strong>
        <p className="opacity-50">Hmm, it fully baked.</p>
      </div>

      <span className="absolute right-0 top-0 w-4 m-2">
        <Icon.X />
      </span>
    </div>,
    document.getElementById("alert") as HTMLElement
  );
}
