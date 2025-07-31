"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { FlaskConical, Trash2 } from "lucide-react";
import { useState } from "react";

export function TestGuideButton() {
  const { toast } = useToast();
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const seedTestGuide = useMutation(api.seedTestGuide.seedTestGuide);
  const deleteTestGuide = useMutation(api.seedTestGuide.deleteTestGuide);

  const handleCreateTestGuide = async () => {
    setIsCreating(true);
    try {
      const result = await seedTestGuide();
      
      toast({
        title: result.message,
        description: result.success 
          ? "You can now test all guide features with this placeholder content." 
          : "Test guide may already exist.",
      });

      if (result.success && result.slug) {
        // Navigate to the test guide
        setTimeout(() => {
          router.push(`/guides/${result.slug}`);
        }, 1000);
      }
    } catch (error) {
      toast({
        title: "Error creating test guide",
        description: "Please make sure you're logged in.",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteTestGuide = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteTestGuide();
      
      toast({
        title: result.message,
        description: result.success 
          ? "Test guide has been removed." 
          : "Test guide was not found.",
      });

      if (result.success) {
        router.refresh();
      }
    } catch (error) {
      toast({
        title: "Error deleting test guide",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleCreateTestGuide}
        disabled={isCreating}
        variant="outline"
        size="sm"
        className="border-vybe-orange/50 hover:bg-vybe-orange/10 text-vybe-orange"
      >
        <FlaskConical className="w-4 h-4 mr-2" />
        {isCreating ? "Creating..." : "Create Test Guide"}
      </Button>
      
      <Button
        onClick={handleDeleteTestGuide}
        disabled={isDeleting}
        variant="outline"
        size="sm"
        className="border-red-500/50 hover:bg-red-500/10 text-red-500"
      >
        <Trash2 className="w-4 h-4 mr-2" />
        {isDeleting ? "Deleting..." : "Delete Test Guide"}
      </Button>
    </div>
  );
}