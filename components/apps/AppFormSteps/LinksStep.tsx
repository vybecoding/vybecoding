"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppFormData } from "../types";
import validator from "validator";
import { Globe, AppWindow, Github, BookOpen } from "lucide-react";

export function LinksStep() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<AppFormData>();

  const validateUrl = (url: string | undefined, required: boolean = false) => {
    if (!url && !required) return true;
    if (!url && required) return "This URL is required";
    
    if (!validator.isURL(url, { protocols: ["https"], require_protocol: true })) {
      return "Must be a valid HTTPS URL";
    }
    
    return true;
  };

  const validateGithubUrl = (url: string | undefined) => {
    if (!url) return true; // Optional field
    
    if (!validator.isURL(url, { protocols: ["https"], require_protocol: true })) {
      return "Must be a valid HTTPS URL";
    }
    
    if (!url.startsWith("https://github.com/")) {
      return "Must be a GitHub repository URL";
    }
    
    return true;
  };

  const validateAppStoreUrl = (url: string | undefined) => {
    if (!url) return true; // Optional field
    
    if (!validator.isURL(url, { protocols: ["https"], require_protocol: true })) {
      return "Must be a valid HTTPS URL";
    }
    
    if (!url.includes("apps.apple.com")) {
      return "Must be an App Store URL";
    }
    
    return true;
  };

  const validatePlayStoreUrl = (url: string | undefined) => {
    if (!url) return true; // Optional field
    
    if (!validator.isURL(url, { protocols: ["https"], require_protocol: true })) {
      return "Must be a valid HTTPS URL";
    }
    
    if (!url.includes("play.google.com/store/apps")) {
      return "Must be a Play Store URL";
    }
    
    return true;
  };

  // Check if at least one app URL is provided
  const liveUrl = watch("liveUrl");
  const appStoreUrl = watch("appStoreUrl");
  const playStoreUrl = watch("playStoreUrl");
  const hasAtLeastOneAppUrl = !!(liveUrl || appStoreUrl || playStoreUrl);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Links</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Provide links to access your app and its resources
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            At least one app URL is required (Live URL, App Store, or Play Store)
          </p>
        </div>

        {/* Live App URL */}
        <div className="space-y-2">
          <Label htmlFor="liveUrl" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Live App URL {!hasAtLeastOneAppUrl && "*"}
          </Label>
          <Input
            id="liveUrl"
            {...register("liveUrl", {
              validate: (value) => {
                if (!hasAtLeastOneAppUrl && !value) {
                  return "At least one app URL is required";
                }
                return validateUrl(value);
              },
            })}
            placeholder="https://myapp.com"
          />
          <p className="text-xs text-gray-500">
            URL where users can access your web app
          </p>
          {errors.liveUrl && (
            <p className="text-sm text-red-500">{errors.liveUrl.message}</p>
          )}
        </div>

        {/* App Store URL */}
        <div className="space-y-2">
          <Label htmlFor="appStoreUrl" className="flex items-center gap-2">
            <AppWindow className="w-4 h-4" />
            App Store URL {!hasAtLeastOneAppUrl && "*"}
          </Label>
          <Input
            id="appStoreUrl"
            {...register("appStoreUrl", {
              validate: validateAppStoreUrl,
            })}
            placeholder="https://apps.apple.com/app/..."
          />
          <p className="text-xs text-gray-500">
            URL to your app on the Apple App Store
          </p>
          {errors.appStoreUrl && (
            <p className="text-sm text-red-500">{errors.appStoreUrl.message}</p>
          )}
        </div>

        {/* Play Store URL */}
        <div className="space-y-2">
          <Label htmlFor="playStoreUrl" className="flex items-center gap-2">
            <AppWindow className="w-4 h-4" />
            Play Store URL {!hasAtLeastOneAppUrl && "*"}
          </Label>
          <Input
            id="playStoreUrl"
            {...register("playStoreUrl", {
              validate: validatePlayStoreUrl,
            })}
            placeholder="https://play.google.com/store/apps/details?id=..."
          />
          <p className="text-xs text-gray-500">
            URL to your app on Google Play Store
          </p>
          {errors.playStoreUrl && (
            <p className="text-sm text-red-500">{errors.playStoreUrl.message}</p>
          )}
        </div>

        <div className="border-t pt-4 mt-6" />

        {/* GitHub Repository */}
        <div className="space-y-2">
          <Label htmlFor="githubUrl" className="flex items-center gap-2">
            <Github className="w-4 h-4" />
            GitHub Repository (Optional)
          </Label>
          <Input
            id="githubUrl"
            {...register("githubUrl", {
              validate: validateGithubUrl,
            })}
            placeholder="https://github.com/username/repository"
          />
          <p className="text-xs text-gray-500">
            Public GitHub repository for your app's source code
          </p>
          {errors.githubUrl && (
            <p className="text-sm text-red-500">{errors.githubUrl.message}</p>
          )}
        </div>

        {/* Documentation URL */}
        <div className="space-y-2">
          <Label htmlFor="documentationUrl" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Documentation URL (Optional)
          </Label>
          <Input
            id="documentationUrl"
            {...register("documentationUrl", {
              validate: (value) => validateUrl(value, false),
            })}
            placeholder="https://docs.myapp.com"
          />
          <p className="text-xs text-gray-500">
            Link to your app's documentation or user guide
          </p>
          {errors.documentationUrl && (
            <p className="text-sm text-red-500">{errors.documentationUrl.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}