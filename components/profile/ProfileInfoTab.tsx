"use client";

import React from "react";
import { Star, Github, Linkedin, Youtube } from "lucide-react";

interface ProfileInfoTabProps {
  user: any; // Replace with proper user type
  isOwnProfile: boolean;
}

export function ProfileInfoTab({ user, isOwnProfile }: ProfileInfoTabProps) {
  // Mock data that matches the demo
  const mockUser = {
    name: "Alex Developer",
    username: "alexdev", 
    tier: "PRO",
    title: "Senior Developer",
    industry: "SaaS / Tech",
    about: "With over 8 years of experience in full-stack development, I specialize in building scalable web applications and mentoring developers. I've worked with startups and established companies to create robust, modern applications using the latest AI technologies and best practices.",
    skills: [
      { name: "React & Next.js", color: "purple" },
      { name: "Node.js", color: "vybe-purple" },
      { name: "TypeScript", color: "vybe-purple" },
      { name: "System Design", color: "amber" },
      { name: "AI Integration", color: "vybe-purple" },
      { name: "MongoDB", color: "vybe-purple" }
    ],
    socialLinks: {
      discord: "https://discord.com/users/alexdev#1234",
      github: "#",
      linkedin: "#", 
      youtube: "#"
    }
  };

  const getSkillColorClasses = (color: string) => {
    switch (color) {
      case 'purple':
        return 'bg-purple-500/10 border-purple-500/20 text-purple-300';
      case 'amber':
        return 'bg-amber-500/10 border-amber-500/20 text-amber-300';
      case 'vybe-purple':
      default:
        return 'bg-vybe-purple/10 border-vybe-purple/20 text-vybe-purple-light';
    }
  };

  const getSkillDotColor = (color: string) => {
    switch (color) {
      case 'purple':
        return 'bg-purple-400';
      case 'amber':
        return 'bg-amber-400';
      case 'vybe-purple':
      default:
        return 'bg-vybe-purple-light';
    }
  };

  return (
    <div className="profile-tab-content">
      <div className="max-w-6xl mx-auto">
        <div className="vybe-card p-8">
          {/* Profile Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-vybe-purple to-vybe-orange rounded-full flex items-center justify-center text-white font-bold text-lg">
                    AD
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-medium">{mockUser.name}</h1>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-vybe-pink/20 text-vybe-pink rounded-full text-xs">
                        {mockUser.tier}
                      </span>
                    </div>
                    <p className="text-vybe-gray-500 text-sm">
                      @{mockUser.username} • {mockUser.title} • {mockUser.industry}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Profile Actions - Moved to top right */}
              <div className="flex gap-3 flex-shrink-0">
                <button className="btn btn-secondary w-36">
                  Follow
                </button>
                <button className="btn btn-secondary w-36">
                  Message
                </button>
              </div>
            </div>
            
            {/* About Me Section - Now full width */}
            <div className="mt-6">
              <h4 className="vybe-section-header mb-3">
                <div className="vybe-gradient-accent-bar"></div>
                About Me
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {mockUser.about}
              </p>
            </div>
            
            {/* Core Expertise - Now full width */}
            <div className="mt-6">
              <h4 className="vybe-section-header mb-3">
                <div className="vybe-gradient-accent-bar"></div>
                Core Expertise
              </h4>
              <div className="flex flex-wrap gap-2">
                {mockUser.skills.map((skill, index) => (
                  <div 
                    key={index}
                    className={`${getSkillColorClasses(skill.color)} border rounded px-3 py-1.5 flex items-center gap-1.5 whitespace-nowrap`}
                  >
                    <div className={`w-1.5 h-1.5 ${getSkillDotColor(skill.color)} rounded-full flex-shrink-0`}></div>
                    <span className="text-xs">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Social Links - Now below Core Expertise */}
            <div className="mt-6">
              <h4 className="vybe-section-header mb-3">
                <div className="vybe-gradient-accent-bar"></div>
                Social Links
              </h4>
              <div className="flex gap-4">
                {/* Discord */}
                <a 
                  href={mockUser.socialLinks.discord} 
                  className="text-vybe-gray-400 hover:text-white transition-colors" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                  </svg>
                </a>
                {/* GitHub */}
                <a href={mockUser.socialLinks.github} className="text-vybe-gray-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                {/* LinkedIn */}
                <a href={mockUser.socialLinks.linkedin} className="text-vybe-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                {/* YouTube */}
                <a href={mockUser.socialLinks.youtube} className="text-vybe-gray-400 hover:text-white transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}