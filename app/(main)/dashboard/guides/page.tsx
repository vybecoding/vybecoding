"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Container } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PenTool, 
  FileText, 
  Eye, 
  Clock, 
  CheckCircle,
  MoreVertical,
  Edit,
  Trash,
  ExternalLink,
  BookOpen,
  TrendingUp,
  Users
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Id } from "@/convex/_generated/dataModel";

export default function DashboardGuidesPage() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState("all");
  const [deleteGuideId, setDeleteGuideId] = useState<Id<"guides"> | null>(null);

  // Get current user from Convex
  const currentUser = useQuery(
    api.users.getCurrentUser,
    isSignedIn ? {} : "skip"
  );

  // Get user's guides
  const userGuides = useQuery(
    api.guides.getUserGuides,
    currentUser?._id 
      ? { userId: currentUser._id, includeUnpublished: true }
      : "skip"
  );

  // Get guide statistics
  const guideStats = useQuery(
    api.guides.getGuideStats,
    currentUser?._id ? { userId: currentUser._id } : "skip"
  );

  // Mutations
  const publishGuide = useMutation(api.guides.publishGuide);
  const unpublishGuide = useMutation(api.guides.unpublishGuide);

  // Filter guides by status
  const filteredGuides = userGuides?.filter(guide => {
    if (activeTab === "all") return true;
    return guide.status === activeTab;
  }) || [];

  const handlePublish = async (guideId: Id<"guides">) => {
    try {
      await publishGuide({ id: guideId });
      toast({
        title: "Guide published!",
        description: "Your guide is now live"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish guide",
        variant: "destructive"
      });
    }
  };

  const handleUnpublish = async (guideId: Id<"guides">) => {
    try {
      await unpublishGuide({ id: guideId });
      toast({
        title: "Guide unpublished",
        description: "Your guide has been unpublished"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to unpublish guide",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteGuideId) return;
    
    // Note: Delete functionality would need to be implemented in the Convex backend
    toast({
      title: "Delete not implemented",
      description: "Guide deletion is not yet implemented",
      variant: "default"
    });
    
    setDeleteGuideId(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Published</Badge>;
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "unpublished":
        return <Badge variant="outline">Unpublished</Badge>;
      default:
        return null;
    }
  };

  if (!isSignedIn || !currentUser) {
    return (
      <Container className="py-8">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Please sign in to view your guides
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Guides</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your published and draft guides
            </p>
          </div>
          <Link href="/write">
            <Button className="flex items-center gap-2">
              <PenTool className="w-4 h-4" />
              Write New Guide
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        {guideStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium text-gray-600 dark:text-gray-400">
                  Total Guides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <span className="text-2xl font-bold">{guideStats.total}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium text-gray-600 dark:text-gray-400">
                  Total Views
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-green-500" />
                  <span className="text-2xl font-bold">
                    {guideStats.totalViews.toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium text-gray-600 dark:text-gray-400">
                  Completions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                  <span className="text-2xl font-bold">
                    {guideStats.totalCompletions.toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium text-gray-600 dark:text-gray-400">
                  Avg Completion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <span className="text-2xl font-bold">
                    {guideStats.avgCompletionRate}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Guides List */}
        <Card>
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">
                  All ({userGuides?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="published">
                  Published ({userGuides?.filter(g => g.status === "published").length || 0})
                </TabsTrigger>
                <TabsTrigger value="draft">
                  Drafts ({userGuides?.filter(g => g.status === "draft").length || 0})
                </TabsTrigger>
                <TabsTrigger value="unpublished">
                  Unpublished ({userGuides?.filter(g => g.status === "unpublished").length || 0})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            {filteredGuides.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {activeTab === "all" 
                    ? "You haven't written any guides yet"
                    : `No ${activeTab} guides found`}
                </p>
                {activeTab === "all" && (
                  <Link href="/write">
                    <Button>Write Your First Guide</Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredGuides.map((guide) => (
                  <div
                    key={guide._id}
                    className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">
                            {guide.title}
                          </h3>
                          {getStatusBadge(guide.status)}
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {guide.excerpt}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatDistanceToNow(guide.updatedAt, { addSuffix: true })}
                          </span>
                          {guide.status === "published" && (
                            <>
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {guide.views} views
                              </span>
                              <span className="flex items-center gap-1">
                                <CheckCircle className="w-4 h-4" />
                                {guide.completions} completions
                              </span>
                            </>
                          )}
                          <span className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {guide.readingTime} min read
                          </span>
                        </div>
                      </div>

                      {/* Actions Dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {guide.status === "published" && (
                            <DropdownMenuItem asChild>
                              <Link href={`/guides/${guide.slug}`}>
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View Guide
                              </Link>
                            </DropdownMenuItem>
                          )}
                          
                          <DropdownMenuItem asChild>
                            <Link href={`/write/${guide._id}`}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Link>
                          </DropdownMenuItem>

                          {guide.status === "draft" && (
                            <DropdownMenuItem onClick={() => handlePublish(guide._id)}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Publish
                            </DropdownMenuItem>
                          )}

                          {guide.status === "published" && (
                            <DropdownMenuItem onClick={() => handleUnpublish(guide._id)}>
                              <Clock className="w-4 h-4 mr-2" />
                              Unpublish
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuSeparator />
                          
                          <DropdownMenuItem
                            onClick={() => setDeleteGuideId(guide._id)}
                            className="text-red-600 dark:text-red-400"
                          >
                            <Trash className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteGuideId} onOpenChange={() => setDeleteGuideId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your guide.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Container>
  );
}