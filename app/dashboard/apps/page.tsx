"use client";

import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppGrid } from "@/components/apps/AppGrid";
import { AppStatusBadge } from "@/components/apps/AppStatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Eye, Trash2, Send, Clock, Check } from "lucide-react";
import { formatDistanceToNow } from "@/lib/utils";
import { APP_STATUS } from "@/lib/constants/apps";
import Image from "next/image";

export default function DashboardAppsPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");

  // Fetch user's apps
  const allApps = useQuery(api.apps.getUserApps, {});
  const appStats = useQuery(api.apps.getUserAppStats, {});

  // Redirect to sign in if not authenticated
  React.useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in?redirect=/dashboard/apps");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn || !allApps || !appStats) {
    return (
      <Container className="py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </Container>
    );
  }

  const handleCreateApp = () => {
    router.push("/apps/submit");
  };

  const handleEditApp = (appId: string) => {
    router.push(`/apps/submit?id=${appId}`);
  };

  const handleViewApp = (appId: string) => {
    router.push(`/apps/${appId}`);
  };

  const filteredApps = activeTab === "all" 
    ? allApps 
    : allApps.filter(app => app.status === activeTab);

  return (
    <Container className="py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              My Apps
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your app submissions
            </p>
          </div>
          
          <Button onClick={handleCreateApp} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Submit New App
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Apps</p>
                <p className="text-2xl font-bold">{appStats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
                <p className="text-2xl font-bold">{appStats.approved}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">In Review</p>
                <p className="text-2xl font-bold">{appStats.submitted}</p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
                <p className="text-2xl font-bold">{appStats.totalViews}</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Apps Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All ({appStats.total})</TabsTrigger>
            <TabsTrigger value="draft">Drafts ({appStats.draft})</TabsTrigger>
            <TabsTrigger value="submitted">Submitted ({appStats.submitted})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({appStats.approved})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({appStats.rejected})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredApps.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {activeTab === "all" 
                    ? "You haven't submitted any apps yet."
                    : `No ${activeTab} apps.`}
                </p>
                {activeTab === "all" && (
                  <Button onClick={handleCreateApp} className="flex items-center gap-2 mx-auto">
                    <Plus className="w-4 h-4" />
                    Submit Your First App
                  </Button>
                )}
              </Card>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>App</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApps.map((app) => (
                      <TableRow key={app._id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 relative rounded-lg overflow-hidden">
                              <Image
                                src={app.iconUrl}
                                alt={app.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{app.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                                {app.shortDescription}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{app.category}</TableCell>
                        <TableCell>
                          <AppStatusBadge status={app.status} />
                        </TableCell>
                        <TableCell>
                          {formatDistanceToNow(new Date(app.createdAt))} ago
                        </TableCell>
                        <TableCell>{app.views || 0}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {app.status === APP_STATUS.DRAFT && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEditApp(app._id)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    // Submit for review
                                  }}
                                >
                                  <Send className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                            {app.status === APP_STATUS.REJECTED && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditApp(app._id)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            )}
                            {app.status === APP_STATUS.APPROVED && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewApp(app._id)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
}