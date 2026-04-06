"use client";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";

export function Loader() {
  return (
    <div className="flex w-full max-w-32 gap-4 [--radius:1rem]">
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1 text-center">Loading...</ItemTitle>
        </ItemContent>
      </Item>
    </div>
  );
}
