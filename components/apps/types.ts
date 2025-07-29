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
  platforms: string[];
  license: string;
}

export interface AppFormStepProps {
  onNext?: () => void;
  onPrev?: () => void;
  isLastStep?: boolean;
}