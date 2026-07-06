// src/components/VendingMachine.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import type { Phase, VendingItem, VendingItemId } from "../types";
import "../styles/global.scss";

type RectPct = { left: number; top: number; width: number; height: number };

const MANUAL_RECTS: Record<string, RectPct> = {
  "slot:A1": { left: 9.732, top: 8.75, width: 18.324, height: 18.05 },
  "slot:A2": { left: 29, top: 8.75, width: 18.324, height: 18.05 },
  "slot:A3": { left: 47, top: 8.75, width: 18.324, height: 18.05 },
  "slot:B1": { left: 10, top: 28, width: 18.324, height: 18.05 },
  "slot:B2": { left: 29, top: 28, width: 18.324, height: 18.05 },
  "slot:B3": { left: 47, top: 28, width: 18.324, height: 18.05 },
  "slot:C1": { left: 10, top: 47, width: 18.324, height: 18.05 },
  "slot:C2": { left: 29, top: 47, width: 18.324, height: 18.05 },
  "slot:C3": { left: 47, top: 47, width: 18.324, height: 18.05 },

  "key:A": { left: 80.4129, top: 19.5428, width: 3.81272, height: 3.17735 },
  "key:B": { left: 84.8973, top: 19.5428, width: 3.81272, height: 3.17735 },
  "key:C": { left: 89.3916, top: 19.5428, width: 3.81272, height: 3.17735 },
  "key:1": { left: 80.4129, top: 23.3391, width: 3.81272, height: 3.17735 },
  "key:2": { left: 84.8973, top: 23.3391, width: 3.81272, height: 3.17735 },
  "key:3": { left: 89.3916, top: 23.3391, width: 3.81272, height: 3.17735 },

  "menu:about": { left: 82, top: 37, width: 10, height: 2 },
  "menu:artists": { left: 82, top: 39, width: 10, height: 2 },
  "menu:locations": { left: 82, top: 41, width: 10, height: 2 },
  "menu:contact": { left: 82, top: 42, width: 10, height: 2 },
};

type Props = {
  vendingMachineSvgMarkup: string;
  items: VendingItem[];
  keypadBuffer: string;
  error?: string;
  disabled?: boolean;

  phase: Phase;
  selectedItem: VendingItem | null;

  onSlotSelect: (id: VendingItemId, el?: HTMLElement | null) => void;
  onSubmitCode: (code: string, el?: HTMLElement | null) => void;
  onBufferChange: (next: string) => void;
};

type OverlayBtn =
  | { kind: "slot"; key: string; ariaLabel: string }
  | { kind: "menu"; key: string; ariaLabel: string }
  | { kind: "keypad"; key: string; ariaLabel: string };

function applyPctStyle(el: HTMLElement, r: RectPct) {
  el.style.left = `${r.left}%`;
  el.style.top = `${r.top}%`;
  el.style.width = `${r.width}%`;
  el.style.height = `${r.height}%`;
}

const PHASE_ANNOUNCEMENTS: Partial<Record<Phase, string>> = {
  dropping: "Dispensing your item",
};

