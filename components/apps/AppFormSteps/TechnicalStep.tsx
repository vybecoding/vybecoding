"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { TECH_STACK_OPTIONS, PLATFORM_OPTIONS, LICENSE_OPTIONS } from "@/lib/constants/apps";
import { AppFormData } from "../types";
import { ScrollArea } from "@/components/ui/scroll-area";

export function TechnicalStep() {
  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<AppFormData>();

  const techStack = watch("techStack") || [];
  const platforms = watch("platforms") || [];
  const license = watch("license");

  const handleTechStackToggle = (tech: string) => {
    if (techStack.includes(tech)) {
      setValue("techStack", techStack.filter(t => t !== tech));
    } else {
      setValue("techStack", [...techStack, tech]);
    }
  };

  const handlePlatformToggle = (platform: string) => {
    if (platforms.includes(platform)) {
      setValue("platforms", platforms.filter(p => p !== platform));
    } else {
      setValue("platforms", [...platforms, platform]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Technical Details</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Specify the technical aspects of your app
        </p>
      </div>

      <div className="space-y-6">
        {/* Tech Stack */}
        <div className="space-y-2">
          <Label>Tech Stack *</Label>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Select all technologies used in your app
          </p>
          
          <div className="space-y-4">
            {Object.entries(TECH_STACK_OPTIONS).map(([category, technologies]) => (
              <div key={category} className="space-y-2">
                <h4 className="text-sm font-medium capitalize">{category}</h4>
                <ScrollArea className="h-32 border rounded-lg p-3">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {technologies.map((tech) => (
                      <label
                        key={tech}
                        className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-1 rounded"
                      >
                        <Checkbox
                          checked={techStack.includes(tech)}
                          onCheckedChange={() => handleTechStackToggle(tech)}
                        />
                        <span className="text-sm">{tech}</span>
                      </label>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            ))}
          </div>

          {techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="pr-1">
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleTechStackToggle(tech)}
                    className="ml-1 p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {errors.techStack && (
            <p className="text-sm text-red-500">Please select at least one technology</p>
          )}
        </div>

        {/* Platforms */}
        <div className="space-y-2">
          <Label>Platforms *</Label>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Select all platforms your app supports
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {PLATFORM_OPTIONS.map((platform) => (
              <label
                key={platform}
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg border"
              >
                <Checkbox
                  checked={platforms.includes(platform)}
                  onCheckedChange={() => handlePlatformToggle(platform)}
                />
                <span className="text-sm">{platform}</span>
              </label>
            ))}
          </div>

          {errors.platforms && (
            <p className="text-sm text-red-500">Please select at least one platform</p>
          )}
        </div>

        {/* License */}
        <div className="space-y-2">
          <Label htmlFor="license">License *</Label>
          <Select
            value={license}
            onValueChange={(value) => setValue("license", value)}
          >
            <SelectTrigger id="license">
              <SelectValue placeholder="Select a license" />
            </SelectTrigger>
            <SelectContent>
              {LICENSE_OPTIONS.map((licenseOption) => (
                <SelectItem key={licenseOption} value={licenseOption}>
                  {licenseOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">
            Choose the license that applies to your app
          </p>
          {errors.license && (
            <p className="text-sm text-red-500">{errors.license.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}