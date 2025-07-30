"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { APP_VALIDATION } from "@/lib/constants/apps";
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label form-label-required">App Name</label>
          <input 
            type="text" 
            id="app-name" 
            className="form-input w-full px-4 py-2 rounded-lg" 
            placeholder="My AI Portfolio" 
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
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="form-label form-label-required">Live URL</label>
          <input 
            type="url" 
            id="app-url" 
            className="form-input w-full px-4 py-2 rounded-lg" 
            placeholder="https://your-app.vercel.app" 
            {...register("liveUrl", {
              required: "Live URL is required",
            })}
          />
          {errors.liveUrl && (
            <p className="text-sm text-red-500 mt-1">{errors.liveUrl.message}</p>
          )}
        </div>
      </div>
      
      <div>
        <label className="form-label form-label-required">Category</label>
        <select 
          id="app-category" 
          className="form-select w-full px-4 py-2 rounded-lg"
          {...register("category", { required: "Category is required" })}
        >
          <option value="">Select a category</option>
          <option value="portfolio">Portfolio</option>
          <option value="business">Business</option>
          <option value="creative">Creative</option>
          <option value="ecommerce">E-commerce</option>
          <option value="blog">Blog</option>
          <option value="saas">SaaS</option>
          <option value="landing">Landing Page</option>
          <option value="other">Other</option>
        </select>
        {errors.category && (
          <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>
        )}
      </div>
      
      <div>
        <label className="form-label form-label-required">Short Description</label>
        <textarea 
          id="app-description" 
          className="form-textarea w-full px-4 py-2 rounded-lg h-24" 
          placeholder="Brief description of your app and what makes it special..."
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
        />
        {errors.shortDescription && (
          <p className="text-sm text-red-500 mt-1">{errors.shortDescription.message}</p>
        )}
      </div>
    </div>
  );
}