export function VendingMachine({
  vendingMachineSvgMarkup,
  items,
  keypadBuffer,
  error,
  disabled = false,
  phase,
  selectedItem,
  onSlotSelect,
  onSubmitCode,
  onBufferChange,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const svgHostRef = useRef<HTMLDivElement | null>(null);
  const liveRegionRef = useRef<HTMLDivElement | null>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [ready, setReady] = useState(false);

  const overlayBtns: OverlayBtn[] = useMemo(() => {
    const slots = items.map((i) => ({
      kind: "slot" as const,
      key: i.code,
      ariaLabel: `${i.label} (${i.code})`,
    }));

    const menus = items.map((i) => ({
      kind: "menu" as const,
      key: i.id,
      ariaLabel: `Open ${i.label}`,
    }));

    const keypad = ["A", "B", "C", "1", "2", "3"].map((k) => ({
      kind: "keypad" as const,
      key: k,
      ariaLabel: `Key ${k}`,
    }));

    return [...slots, ...menus, ...keypad];
  }, [items]);

  useEffect(() => {
    if (!svgHostRef.current) return;

    svgHostRef.current.innerHTML = vendingMachineSvgMarkup;
    const svg = svgHostRef.current.querySelector("svg");
    if (!svg) return;

    svg.style.width = "100%";
    svg.style.height = "auto";
    svg.style.display = "block";

    setReady(true);
  }, [vendingMachineSvgMarkup]);

  useEffect(() => {
    if (!ready || !wrapperRef.current) return;

    const positionAll = () => {
      overlayBtns.forEach((b) => {
        const refKey = `${b.kind}:${b.key}`;
        const btn = btnRefs.current[refKey];
        const rect = MANUAL_RECTS[refKey];
        if (!btn || !rect) return;
        applyPctStyle(btn, rect);
      });
    };

    positionAll();
    const ro = new ResizeObserver(positionAll);
    ro.observe(wrapperRef.current);

    return () => ro.disconnect();
  }, [ready, overlayBtns]);

  function handleSlot(code: string, el?: HTMLElement | null) {
    if (disabled) return;
    const item = items.find((i) => i.code === code);
    if (item) onSlotSelect(item.id, el);
  }

  function handleMenu(id: string, el?: HTMLElement | null) {
    if (disabled) return;
    const item = items.find((i) => i.id === id);
    if (item) onSlotSelect(item.id, el);
  }

  function handleKeypad(k: string, el?: HTMLElement | null) {
    if (disabled) return;

    const upper = k.toUpperCase();
    if (upper === "A" || upper === "B" || upper === "C") {
      onBufferChange(upper);
      return;
    }

    if (upper === "1" || upper === "2" || upper === "3") {
      if (keypadBuffer.length !== 1) return;
      const next = `${keypadBuffer}${upper}`;
      onBufferChange(next);
      onSubmitCode(next, el);
    }
  }

  const dropRect: RectPct | null = useMemo(() => {
    if (!selectedItem) return null;
    const key = `slot:${selectedItem.code}`;
    return MANUAL_RECTS[key] ?? null;
  }, [selectedItem]);

  const shouldDrop = phase === "dropping" && selectedItem && dropRect;

  const liveMessage = useMemo(() => {
    if (error) return `Error: ${error}`;
    const phaseMessage = PHASE_ANNOUNCEMENTS[phase];
    if (phaseMessage) return phaseMessage;
    return `Code entry: ${keypadBuffer || "empty"}`;
  }, [error, phase, keypadBuffer]);

  return (
    <div
      className="vendingMachine"
      ref={wrapperRef}
      data-phase={phase}
      data-selected={selectedItem?.code ?? ""}
    >
      <div className="srOnly" aria-live="polite" ref={liveRegionRef}>
        {liveMessage}
      </div>

      <div className="machineArt">
        <div className="machineSvgInline" ref={svgHostRef} aria-hidden="true" />

        {shouldDrop ? (
          <div
            className="dropItem"
            style={{
              left: `${dropRect.left}%`,
              top: `${dropRect.top}%`,
              width: `${dropRect.width}%`,
              height: `${dropRect.height}%`,
            }}
            aria-hidden="true"
          >
            <img className="dropItemImg" src={selectedItem.itemSvg} alt="" />
          </div>
        ) : null}

        <div className="overlayLayer" role="group" aria-label="Vending machine controls">
          {overlayBtns.map((b) => {
            const refKey = `${b.kind}:${b.key}`;
            const className =
              b.kind === "slot"
                ? "overlayBtn overlayBtn--slot"
                : b.kind === "menu"
                ? "overlayBtn overlayBtn--menu"
                : "overlayBtn overlayBtn--keypad";

            const onClick =
              b.kind === "slot"
                ? (e: React.MouseEvent<HTMLButtonElement>) =>
                    handleSlot(b.key, e.currentTarget)
                : b.kind === "menu"
                ? (e: React.MouseEvent<HTMLButtonElement>) =>
                    handleMenu(b.key, e.currentTarget)
                : (e: React.MouseEvent<HTMLButtonElement>) =>
                    handleKeypad(b.key, e.currentTarget);

            return (
              <button
                key={refKey}
                ref={(el) => {
                  btnRefs.current[refKey] = el;
                }}
                type="button"
                className={className}
                aria-label={b.ariaLabel}
                disabled={disabled}
                onClick={onClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
