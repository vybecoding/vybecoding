"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Container } from "@/components/ui/layout";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GUIDE_CATEGORIES, DIFFICULTY_LEVELS, GUIDE_TAGS } from "@/lib/constants/guides";
import { 
  Save, 
  Eye, 
  Code, 
  X, 
  Plus, 
  Info,
  FileText,
  Settings,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function WriteGuidePage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("beginner");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  
  // UI state
  const [activeTab, setActiveTab] = useState("editor");
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  // Mutations
  const createGuide = useMutation(api.guides.createGuide);
  const publishGuide = useMutation(api.guides.publishGuide);

  // Redirect if not signed in
  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in?redirect=/write");
    }
  }, [isSignedIn, router]);

  // Calculate word and character count
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    const chars = content.length;
    setWordCount(words);
    setCharCount(chars);
  }, [content]);

  const handleAddTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag) && selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag]);
      setTagInput("");
      setShowTagSuggestions(false);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      handleAddTag(tagInput.trim().toLowerCase());
    }
  };

  const filteredTagSuggestions = tagInput
    ? GUIDE_TAGS.filter(tag => 
        tag.toLowerCase().includes(tagInput.toLowerCase()) && 
        !selectedTags.includes(tag)
      ).slice(0, 5)
    : [];

  const validateForm = () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your guide",
        variant: "destructive"
      });
      return false;
    }
    if (!content.trim()) {
      toast({
        title: "Content required",
        description: "Please write some content for your guide",
        variant: "destructive"
      });
      return false;
    }
    if (!category) {
      toast({
        title: "Category required",
        description: "Please select a category for your guide",
        variant: "destructive"
      });
      return false;
    }
    if (selectedTags.length === 0) {
      toast({
        title: "Tags required",
        description: "Please add at least one tag to help others find your guide",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleSaveDraft = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      const result = await createGuide({
        title,
        content,
        excerpt: excerpt || undefined,
        category,
        difficulty,
        tags: selectedTags
      });

      toast({
        title: "Draft saved!",
        description: "Your guide has been saved as a draft"
      });

      // Redirect to edit page
      router.push(`/write/${result.id}`);
    } catch (error) {
      toast({
        title: "Error saving draft",
        description: "Failed to save your guide. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!validateForm()) return;

    setIsPublishing(true);
    try {
      // First create the guide
      const result = await createGuide({
        title,
        content,
        excerpt: excerpt || undefined,
        category,
        difficulty,
        tags: selectedTags
      });

      // Then publish it
      await publishGuide({ id: result.id });

      toast({
        title: "Guide published!",
        description: "Your guide is now live"
      });

      // Redirect to the published guide
      router.push(`/guides/${result.slug}`);
    } catch (error) {
      toast({
        title: "Error publishing guide",
        description: "Failed to publish your guide. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsPublishing(false);
    }
  };

  if (!isSignedIn) {
    return null;
  }

  return (
    <Container className="py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Write a Guide</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Share your knowledge with the VybeCoding community
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isSaving || isPublishing}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save Draft"}
            </Button>
            <Button
              onClick={handlePublish}
              disabled={isSaving || isPublishing}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isPublishing ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </div>

        {/* Editor Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="editor" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Editor
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Editor Tab */}
          <TabsContent value="editor" className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-base font-medium mb-2">
                Title
              </Label>
              <Input
                id="title"
                placeholder="How to build a REST API with Node.js"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xl font-semibold"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="content" className="text-base font-medium">
                  Content
                </Label>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {wordCount} words • {charCount} characters
                </div>
              </div>
              <Textarea
                id="content"
                placeholder="Write your guide content in Markdown format..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[500px] font-mono text-sm"
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                Supports Markdown formatting. Use **bold**, *italic*, `code`, [links](url), etc.
              </p>
            </div>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview" className="min-h-[600px]">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{title || "Untitled Guide"}</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-4 mt-2">
                    <span>By {user?.firstName || "You"}</span>
                    <span>•</span>
                    <span>{Math.ceil(wordCount / 200)} min read</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                {content ? (
                  <MarkdownRenderer content={content} />
                ) : (
                  <p className="text-gray-500 italic">
                    Your guide content will appear here...
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <Label htmlFor="category" className="text-base font-medium mb-2">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {GUIDE_CATEGORIES.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Difficulty */}
              <div>
                <Label htmlFor="difficulty" className="text-base font-medium mb-2">
                  Difficulty Level
                </Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger id="difficulty">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DIFFICULTY_LEVELS.map(level => (
                      <SelectItem key={level.value} value={level.value}>
                        <span className={cn("font-medium", level.color)}>
                          {level.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <Label htmlFor="excerpt" className="text-base font-medium mb-2">
                Excerpt (Optional)
              </Label>
              <Textarea
                id="excerpt"
                placeholder="A brief summary of your guide (will be auto-generated if left empty)"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="h-24"
                maxLength={160}
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {excerpt.length}/160 characters
              </p>
            </div>

            {/* Tags */}
            <div>
              <Label className="text-base font-medium mb-2">
                Tags <span className="text-red-500">*</span>
                <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-2">
                  (Add up to 5 tags)
                </span>
              </Label>
              
              {/* Selected Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedTags.map(tag => (
                  <Badge key={tag} variant="secondary" className="pr-1">
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              {/* Tag Input */}
              <div className="relative">
                <Input
                  placeholder="Type to search tags or create new ones"
                  value={tagInput}
                  onChange={(e) => {
                    setTagInput(e.target.value);
                    setShowTagSuggestions(true);
                  }}
                  onKeyDown={handleTagInputKeyDown}
                  onFocus={() => setShowTagSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowTagSuggestions(false), 200)}
                  disabled={selectedTags.length >= 5}
                />
                
                {/* Tag Suggestions */}
                {showTagSuggestions && filteredTagSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-900 border rounded-md shadow-lg z-10">
                    {filteredTagSuggestions.map(tag => (
                      <button
                        key={tag}
                        onClick={() => handleAddTag(tag)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Writing Tips */}
            <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Writing Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">• Use clear, descriptive headings to structure your guide</p>
                <p className="text-sm">• Include code examples with proper syntax highlighting</p>
                <p className="text-sm">• Add images or diagrams to illustrate complex concepts</p>
                <p className="text-sm">• Keep paragraphs short and focused</p>
                <p className="text-sm">• End with a summary or next steps section</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
}