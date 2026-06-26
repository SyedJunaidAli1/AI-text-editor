"use client";

import { motion, useMotionValue } from "motion/react";
import { useCallback, useRef, useState } from "react";

export default function HeroSection() {
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const dragStateRef = useRef<{
    startX: number;
    startY: number;
    startDragX: number;
    startDragY: number;
  } | null>(null);

  const resizeStateRef = useRef<{
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    startDragX: number;
    startDragY: number;
    edges: {
      left: boolean;
      right: boolean;
      top: boolean;
      bottom: boolean;
    };
  } | null>(null);

  const [size, setSize] = useState({
    width: 1000,
    height: 700,
  });

  const minWidth = 700;
  const minHeight = 500;

  // ---------------- DRAG ----------------

  const handleDragPointerMove = useCallback(
    (event: PointerEvent) => {
      const state = dragStateRef.current;
      if (!state) return;

      dragX.set(state.startDragX + (event.clientX - state.startX));

      dragY.set(state.startDragY + (event.clientY - state.startY));
    },
    [dragX, dragY],
  );

  const handleDragPointerUp = useCallback(() => {
    dragStateRef.current = null;

    window.removeEventListener("pointermove", handleDragPointerMove);

    window.removeEventListener("pointerup", handleDragPointerUp);

    window.removeEventListener("pointercancel", handleDragPointerUp);
  }, [handleDragPointerMove]);

  const handleTitleBarPointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();

    dragStateRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      startDragX: dragX.get(),
      startDragY: dragY.get(),
    };

    window.addEventListener("pointermove", handleDragPointerMove);

    window.addEventListener("pointerup", handleDragPointerUp);

    window.addEventListener("pointercancel", handleDragPointerUp);
  };

  // ---------------- RESIZE ----------------

  const handleResizePointerDown =
    (edges: { left: boolean; right: boolean; top: boolean; bottom: boolean }) =>
    (event: React.PointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const container = event.currentTarget.closest("[data-window]");

      if (!(container instanceof HTMLElement)) return;

      const rect = container.getBoundingClientRect();

      resizeStateRef.current = {
        startX: event.clientX,
        startY: event.clientY,
        startWidth: rect.width,
        startHeight: rect.height,
        startDragX: dragX.get(),
        startDragY: dragY.get(),
        edges,
      };

      event.currentTarget.setPointerCapture(event.pointerId);
    };

  const handleResizePointerMove = (
    event: React.PointerEvent<HTMLButtonElement>,
  ) => {
    const state = resizeStateRef.current;

    if (!state) return;

    const dx = event.clientX - state.startX;

    const dy = event.clientY - state.startY;

    let width = state.startWidth;
    let height = state.startHeight;

    if (state.edges.right) {
      width = Math.max(minWidth, state.startWidth + dx);
    }

    if (state.edges.left) {
      width = Math.max(minWidth, state.startWidth - dx);

      const appliedDelta = state.startWidth - width;

      dragX.set(state.startDragX + appliedDelta);
    }

    if (state.edges.bottom) {
      height = Math.max(minHeight, state.startHeight + dy);
    }

    if (state.edges.top) {
      height = Math.max(minHeight, state.startHeight - dy);

      const appliedDelta = state.startHeight - height;

      dragY.set(state.startDragY + appliedDelta);
    }

    setSize({
      width,
      height,
    });
  };

  const handleResizePointerUp = (
    event: React.PointerEvent<HTMLButtonElement>,
  ) => {
    resizeStateRef.current = null;

    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <section className="relative mt-12 h-[800px] overflow-hidden rounded-xl bg-[url('/hero-image-bg.png')]">
      <motion.div
        data-window
        style={{
          width: size.width,
          height: size.height,
          x: dragX,
          y: dragY,
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background shadow-2xl overflow-hidden"
      >
        {/* TITLE BAR */}
        <div
          onPointerDown={handleTitleBarPointerDown}
          className="
            h-8
            border-b
            cursor-grab
            active:cursor-grabbing
            bg-background
          "
        />

        {/* CONTENT */}
        <div className="h-[calc(100%-48px)]"></div>

        {/* RIGHT */}
        <button
          onPointerDown={handleResizePointerDown({
            left: false,
            right: true,
            top: false,
            bottom: false,
          })}
          onPointerMove={handleResizePointerMove}
          onPointerUp={handleResizePointerUp}
          onPointerCancel={handleResizePointerUp}
          className="
            absolute
            inset-y-0
            right-0
            w-3
            cursor-ew-resize
          "
        />

        {/* LEFT */}
        <button
          onPointerDown={handleResizePointerDown({
            left: true,
            right: false,
            top: false,
            bottom: false,
          })}
          onPointerMove={handleResizePointerMove}
          onPointerUp={handleResizePointerUp}
          onPointerCancel={handleResizePointerUp}
          className="
            absolute
            inset-y-0
            left-0
            w-3
            cursor-ew-resize
          "
        />

        {/* TOP */}
        <button
          onPointerDown={handleResizePointerDown({
            left: false,
            right: false,
            top: true,
            bottom: false,
          })}
          onPointerMove={handleResizePointerMove}
          onPointerUp={handleResizePointerUp}
          onPointerCancel={handleResizePointerUp}
          className="
            absolute
            inset-x-0
            top-0
            h-3
            cursor-ns-resize
          "
        />

        {/* BOTTOM */}
        <button
          onPointerDown={handleResizePointerDown({
            left: false,
            right: false,
            top: false,
            bottom: true,
          })}
          onPointerMove={handleResizePointerMove}
          onPointerUp={handleResizePointerUp}
          onPointerCancel={handleResizePointerUp}
          className="
            absolute
            inset-x-0
            bottom-0
            h-3
            cursor-ns-resize
          "
        />

        {/* TOP LEFT */}
        <button
          onPointerDown={handleResizePointerDown({
            left: true,
            right: false,
            top: true,
            bottom: false,
          })}
          onPointerMove={handleResizePointerMove}
          onPointerUp={handleResizePointerUp}
          onPointerCancel={handleResizePointerUp}
          className="
            absolute
            top-0
            left-0
            size-4
            cursor-nwse-resize
          "
        />

        {/* TOP RIGHT */}
        <button
          onPointerDown={handleResizePointerDown({
            left: false,
            right: true,
            top: true,
            bottom: false,
          })}
          onPointerMove={handleResizePointerMove}
          onPointerUp={handleResizePointerUp}
          onPointerCancel={handleResizePointerUp}
          className="
            absolute
            top-0
            right-0
            size-4
            cursor-nesw-resize
          "
        />

        {/* BOTTOM LEFT */}
        <button
          onPointerDown={handleResizePointerDown({
            left: true,
            right: false,
            top: false,
            bottom: true,
          })}
          onPointerMove={handleResizePointerMove}
          onPointerUp={handleResizePointerUp}
          onPointerCancel={handleResizePointerUp}
          className="
            absolute
            bottom-0
            left-0
            size-4
            cursor-nesw-resize
          "
        />

        {/* BOTTOM RIGHT */}
        <button
          onPointerDown={handleResizePointerDown({
            left: false,
            right: true,
            top: false,
            bottom: true,
          })}
          onPointerMove={handleResizePointerMove}
          onPointerUp={handleResizePointerUp}
          onPointerCancel={handleResizePointerUp}
          className="
            absolute
            bottom-0
            right-0
            size-4
            cursor-nwse-resize
          "
        />
      </motion.div>
    </section>
  );
}
