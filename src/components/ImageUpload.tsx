"use client";

import { useCallback, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRifaStore } from "@/store/useRifaStore";

export function ImageUpload() {
  const { templateImage, setTemplateImage } = useRifaStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          setTemplateImage({
            src: e.target?.result as string,
            width: img.width,
            height: img.height,
            file,
          });
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    },
    [setTemplateImage]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-amber-400" />
          Plantilla de Imagen (Opcional)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {templateImage ? (
          <div className="relative rounded-lg overflow-hidden border border-slate-600">
            <img
              src={templateImage.src}
              alt="Template"
              className="w-full h-auto max-h-48 object-contain bg-white"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-7 w-7"
              onClick={() => setTemplateImage(null)}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-3 py-1.5">
              <p className="text-[10px] text-slate-300">
                {templateImage.width}×{templateImage.height}px • {templateImage.file?.name}
              </p>
            </div>
          </div>
        ) : (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => inputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-slate-600 bg-slate-900/30 p-8 cursor-pointer hover:border-amber-500/50 hover:bg-slate-900/50 transition-all duration-200"
          >
            <Upload className="h-8 w-8 text-slate-500" />
            <div className="text-center">
              <p className="text-sm text-slate-300">
                Arrastrá una imagen o hacé click
              </p>
              <p className="text-xs text-slate-500 mt-1">
                PNG, JPG hasta 10MB
              </p>
            </div>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </CardContent>
    </Card>
  );
}
