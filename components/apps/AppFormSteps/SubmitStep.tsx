"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { AppFormData } from "../types";

interface SubmitStepProps {
  isSubmitting?: boolean;
}

export function SubmitStep({ isSubmitting }: SubmitStepProps) {
  const { register, formState: { errors } } = useFormContext<AppFormData>();
  const [termsAccepted, setTermsAccepted] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-gray-700/40 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-3">Submission Guidelines</h3>
        <ul className="space-y-2 text-sm text-vybe-gray-400">
          <li>• Your app will be reviewed within 2-3 business days</li>
          <li>• Make sure your live URL is accessible and working</li>
          <li>• Apps must be built with significant AI assistance</li>
          <li>• Include source code for faster approval</li>
          <li>• You'll receive an email notification once approved</li>
        </ul>
      </div>

      <div className="flex items-center gap-3">
        <input 
          type="checkbox" 
          id="app-terms" 
          className="rounded text-vybe-orange focus:ring-vybe-orange/20"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
        />
        <label htmlFor="app-terms" className="text-sm text-vybe-gray-400">
          I agree to the <a href="#" className="text-vybe-orange hover:underline">submission terms</a> and confirm this app was built with AI assistance
        </label>
      </div>

      {!termsAccepted && (
        <p className="text-sm text-yellow-500">Please accept the terms to submit your app</p>
      )}
    </div>
  );
}