"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import validator from "validator";
import DOMPurify from "dompurify";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AvatarUpload } from "./AvatarUpload";
import { Save, X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Id } from "@/convex/_generated/dataModel";

// Validation schema with security-first approach
const profileSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens")
    .refine((val) => validator.isAlphanumeric(val.replace(/[_-]/g, '')), {
      message: "Username contains invalid characters"
    }),
  displayName: z.string()
    .min(2, "Display name must be at least 2 characters")
    .max(50, "Display name must be less than 50 characters")
    .refine((val) => validator.isLength(val.trim(), { min: 2, max: 50 }), {
      message: "Display name contains invalid characters"
    }),
  bio: z.string()
    .max(500, "Bio must be less than 500 characters")
    .optional(),
  location: z.string()
    .max(100, "Location must be less than 100 characters")
    .optional(),
  website: z.string()
    .refine((val) => !val || validator.isURL(val, { 
      protocols: ['http', 'https'],
      require_protocol: true 
    }), {
      message: "Please enter a valid URL (include http:// or https://)"
    })
    .optional(),
  github: z.string()
    .refine((val) => !val || validator.isURL(`https://${val.replace(/^https?:\/\//, '')}`) || val.includes('github.com'), {
      message: "Please enter a valid GitHub profile URL or username"
    })
    .optional(),
  linkedin: z.string()
    .refine((val) => !val || validator.isURL(`https://${val.replace(/^https?:\/\//, '')}`) || val.includes('linkedin.com'), {
      message: "Please enter a valid LinkedIn profile URL"
    })
    .optional(),
  twitter: z.string()
    .refine((val) => !val || validator.isURL(`https://${val.replace(/^https?:\/\//, '')}`) || val.includes('twitter.com') || val.includes('x.com'), {
      message: "Please enter a valid Twitter/X profile URL or username"
    })
    .optional(),
  profileVisibility: z.enum(["public", "private", "members-only"]),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface User {
  _id: Id<"users">;
  clerkId: string;
  username?: string;
  displayName?: string;
  bio?: string;
  avatar?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  skills?: string[];
  profileVisibility?: "public" | "private" | "members-only";
}

interface ProfileEditProps {
  user: User;
  onSave: (data: Partial<User>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ProfileEdit({ user, onSave, onCancel, isLoading = false }: ProfileEditProps) {
  const [skills, setSkills] = useState<string[]>(user.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [avatar, setAvatar] = useState(user.avatar || "");
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
    reset
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user.username || "",
      displayName: user.displayName || "",
      bio: user.bio || "",
      location: user.location || "",
      website: user.website || "",
      github: user.github || "",
      linkedin: user.linkedin || "",
      twitter: user.twitter || "",
      profileVisibility: user.profileVisibility || "public",
    }
  });

  // Reset form when user data changes
  useEffect(() => {
    reset({
      username: user.username || "",
      displayName: user.displayName || "",
      bio: user.bio || "",
      location: user.location || "",
      website: user.website || "",
      github: user.github || "",
      linkedin: user.linkedin || "",
      twitter: user.twitter || "",
      profileVisibility: user.profileVisibility || "public",
    });
    setSkills(user.skills || []);
    setAvatar(user.avatar || "");
  }, [user, reset]);

