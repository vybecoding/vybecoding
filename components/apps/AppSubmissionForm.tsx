"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BasicInfoStep, 
  VisualAssetsStep, 
  LinksStep, 
  TechnicalStep, 
  ReviewStep 
} from "./AppFormSteps";
import { AppFormData } from "./types";
import { APP_VALIDATION } from "@/lib/constants/apps";
import { ArrowLeft, ArrowRight, Save, Send, Loader2 } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import DOMPurify from "dompurify";
import validator from "validator";

// Form validation schema
const appFormSchema = z.object({
  name: z.string()
    .min(APP_VALIDATION.name.min, `Minimum ${APP_VALIDATION.name.min} characters`)
    .max(APP_VALIDATION.name.max, `Maximum ${APP_VALIDATION.name.max} characters`)
    .regex(APP_VALIDATION.name.pattern, APP_VALIDATION.name.message),
  
  shortDescription: z.string()
    .min(APP_VALIDATION.shortDescription.min, APP_VALIDATION.shortDescription.message)
    .max(APP_VALIDATION.shortDescription.max, APP_VALIDATION.shortDescription.message),
  
  fullDescription: z.string()
    .min(APP_VALIDATION.fullDescription.min, APP_VALIDATION.fullDescription.message)
    .max(APP_VALIDATION.fullDescription.max, APP_VALIDATION.fullDescription.message)
    .transform((val) => DOMPurify.sanitize(val)), // Sanitize markdown
  
  category: z.string().min(1, "Category is required"),
  
  tags: z.array(z.string()).max(APP_VALIDATION.tags.max, APP_VALIDATION.tags.message).optional(),
  
  iconUrl: z.string().min(1, "App icon is required"),
  
  screenshots: z.array(z.string())
    .min(APP_VALIDATION.screenshots.min, APP_VALIDATION.screenshots.message)
    .max(APP_VALIDATION.screenshots.max, APP_VALIDATION.screenshots.message),
  
  demoVideoUrl: z.string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      if (!validator.isURL(val, { protocols: ["https"], require_protocol: true })) return false;
      const youtubeRegex = /^https:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)/;
      const vimeoRegex = /^https:\/\/(www\.)?vimeo\.com\//;
      return youtubeRegex.test(val) || vimeoRegex.test(val);
    }, "Must be a YouTube or Vimeo URL"),
  
  liveUrl: z.string()
    .optional()
    .refine((val) => !val || validator.isURL(val, { protocols: ["https"], require_protocol: true }), 
      "Must be a valid HTTPS URL"),
  
  appStoreUrl: z.string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      return validator.isURL(val, { protocols: ["https"], require_protocol: true }) && 
             val.includes("apps.apple.com");
    }, "Must be an App Store URL"),
  
  playStoreUrl: z.string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      return validator.isURL(val, { protocols: ["https"], require_protocol: true }) && 
             val.includes("play.google.com/store/apps");
    }, "Must be a Play Store URL"),
  
  githubUrl: z.string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      return validator.isURL(val, { protocols: ["https"], require_protocol: true }) && 
             val.startsWith("https://github.com/");
    }, "Must be a GitHub repository URL"),
  
  documentationUrl: z.string()
    .optional()
    .refine((val) => !val || validator.isURL(val, { protocols: ["https"], require_protocol: true }), 
      "Must be a valid HTTPS URL"),
  
  techStack: z.array(z.string()).min(1, "Select at least one technology"),
  
  platforms: z.array(z.string()).min(1, "Select at least one platform"),
  
  license: z.string().min(1, "License is required"),
}).refine((data) => {
  // At least one app URL is required
  return !!(data.liveUrl || data.appStoreUrl || data.playStoreUrl);
}, {
  message: "At least one app URL is required (Live URL, App Store, or Play Store)",
  path: ["liveUrl"],
});

interface AppSubmissionFormProps {
  appId?: Id<"apps">;
}

const FORM_STEPS = [
  { id: 1, name: "Basic Info", component: BasicInfoStep },
  { id: 2, name: "Details", component: TechnicalStep },
  { id: 3, name: "Preview", component: ReviewStep },
  { id: 4, name: "Submit", component: ReviewStep },
];

