#!/usr/bin/env node

// Simple script to test guide functionality
import { ConvexHttpClient } from "convex/browser";

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

async function testGuides() {
  try {
    console.log("Testing guide functionality...");
    
    // Try to get published guides
    console.log("\n1. Fetching published guides...");
    const guides = await client.query("guides:getPublishedGuides", {});
    console.log(`Found ${guides.guides?.length || 0} published guides`);
    
    if (guides.guides && guides.guides.length > 0) {
      console.log("\nExisting guides:");
      guides.guides.forEach((guide, index) => {
        console.log(`${index + 1}. ${guide.title} (slug: ${guide.slug})`);
      });
    } else {
      console.log("No guides found in database");
    }
    
    // Try to get a specific guide by slug
    console.log("\n2. Testing specific guide lookup...");
    if (guides.guides && guides.guides.length > 0) {
      const firstGuide = guides.guides[0];
      const guideDetail = await client.query("guides:getGuideBySlug", { 
        slug: firstGuide.slug 
      });
      if (guideDetail) {
        console.log(`Successfully fetched guide: ${guideDetail.title}`);
        console.log(`Author: ${guideDetail.author?.displayName || 'Unknown'}`);
        console.log(`Reading time: ${guideDetail.readingTime} minutes`);
      }
    }
    
  } catch (error) {
    console.error("Error testing guides:", error);
  }
}

testGuides();