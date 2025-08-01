'use client'

import React, { useState } from 'react'
import { Calendar, ExternalLink, Search, Filter, Book, Code, Palette, Database } from 'lucide-react'

export default function LicensesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Licenses', icon: Book },
    { id: 'frontend', name: 'Frontend Libraries', icon: Code },
    { id: 'backend', name: 'Backend Services', icon: Database },
    { id: 'design', name: 'Design Assets', icon: Palette }
  ]

  const licenses = [
    {
      name: 'React',
      version: '18.2.0',
      license: 'MIT',
      category: 'frontend',
      description: 'A JavaScript library for building user interfaces',
      website: 'https://reactjs.org',
      repository: 'https://github.com/facebook/react'
    },
    {
      name: 'Next.js',
      version: '14.0.0',
      license: 'MIT',
      category: 'frontend',
      description: 'The React Framework for Production',
      website: 'https://nextjs.org',
      repository: 'https://github.com/vercel/next.js'
    },
    {
      name: 'TypeScript',
      version: '5.2.2',
      license: 'Apache-2.0',
      category: 'frontend',
      description: 'TypeScript is a language for application-scale JavaScript',
      website: 'https://www.typescriptlang.org',
      repository: 'https://github.com/microsoft/TypeScript'
    },
    {
      name: 'Tailwind CSS',
      version: '3.3.5',
      license: 'MIT',
      category: 'frontend',
      description: 'A utility-first CSS framework',
      website: 'https://tailwindcss.com',
      repository: 'https://github.com/tailwindlabs/tailwindcss'
    },
    {
      name: 'Lucide React',
      version: '0.290.0',
      license: 'ISC',
      category: 'design',
      description: 'Beautiful & consistent icon toolkit made by the community',
      website: 'https://lucide.dev',
      repository: 'https://github.com/lucide-icons/lucide'
    },
    {
      name: 'Convex',
      version: '1.6.1',
      license: 'Commercial',
      category: 'backend',
      description: 'The backend application platform with everything you need',
      website: 'https://convex.dev',
      repository: 'https://github.com/get-convex/convex-js'
    },
    {
      name: 'Clerk',
      version: '4.27.2',
      license: 'Commercial',
      category: 'backend',
      description: 'User management and authentication',
      website: 'https://clerk.com',
      repository: 'https://github.com/clerkinc/javascript'
    },
    {
      name: 'Framer Motion',
      version: '10.16.4',
      license: 'MIT',
      category: 'frontend',
      description: 'A production-ready motion library for React',
      website: 'https://www.framer.com/motion',
      repository: 'https://github.com/framer/motion'
    },
    {
      name: 'Radix UI',
      version: '1.0.4',
      license: 'MIT',
      category: 'frontend',
      description: 'Unstyled, accessible components for React',
      website: 'https://www.radix-ui.com',
      repository: 'https://github.com/radix-ui/primitives'
    },
    {
      name: 'Zod',
      version: '3.22.4',
      license: 'MIT',
      category: 'backend',
      description: 'TypeScript-first schema validation with static type inference',
      website: 'https://zod.dev',
      repository: 'https://github.com/colinhacks/zod'
    }
  ]

  const filteredLicenses = licenses.filter(license => {
    const matchesSearch = searchTerm === '' || 
      license.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || license.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getLicenseColor = (license: string) => {
    switch (license) {
      case 'MIT':
        return 'bg-green-500/20 text-green-400'
      case 'Apache-2.0':
        return 'bg-blue-500/20 text-blue-400'
      case 'ISC':
        return 'bg-purple-500/20 text-purple-400'
      case 'Commercial':
        return 'bg-orange-500/20 text-orange-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const licenseDetails = {
    'MIT': {
      fullName: 'MIT License',
      description: 'A permissive license that allows for reuse with minimal restrictions.',
      permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use'],
      limitations: ['Liability', 'Warranty']
    },
    'Apache-2.0': {
      fullName: 'Apache License 2.0',
      description: 'A permissive license that also provides patent protection.',
      permissions: ['Commercial use', 'Modification', 'Distribution', 'Patent use', 'Private use'],
      limitations: ['Liability', 'Trademark use', 'Warranty']
    },
    'ISC': {
      fullName: 'ISC License',
      description: 'Similar to MIT but with simplified language.',
      permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use'],
      limitations: ['Liability', 'Warranty']
    },
    'Commercial': {
      fullName: 'Commercial License',
      description: 'Proprietary license with terms specific to each vendor.',
      permissions: ['Usage as per agreement'],
      limitations: ['Terms vary by vendor']
    }
  }

  return (
    <div className="py-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Open Source Licenses</h1>
        <p className="text-xl text-vybe-gray-300 max-w-3xl mx-auto">
          Vybe Coding is built with amazing open source libraries and tools. This page acknowledges and provides license information for all third-party software we use.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(138, 43, 226, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(138, 43, 226, 0.08))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)'}}>
          <h2 className="text-xl font-bold text-white">Search Licenses</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-vybe-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search libraries, licenses, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-vybe-gray-800 border border-vybe-gray-700 rounded-lg text-white placeholder-vybe-gray-400 focus:border-vybe-purple focus:ring-1 focus:ring-vybe-purple"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                    selectedCategory === category.id
                      ? 'bg-vybe-purple/20 text-vybe-purple border border-vybe-purple/30'
                      : 'bg-vybe-gray-800 text-vybe-gray-300 hover:bg-vybe-gray-700 hover:text-white border border-vybe-gray-700'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* License List */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(217, 70, 160, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(217, 70, 160, 0.2), rgba(217, 70, 160, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h2 className="text-xl font-bold text-white">
            Third-Party Licenses
            <span className="text-sm text-vybe-gray-300 ml-2">
              ({filteredLicenses.length} {filteredLicenses.length === 1 ? 'license' : 'licenses'})
            </span>
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {filteredLicenses.map((license, index) => (
              <div key={index} className="p-4 bg-vybe-gray-800/30 rounded-lg border border-vybe-gray-700/50">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{license.name}</h3>
                      <span className="text-sm text-vybe-gray-400">v{license.version}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLicenseColor(license.license)}`}>
                        {license.license}
                      </span>
                    </div>
                    <p className="text-vybe-gray-300 text-sm mb-3">{license.description}</p>
                    <div className="flex flex-wrap gap-3">
                      <a 
                        href={license.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-vybe-purple hover:text-vybe-pink transition-colors text-sm"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Website
                      </a>
                      <a 
                        href={license.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-vybe-purple hover:text-vybe-pink transition-colors text-sm"
                      >
                        <Code className="w-3 h-3" />
                        Repository
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* License Information */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(233, 107, 58, 0.4)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(233, 107, 58, 0.2), rgba(233, 107, 58, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h2 className="text-xl font-bold text-white">License Information</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(licenseDetails).map(([licenseKey, details]) => (
              <div key={licenseKey} className="p-4 bg-vybe-gray-800/30 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLicenseColor(licenseKey)}`}>
                    {licenseKey}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{details.fullName}</h3>
                </div>
                <p className="text-vybe-gray-300 text-sm mb-4">{details.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-white font-medium text-sm mb-2">Permissions</h4>
                    <div className="flex flex-wrap gap-1">
                      {details.permissions.map((permission, index) => (
                        <span key={index} className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium text-sm mb-2">Limitations</h4>
                    <div className="flex flex-wrap gap-1">
                      {details.limitations.map((limitation, index) => (
                        <span key={index} className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">
                          {limitation}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attribution */}
      <div className="vybe-card overflow-hidden">
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(217, 70, 160, 0.2), rgba(233, 107, 58, 0.2))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h2 className="text-xl font-bold text-white">Attribution & Acknowledgments</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <p className="text-vybe-gray-300">
              We are grateful to the open source community and all the contributors who make these amazing tools available. 
              Without their work, Vybe Coding would not be possible.
            </p>
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h3 className="text-blue-400 font-medium text-sm mb-2">Complete License Texts</h3>
              <p className="text-vybe-gray-300 text-sm mb-3">
                Full license texts for all dependencies are available in our source code repository and can be accessed programmatically.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="https://github.com/vybecoding/platform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm font-medium"
                >
                  <Code className="w-4 h-4" />
                  View Source Code
                </a>
                <button className="flex items-center gap-2 px-4 py-2 bg-vybe-gray-700 text-white rounded-lg hover:bg-vybe-gray-600 transition-colors text-sm font-medium">
                  <ExternalLink className="w-4 h-4" />
                  Download License Archive
                </button>
              </div>
            </div>
            
            <div className="text-center pt-4">
              <p className="text-vybe-gray-400 text-sm">
                Last updated: <span className="text-white">January 15, 2024</span>
              </p>
              <p className="text-vybe-gray-400 text-sm mt-1">
                If you notice any license information that needs updating, please <a href="/support" className="text-vybe-purple hover:text-vybe-pink transition-colors">contact us</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}