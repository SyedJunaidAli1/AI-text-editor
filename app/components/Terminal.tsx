"use client";

import DragSidebar from "@/app/components/dragComponents/DragSidebar";
import DragCenter from "@/app/components/dragComponents/DragCenter";

export default function HeroWindow() {
  return (
    <section className="relative mt-12 overflow-hidden rounded-xl bg-[url('/hero-image-bg.png')]">
      <div className="px-4 pt-4 md:px-8 md:pt-8">
        <div className="mx-auto overflow-hidden rounded-xl border bg-background shadow-2xl w-full max-w-[1200px] h-[520px] sm:h-[600px] lg:h-[720px]">
          {/* Title bar */}
          <div className="h-8 border-b">
            <div className="flex items-center gap-2 px-3 py-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
          </div>

          {/* Content */}
          <div className="flex h-[calc(100%-32px)]">
            <DragSidebar />
            <DragCenter />
          </div>
        </div>
      </div>
    </section>
  );
}
