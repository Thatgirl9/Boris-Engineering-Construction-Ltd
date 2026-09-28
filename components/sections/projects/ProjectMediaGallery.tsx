"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { ProjectVideo } from "@/lib/types";

type MediaItem =
  | { type: "image"; url: string; alt: string }
  | { type: "video"; url: string; caption?: string };

export function ProjectMediaGallery({
  images,
  videos,
}: {
  images: { url: string; alt: string }[];
  videos?: ProjectVideo[];
}) {
  const [active, setActive] = useState<MediaItem | null>(null);

  const items: MediaItem[] = [
    ...images.map((img) => ({ type: "image" as const, url: img.url, alt: img.alt })),
    ...(videos ?? []).map((v) => ({ type: "video" as const, url: v.url, caption: v.caption })),
  ];

  if (!items.length) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {items.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(item)}
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-bg-sec"
          >
            {item.type === "image" ? (
              <Image
                src={item.url}
                alt={item.alt}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-200 group-hover:scale-105"
              />
            ) : (
              <>
                <video src={item.url} className="h-full w-full object-cover" muted playsInline />
                <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90">
                    <Play className="h-5 w-5 text-primary-text" strokeWidth={2} fill="currentColor" />
                  </span>
                </span>
                {item.caption ? (
                  <span className="absolute bottom-0 left-0 right-0 truncate bg-black/60 px-2 py-1 text-left text-xs text-white">
                    {item.caption}
                  </span>
                ) : null}
              </>
            )}
          </button>
        ))}
      </div>

      {active ? (
        <Modal onClose={() => setActive(null)}>
          {active.type === "image" ? (
            <div className="relative overflow-hidden rounded-lg bg-black/10">
              <Image
                src={active.url}
                alt={active.alt}
                // fill
                width={2000}
                height={1500}
                quality={100}
                // sizes="(min-width: 640px) 33vw, 50vw"
                className=" object-contain"
                // sizes="90vw"
              />
            </div>
          ) : (
            <video
              src={active.url}
              controls
              autoPlay
              className="max-h-[90vh] w-full rounded-lg object-contain"
            />
          )}
        </Modal>
      ) : null}
    </>
  );
};