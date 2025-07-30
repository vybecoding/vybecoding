"use client";

import { useParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Container } from "@/components/ui/layout";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function AppDetailPage() {
  const params = useParams();
  const appId = params.appId as string;
  
  const app = useQuery(api.apps.getAppById, { 
    appId: appId as Id<"apps"> 
  });
  
  const incrementViews = useMutation(api.apps.incrementAppViews);
  
  // Increment view count when app loads
  useEffect(() => {
    if (app && appId) {
      incrementViews({ appId: appId as Id<"apps"> });
    }
  }, [app, appId, incrementViews]);

  if (!app) {
    return (
      <Container className="py-8">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-vybe-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading app details...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/apps" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Apps
        </Link>
        
        <h1 className="text-3xl font-bold text-white mb-4">{app.name}</h1>
        <p className="text-gray-400">{app.fullDescription || app.shortDescription}</p>
      </div>
    </Container>
  );
}