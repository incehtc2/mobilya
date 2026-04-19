"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn, Box } from "lucide-react";
import { getImageUrl } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  name: string;
  hasModel?: boolean;
  on3DClick?: () => void;
  show3D?: boolean;
}

export function ImageGallery({ images, name, hasModel, on3DClick, show3D }: ImageGalleryProps) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const total = images.length;

  const prev = useCallback(() => setActive((a) => (a - 1 + total) % total), [total]);
  const next = useCallback(() => setActive((a) => (a + 1) % total), [total]);

  return (
    <>
      <div className="flex gap-3">
        {/* Thumbnail strip — left side */}
        {total > 1 && (
          <div className="hidden sm:flex flex-col gap-2 w-[72px] shrink-0">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative overflow-hidden bg-cream-dark transition-all duration-200 ${
                  active === i
                    ? "ring-1 ring-obsidian opacity-100"
                    : "opacity-40 hover:opacity-70"
                }`}
                style={{ aspectRatio: "1/1" }}
              >
                <Image
                  src={getImageUrl(img)}
                  alt={`${name} ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="72px"
                />
              </button>
            ))}

            {hasModel && (
              <button
                onClick={on3DClick}
                className={`flex flex-col items-center justify-center gap-1 border transition-all duration-200 py-3 ${
                  show3D
                    ? "border-obsidian bg-obsidian text-cream"
                    : "border-cream-darker text-mist hover:border-obsidian hover:text-obsidian"
                }`}
              >
                <Box size={14} strokeWidth={1.5} />
                <span className="font-body text-[9px] tracking-wide uppercase">3D</span>
              </button>
            )}
          </div>
        )}

        {/* Main image */}
        <div className="flex-1 relative group">
          <div
            className="relative overflow-hidden bg-cream-dark"
            style={{ aspectRatio: "4/5" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={getImageUrl(images[active])}
                  alt={`${name} - ${active + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={active === 0}
                />
              </motion.div>
            </AnimatePresence>

            {/* Zoom button */}
            <button
              onClick={() => setLightbox(true)}
              className="absolute top-4 right-4 bg-cream/90 backdrop-blur-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-cream"
            >
              <ZoomIn size={16} strokeWidth={1.5} className="text-obsidian" />
            </button>

            {/* Prev / Next arrows */}
            {total > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-cream/90 backdrop-blur-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-cream"
                >
                  <ChevronLeft size={18} strokeWidth={1.5} className="text-obsidian" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-cream/90 backdrop-blur-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-cream"
                >
                  <ChevronRight size={18} strokeWidth={1.5} className="text-obsidian" />
                </button>
              </>
            )}

            {/* Counter */}
            {total > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      active === i ? "w-6 bg-cream" : "w-1.5 bg-cream/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Mobile thumbnails + 3D below */}
          {(total > 1 || hasModel) && (
            <div className="flex sm:hidden gap-2 mt-3 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`relative shrink-0 overflow-hidden bg-cream-dark transition-all duration-200 ${
                    active === i ? "ring-1 ring-obsidian opacity-100" : "opacity-40"
                  }`}
                  style={{ width: 56, aspectRatio: "1/1" }}
                >
                  <Image src={getImageUrl(img)} alt={`${name} ${i + 1}`} fill className="object-cover" sizes="56px" />
                </button>
              ))}
              {hasModel && (
                <button
                  onClick={on3DClick}
                  className={`shrink-0 flex flex-col items-center justify-center gap-1 border transition-all px-3 ${
                    show3D ? "border-obsidian bg-obsidian text-cream" : "border-cream-darker text-mist"
                  }`}
                  style={{ height: 56 }}
                >
                  <Box size={12} strokeWidth={1.5} />
                  <span className="font-body text-[8px] uppercase">3D</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-obsidian/95 backdrop-blur-md flex items-center justify-center"
            onClick={() => setLightbox(false)}
          >
            <button
              className="absolute top-6 right-6 text-cream/60 hover:text-cream transition-colors"
              onClick={() => setLightbox(false)}
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            {total > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-cream/60 hover:text-cream transition-colors"
                >
                  <ChevronLeft size={32} strokeWidth={1} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-cream/60 hover:text-cream transition-colors"
                >
                  <ChevronRight size={32} strokeWidth={1} />
                </button>
              </>
            )}

            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative max-w-3xl w-full mx-12"
              style={{ aspectRatio: "4/3" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={getImageUrl(images[active])}
                alt={`${name} - ${active + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-body text-xs text-cream/40">
              {active + 1} / {total}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
