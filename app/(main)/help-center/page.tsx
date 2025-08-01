'use client'

import React, { useState } from 'react'
import { Search, HelpCircle, BookOpen, MessageSquare, Settings, CreditCard, User, ChevronRight, ExternalLink } from 'lucide-react'

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', name: 'All Topics', icon: HelpCircle },
    { id: 'getting-started', name: 'Getting Started', icon: BookOpen },
    { id: 'content', name: 'Content & Guides', icon: MessageSquare },
    { id: 'account', name: 'Account & Profile', icon: User },
    { id: 'billing', name: 'Billing & Payments', icon: CreditCard },
    { id: 'technical', name: 'Technical Issues', icon: Settings }
  ]

  const faqs = [
    {
      category: 'getting-started',
      question: 'How do I get started with Vybe Coding?',
      answer: 'Create a free account, complete your profile, and start browsing our AI guides and apps. We recommend starting with our "AI Fundamentals" guide series.'
    },
    {
      category: 'getting-started',
      question: 'What makes Vybe Coding different from other learning platforms?',
      answer: 'We focus exclusively on practical AI development with real code examples, community-driven content, and direct access to working applications you can study and modify.'
    },
    {
      category: 'content',
      question: 'How do I submit a guide or app?',
      answer: 'Navigate to the submission page from your dashboard. All content goes through our quality review process to ensure it meets our standards for practical, working examples.'
    },
    {
      category: 'content',
      question: 'What are the content quality standards?',
      answer: 'Content must include working code, clear explanations, practical applications, and be tested for accuracy. We also require proper documentation and example usage.'
    },
    {
      category: 'content',
      question: 'How long does the review process take?',
      answer: 'Most submissions are reviewed within 48-72 hours. Complex submissions may take up to a week. You\'ll receive detailed feedback regardless of approval status.'
    },
    {
      category: 'account',
      question: 'How do I update my profile information?',
      answer: 'Go to Dashboard > Profile Settings. You can update your bio, skills, social links, and display preferences. Changes are saved automatically.'
    },
    {
      category: 'account',
      question: 'Can I change my username?',
      answer: 'Usernames can be changed once every 30 days. Go to Account Settings and click "Change Username". Your old username will be reserved for 7 days.'
    },
    {
      category: 'account',
      question: 'How do I delete my account?',
      answer: 'Account deletion is permanent and cannot be undone. Go to Privacy Settings > Data Management > Delete Account. You\'ll have 14 days to cancel the deletion.'
    },
    {
      category: 'billing',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through Stripe.'
    },
    {
      category: 'billing',
      question: 'How do payouts work for creators?',
      answer: 'Payouts are processed weekly with a minimum balance of $50. You\'ll need to complete tax information and connect a bank account or PayPal.'
    },
    {
      category: 'billing',
      question: 'Can I get a refund?',
      answer: 'We offer full refunds within 14 days of purchase for guides and apps. Mentorship sessions have a 24-hour cancellation policy.'
    },
    {
      category: 'technical',
      question: 'The website is loading slowly. What should I do?',
      answer: 'Try clearing your browser cache, disabling browser extensions, or switching to an incognito/private window. If issues persist, contact support.'
    },
    {
      category: 'technical',
      question: 'I\'m having trouble uploading files',
      answer: 'Ensure your files are under 10MB and in supported formats (PDF, ZIP, images). Try a different browser or disable ad blockers that may interfere with uploads.'
    },
    {
      category: 'technical',
      question: 'Why can\'t I access premium features?',
      answer: 'Premium features require an active Pro subscription. Check your billing status in Account Settings and ensure your payment method is current.'
    }
  ]

  const quickLinks = [
    { title: 'Submit Your First Guide', href: '/guides/submit', icon: BookOpen },
    { title: 'Join Discord Community', href: 'https://discord.gg/vybecoding', icon: MessageSquare },
    { title: 'Video Tutorials', href: '/tutorials', icon: ExternalLink },
    { title: 'API Documentation', href: '/docs/api', icon: Settings }
  ]

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="py-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Help Center</h1>
        <p className="text-xl text-vybe-gray-300 max-w-2xl mx-auto">
          Find answers to common questions, get help with technical issues, and learn how to make the most of Vybe Coding.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-vybe-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for help articles, guides, or common questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-vybe-gray-800 border border-vybe-gray-700 rounded-lg text-white placeholder-vybe-gray-400 focus:border-vybe-purple focus:ring-1 focus:ring-vybe-purple"
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(138, 43, 226, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(138, 43, 226, 0.08))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)'}}>
          <h2 className="text-xl font-bold text-white">Quick Start</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="flex items-center gap-3 p-4 bg-vybe-gray-800/50 rounded-lg hover:bg-vybe-gray-800 transition-colors group"
              >
                <div className="w-10 h-10 bg-vybe-purple/20 rounded-lg flex items-center justify-center group-hover:bg-vybe-purple/30 transition-colors">
                  <link.icon className="w-5 h-5 text-vybe-purple" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{link.title}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-vybe-gray-400 group-hover:text-vybe-purple transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Categories and FAQs */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(217, 70, 160, 0.3)'}}>
            <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(217, 70, 160, 0.2), rgba(217, 70, 160, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
              <h3 className="text-lg font-bold text-white">Categories</h3>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                      selectedCategory === category.id
                        ? 'bg-vybe-purple/20 text-vybe-purple border border-vybe-purple/30'
                        : 'text-vybe-gray-300 hover:bg-vybe-gray-800/50 hover:text-white'
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

        {/* FAQ Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(233, 107, 58, 0.4)'}}>
            <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(233, 107, 58, 0.2), rgba(233, 107, 58, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
              <h3 className="text-lg font-bold text-white">
                Frequently Asked Questions
                <span className="text-sm text-vybe-gray-300 ml-2">
                  ({filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'})
                </span>
              </h3>
            </div>
            <div className="p-6">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-vybe-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">No results found</h4>
                  <p className="text-vybe-gray-400">
                    Try adjusting your search terms or selecting a different category.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredFaqs.map((faq, index) => (
                    <div key={index} className="border-b border-vybe-gray-700/50 pb-6 last:border-b-0 last:pb-0">
                      <h4 className="text-lg font-semibold text-white mb-3">{faq.question}</h4>
                      <p className="text-vybe-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="vybe-card overflow-hidden">
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(217, 70, 160, 0.2), rgba(233, 107, 58, 0.2))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h3 className="text-lg font-bold text-white">Still Need Help?</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-vybe-gray-800/30 rounded-lg">
              <MessageSquare className="w-8 h-8 text-vybe-purple mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Live Chat</h4>
              <p className="text-vybe-gray-400 text-sm mb-4">
                Chat with our support team Monday-Friday, 9 AM - 6 PM EST
              </p>
              <button className="btn btn-secondary w-full">
                Start Chat
              </button>
            </div>

            <div className="text-center p-6 bg-vybe-gray-800/30 rounded-lg">
              <MessageSquare className="w-8 h-8 text-vybe-pink mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Email Support</h4>
              <p className="text-vybe-gray-400 text-sm mb-4">
                Send us a detailed message and we'll respond within 24 hours
              </p>
              <button className="btn btn-secondary w-full">
                Send Email
              </button>
            </div>

            <div className="text-center p-6 bg-vybe-gray-800/30 rounded-lg">
              <MessageSquare className="w-8 h-8 text-vybe-orange mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Community Forum</h4>
              <p className="text-vybe-gray-400 text-sm mb-4">
                Ask questions and get help from other developers in our Discord
              </p>
              <button className="btn btn-secondary w-full">
                Join Discord
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}