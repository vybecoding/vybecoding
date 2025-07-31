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
  const [pricingType, setPricingType] = React.useState<"free" | "premium">("free");

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

      {/* Pricing & Distribution */}
      <div>
        <label className="form-label form-label-required inline-flex items-center gap-2">
          Pricing & Distribution
          <div className="relative group">
            <div className="w-5 h-5 rounded-full bg-vybe-gray-700 text-vybe-gray-400 text-xs flex items-center justify-center cursor-help hover:bg-vybe-gray-600 transition-colors">?</div>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-vybe-gray-800 border border-vybe-gray-700 rounded-lg text-sm text-vybe-gray-300 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
              Set pricing for your app. Premium apps generate revenue while free apps build your portfolio and reputation.
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-vybe-gray-700"></div>
            </div>
          </div>
        </label>
        
        {/* Pricing Type Selection */}
        <div className="space-y-4 mb-4">
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="app-pricing-type" 
                value="free" 
                className="text-vybe-orange focus:ring-vybe-orange/20" 
                checked={pricingType === "free"}
                onChange={(e) => setPricingType(e.target.value as "free")}
              />
              <span className="text-white font-medium">Free App</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="app-pricing-type" 
                value="premium" 
                className="text-vybe-orange focus:ring-vybe-orange/20"
                checked={pricingType === "premium"}
                onChange={(e) => setPricingType(e.target.value as "premium")}
              />
              <span className="text-white font-medium">Premium App</span>
            </label>
          </div>
        </div>
        
        {/* Premium Options (Hidden by default) */}
        {pricingType === "premium" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Price (USD)</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-vybe-gray-300 bg-vybe-gray-800 border border-r-0 border-vybe-gray-700 rounded-l-lg">$</span>
                  <input 
                    type="number" 
                    className="form-input rounded-l-none" 
                    placeholder="35" 
                    min="5" 
                    max="1000" 
                    step="5"
                    {...register("price", { 
                      valueAsNumber: true,
                      min: { value: 5, message: "Minimum price is $5" },
                      max: { value: 1000, message: "Maximum price is $1000" }
                    })}
                  />
                </div>
                <p className="text-xs text-vybe-gray-400 mt-1">Range: $5-$1000 • Platform fee: 20%</p>
              </div>
              
              <div>
                <label className="form-label">License Type</label>
                <select className="form-select w-full px-4 py-2 rounded-lg" {...register("licenseType")}>
                  <option value="single">Single Site License</option>
                  <option value="multiple">Multiple Site License (+$20)</option>
                  <option value="commercial">Commercial License (+$50)</option>
                  <option value="unlimited">Unlimited License (+$100)</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="text-vybe-orange focus:ring-vybe-orange/20" {...register("demoEnabled")} />
                <span className="text-sm text-vybe-gray-300">Provide live demo access</span>
              </label>
              <p className="text-xs text-vybe-gray-400 ml-6">Allow users to test your app before purchasing</p>
            </div>
            
            <div>
              <label className="form-label">Premium Features</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="text-vybe-orange focus:ring-vybe-orange/20" checked disabled />
                  <span className="text-sm text-vybe-gray-300">Full source code</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="text-vybe-orange focus:ring-vybe-orange/20" checked disabled />
                  <span className="text-sm text-vybe-gray-300">Installation guide</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="text-vybe-orange focus:ring-vybe-orange/20" {...register("supportIncluded")} />
                  <span className="text-sm text-vybe-gray-300">Email support (30 days)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="text-vybe-orange focus:ring-vybe-orange/20" {...register("updatesIncluded")} />
                  <span className="text-sm text-vybe-gray-300">Free updates (1 year)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="text-vybe-orange focus:ring-vybe-orange/20" {...register("customizationService")} />
                  <span className="text-sm text-vybe-gray-300">Customization service (+$100)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="text-vybe-orange focus:ring-vybe-orange/20" {...register("hostingSetupService")} />
                  <span className="text-sm text-vybe-gray-300">Hosting setup service (+$50)</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}