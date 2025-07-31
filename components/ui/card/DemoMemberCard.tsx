'use client'

import React from 'react'
import { Star, BookOpen, Monitor } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Member } from '@/types/members'

interface DemoMemberCardProps {
  member: Member
  onClick?: () => void
  className?: string
}

export const DemoMemberCard: React.FC<DemoMemberCardProps> = ({
  member,
  onClick,
  className
}) => {
  const isMentor = member.isMentor || member.isTopMentor

  return (
    <div
      onClick={onClick}
      className={cn(
        // Base card styles matching demo exactly
        "relative rounded-lg transition-all group cursor-pointer overflow-hidden z-10",
        "p-4 pb-2",
        // Background and backdrop filter from demo
        "[background:rgba(26,26,26,0.8)] [backdrop-filter:blur(10px)] [-webkit-backdrop-filter:blur(10px)]",
        // Border styling - mentor cards have special border
        isMentor 
          ? "border border-[rgba(217,70,160,0.3)]" 
          : "border border-[rgba(51,51,51,0.4)]",
        // Shadow from demo
        "[box-shadow:0_4px_12px_rgba(0,0,0,0.15)]",
        // Hover effects
        "hover:translate-y-[-2px] hover:[box-shadow:0_8px_24px_rgba(0,0,0,0.2)]",
        className
      )}
    >
      {/* Type Label - MEMBER badge in top left */}
      <div
        className="absolute top-0 left-0 z-20"
        style={{
          background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.5625), rgba(236, 72, 153, 0.5625))',
          padding: '0.375rem 0.5rem',
          paddingTop: '0.5rem',
          color: 'rgba(255, 255, 255, 1)',
          fontSize: '0.844rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          borderRadius: '0 0 0.625rem 0',
          lineHeight: 1,
          boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
          letterSpacing: '0.25px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'auto'
        }}
      >
        MEMBER
      </div>

      {/* Title */}
      <h3 className="text-lg font-medium text-white mb-2 mt-8">
        {member.title}
      </h3>

      {/* Profile section - Avatar, username, tier */}
      <div className="flex items-center gap-2 mb-3">
        {/* Avatar - circular with initials */}
        <div className="w-6 h-6 bg-gradient-to-br from-vybe-purple to-vybe-pink rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-medium">
          {member.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase()}
        </div>
        
        {/* Username and tier badge */}
        <span className="text-sm text-vybe-gray-400">
          @{member.username}
          <span className="px-2 py-0.5 bg-vybe-pink/20 text-vybe-pink text-xs rounded-full font-medium ml-1">
            {member.tier}
          </span>
        </span>
      </div>

      {/* Stats - guides and apps */}
      <div className="flex items-center gap-4 text-sm mb-3">
        {/* Guides stat */}
        <div className="flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-vybe-purple-light" strokeWidth={2} />
          <span className="font-medium text-white">{member.stats.guides}</span>
          <span className="text-vybe-gray-500">guides</span>
        </div>
        
        <span className="text-vybe-gray-500">•</span>
        
        {/* Apps stat */}
        <div className="flex items-center gap-1.5">
          <Monitor className="w-4 h-4 text-vybe-orange" strokeWidth={2} />
          <span className="font-medium text-white">{member.stats.apps}</span>
          <span className="text-vybe-gray-500">apps</span>
        </div>
      </div>

      {/* Bio/Description */}
      <p className="text-sm text-vybe-gray-400 mb-3 leading-relaxed">
        {member.bio}
      </p>

      {/* Skills/Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {/* Special top mentor tag */}
        {member.isTopMentor && (
          <span className="px-2 py-1 bg-vybe-purple/20 border border-vybe-purple/30 text-vybe-purple-light text-xs rounded font-medium animate-pulse">
            🏆 Top Mentor
          </span>
        )}
        
        {/* Regular skill tags */}
        {member.skills.slice(0, member.isTopMentor ? 2 : 3).map((skill, index) => {
          // Cycle through brand colors for skills
          const colorClasses = [
            'bg-vybe-orange/10 border-vybe-orange/20 text-vybe-orange',
            'bg-vybe-pink/10 border-vybe-pink/20 text-vybe-pink',
            'bg-vybe-purple/10 border-vybe-purple/20 text-vybe-purple-light'
          ]
          const colorClass = colorClasses[index % colorClasses.length]
          
          return (
            <span 
              key={skill}
              className={cn("px-2 py-1 text-xs rounded border", colorClass)}
            >
              {skill}
            </span>
          )
        })}
      </div>

      {/* Mentor status - only for mentors */}
      {isMentor && (
        <div className="flex items-center justify-between pt-3 border-t border-vybe-gray-800/50 mt-auto">
          <div className="flex items-center gap-1 text-amber-500 text-xs">
            {/* Graduation cap icon */}
            <svg className="w-3 h-3 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            <span>Mentor</span>
            <span>•</span>
            
            {/* Star rating */}
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>{member.mentorRating} ({member.mentorReviews})</span>
          </div>
        </div>
      )}

      {/* Non-mentor cards get bottom padding instead */}
      {!isMentor && (
        <div className="pb-4" />
      )}
    </div>
  )
}