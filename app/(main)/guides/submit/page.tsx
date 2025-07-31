"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { GradientText } from "@/components/effects/GradientText";
import { Container } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PrimaryCard, SecondaryCard, CardContent as CardContentVariant } from "@/components/ui/card/CardVariants";
import { GUIDE_CATEGORIES, DIFFICULTY_LEVELS, GUIDE_TAGS } from "@/lib/constants/guides";
import { 
  ChevronLeft,
  ChevronRight,
  Save,
  Eye,
  Upload,
  FileText,
  Code,
  Bold,
  Italic,
  Heading,
  Image as ImageIcon,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Minus,
  CheckCircle,
  AlertCircle,
  X,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";

const STEPS = [
  { id: 1, name: "Overview", description: "Basic guide information" },
  { id: 2, name: "Modules", description: "Structure your content" },
  { id: 3, name: "Content", description: "Write your guide" },
  { id: 4, name: "Resources", description: "Add downloads & files" },
  { id: 5, name: "Review", description: "Final review & submit" }
];

interface GuideModule {
  id: string;
  title: string;
  lessons: {
    id: string;
    title: string;
    content?: string;
  }[];
}

export default function GuideSubmitPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  // Current step
  const [currentStep, setCurrentStep] = useState(1);

  // Form data
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    difficulty: "beginner",
    tags: [] as string[],
    modules: [
      {
        id: "default-module-1",
        title: "Module 1: Getting Started",
        lessons: [
          { id: "default-lesson-1", title: "Introduction" },
          { id: "default-lesson-2", title: "Setup" }
        ]
      }
    ] as GuideModule[],
    resources: [] as { id: string; name: string; url: string; type: string }[],
    excerpt: ""
  });

  // UI state
  const [tagInput, setTagInput] = useState("");
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [lessonContents, setLessonContents] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');
  
  // Resource form state
  const [resourceForm, setResourceForm] = useState({
    name: "",
    url: "",
    type: "github"
  });

  // Mutations
  const createGuide = useMutation(api.guides.createGuide);
  const publishGuide = useMutation(api.guides.publishGuide);

  // Redirect if not signed in
  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in?redirect=/guides/submit");
    }
  }, [isSignedIn, router]);

  // Initialize selected lesson
  useEffect(() => {
    if (!selectedLessonId && formData.modules.length > 0 && formData.modules[0].lessons.length > 0) {
      setSelectedLessonId(formData.modules[0].lessons[0].id);
    }
  }, [formData.modules, selectedLessonId]);

  // Auto-save effect
  useEffect(() => {
    const autoSave = setTimeout(() => {
      if (formData.title || getCurrentLessonContent()) {
        handleAutoSave();
      }
    }, 5000);

    return () => clearTimeout(autoSave);
  }, [formData, lessonContents]);

  const handleAutoSave = async () => {
    setAutoSaveStatus('saving');
    try {
      // Simulate auto-save (would call actual save function)
      await new Promise(resolve => setTimeout(resolve, 500));
      setAutoSaveStatus('saved');
    } catch (error) {
      setAutoSaveStatus('error');
    }
  };

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const goToStep = (step: number, force = false) => {
    if (step >= 1 && step <= 5) {
      if (!force && step > currentStep + 1) {
        // Prevent skipping steps
        return;
      }
      setCurrentStep(step);
    }
  };

  const handleAddTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 5) {
      updateFormData({ tags: [...formData.tags, tag] });
      setTagInput("");
      setShowTagSuggestions(false);
    }
  };

  const handleRemoveTag = (tag: string) => {
    updateFormData({ tags: formData.tags.filter(t => t !== tag) });
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
        !formData.tags.includes(tag)
      ).slice(0, 5)
    : [];

  const addModule = () => {
    const newModule: GuideModule = {
      id: Date.now().toString(),
      title: `Module ${formData.modules.length + 1}`,
      lessons: []
    };
    updateFormData({ modules: [...formData.modules, newModule] });
  };

  const updateModule = (moduleId: string, updates: Partial<GuideModule>) => {
    updateFormData({
      modules: formData.modules.map(m => 
        m.id === moduleId ? { ...m, ...updates } : m
      )
    });
  };

  const updateLessonContent = (lessonId: string, content: string) => {
    setLessonContents(prev => ({
      ...prev,
      [lessonId]: content
    }));
  };

  const getCurrentLessonContent = () => {
    if (!selectedLessonId) return "";
    return lessonContents[selectedLessonId] || "";
  };

  const deleteModule = (moduleId: string) => {
    updateFormData({
      modules: formData.modules.filter(m => m.id !== moduleId)
    });
  };

  const addLesson = (moduleId: string) => {
    const module = formData.modules.find(m => m.id === moduleId);
    if (module) {
      const newLesson = {
        id: Date.now().toString(),
        title: `Lesson ${module.lessons.length + 1}`
      };
      updateModule(moduleId, {
        lessons: [...module.lessons, newLesson]
      });
    }
  };

  const addResource = () => {
    if (resourceForm.name && resourceForm.url) {
      const newResource = {
        id: Date.now().toString(),
        name: resourceForm.name,
        url: resourceForm.url,
        type: resourceForm.type
      };
      updateFormData({ resources: [...formData.resources, newResource] });
      setResourceForm({ name: "", url: "", type: "github" });
    }
  };

  const removeResource = (resourceId: string) => {
    updateFormData({
      resources: formData.resources.filter(r => r.id !== resourceId)
    });
  };

  const handleSubmit = async () => {
    // Double-check authentication
    if (!isSignedIn) {
      toast({
        title: "Authentication required",
        description: "Please sign in to submit a guide",
        variant: "destructive"
      });
      router.push("/sign-in?redirect=/guides/submit");
      return;
    }

    setIsSaving(true);
    try {
      // Validate form
      if (!formData.title || !formData.category || formData.tags.length === 0) {
        toast({
          title: "Missing required fields",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        setIsSaving(false);
        return;
      }

      // Validate at least one module with content
      if (formData.modules.length === 0 || Object.keys(lessonContents).length === 0) {
        toast({
          title: "No content",
          description: "Please add at least one module with content",
          variant: "destructive"
        });
        setIsSaving(false);
        return;
      }

      // Combine all lesson contents
      const fullContent = Object.entries(lessonContents)
        .map(([lessonId, content]) => content)
        .filter(content => content.trim().length > 0)
        .join("\n\n---\n\n");

      if (!fullContent.trim()) {
        toast({
          title: "No content",
          description: "Please write content for at least one lesson",
          variant: "destructive"
        });
        setIsSaving(false);
        return;
      }

      // Create guide
      const result = await createGuide({
        title: formData.title,
        content: fullContent,
        excerpt: formData.excerpt || formData.description,
        category: formData.category,
        difficulty: formData.difficulty,
        tags: formData.tags
      });

      if (!result) {
        throw new Error("Failed to create guide");
      }

      // Publish guide
      await publishGuide({ id: result.id });

      toast({
        title: "Guide submitted!",
        description: "Your guide has been submitted for review"
      });

      router.push(`/guides/${result.slug}`);
    } catch (error: any) {
      console.error("Guide submission error:", error);
      
      let errorMessage = "Failed to submit your guide. Please try again.";
      if (error.message?.includes("Not authenticated")) {
        errorMessage = "Your session has expired. Please sign in again.";
        // Redirect to sign in after a short delay
        setTimeout(() => {
          router.push("/sign-in?redirect=/guides/submit");
        }, 2000);
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Error submitting guide",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="page-container nebula-background no-animation">
      <div className="nebula-middle"></div>
      <div className="nebula-bottom"></div>
      
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}



        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-4">
            <GradientText gradient="brand">Submit Guide</GradientText>
          </h1>
          <p className="text-vybe-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Share your knowledge with the VybeCoding community through our structured guide format.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-between items-center mb-8 relative overflow-x-auto">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-vybe-gray-800 z-0"></div>
          
          {STEPS.map((step, index) => (
            <div 
              key={step.id}
              className={cn(
                "flex flex-col items-center relative z-10 cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0 px-2",
                currentStep >= step.id ? "opacity-100" : "opacity-60"
              )}
              onClick={() => goToStep(step.id, true)}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 transition-colors",
                currentStep >= step.id 
                  ? "bg-vybe-purple text-white" 
                  : "bg-vybe-gray-800 text-vybe-gray-400"
              )}>
                {step.id}
              </div>
              <span className={cn(
                "text-sm whitespace-nowrap transition-colors",
                currentStep >= step.id 
                  ? "text-vybe-purple-light font-medium" 
                  : "text-vybe-gray-400"
              )}>
                {step.name}
              </span>
            </div>
          ))}
        </div>

        {/* Auto-save indicator */}
        <div className="text-right mb-4">
          <span className="text-sm text-vybe-gray-400">
            <span className={cn(
              "inline-block w-2 h-2 rounded-full mr-1",
              autoSaveStatus === 'saved' ? "bg-green-500" :
              autoSaveStatus === 'saving' ? "bg-yellow-500" :
              "bg-red-500"
            )}></span>
            {autoSaveStatus === 'saved' ? "Draft saved" :
             autoSaveStatus === 'saving' ? "Saving..." :
             "Save failed"}
          </span>
        </div>

        {/* Step Content */}
        <div>
          {/* Step 1: Overview */}
          {currentStep === 1 && (
            <PrimaryCard title="Guide Overview" headerVariant="default" noHover>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="Complete Guide to Building REST APIs with Node.js"
                    value={formData.title}
                    onChange={(e) => updateFormData({ title: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="subtitle" className="block text-sm font-medium text-gray-300 mb-2">
                    Subtitle
                  </Label>
                  <Input
                    id="subtitle"
                    placeholder="Learn authentication, validation, and deployment best practices"
                    value={formData.subtitle}
                    onChange={(e) => updateFormData({ subtitle: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="A comprehensive guide that covers everything you need to know about building production-ready REST APIs with Node.js..."
                    value={formData.description}
                    onChange={(e) => updateFormData({ description: e.target.value })}
                    className="h-32"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => updateFormData({ category: value })}>
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

                  <div>
                    <Label htmlFor="difficulty" className="block text-sm font-medium text-gray-300 mb-2">
                      Difficulty Level
                    </Label>
                    <Select value={formData.difficulty} onValueChange={(value) => updateFormData({ difficulty: value })}>
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

                {/* Tags */}
                <div>
                  <Label className="block text-sm font-medium text-gray-300 mb-2">
                    Tags <span className="text-red-500">*</span>
                    <span className="text-xs font-normal text-gray-500 ml-2">
                      (Add up to 5 tags)
                    </span>
                  </Label>
                  
                  {/* Selected Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.tags.map(tag => (
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
                      disabled={formData.tags.length >= 5}
                    />
                    
                    {/* Tag Suggestions */}
                    {showTagSuggestions && filteredTagSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-vybe-gray-900 border border-vybe-gray-700 rounded-md shadow-lg z-10">
                        {filteredTagSuggestions.map(tag => (
                          <button
                            key={tag}
                            onClick={() => handleAddTag(tag)}
                            className="w-full text-left px-3 py-2 hover:bg-vybe-gray-800 transition-colors"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <div></div>
                  <Button 
                    onClick={() => goToStep(2)} 
                    className="btn-primary-purple"
                    disabled={!formData.title || !formData.category || formData.tags.length === 0}
                  >
                    Next: Guide Modules →
                  </Button>
                </div>
              </div>
            </PrimaryCard>
          )}

          {/* Step 2: Modules */}
          {currentStep === 2 && (
            <PrimaryCard title="Build Your Guide Structure" headerVariant="default" noHover>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Module List */}
                <div className="lg:col-span-2">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Modules</h3>
                    <Button onClick={addModule} variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Module
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {formData.modules.map((module, index) => (
                      <SecondaryCard key={module.id}>
                        <div className="flex items-center justify-between mb-3">
                          <Input
                            value={module.title}
                            onChange={(e) => updateModule(module.id, { title: e.target.value })}
                            className="text-lg font-medium"
                          />
                          <Button
                            onClick={() => deleteModule(module.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div key={lesson.id} className="flex items-center gap-2 p-2 bg-vybe-gray-800 rounded">
                              <span className="text-sm text-vybe-gray-400">
                                Lesson {lessonIndex + 1}:
                              </span>
                              <Input
                                value={lesson.title}
                                onChange={(e) => {
                                  const updatedLessons = module.lessons.map(l =>
                                    l.id === lesson.id ? { ...l, title: e.target.value } : l
                                  );
                                  updateModule(module.id, { lessons: updatedLessons });
                                }}
                                className="flex-1 h-8"
                              />
                              <Button
                                onClick={() => {
                                  const updatedLessons = module.lessons.filter(l => l.id !== lesson.id);
                                  updateModule(module.id, { lessons: updatedLessons });
                                }}
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700 p-1"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            onClick={() => addLesson(module.id)}
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Lesson
                          </Button>
                        </div>
                      </SecondaryCard>
                    ))}
                    
                    {formData.modules.length === 0 && (
                      <div className="text-center py-8 text-vybe-gray-500">
                        No modules yet. Click "Add Module" to get started.
                      </div>
                    )}
                  </div>
                </div>

                {/* Module Preview */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Preview</h3>
                  <SecondaryCard>
                    <h4 className="font-medium mb-2">{formData.title || "Your Guide Title"}</h4>
                    <div className="space-y-2 text-sm">
                      {formData.modules.map((module, index) => (
                        <div key={module.id}>
                          <div className="font-medium text-vybe-purple">
                            {module.title}
                          </div>
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div key={lesson.id} className="ml-4 text-vybe-gray-400">
                              • {lesson.title}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </SecondaryCard>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button onClick={() => goToStep(1)} variant="outline">
                  ← Back
                </Button>
                <Button 
                  onClick={() => goToStep(3)} 
                  className="btn-primary-purple"
                  disabled={formData.modules.length === 0}
                >
                  Next: Write Content →
                </Button>
              </div>
            </PrimaryCard>
          )}

          {/* Step 3: Content */}
          {currentStep === 3 && (
            <PrimaryCard title="Write Your Content" headerVariant="default" noHover>
              <div className="flex justify-between items-center mb-6">
                <div></div>
                <Select 
                  value={selectedLessonId || (formData.modules.length > 0 && formData.modules[0].lessons.length > 0 ? formData.modules[0].lessons[0].id : undefined)}
                  onValueChange={(value) => {
                    if (value && value !== "no-modules") {
                      setSelectedLessonId(value);
                    }
                  }}
                >
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder={formData.modules.length === 0 ? "Add modules in step 2 first" : "Select a lesson"} />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.modules.length === 0 ? (
                      <SelectItem value="no-modules" disabled>
                        No modules available - go back to step 2
                      </SelectItem>
                    ) : (
                      formData.modules.map((module, moduleIndex) => 
                        module.lessons.map((lesson, lessonIndex) => (
                          <SelectItem 
                            key={`${module.id}-${lesson.id}`}
                            value={lesson.id}
                          >
                            {module.title} &gt; {lesson.title}
                          </SelectItem>
                        ))
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Rich Text Editor */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[800px]">
                {/* Editor Panel */}
                <div className="border border-vybe-gray-700 rounded-lg overflow-hidden flex flex-col">
                  {/* Toolbar */}
                  <div className="bg-vybe-gray-900 border-b border-vybe-gray-700 p-2 flex flex-wrap gap-1">
                    <button className="toolbar-button" title="Bold">
                      <Bold className="w-4 h-4" />
                    </button>
                    <button className="toolbar-button" title="Italic">
                      <Italic className="w-4 h-4" />
                    </button>
                    <button className="toolbar-button" title="Heading">
                      <Heading className="w-4 h-4" />
                    </button>
                    <div className="w-px h-6 bg-vybe-gray-700 mx-1"></div>
                    <button className="toolbar-button" title="Code">
                      <Code className="w-4 h-4" />
                    </button>
                    <button className="toolbar-button" title="Code Block">
                      <FileText className="w-4 h-4" />
                    </button>
                    <div className="w-px h-6 bg-vybe-gray-700 mx-1"></div>
                    <button className="toolbar-button" title="Image">
                      <ImageIcon className="w-4 h-4" />
                    </button>
                    <button className="toolbar-button" title="Link">
                      <LinkIcon className="w-4 h-4" />
                    </button>
                    <div className="w-px h-6 bg-vybe-gray-700 mx-1"></div>
                    <button className="toolbar-button" title="Bulleted List">
                      <List className="w-4 h-4" />
                    </button>
                    <button className="toolbar-button" title="Numbered List">
                      <ListOrdered className="w-4 h-4" />
                    </button>
                    <button className="toolbar-button" title="Quote">
                      <Quote className="w-4 h-4" />
                    </button>
                    <button className="toolbar-button" title="Divider">
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Editor */}
                  <Textarea
                    placeholder="# Welcome to Rate Limiting

Rate limiting is a crucial technique for controlling the number of requests..."
                    value={getCurrentLessonContent()}
                    onChange={(e) => {
                      if (selectedLessonId) {
                        updateLessonContent(selectedLessonId, e.target.value);
                      }
                    }}
                    className="flex-1 border-0 rounded-none font-mono text-sm resize-none focus:ring-0"
                  />
                </div>

                {/* Preview Panel */}
                <div className="border border-vybe-gray-700 rounded-lg overflow-hidden flex flex-col">
                  <div className="bg-vybe-gray-900 border-b border-vybe-gray-700 p-2 flex justify-between items-center">
                    <span className="text-sm font-medium">Live Preview</span>
                    <Button
                      onClick={() => setShowPreview(!showPreview)}
                      variant="ghost"
                      size="sm"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex-1 p-4 bg-vybe-gray-900 overflow-y-auto">
                    {getCurrentLessonContent() ? (
                      <MarkdownRenderer content={getCurrentLessonContent()} />
                    ) : (
                      <p className="text-vybe-gray-500 italic">
                        {selectedLessonId ? "Start writing content for this lesson..." : "Select a lesson to begin writing..."}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button onClick={() => goToStep(2)} variant="outline">
                  ← Back
                </Button>
                <div className="flex items-center gap-4">
                  <Button variant="outline">
                    Save Draft
                  </Button>
                  <Button onClick={() => goToStep(4)} className="btn-primary-purple">
                    Next: Add Resources →
                  </Button>
                </div>
              </div>
            </PrimaryCard>
          )}

          {/* Step 4: Resources */}
          {currentStep === 4 && (
            <PrimaryCard title="Resources" headerVariant="default" noHover>
              <div className="space-y-6">
                <div>
                  <p className="text-vybe-gray-300 mb-6">
                    Add helpful links and external resources for your guide. These can include GitHub repositories, 
                    documentation, demo apps, or any other relevant materials.
                  </p>
                </div>

                {/* Add Resource Form */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Add Resource</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="resourceName" className="block text-sm font-medium text-gray-300 mb-2">
                        Resource Name
                      </Label>
                      <Input
                        id="resourceName"
                        placeholder="e.g., Rate Limiter Template"
                        className="w-full"
                        value={resourceForm.name}
                        onChange={(e) => setResourceForm({ ...resourceForm, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="resourceType" className="block text-sm font-medium text-gray-300 mb-2">
                        Resource Type
                      </Label>
                      <Select 
                        value={resourceForm.type}
                        onValueChange={(value) => setResourceForm({ ...resourceForm, type: value })}
                      >
                        <SelectTrigger id="resourceType">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="github">GitHub Repository</SelectItem>
                          <SelectItem value="demo">Demo App</SelectItem>
                          <SelectItem value="docs">Documentation</SelectItem>
                          <SelectItem value="video">Video Tutorial</SelectItem>
                          <SelectItem value="article">Article/Blog Post</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="resourceUrl" className="block text-sm font-medium text-gray-300 mb-2">
                      Resource URL
                    </Label>
                    <Input
                      id="resourceUrl"
                      type="url"
                      placeholder="https://github.com/username/repo or https://example.com/..."
                      className="w-full"
                      value={resourceForm.url}
                      onChange={(e) => setResourceForm({ ...resourceForm, url: e.target.value })}
                    />
                  </div>
                  <Button 
                    variant="outline"
                    onClick={addResource}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Resource
                  </Button>
                </div>

                {/* Resources List */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Attached Resources</h3>
                  {formData.resources.length === 0 ? (
                    <SecondaryCard>
                      <p className="text-center text-vybe-gray-400 py-8">
                        No resources added yet. Add links to helpful materials above.
                      </p>
                    </SecondaryCard>
                  ) : (
                    <div className="space-y-3">
                      {formData.resources.map((resource) => (
                        <SecondaryCard key={resource.id}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <LinkIcon className="w-5 h-5 text-vybe-purple" />
                              <div>
                                <p className="font-medium">{resource.name}</p>
                                <p className="text-sm text-vybe-gray-400">{resource.url}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">{resource.type}</Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => removeResource(resource.id)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </SecondaryCard>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button onClick={() => goToStep(3)} variant="outline">
                  ← Back
                </Button>
                <Button onClick={() => goToStep(5)} className="btn-primary-purple">
                  Next: Review & Submit →
                </Button>
              </div>
            </PrimaryCard>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <PrimaryCard title="Review & Submit" headerVariant="default" noHover>
              
              {/* AI Review Checklist */}
              <PrimaryCard title="AI Review Checklist" headerVariant="purple" className="mb-8" noHover>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span>Content structure and formatting</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span>Code examples and syntax</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span>Technical accuracy</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-white" />
                    </div>
                    <span>SEO optimization (in progress)</span>
                  </div>
                </div>
              </PrimaryCard>

              {/* Final Review */}
              <PrimaryCard title="Guide Summary" headerVariant="default" className="mb-8" noHover>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">Title:</span> {formData.title || "Not set"}
                  </div>
                  <div>
                    <span className="font-medium">Category:</span> {formData.category || "Not set"}
                  </div>
                  <div>
                    <span className="font-medium">Difficulty:</span> {formData.difficulty}
                  </div>
                  <div>
                    <span className="font-medium">Modules:</span> {formData.modules.length}
                  </div>
                  <div>
                    <span className="font-medium">Tags:</span> {formData.tags.join(", ") || "None"}
                  </div>
                </div>
              </PrimaryCard>

              <div className="flex justify-between">
                <Button onClick={() => goToStep(4)} variant="outline">
                  ← Back
                </Button>
                <div className="flex gap-4">
                  <Button variant="outline">
                    Save as Draft
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    className="btn-primary-purple"
                    disabled={isSaving}
                  >
                    {isSaving ? "Submitting..." : "Submit for AI Review"}
                  </Button>
                </div>
              </div>
            </PrimaryCard>
          )}
        </div>
      </div>
    </div>
  );
}