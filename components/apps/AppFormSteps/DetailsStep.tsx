"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { AppFormData } from "../types";
import { X } from "lucide-react";

export function DetailsStep() {
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
      
      if (tag && !tags.includes(tag) && tags.length < 10) {
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
        <label className="form-label">Technologies Used</label>
        <input 
          type="text" 
          className="form-input w-full px-4 py-2 rounded-lg" 
          placeholder="React, Node.js, Claude API, Tailwind CSS..."
          {...register("techStackString")}
        />
        <p className="text-sm text-vybe-gray-400 mt-1">List the main technologies, AI tools, and frameworks used</p>
      </div>

      <div>
        <label className="form-label">Tags</label>
        <div className="space-y-2">
          <input 
            type="text" 
            className="form-input w-full px-4 py-2 rounded-lg" 
            placeholder="productivity, automation, ai-tools, developer-tools (press Enter to add)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
          />
          <p className="text-sm text-vybe-gray-400">Help others discover your app with relevant tags</p>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-vybe-gray-800 text-vybe-gray-300">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="form-label">Detailed Description</label>
        <textarea 
          className="form-textarea w-full px-4 py-2 rounded-lg h-32" 
          placeholder="Provide a more detailed description of your app's features, functionality, and the problem it solves..."
          {...register("fullDescription", {
            required: "Detailed description is required",
            minLength: {
              value: 100,
              message: "Please provide at least 100 characters"
            },
            maxLength: {
              value: 2000,
              message: "Maximum 2000 characters"
            }
          })}
        />
        {errors.fullDescription && (
          <p className="text-sm text-red-500 mt-1">{errors.fullDescription.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Source Code (Optional)</label>
          <input 
            type="url" 
            className="form-input w-full px-4 py-2 rounded-lg" 
            placeholder="https://github.com/username/repo"
            {...register("githubUrl")}
          />
        </div>
        <div>
          <label className="form-label">Demo Video (Optional)</label>
          <input 
            type="url" 
            className="form-input w-full px-4 py-2 rounded-lg" 
            placeholder="https://youtube.com/watch?v=..."
            {...register("demoVideoUrl")}
          />
        </div>
      </div>
    </div>
  );
}