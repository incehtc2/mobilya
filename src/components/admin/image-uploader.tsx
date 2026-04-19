"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { X, Upload, Loader2, GripVertical, Link as LinkIcon } from "lucide-react";

interface ImageUploaderProps {
  images: string[];
  onChange: (urls: string[]) => void;
}

export function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragIndex = useRef<number | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    const supabase = createClient();
    const uploaded: string[] = [];

    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { data, error } = await supabase.storage
        .from("product-images")
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (!error && data) {
        const { data: { publicUrl } } = supabase.storage
          .from("product-images")
          .getPublicUrl(data.path);
        uploaded.push(publicUrl);
      }
    }

    onChange([...images, ...uploaded]);
    setUploading(false);
  }

  function addUrl() {
    const trimmed = urlInput.trim();
    if (!trimmed || images.includes(trimmed)) return;
    onChange([...images, trimmed]);
    setUrlInput("");
    setShowUrlInput(false);
  }

  function remove(url: string) {
    onChange(images.filter((u) => u !== url));
  }

  function moveFirst(index: number) {
    if (index === 0) return;
    const next = [...images];
    const [item] = next.splice(index, 1);
    next.unshift(item);
    onChange(next);
  }

  function onDragStart(index: number) {
    dragIndex.current = index;
  }

  function onDrop(targetIndex: number) {
    if (dragIndex.current === null || dragIndex.current === targetIndex) return;
    const next = [...images];
    const [item] = next.splice(dragIndex.current, 1);
    next.splice(targetIndex, 0, item);
    onChange(next);
    dragIndex.current = null;
  }

  return (
    <div className="space-y-4">
      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {images.map((url, i) => (
            <div
              key={url}
              draggable
              onDragStart={() => onDragStart(i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(i)}
              className="group relative bg-cream-dark cursor-grab active:cursor-grabbing"
              style={{ aspectRatio: "1/1" }}
            >
              <Image
                src={url}
                alt={`Görsel ${i + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />

              {/* Overlay actions */}
              <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/40 transition-colors duration-200 flex flex-col items-center justify-center gap-1.5">
                <GripVertical size={14} className="text-cream opacity-0 group-hover:opacity-100 transition-opacity" />
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => moveFirst(i)}
                    className="font-body text-[9px] tracking-wide text-cream bg-gold px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Kapak
                  </button>
                )}
              </div>

              {/* Badge: cover */}
              {i === 0 && (
                <span className="absolute top-1 left-1 font-body text-[8px] tracking-wide uppercase bg-gold text-obsidian px-1.5 py-0.5">
                  Kapak
                </span>
              )}

              {/* Remove */}
              <button
                type="button"
                onClick={() => remove(url)}
                className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Actions row */}
      <div className="flex flex-wrap gap-3 items-center">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 border border-dashed border-cream-darker px-4 py-3 font-body text-xs text-mist hover:border-gold hover:text-gold transition-colors disabled:opacity-50"
        >
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
          {uploading ? "Yükleniyor..." : "Bilgisayardan Yükle"}
        </button>

        <button
          type="button"
          onClick={() => setShowUrlInput((v) => !v)}
          className="flex items-center gap-2 border border-dashed border-cream-darker px-4 py-3 font-body text-xs text-mist hover:border-gold hover:text-gold transition-colors"
        >
          <LinkIcon size={14} />
          URL ile Ekle
        </button>

        {images.length > 0 && (
          <p className="font-body text-[11px] text-mist ml-1">
            {images.length} görsel · İlk görsel kapak resmi olarak kullanılır
          </p>
        )}
      </div>

      {/* URL input */}
      {showUrlInput && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://..."
            className="flex-1 border-b border-cream-darker bg-transparent py-2 text-sm text-obsidian placeholder:text-mist focus:outline-none focus:border-gold transition-colors font-body"
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
          />
          <button
            type="button"
            onClick={addUrl}
            className="font-body text-xs tracking-widest uppercase bg-obsidian text-cream px-4 py-2 hover:bg-charcoal transition-colors"
          >
            Ekle
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
