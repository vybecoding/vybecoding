"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppFormData } from "../types";
import { APP_STATUS_LABELS } from "@/lib/constants/apps";
import Image from "next/image";
import { ExternalLink, Github, BookOpen, Globe, AppWindow } from "lucide-react";
import DOMPurify from "dompurify";

interface ReviewStepProps {
  status?: string;
  isSubmitting?: boolean;
}

export function ReviewStep({ status = "draft", isSubmitting = false }: ReviewStepProps) {
  const { watch } = useFormContext<AppFormData>();
  
  const formData = watch();

  const renderMarkdown = (content: string) => {
    // Basic markdown to HTML conversion (in production, use a proper markdown parser)
    const html = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />');
    
    return {
      __html: DOMPurify.sanitize(html)
    };
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Review & Submit</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Review your app details before submission
        </p>
      </div>

      <div className="space-y-6">
        {/* Status */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <span className="text-sm font-medium">Status</span>
          <Badge variant={status === "draft" ? "secondary" : "default"}>
            {APP_STATUS_LABELS[status as keyof typeof APP_STATUS_LABELS] || status}
          </Badge>
        </div>

        {/* Basic Information */}
        <div className="space-y-3">
          <h3 className="font-semibold">Basic Information</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Name:</span>{" "}
              <span className="font-medium">{formData.name}</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Category:</span>{" "}
              <span className="font-medium">{formData.category}</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Short Description:</span>{" "}
              <p className="mt-1">{formData.shortDescription}</p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Full Description:</span>{" "}
              <div 
                className="mt-1 prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={renderMarkdown(formData.fullDescription || "")}
              />
            </div>
            {formData.tags && formData.tags.length > 0 && (
              <div>
                <span className="text-gray-600 dark:text-gray-400">Tags:</span>{" "}
                <div className="mt-1 flex flex-wrap gap-1">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Visual Assets */}
        <div className="space-y-3">
          <h3 className="font-semibold">Visual Assets</h3>
          <div className="space-y-4">
            {formData.iconUrl && (
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">App Icon:</span>
                <div className="mt-2 w-24 h-24 relative rounded-lg overflow-hidden border">
                  <Image
                    src={formData.iconUrl}
                    alt="App icon"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
            
            {formData.screenshots && formData.screenshots.length > 0 && (
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Screenshots ({formData.screenshots.length}):
                </span>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {formData.screenshots.slice(0, 3).map((url, index) => (
                    <div key={index} className="aspect-video relative rounded overflow-hidden border">
                      <Image
                        src={url}
                        alt={`Screenshot ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  {formData.screenshots.length > 3 && (
                    <div className="aspect-video flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded border">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        +{formData.screenshots.length - 3} more
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {formData.demoVideoUrl && (
              <div className="text-sm">
                <span className="text-gray-600 dark:text-gray-400">Demo Video:</span>{" "}
                <a
                  href={formData.demoVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  View on {formData.demoVideoUrl.includes("youtube") ? "YouTube" : "Vimeo"}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Links */}
        <div className="space-y-3">
          <h3 className="font-semibold">Links</h3>
          <div className="space-y-2">
            {formData.liveUrl && (
              <a
                href={formData.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                <Globe className="w-4 h-4" />
                Live App
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {formData.appStoreUrl && (
              <a
                href={formData.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                <AppWindow className="w-4 h-4" />
                App Store
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {formData.playStoreUrl && (
              <a
                href={formData.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                <AppWindow className="w-4 h-4" />
                Play Store
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {formData.githubUrl && (
              <a
                href={formData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                <Github className="w-4 h-4" />
                GitHub Repository
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {formData.documentationUrl && (
              <a
                href={formData.documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                <BookOpen className="w-4 h-4" />
                Documentation
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Technical Details */}
        <div className="space-y-3">
          <h3 className="font-semibold">Technical Details</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Tech Stack:</span>
              <div className="mt-1 flex flex-wrap gap-1">
                {formData.techStack?.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Platforms:</span>
              <div className="mt-1 flex flex-wrap gap-1">
                {formData.platforms?.map((platform) => (
                  <Badge key={platform} variant="outline" className="text-xs">
                    {platform}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">License:</span>{" "}
              <span className="font-medium">{formData.license}</span>
            </div>
          </div>
        </div>

        {/* Submit Note */}
        {status === "draft" && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Once submitted, your app will be reviewed by our team. You'll receive an email notification when the review is complete.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}