export function AppSubmissionForm({ appId }: AppSubmissionFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  const router = useRouter();
  const { toast } = useToast();
  
  const createApp = useMutation(api.apps.createApp);
  const updateApp = useMutation(api.apps.updateApp);
  const submitApp = useMutation(api.apps.submitApp);
  const existingApp = useQuery(api.apps.getAppForEdit, appId ? { id: appId } : "skip");

  const form = useForm<AppFormData>({
    resolver: zodResolver(appFormSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      fullDescription: "",
      category: "",
      tags: [],
      iconUrl: "",
      screenshots: [],
      demoVideoUrl: "",
      liveUrl: "",
      appStoreUrl: "",
      playStoreUrl: "",
      githubUrl: "",
      documentationUrl: "",
      techStack: [],
      platforms: [],
      license: "",
      pricingType: "free",
      price: undefined,
      licenseType: "single",
      demoEnabled: false,
      supportIncluded: false,
      updatesIncluded: false,
      customizationService: false,
      hostingSetupService: false,
    },
  });

  // Load existing app data if editing
  useEffect(() => {
    if (existingApp) {
      form.reset({
        name: existingApp.name,
        shortDescription: existingApp.shortDescription,
        fullDescription: existingApp.fullDescription,
        category: existingApp.category,
        tags: existingApp.tags || [],
        iconUrl: existingApp.iconUrl,
        screenshots: existingApp.screenshots,
        demoVideoUrl: existingApp.demoVideoUrl || "",
        liveUrl: existingApp.liveUrl || "",
        appStoreUrl: existingApp.appStoreUrl || "",
        playStoreUrl: existingApp.playStoreUrl || "",
        githubUrl: existingApp.githubUrl || "",
        documentationUrl: existingApp.documentationUrl || "",
        techStack: existingApp.techStack,
        platforms: existingApp.platforms,
        license: existingApp.license,
      });
    }
  }, [existingApp, form]);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (form.formState.isDirty && !isSubmitting) {
        handleSaveDraft();
      }
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [form.formState.isDirty, isSubmitting]);

  const handleSaveDraft = async () => {
    setIsSaving(true);
    
    try {
      const formData = form.getValues();
      
      if (appId) {
        await updateApp({ id: appId, ...formData });
      } else {
        const newAppId = await createApp(formData);
        // Update URL to include the new app ID
        router.replace(`/apps/submit?id=${newAppId}`);
      }
      
      setLastSaved(new Date());
      toast({
        title: "Draft saved",
        description: "Your app draft has been saved.",
      });
    } catch (error) {
      console.error("Save draft error:", error);
      toast({
        title: "Save failed",
        description: "Failed to save draft. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (data: AppFormData) => {
    if (currentStep < FORM_STEPS.length) {
      // Move to next step if not on last step
      setCurrentStep(currentStep + 1);
      return;
    }

    // Submit the app
    setIsSubmitting(true);
    
    try {
      let finalAppId = appId;
      
      if (!finalAppId) {
        // Create app if not already created
        finalAppId = await createApp(data);
      } else {
        // Update app with latest data
        await updateApp({ id: finalAppId, ...data });
      }
      
      // Submit for review
      await submitApp({ id: finalAppId });
      
      toast({
        title: "App submitted!",
        description: "Your app has been submitted for review. You'll receive an email when the review is complete.",
      });
      
      // Redirect to user's apps page
      router.push("/dashboard/apps");
      
    } catch (error: any) {
      console.error("Submit error:", error);
      toast({
        title: "Submission failed",
        description: error.message || "Failed to submit app. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextStep = async () => {
    // Validate current step fields
    const stepFields = getStepFields(currentStep);
    const isValid = await form.trigger(stepFields);
    
    if (isValid) {
      if (currentStep < FORM_STEPS.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const getStepFields = (step: number): (keyof AppFormData)[] => {
    switch (step) {
      case 1:
        return ["name", "liveUrl", "category", "shortDescription"];
      case 2:
        return ["techStack", "tags", "fullDescription", "githubUrl", "demoVideoUrl"];
      case 3:
        return []; // Preview step - no validation needed
      case 4:
        return []; // Submit step - no validation needed
      default:
        return [];
    }
  };

  const progress = (currentStep / FORM_STEPS.length) * 100;
  const CurrentStepComponent = FORM_STEPS[currentStep - 1].component;

  return (
    <div className="page-container nebula-background min-h-screen">
      {/* Nebula backgrounds */}
      <div className="nebula-middle"></div>
      <div className="nebula-bottom"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 py-8">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            {/* Progress Indicator - Demo Style */}
            <div className="flex justify-between items-center mb-8 relative overflow-x-auto">
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-vybe-gray-800 z-0"></div>
              
              {FORM_STEPS.map((step, index) => (
                <div 
                  key={step.id}
                  className="flex flex-col items-center relative z-10 cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0 px-2"
                  onClick={() => {
                    if (step.id <= currentStep) {
                      setCurrentStep(step.id);
                    }
                  }}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 ${
                    step.id === currentStep 
                      ? "bg-vybe-orange text-white"
                      : step.id < currentStep
                      ? "bg-green-500 text-white"
                      : "bg-vybe-gray-800 text-vybe-gray-400"
                  }`}>
                    {step.id < currentStep ? "✓" : step.id}
                  </div>
                  <span className={`text-sm font-medium whitespace-nowrap ${
                    step.id === currentStep
                      ? "text-vybe-orange" 
                      : step.id < currentStep
                      ? "text-green-400"
                      : "text-vybe-gray-400"
                  }`}>
                    {step.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Form Content */}
            <div className="vybe-card p-8">
              <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <div className="w-1 h-5 bg-gradient-to-b from-vybe-purple to-vybe-pink rounded-full"></div>
                {currentStep === 1 && "Basic Information"}
                {currentStep === 2 && "App Details"}
                {currentStep === 3 && "Preview Your Submission"}
                {currentStep === 4 && "Submit Your App"}
              </h2>
              <CurrentStepComponent 
                {...(currentStep >= 3 && { 
                  status: existingApp?.status || "draft",
                  isSubmitting 
                })}
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-between mt-8">
              <div className="flex items-center gap-4">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={isSaving || isSubmitting}
                    className="btn btn-secondary"
                  >
                    ← Back
                  </button>
                )}
                
                {/* Auto-save indicator */}
                {lastSaved && (
                  <span className="text-sm text-vybe-gray-400">
                    Last saved: {lastSaved.toLocaleTimeString()}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                {currentStep < FORM_STEPS.length ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={isSaving || isSubmitting}
                    className="btn btn-primary-orange"
                  >
                    {currentStep === 1 && "Continue to Details"}
                    {currentStep === 2 && "Next: Preview →"}
                    {currentStep === 3 && "Next: Submit →"}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSaving || isSubmitting}
                    className="btn btn-primary-orange"
                    id="submit-app-btn"
                  >
                    {isSubmitting ? (
                      <>Loading...</>
                    ) : (
                      "Submit App for Review"
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}