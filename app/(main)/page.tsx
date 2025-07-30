"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { GradientText, GlassCard, NebulaBackground } from "@/components/effects";
import { useRouter } from "next/navigation";
import Hero from "@/components/sections/Hero";

export default function Home() {
  const greeting = useQuery(api.hello.get);
  const router = useRouter();

  return (
    <main className="relative">
      {/* Hero Section */}
      <Hero />

        {/* Featured Mentors Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="animate-slide-up">
                <h3 className="text-4xl font-light mb-6 text-center">
                  Learn from <GradientText gradient="title">Featured Mentors</GradientText>
                </h3>
                
                <p className="text-gray-400 text-center mb-8">
                  Connect with AI developers who've already built successful projects and can guide your journey.
                </p>
              </div>
              <div className="relative">
                <div className="space-y-4">
                  {/* Featured Mentor Cards */}
                  {[
                    { initials: "AD", name: "Alex Developer", role: "Senior Full-Stack Developer", rating: "4.9", reviews: "127" },
                    { initials: "MR", name: "Marcus Rodriguez", role: "Principal Engineer at Meta", rating: "4.8", reviews: "89" },
                    { initials: "JL", name: "Jennifer Liu", role: "AI Research Lead at Google", rating: "5.0", reviews: "156" }
                  ].map((mentor, index) => (
                    <GlassCard key={index} className="p-4" glow="purple">
                      <div className="flex items-center gap-4 relative">
                        <div className="absolute -top-2 right-4 px-2 py-0.5 bg-vybe-orange text-white text-xs rounded-full">
                          Featured
                        </div>
                        <div className="w-14 h-14 bg-gradient-to-br from-vybe-purple to-vybe-orange rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                          {mentor.initials}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-white">{mentor.name}</h5>
                          <p className="text-xs text-gray-400">{mentor.role}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-yellow-400 text-xs">★★★★★</span>
                            <span className="text-xs text-gray-500">{mentor.rating} ({mentor.reviews})</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => router.push('/members')}
                          className="px-3 py-1.5 text-xs bg-vybe-purple/20 text-vybe-purple-light hover:bg-vybe-purple hover:text-white rounded transition-colors"
                        >
                          View
                        </button>
                      </div>
                    </GlassCard>
                  ))}
                  
                  <div className="text-center mt-4">
                    <Link href="/members" className="text-sm text-vybe-purple-light hover:text-vybe-pink transition-colors">
                      Browse all mentors →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Reality Check Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-4xl font-light mb-12 text-center">
                Yes, AI Can Be <GradientText gradient="title">Frustrating</GradientText>
              </h3>
              <div className="py-2">
                <p className="text-lg text-gray-300 mb-8 text-center">I know what you're thinking...</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-vybe-purple/20 flex-shrink-0 mt-0.5 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-vybe-purple"></div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-100 mb-1">"But AI hallucinates!"</h4>
                      <p className="text-sm text-gray-400">True. AI will confidently invent APIs and "solutions" that don't exist. We'll show you how to catch and prevent this.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-vybe-pink/20 flex-shrink-0 mt-0.5 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-vybe-pink"></div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-100 mb-1">"It's just toxic positivity!"</h4>
                      <p className="text-sm text-gray-400">Also true. Getting honest feedback from AI is hard. Our workflows teach you how to get critical, useful responses.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-vybe-orange/20 flex-shrink-0 mt-0.5 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-vybe-orange"></div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-100 mb-1">"All AI sites look the same!"</h4>
                      <p className="text-sm text-gray-400">Yes, including ours. AI works best with familiar patterns it's trained on. Learn how to add unique touches while keeping AI-friendly foundations.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-800/20 flex-shrink-0 mt-0.5 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-red-800"></div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-100 mb-1">"It breaks with complex logic!"</h4>
                      <p className="text-sm text-gray-400">Multi-step workflows and intricate business logic confuse AI. We'll teach you how to break down complexity into AI-digestible chunks.</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mt-8 text-center">
                  <span className="text-vybe-pink font-medium">These challenges are real, but they're solvable.</span> 
                  That's why our guides focus on practical workflows that actually work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Everything You Need Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-4xl font-light mb-12 text-center">
              Everything You Need to <GradientText gradient="title">Succeed with AI</GradientText>
            </h3>
            
            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              <GlassCard className="p-5" glow="purple">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 bg-vybe-purple/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📝</span>
                  </div>
                  <h4 className="text-lg font-medium text-white">Create & Share</h4>
                </div>
                <p className="text-sm text-gray-400">Build and share your AI workflows, apps, and learnings with the community</p>
              </GlassCard>

              <GlassCard className="p-5" glow="pink">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 bg-vybe-pink/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h4 className="text-lg font-medium text-white">Showcase Apps</h4>
                </div>
                <p className="text-sm text-gray-400">Display your AI-powered projects and get feedback from experienced developers</p>
              </GlassCard>

              <GlassCard className="p-5" glow="orange">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 bg-vybe-orange/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🧑‍🏫</span>
                  </div>
                  <h4 className="text-lg font-medium text-white">Learn from Mentors</h4>
                </div>
                <p className="text-sm text-gray-400">Book 1-on-1 sessions with AI experts who've shipped production apps</p>
              </GlassCard>
            </div>
          </div>
        </section>
    </main>
  );
}