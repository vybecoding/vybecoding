"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { APP_CATEGORIES, APP_VALIDATION } from "@/lib/constants/apps";
import { AppFormData } from "../types";

export function BasicInfoStep() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<AppFormData>();

  const tags = watch("tags") || [];
  const [tagInput, setTagInput] = React.useState("");

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tag = tagInput.trim().toLowerCase();
      
      if (tag && !tags.includes(tag) && tags.length < APP_VALIDATION.tags.max) {
        setValue("tags", [...tags, tag]);
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue("tags", tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Basic Information</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Tell us about your app
        </p>
      </div>

      <div className="space-y-4">
        {/* App Name */}
        <div className="space-y-2">
          <Label htmlFor="name">App Name *</Label>
          <Input
            id="name"
            {...register("name", {
              required: "App name is required",
              minLength: {
                value: APP_VALIDATION.name.min,
                message: `Minimum ${APP_VALIDATION.name.min} characters`,
              },
              maxLength: {
                value: APP_VALIDATION.name.max,
                message: `Maximum ${APP_VALIDATION.name.max} characters`,
              },
              pattern: {
                value: APP_VALIDATION.name.pattern,
                message: APP_VALIDATION.name.message,
              },
            })}
            placeholder="My Awesome App"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Short Description */}
        <div className="space-y-2">
          <Label htmlFor="shortDescription">Short Description *</Label>
          <Textarea
            id="shortDescription"
            {...register("shortDescription", {
              required: "Short description is required",
              minLength: {
                value: APP_VALIDATION.shortDescription.min,
                message: `Minimum ${APP_VALIDATION.shortDescription.min} characters`,
              },
              maxLength: {
                value: APP_VALIDATION.shortDescription.max,
                message: `Maximum ${APP_VALIDATION.shortDescription.max} characters`,
              },
            })}
            placeholder="A brief description of your app (will be shown in app cards)"
            rows={2}
          />
          <p className="text-xs text-gray-500">
            {watch("shortDescription")?.length || 0}/{APP_VALIDATION.shortDescription.max} characters
          </p>
          {errors.shortDescription && (
            <p className="text-sm text-red-500">{errors.shortDescription.message}</p>
          )}
        </div>

        {/* Full Description */}
        <div className="space-y-2">
          <Label htmlFor="fullDescription">Full Description *</Label>
          <Textarea
            id="fullDescription"
            {...register("fullDescription", {
              required: "Full description is required",
              minLength: {
                value: APP_VALIDATION.fullDescription.min,
                message: `Minimum ${APP_VALIDATION.fullDescription.min} characters`,
              },
              maxLength: {
                value: APP_VALIDATION.fullDescription.max,
                message: `Maximum ${APP_VALIDATION.fullDescription.max} characters`,
              },
            })}
            placeholder="Provide a detailed description of your app, its features, and what makes it unique. Markdown is supported."
            rows={6}
          />
          <p className="text-xs text-gray-500">
            {watch("fullDescription")?.length || 0}/{APP_VALIDATION.fullDescription.max} characters
            • Markdown supported
          </p>
          {errors.fullDescription && (
            <p className="text-sm text-red-500">{errors.fullDescription.message}</p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={watch("category")}
            onValueChange={(value) => setValue("category", value)}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {APP_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-red-500">{errors.category.message}</p>
          )}
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (Optional)</Label>
          <Input
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Type a tag and press Enter"
            disabled={tags.length >= APP_VALIDATION.tags.max}
          />
          <p className="text-xs text-gray-500">
            Add up to {APP_VALIDATION.tags.max} tags to help users find your app
          </p>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="pr-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}