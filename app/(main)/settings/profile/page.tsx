'use client'

import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { Plus, X, ChevronDown, Info, Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Skill {
  name: string
  color: string
}

export default function SettingsProfilePage() {
  const { user } = useUser()
  
  // Profile form state
  const [realName, setRealName] = useState('Alex Developer')
  const [username, setUsername] = useState('alexdev')
  const [discordName, setDiscordName] = useState('alexdev#1234')
  const [title, setTitle] = useState('')
  const [industry, setIndustry] = useState('')
  const [aboutMe, setAboutMe] = useState('With over 8 years of experience in full-stack development, I specialize in building scalable web applications and mentoring developers. I\'ve worked with startups and established companies to create robust, modern applications using the latest AI technologies and best practices.')
  const [displayPreference, setDisplayPreference] = useState<'real-name' | 'username'>('real-name')
  const [showSkillDropdown, setShowSkillDropdown] = useState(false)
  const [skillSearch, setSkillSearch] = useState('')
  
  // Social links
  const [githubUrl, setGithubUrl] = useState('https://github.com/alexdev')
  const [linkedinUrl, setLinkedinUrl] = useState('https://linkedin.com/in/alexdev')
  const [youtubeUrl, setYoutubeUrl] = useState('https://youtube.com/@alexdev')
  
  // Skills state
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([
    { name: 'React & Next.js', color: 'purple' },
    { name: 'Node.js', color: 'green' },
    { name: 'TypeScript', color: 'blue' },
    { name: 'System Design', color: 'amber' },
    { name: 'AI Integration', color: 'red' },
    { name: 'MongoDB', color: 'teal' }
  ])
  
  // Available skills organized by category
  const availableSkills = {
    Frontend: [
      { name: 'React', color: 'purple' },
      { name: 'React & Next.js', color: 'purple' },
      { name: 'Vue.js', color: 'green' },
      { name: 'Angular', color: 'red' },
      { name: 'Svelte', color: 'orange' }
    ],
    Backend: [
      { name: 'Node.js', color: 'green' },
      { name: 'Python', color: 'blue' },
      { name: 'Ruby on Rails', color: 'red' },
      { name: 'Java', color: 'orange' },
      { name: 'PHP', color: 'purple' }
    ],
    Languages: [
      { name: 'TypeScript', color: 'blue' },
      { name: 'JavaScript', color: 'yellow' },
      { name: 'Go', color: 'teal' },
      { name: 'Rust', color: 'orange' }
    ],
    Databases: [
      { name: 'MongoDB', color: 'teal' },
      { name: 'PostgreSQL', color: 'blue' },
      { name: 'MySQL', color: 'orange' },
      { name: 'Redis', color: 'red' }
    ],
    Other: [
      { name: 'AI Integration', color: 'red' },
      { name: 'System Design', color: 'amber' },
      { name: 'DevOps', color: 'green' },
      { name: 'Cloud Services', color: 'blue' },
      { name: 'Machine Learning', color: 'purple' }
    ]
  }

  const professionalTitles = [
    { label: 'Leave blank', value: '' },
    { label: 'Vibe Coder', value: 'Vibe Coder' },
    { label: 'Junior Developer', value: 'Junior Developer' },
    { label: 'Developer', value: 'Developer' },
    { label: 'Senior Developer', value: 'Senior Developer' },
    { label: 'Lead Developer', value: 'Lead Developer' },
    { label: 'Staff Engineer', value: 'Staff Engineer' },
    { label: 'Principal Engineer', value: 'Principal Engineer' },
    { label: 'Software Architect', value: 'Software Architect' },
    { label: 'Engineering Manager', value: 'Engineering Manager' },
    { label: 'Technical Lead', value: 'Technical Lead' },
    { label: 'Full-Stack Developer', value: 'Full-Stack Developer' },
    { label: 'Frontend Developer', value: 'Frontend Developer' },
    { label: 'Backend Developer', value: 'Backend Developer' },
    { label: 'AI Engineer', value: 'AI Engineer' },
    { label: 'ML Engineer', value: 'ML Engineer' },
    { label: 'Data Engineer', value: 'Data Engineer' },
    { label: 'CTO', value: 'CTO' },
    { label: 'VP of Engineering', value: 'VP of Engineering' },
    { label: 'Founder', value: 'Founder' },
    { label: 'Co-Founder', value: 'Co-Founder' },
    { label: 'Consultant', value: 'Consultant' },
    { label: 'Freelancer', value: 'Freelancer' }
  ]

  const industries = [
    { label: 'Select your industry...', value: '' },
    { label: 'Leave blank', value: '' },
    { label: 'Vibe Coding', value: 'Vibe Coding' },
    { label: 'SaaS / Tech', value: 'SaaS / Tech' },
    { label: 'AI / ML', value: 'AI / ML' },
    { label: 'Fintech', value: 'Fintech' },
    { label: 'Healthtech', value: 'Healthtech' },
    { label: 'Edtech', value: 'Edtech' },
    { label: 'E-commerce', value: 'E-commerce' },
    { label: 'Gaming', value: 'Gaming' },
    { label: 'Blockchain / Web3', value: 'Blockchain / Web3' },
    { label: 'Cybersecurity', value: 'Cybersecurity' },
    { label: 'Data Science', value: 'Data Science' }
  ]

  const getDisplayName = () => {
    if (displayPreference === 'real-name' && realName.trim()) {
      return realName
    }
    return `@${username}`
  }

  const getSkillColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      purple: 'bg-vybe-purple/10 border-vybe-purple/20 text-vybe-purple-light',
      blue: 'bg-blue-500/10 border-blue-500/20 text-blue-300',
      green: 'bg-green-500/10 border-green-500/20 text-green-300',
      red: 'bg-red-500/10 border-red-500/20 text-red-300',
      orange: 'bg-orange-500/10 border-orange-500/20 text-orange-300',
      yellow: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300',
      teal: 'bg-teal-500/10 border-teal-500/20 text-teal-300',
      amber: 'bg-amber-500/10 border-amber-500/20 text-amber-300'
    }
    return colorMap[color] || 'bg-vybe-purple/10 border-vybe-purple/20 text-vybe-purple-light'
  }

  const toggleSkill = (skill: Skill) => {
    const isSelected = selectedSkills.some(s => s.name === skill.name)
    if (isSelected) {
      setSelectedSkills(prev => prev.filter(s => s.name !== skill.name))
    } else {
      setSelectedSkills(prev => [...prev, skill])
    }
  }

  const removeSkill = (skillName: string) => {
    setSelectedSkills(prev => prev.filter(s => s.name !== skillName))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would save the profile data
    console.log('Profile saved:', {
      realName,
      username,
      discordName,
      title,
      industry,
      aboutMe,
      displayPreference,
      selectedSkills,
      socialLinks: { githubUrl, linkedinUrl, youtubeUrl }
    })
    alert('Profile saved successfully!')
  }

  const simulateClearNamesAndSave = () => {
    setRealName('')
    setDisplayPreference('username')
    alert('Demo: Names cleared and display preference changed to username!')
  }

  const filteredSkills = Object.entries(availableSkills).reduce((acc, [category, skills]) => {
    const filtered = skills.filter(skill => 
      skill.name.toLowerCase().includes(skillSearch.toLowerCase())
    )
    if (filtered.length > 0) {
      (acc as any)[category] = filtered
    }
    return acc
  }, {} as typeof availableSkills)

  return (
    <div className="py-6 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link href="/dashboard/settings" className="text-vybe-gray-400 hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Settings
        </Link>
        <span className="text-vybe-gray-600">/</span>
        <span className="text-white">Profile</span>
      </div>
      
      {/* Profile Settings Section */}
      <div className="vybe-card overflow-hidden">
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(217, 70, 160, 0.2), rgba(233, 107, 58, 0.2))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h3 className="text-base font-semibold text-white">Profile Settings</h3>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Simple Inputs */}
              <div className="space-y-6">
                <div>
                  <label className="form-label">Real Name <span className="text-xs text-vybe-gray-400">(Optional)</span></label>
                  <input 
                    type="text" 
                    value={realName}
                    onChange={(e) => setRealName(e.target.value)}
                    className="form-input w-full px-4 py-2 rounded-lg" 
                    placeholder="Your real name"
                  />
                  <p className="text-xs text-vybe-gray-400 mt-1">Leave blank to use username instead</p>
                </div>

                <div>
                  <label className="form-label">Username</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-input w-full px-4 py-2 rounded-lg" 
                    placeholder="username"
                  />
                  <p className="text-xs text-vybe-gray-400 mt-1">Your public username (shown as @{username})</p>
                </div>
                
                <div>
                  <label className="form-label">Discord Name</label>
                  <input 
                    type="text" 
                    value={discordName}
                    onChange={(e) => setDiscordName(e.target.value)}
                    className="form-input w-full px-4 py-2 rounded-lg" 
                    placeholder="username#1234"
                  />
                  <p className="text-xs text-vybe-gray-400 mt-1">Your Discord username and tag for community connections</p>
                </div>
                
                <div>
                  <label className="form-label">Professional Title</label>
                  <div className="relative">
                    <select 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="form-select w-full px-4 py-2 rounded-lg appearance-none cursor-pointer"
                    >
                      <option value="">Select your title...</option>
                      {professionalTitles.map((titleOption) => (
                        <option key={titleOption.value} value={titleOption.value}>
                          {titleOption.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown className="w-4 h-4 text-vybe-gray-400" />
                    </div>
                  </div>
                  <p className="text-xs text-vybe-gray-400 mt-1">Your professional title shown on your profile</p>
                </div>

                <div>
                  <label className="form-label">Industry/Focus</label>
                  <div className="relative">
                    <select 
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="form-select w-full px-4 py-2 rounded-lg appearance-none cursor-pointer"
                    >
                      {industries.map((industryOption) => (
                        <option key={industryOption.value} value={industryOption.value}>
                          {industryOption.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown className="w-4 h-4 text-vybe-gray-400" />
                    </div>
                  </div>
                  <p className="text-xs text-vybe-gray-400 mt-1">Your primary industry or area of focus</p>
                </div>
                
                {/* About Me */}
                <div>
                  <label className="form-label">About Me</label>
                  <textarea 
                    value={aboutMe}
                    onChange={(e) => setAboutMe(e.target.value)}
                    className="form-textarea w-full px-4 py-2 rounded-lg h-40" 
                    placeholder="Tell us about yourself, your background, and what you're passionate about..."
                  />
                  <p className="text-xs text-vybe-gray-400 mt-1">This will be displayed on your public profile</p>
                </div>
              </div>
              
              {/* Right Column: Complex Elements */}
              <div className="space-y-6">
                {/* Profile Photo */}
                <div>
                  <label className="form-label">Profile Photo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-vybe-purple to-vybe-orange rounded-full flex items-center justify-center text-2xl font-bold text-white">
                      AD
                    </div>
                    <button type="button" className="btn btn-secondary">
                      Change Photo
                    </button>
                  </div>
                </div>
                
                {/* Profile Display Preference */}
                <div>
                  <label className="form-label">Profile Display Preference</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="display-preference" 
                        value="real-name" 
                        checked={displayPreference === 'real-name'}
                        onChange={(e) => setDisplayPreference(e.target.value as 'real-name' | 'username')}
                        className="text-vybe-purple-light focus:ring-vybe-purple"
                      />
                      <div>
                        <span className="text-sm">Show real name when available</span>
                        <p className="text-xs text-vybe-gray-400">
                          Display: <span className="text-white">{realName || '@' + username}</span>
                        </p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="display-preference" 
                        value="username" 
                        checked={displayPreference === 'username'}
                        onChange={(e) => setDisplayPreference(e.target.value as 'real-name' | 'username')}
                        className="text-vybe-purple-light focus:ring-vybe-purple"
                      />
                      <div>
                        <span className="text-sm">Always show username</span>
                        <p className="text-xs text-vybe-gray-400">
                          Display: <span className="text-white">@{username}</span>
                        </p>
                      </div>
                    </label>
                  </div>
                  <p className="text-xs text-vybe-gray-400 mt-2">Choose how your name appears on your public profile</p>
                </div>
                
                {/* Core Expertise */}
                <div>
                  <label className="form-label">Core Expertise</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedSkills.map((skill) => (
                      <div 
                        key={skill.name} 
                        className={cn(
                          "rounded px-3 py-1.5 flex items-center gap-1.5 border",
                          getSkillColorClasses(skill.color)
                        )}
                      >
                        <span className="text-xs">{skill.name}</span>
                        <button 
                          type="button" 
                          onClick={() => removeSkill(skill.name)}
                          className="hover:text-red-300 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Add/Remove Button with Dropdown */}
                  <div className="relative">
                    <button 
                      type="button" 
                      onClick={() => setShowSkillDropdown(!showSkillDropdown)}
                      className="btn btn-secondary text-sm"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add/Remove Skills
                    </button>
                    
                    {/* Dropdown Menu */}
                    {showSkillDropdown && (
                      <div className="absolute left-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                        <div className="p-3 border-b border-gray-700">
                          <input 
                            type="text" 
                            placeholder="Search skills..." 
                            value={skillSearch}
                            onChange={(e) => setSkillSearch(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm text-white placeholder-gray-400 focus:outline-none focus:border-vybe-purple"
                          />
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                          <div className="p-2 space-y-1">
                            {Object.entries(filteredSkills).map(([category, skills]) => (
                              <div key={category}>
                                <div className="text-xs text-gray-500 px-2 py-1 font-semibold">{category}</div>
                                {skills.map((skill) => {
                                  const isSelected = selectedSkills.some(s => s.name === skill.name)
                                  return (
                                    <div 
                                      key={skill.name}
                                      className={cn(
                                        "px-3 py-2 hover:bg-gray-700 rounded cursor-pointer text-sm",
                                        isSelected && "bg-vybe-purple/20 text-vybe-purple"
                                      )}
                                      onClick={() => toggleSkill(skill)}
                                    >
                                      {skill.name} {isSelected && '✓'}
                                    </div>
                                  )
                                })}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <p className="text-xs text-vybe-gray-400 mt-2">Add or remove skills that represent your expertise</p>
                  </div>
                </div>
                
                {/* Social Links */}
                <div>
                  <label className="form-label">Social Links</label>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <input 
                        type="url" 
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        className="form-input flex-1 px-4 py-2 rounded-lg" 
                        placeholder="GitHub URL"
                      />
                      <button type="button" className="px-4 py-2 text-vybe-gray-400 hover:text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </button>
                    </div>
                    <div className="flex gap-3">
                      <input 
                        type="url" 
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        className="form-input flex-1 px-4 py-2 rounded-lg" 
                        placeholder="LinkedIn URL"
                      />
                      <button type="button" className="px-4 py-2 text-vybe-gray-400 hover:text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </button>
                    </div>
                    <div className="flex gap-3">
                      <input 
                        type="url" 
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        className="form-input flex-1 px-4 py-2 rounded-lg" 
                        placeholder="YouTube URL"
                      />
                      <button type="button" className="px-4 py-2 text-vybe-gray-400 hover:text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-vybe-gray-400 mt-1">Add your social media profiles</p>
                </div>
              </div>
            </div>
            
            {/* Demo Privacy Controls */}
            <div className="bg-vybe-gray-800/30 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-vybe-orange" />
                Demo: Privacy Controls
              </h4>
              <p className="text-xs text-vybe-gray-400 mb-3">Click the button below to see what happens when First Name and Last Name are removed and changes are saved:</p>
              <button 
                type="button"
                onClick={simulateClearNamesAndSave}
                className="px-4 py-2 bg-vybe-orange/20 border border-vybe-orange/30 rounded-lg text-vybe-orange hover:bg-vybe-orange/30 transition-colors text-sm"
              >
                Clear Names & Save Demo
              </button>
            </div>
            
            <div className="flex gap-4">
              <button type="submit" className="btn btn-primary-fuchsia flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
              <Link href="/dashboard/settings" className="btn btn-secondary">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}