"use client";

import { motion, useMotionValue } from "motion/react";
import { useCallback, useRef, useState } from "react";
import DragSidebar from "@/app/components/dragComponents/DragSidebar";
import DragCenter from "@/app/components/dragComponents/DragCenter";
import DragAIComponent from "./dragComponents/DragAIComponent";

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

  const isResizingRef = useRef(false);

  const [size, setSize] = useState({
    width: 1000,
    height: 750,
  });

  const minWidth = 700;
  const minHeight = 500;

  // ---------------- DRAG ----------------

  const handleDragPointerMove = useCallback(
    (event: PointerEvent) => {
      if (isResizingRef.current) return;
      const state = dragStateRef.current;
      if (!state) return;

      dragX.set(state.startDragX + (event.clientX - state.startX));

      dragY.set(state.startDragY + (event.clientY - state.startY));
    },
    [dragX, dragY],
  );

  const handleDragPointerUp = useCallback(() => {
    if (isResizingRef.current) {
      dragStateRef.current = null;
      return;
    }

    window.removeEventListener("pointermove", handleDragPointerMove);

    window.removeEventListener("pointerup", handleDragPointerUp);

    window.removeEventListener("pointercancel", handleDragPointerUp);
  }, [handleDragPointerMove]);

  const handleTitleBarPointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (isResizingRef.current) return;
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

      window.removeEventListener("pointermove", handleDragPointerMove);

      window.removeEventListener("pointerup", handleDragPointerUp);

      window.removeEventListener("pointercancel", handleDragPointerUp);

      dragStateRef.current = null;
      isResizingRef.current = true;
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
    } else if (state.edges.left) {
      width = Math.max(minWidth, state.startWidth - dx);
    }

    if (state.edges.bottom) {
      height = Math.max(minHeight, state.startHeight + dy);
    } else if (state.edges.top) {
      height = Math.max(minHeight, state.startHeight - dy);
    }

    // Since the window is absolute-positioned at left: 50%, top: 50% with transform translate(-50%, -50%),
    // any change in width or height will expand/shrink it symmetrically from the center.
    // To keep the opposite edge fixed, we adjust the drag offset (dragX/dragY) by half of the size change.
    let newDragX = state.startDragX;
    if (state.edges.right) {
      newDragX = state.startDragX + (width - state.startWidth) / 2;
    } else if (state.edges.left) {
      newDragX = state.startDragX - (width - state.startWidth) / 2;
    }
    dragX.set(newDragX);

    let newDragY = state.startDragY;
    if (state.edges.bottom) {
      newDragY = state.startDragY + (height - state.startHeight) / 2;
    } else if (state.edges.top) {
      newDragY = state.startDragY - (height - state.startHeight) / 2;
    }
    dragY.set(newDragY);

    setSize({
      width,
      height,
    });
  };

  const handleResizePointerUp = (
    event: React.PointerEvent<HTMLButtonElement>,
  ) => {
    resizeStateRef.current = null;
    isResizingRef.current = false;

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
        className="absolute left-1/2 top-110 -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background shadow-2xl overflow-hidden"
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
            pointer-events-auto
          "
        >
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex h-[calc(100%-48px)]">
          <DragSidebar />
          <DragCenter />
          <DragAIComponent />
        </div>

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
