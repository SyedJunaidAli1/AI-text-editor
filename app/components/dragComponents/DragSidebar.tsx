"use client";
import {
  ClockCounterClockwiseIcon,
  PencilIcon,
  SparkleIcon,
  UserIcon,
} from "@phosphor-icons/react";

const DragSidebar = () => {
  return (
    <div className="w-12 h-full bg-sidebar border-r">
      <div className="flex flex-col py-2 gap-2 items-center justify-between h-full">
        <div className="flex flex-col gap-2">
          <SparkleIcon size={22} className="cursor-pointer mb-2" />
          <PencilIcon size={22} className="cursor-pointer" />
          <ClockCounterClockwiseIcon size={22} className="cursor-pointer" />
        </div>

        <UserIcon size={22} />
      </div>
    </div>
  );
};

export default DragSidebar;
