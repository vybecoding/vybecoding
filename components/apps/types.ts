export interface AppFormData {
  // Basic info
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  tags?: string[];
  
  // Visual assets
  iconUrl: string;
  screenshots: string[];
  demoVideoUrl?: string;
  
  // Links
  liveUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  githubUrl?: string;
  documentationUrl?: string;
  
  // Technical
  techStack: string[];
  techStackString?: string; // For demo-style tech input
  platforms: string[];
  license: string;
  
  // Pricing
  pricingType?: "free" | "premium";
  price?: number;
  licenseType?: string;
  demoEnabled?: boolean;
  supportIncluded?: boolean;
  updatesIncluded?: boolean;
  customizationService?: boolean;
  hostingSetupService?: boolean;
}

export interface AppFormStepProps {
  onNext?: () => void;
  onPrev?: () => void;
  isLastStep?: boolean;
}