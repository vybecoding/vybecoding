"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { AppFormData } from "../types";

export function PreviewStep() {
  const { watch } = useFormContext<AppFormData>();
  const formData = watch();

  return (
    <div className="space-y-6">
      <div className="bg-gray-700/40 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-medium mb-3">App Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-vybe-gray-400">App Name</p>
            <p className="text-white font-medium">{formData.name || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-vybe-gray-400">Category</p>
            <p className="text-white font-medium capitalize">{formData.category || "Not selected"}</p>
          </div>
          <div>
            <p className="text-sm text-vybe-gray-400">Live URL</p>
            <p className="text-white font-medium">{formData.liveUrl || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-vybe-gray-400">Pricing</p>
            <p className="text-white font-medium">
              {formData.pricingType === "premium" ? `$${formData.price || 0}` : "Free"}
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm text-vybe-gray-400">Short Description</p>
          <p className="text-white">{formData.shortDescription || "Not provided"}</p>
        </div>
      </div>

      <div className="bg-gray-700/40 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-medium mb-3">App Details</h3>
        
        <div>
          <p className="text-sm text-vybe-gray-400">Technologies</p>
          <p className="text-white">{formData.techStackString || "Not provided"}</p>
        </div>

        <div>
          <p className="text-sm text-vybe-gray-400">Tags</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {formData.tags && formData.tags.length > 0 ? (
              formData.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-vybe-gray-800 text-vybe-gray-300 rounded-full text-sm">
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-vybe-gray-400">No tags added</span>
            )}
          </div>
        </div>

        <div>
          <p className="text-sm text-vybe-gray-400">Detailed Description</p>
          <p className="text-white whitespace-pre-wrap">{formData.fullDescription || "Not provided"}</p>
        </div>

        {(formData.githubUrl || formData.demoVideoUrl) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-vybe-gray-700">
            {formData.githubUrl && (
              <div>
                <p className="text-sm text-vybe-gray-400">Source Code</p>
                <p className="text-white font-medium">{formData.githubUrl}</p>
              </div>
            )}
            {formData.demoVideoUrl && (
              <div>
                <p className="text-sm text-vybe-gray-400">Demo Video</p>
                <p className="text-white font-medium">{formData.demoVideoUrl}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {formData.pricingType === "premium" && (
        <div className="bg-gray-700/40 rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-medium mb-3">Premium Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-vybe-gray-400">Price</p>
              <p className="text-white font-medium">${formData.price || 0}</p>
            </div>
            <div>
              <p className="text-sm text-vybe-gray-400">License Type</p>
              <p className="text-white font-medium capitalize">{formData.licenseType || "single"}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-vybe-gray-400">Premium Features</p>
            <ul className="mt-2 space-y-1">
              <li className="text-white">✓ Full source code</li>
              <li className="text-white">✓ Installation guide</li>
              {formData.supportIncluded && <li className="text-white">✓ Email support (30 days)</li>}
              {formData.updatesIncluded && <li className="text-white">✓ Free updates (1 year)</li>}
              {formData.customizationService && <li className="text-white">✓ Customization service (+$100)</li>}
              {formData.hostingSetupService && <li className="text-white">✓ Hosting setup service (+$50)</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}