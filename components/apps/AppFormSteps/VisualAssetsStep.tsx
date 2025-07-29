"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUploader } from "../ImageUploader";
import { AppFormData } from "../types";
import { APP_VALIDATION } from "@/lib/constants/apps";
import validator from "validator";

export function VisualAssetsStep() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<AppFormData>();

  const iconUrl = watch("iconUrl");
  const screenshots = watch("screenshots") || [];
  const demoVideoUrl = watch("demoVideoUrl");

  const validateVideoUrl = (url: string) => {
    if (!url) return true; // Optional field
    
    if (!validator.isURL(url, { protocols: ["https"], require_protocol: true })) {
      return "Must be a valid HTTPS URL";
    }
    
    // Check if it's YouTube or Vimeo
    const youtubeRegex = /^https:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)/;
    const vimeoRegex = /^https:\/\/(www\.)?vimeo\.com\//;
    
    if (!youtubeRegex.test(url) && !vimeoRegex.test(url)) {
      return "Must be a YouTube or Vimeo URL";
    }
    
    return true;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Visual Assets</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Upload images and video to showcase your app
        </p>
      </div>

      <div className="space-y-6">
        {/* App Icon */}
        <div className="space-y-2">
          <Label>App Icon *</Label>
          <ImageUploader
            type="icon"
            currentImages={iconUrl}
            onUpload={(url) => setValue("iconUrl", url as string)}
          />
          {errors.iconUrl && (
            <p className="text-sm text-red-500">{errors.iconUrl.message}</p>
          )}
        </div>

        {/* Screenshots */}
        <div className="space-y-2">
          <Label>Screenshots *</Label>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Upload at least {APP_VALIDATION.screenshots.min} screenshots, maximum {APP_VALIDATION.screenshots.max}
          </p>
          <ImageUploader
            type="screenshot"
            currentImages={screenshots}
            onUpload={(urls) => setValue("screenshots", urls as string[])}
            maxFiles={APP_VALIDATION.screenshots.max}
          />
          {errors.screenshots && (
            <p className="text-sm text-red-500">
              {errors.screenshots.message || APP_VALIDATION.screenshots.message}
            </p>
          )}
        </div>

        {/* Demo Video */}
        <div className="space-y-2">
          <Label htmlFor="demoVideoUrl">Demo Video URL (Optional)</Label>
          <Input
            id="demoVideoUrl"
            {...register("demoVideoUrl", {
              validate: validateVideoUrl,
            })}
            placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
          />
          <p className="text-xs text-gray-500">
            Link to a YouTube or Vimeo video showcasing your app
          </p>
          {errors.demoVideoUrl && (
            <p className="text-sm text-red-500">{errors.demoVideoUrl.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}