  const addSkill = () => {
    if (!newSkill.trim()) return;
    
    // Sanitize skill input
    const sanitizedSkill = DOMPurify.sanitize(newSkill.trim());
    
    // Validate skill
    if (!validator.isLength(sanitizedSkill, { min: 1, max: 30 })) {
      toast({
        title: "Invalid skill",
        description: "Skills must be between 1 and 30 characters",
        variant: "destructive"
      });
      return;
    }

    if (skills.includes(sanitizedSkill)) {
      toast({
        title: "Duplicate skill",
        description: "This skill is already added",
        variant: "destructive"
      });
      return;
    }

    if (skills.length >= 20) {
      toast({
        title: "Too many skills",
        description: "You can add up to 20 skills",
        variant: "destructive"
      });
      return;
    }

    setSkills([...skills, sanitizedSkill]);
    setNewSkill("");
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Sanitize all text inputs
      const sanitizedData = {
        ...data,
        username: data.username ? DOMPurify.sanitize(data.username.trim()) : undefined,
        displayName: data.displayName ? DOMPurify.sanitize(data.displayName.trim()) : undefined,
        bio: data.bio ? DOMPurify.sanitize(data.bio.trim()) : undefined,
        location: data.location ? DOMPurify.sanitize(data.location.trim()) : undefined,
        // URLs are validated by schema, but we still sanitize
        website: data.website ? DOMPurify.sanitize(data.website.trim()) : undefined,
        github: data.github ? DOMPurify.sanitize(data.github.trim()) : undefined,
        linkedin: data.linkedin ? DOMPurify.sanitize(data.linkedin.trim()) : undefined,
        twitter: data.twitter ? DOMPurify.sanitize(data.twitter.trim()) : undefined,
      };

      await onSave({
        ...sanitizedData,
        skills,
        avatar,
      });

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated."
      });
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  const handleAvatarUpload = (url: string) => {
    setAvatar(url);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Edit Profile
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          disabled={isLoading}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Avatar Upload */}
        <div>
          <Label className="text-sm font-medium">Profile Picture</Label>
          <AvatarUpload
            currentAvatar={avatar}
            onUpload={handleAvatarUpload}
            userId={user._id}
          />
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="username" className="text-sm font-medium">
              Username *
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">@</span>
              <Input
                id="username"
                {...register("username")}
                placeholder="username"
                className={`pl-8 ${errors.username ? "border-red-500" : ""}`}
              />
            </div>
            {errors.username && (
              <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">Your profile URL: /profile/{watch("username") || "username"}</p>
          </div>

          <div>
            <Label htmlFor="displayName" className="text-sm font-medium">
              Display Name *
            </Label>
            <Input
              id="displayName"
              {...register("displayName")}
              placeholder="How you want to be known"
              className={errors.displayName ? "border-red-500" : ""}
            />
            {errors.displayName && (
              <p className="text-sm text-red-600 mt-1">{errors.displayName.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="location" className="text-sm font-medium">
            Location
          </Label>
          <Input
            id="location"
            {...register("location")}
            placeholder="City, Country"
            className={errors.location ? "border-red-500" : ""}
          />
          {errors.location && (
            <p className="text-sm text-red-600 mt-1">{errors.location.message}</p>
          )}
        </div>

        {/* Bio */}
        <div>
          <Label htmlFor="bio" className="text-sm font-medium">
            Bio
          </Label>
          <Textarea
            id="bio"
            {...register("bio")}
            placeholder="Tell us about yourself and your coding journey..."
            rows={4}
            className={errors.bio ? "border-red-500" : ""}
          />
          {errors.bio && (
            <p className="text-sm text-red-600 mt-1">{errors.bio.message}</p>
          )}
        </div>

        {/* Social Links */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Social Links</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="website" className="text-xs text-gray-600 dark:text-gray-400">
                Website
              </Label>
              <Input
                id="website"
                {...register("website")}
                placeholder="https://yourwebsite.com"
                className={errors.website ? "border-red-500" : ""}
              />
              {errors.website && (
                <p className="text-sm text-red-600 mt-1">{errors.website.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="github" className="text-xs text-gray-600 dark:text-gray-400">
                GitHub
              </Label>
              <Input
                id="github"
                {...register("github")}
                placeholder="github.com/username"
                className={errors.github ? "border-red-500" : ""}
              />
              {errors.github && (
                <p className="text-sm text-red-600 mt-1">{errors.github.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="linkedin" className="text-xs text-gray-600 dark:text-gray-400">
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                {...register("linkedin")}
                placeholder="linkedin.com/in/username"
                className={errors.linkedin ? "border-red-500" : ""}
              />
              {errors.linkedin && (
                <p className="text-sm text-red-600 mt-1">{errors.linkedin.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="twitter" className="text-xs text-gray-600 dark:text-gray-400">
                Twitter/X
              </Label>
              <Input
                id="twitter"
                {...register("twitter")}
                placeholder="twitter.com/username"
                className={errors.twitter ? "border-red-500" : ""}
              />
              {errors.twitter && (
                <p className="text-sm text-red-600 mt-1">{errors.twitter.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Skills & Technologies</Label>
          
          <div className="flex gap-2 mb-3">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill (e.g., React, Python, Node.js)"
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              onClick={addSkill}
              disabled={!newSkill.trim()}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1 cursor-pointer hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-900 dark:hover:text-red-200"
                  onClick={() => removeSkill(skill)}
                >
                  {skill}
                  <X className="w-3 h-3" />
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Privacy Settings */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Profile Visibility</Label>
          <Select 
            value={watch("profileVisibility")} 
            onValueChange={(value: "public" | "private" | "members-only") => 
              setValue("profileVisibility", value, { shouldDirty: true })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">
                Public - Anyone can view your profile
              </SelectItem>
              <SelectItem value="members-only">
                Members Only - Only registered users can view
              </SelectItem>
              <SelectItem value="private">
                Private - Only you can view your profile
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isDirty || isLoading}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isLoading ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </form>
    </Card>
  );
}