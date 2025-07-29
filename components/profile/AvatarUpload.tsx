"use client";

import React, { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, Camera, X } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface AvatarUploadProps {
  currentAvatar?: string;
  onUpload: (url: string) => void;
  userId: Id<"users">;
  size?: "sm" | "md" | "lg";
}

export function AvatarUpload({ 
  currentAvatar, 
  onUpload, 
  userId, 
  size = "md" 
}: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // TODO: Replace with actual Convex file upload mutation
  // For now, we'll use a placeholder that simulates the upload
  const uploadAvatar = useMutation(api.users.uploadProfileAvatar);

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24", 
    lg: "w-32 h-32"
  };

  const validateFile = (file: File): string | null => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return "Please upload a valid image file (JPEG, PNG, WebP, or GIF)";
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return "File size must be less than 5MB";
    }

    return null;
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const error = validateFile(file);
    if (error) {
      toast({
        title: "Invalid file",
        description: error,
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      // Create preview URL
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);

      // TODO: Implement actual file upload to Convex storage
      // For now, we'll simulate the upload and use a placeholder URL
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, this would upload to Convex storage:
      // const storageId = await generateUploadUrl();
      // const result = await fetch(uploadUrl, { method: "POST", body: file });
      // const avatarUrl = await getFileUrl(storageId);
      
      // For demo purposes, we'll use the preview URL
      const avatarUrl = preview;
      
      // Update the database
      await uploadAvatar({
        clerkId: "placeholder", // TODO: Get from auth context
        avatarUrl
      });

      onUpload(avatarUrl);
      
      toast({
        title: "Avatar updated",
        description: "Your profile picture has been successfully updated."
      });

    } catch (error) {
      console.error("Avatar upload error:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload avatar. Please try again.",
        variant: "destructive"
      });
      
      // Clean up preview URL on error
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveAvatar = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    onUpload("");
    
    toast({
      title: "Avatar removed",
      description: "Your profile picture has been removed."
    });
  };

  const displayAvatar = previewUrl || currentAvatar;
  const displayName = "User"; // TODO: Get from user context
  const initials = displayName
    .split(" ")
    .map(name => name[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-center gap-4">
      {/* Avatar Display */}
      <div className="relative">
        <Avatar className={sizeClasses[size]}>
          <AvatarImage src={displayAvatar} alt="Profile picture" />
          <AvatarFallback className="text-lg font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        
        {isUploading && (
          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Upload Controls */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2"
          >
            {displayAvatar ? <Camera className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
            {displayAvatar ? "Change" : "Upload"}
          </Button>
          
          {displayAvatar && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemoveAvatar}
              disabled={isUploading}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
            >
              <X className="w-4 h-4" />
              Remove
            </Button>
          )}
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-400">
          JPEG, PNG, WebP or GIF. Max 5MB.
        </p>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Upload profile picture"
      />
    </div>
  );
}