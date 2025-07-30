"use client";

import React, { useState, useRef, useCallback } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_VALIDATION } from "@/lib/constants/apps";
import Image from "next/image";

interface ImageUploaderProps {
  type: "icon" | "screenshot";
  currentImages?: string | string[];
  onUpload: (urls: string | string[]) => void;
  maxFiles?: number;
  disabled?: boolean;
  className?: string;
}

export function ImageUploader({
  type,
  currentImages,
  onUpload,
  maxFiles = type === "icon" ? 1 : 6,
  disabled = false,
  className,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);

  const validateFile = (file: File): string | null => {
    const validation = type === "icon" ? APP_VALIDATION.icon : APP_VALIDATION.screenshot;
    
    // Check file type
    if (!validation.formats.includes(file.type as any)) {
      return `Invalid file type. Allowed: ${validation.formats.join(", ")}`;
    }

    // Check file size
    if (file.size > validation.maxSize) {
      const sizeMB = validation.maxSize / (1024 * 1024);
      return `File size must be less than ${sizeMB}MB`;
    }

    return null;
  };

  const validateImageDimensions = (file: File): Promise<{ width: number; height: number } | null> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = () => {
        resolve(null);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      // Validate dimensions
      const dimensions = await validateImageDimensions(file);
      if (!dimensions) {
        throw new Error("Failed to read image dimensions");
      }

      const validation = type === "icon" ? APP_VALIDATION.icon : APP_VALIDATION.screenshot;
      if (dimensions.width < validation.minDimensions.width || 
          dimensions.height < validation.minDimensions.height) {
        throw new Error(
          `Image must be at least ${validation.minDimensions.width}x${validation.minDimensions.height}px`
        );
      }

      // Get upload URL from Convex
      const uploadUrl = await generateUploadUrl();
      
      // Upload file
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const { storageId } = await response.json();
      
      // Get public URL for the uploaded file
      // In a real implementation, you'd have a function to convert storageId to URL
      // For now, we'll return the storageId as a placeholder
      return storageId;
      
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    // Check max files limit
    const currentCount = Array.isArray(currentImages) ? currentImages.length : (currentImages ? 1 : 0);
    if (currentCount + files.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `Maximum ${maxFiles} files allowed`,
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of files) {
        // Validate file
        const error = validateFile(file);
        if (error) {
          toast({
            title: "Invalid file",
            description: error,
            variant: "destructive",
          });
          continue;
        }

        // Upload file
        const url = await uploadFile(file);
        if (url) {
          uploadedUrls.push(url);
        } else {
          toast({
            title: "Upload failed",
            description: `Failed to upload ${file.name}`,
            variant: "destructive",
          });
        }
      }

      // Update parent component
      if (uploadedUrls.length > 0) {
        if (type === "icon") {
          onUpload(uploadedUrls[0]);
        } else {
          const existing = Array.isArray(currentImages) ? currentImages : [];
          onUpload([...existing, ...uploadedUrls]);
        }
        
        toast({
          title: "Upload successful",
          description: `${uploadedUrls.length} file(s) uploaded successfully`,
        });
      }
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = (indexOrUrl: number | string) => {
    if (type === "icon") {
      onUpload("");
    } else if (Array.isArray(currentImages)) {
      const newImages = typeof indexOrUrl === "number"
        ? currentImages.filter((_, i) => i !== indexOrUrl)
        : currentImages.filter(url => url !== indexOrUrl);
      onUpload(newImages);
    }
  };

  const renderIcon = () => {
    if (type !== "icon") return null;

    return (
      <div className="space-y-4">
        <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
          {currentImages && typeof currentImages === "string" ? (
            <>
              <Image
                src={currentImages}
                alt="App icon"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemove("")}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                disabled={disabled || isUploading}
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled || isUploading}
              className="w-full h-full flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              {isUploading ? (
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              ) : (
                <>
                  <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Upload Icon</span>
                </>
              )}
            </button>
          )}
        </div>
        <p className="text-xs text-gray-500">
          {APP_VALIDATION.icon.message}
        </p>
      </div>
    );
  };

  const renderScreenshots = () => {
    if (type !== "screenshot") return null;

    const images = Array.isArray(currentImages) ? currentImages : [];
    const canAddMore = images.length < maxFiles;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative aspect-video border rounded-lg overflow-hidden">
              <Image
                src={url}
                alt={`Screenshot ${index + 1}`}
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                disabled={disabled || isUploading}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          
          {canAddMore && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled || isUploading}
              className="aspect-video border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              {isUploading ? (
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Add Screenshot</span>
                </>
              )}
            </button>
          )}
        </div>
        
        <p className="text-xs text-gray-500">
          {APP_VALIDATION.screenshot.message} ({images.length}/{maxFiles})
        </p>
      </div>
    );
  };

  return (
    <div className={cn("space-y-4", className)}>
      {type === "icon" ? renderIcon() : renderScreenshots()}
      
      <input
        ref={fileInputRef}
        type="file"
        accept={type === "icon" ? APP_VALIDATION.icon.formats.join(",") : APP_VALIDATION.screenshot.formats.join(",")}
        multiple={type !== "icon"}
        onChange={handleFileSelect}
        disabled={disabled || isUploading}
        className="hidden"
      />
    </div>
  );
}