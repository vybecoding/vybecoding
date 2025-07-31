"use client";

import React from "react";
import { Star, CheckCircle, Code, Heart } from "lucide-react";

interface ProfileBookingTabProps {
  user: any; // Replace with proper user type
}

export function ProfileBookingTab({ user }: ProfileBookingTabProps) {
  const [selectedDate, setSelectedDate] = React.useState(11);
  const [selectedTime, setSelectedTime] = React.useState("3:00 PM");
  const [selectedService, setSelectedService] = React.useState("full");
  const [selectedPlatform, setSelectedPlatform] = React.useState("zoom");

  // Mock data that matches the demo
  const mockUser = {
    name: "Alex Developer",
    tier: "PRO",
    rating: 4.9,
    sessions: 147,
    title: "Senior Developer",
    responseTime: "Within 24 hours",
    experience: "8+ years",
    description: "I'm a senior developer with 8+ years in SaaS and React development, specializing in full-stack development & career growth for developers."
  };

  const services = [
    {
      id: "quick",
      name: "Quick Help",
      duration: "30 minutes",
      description: "Perfect for quick questions, code reviews, or specific bug fixes",
      price: 50
    },
    {
      id: "full",
      name: "Full Session",
      duration: "60 minutes", 
      description: "Comprehensive mentoring, architecture design, or feature implementation",
      price: 100
    },
    {
      id: "workshop",
      name: "Workshop",
      duration: "90 minutes",
      description: "In-depth workshops, project kickoffs, or team training sessions", 
      price: 150
    }
  ];

  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"];

  const platforms = [
    { id: "zoom", name: "Zoom" },
    { id: "discord", name: "Discord" },
    { id: "meet", name: "Meet" },
    { id: "teams", name: "Teams" }
  ];

  const selectedServiceData = services.find(s => s.id === selectedService);

  return (
    <div className="profile-tab-content">
      <div className="max-w-6xl mx-auto">
        <div className="py-6">
          {/* Main Booking Grid (2 Column Layout) */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-full">
            
            {/* Left Column: All Booking Content (60%) */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Connected Booking Card */}
              <div className="vybe-card p-6 space-y-6">
                
                {/* Profile Header Section */}
                <div className="text-center pb-6 border-b border-vybe-gray-800">
                  {/* Profile Avatar and Name */}
                  <div className="flex flex-col items-center mb-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-vybe-purple to-vybe-orange rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">
                      AD
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-white">{mockUser.name}</h3>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-vybe-pink/20 text-vybe-pink rounded-full text-xs">
                        {mockUser.tier}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-vybe-gray-400">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        {mockUser.rating}
                      </span>
                      <span>•</span>
                      <span>{mockUser.sessions} sessions</span>
                      <span>•</span>
                      <span>{mockUser.title}</span>
                    </div>
                  </div>
                  
                  {/* Quick Stats - Inline */}
                  <div className="text-center mb-4">
                    <p className="text-sm text-vybe-gray-400">
                      <span className="text-vybe-gray-400">Response Time:</span> <span className="text-white font-medium">{mockUser.responseTime}</span>
                      <span className="mx-2">•</span>
                      <span className="text-vybe-gray-400">Experience:</span> <span className="text-white font-medium">{mockUser.experience}</span>
                    </p>
                  </div>
                  
                  {/* Description - Left Aligned */}
                  <p className="text-sm text-vybe-gray-300 text-left">{mockUser.description}</p>
                </div>
              
              {/* Step 1: Select Date & Time */}
              <h4 className="vybe-section-header mb-4">
                <div className="vybe-gradient-accent-bar"></div>
                Select Date & Time
              </h4>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-vybe-gray-400">EST (UTC-5)</span>
                  </div>
              
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-white font-medium">January 2025</h5>
                <div className="flex gap-1">
                  <button className="p-2 text-vybe-gray-400 hover:text-white rounded-lg">←</button>
                  <button className="p-2 text-vybe-gray-400 hover:text-white rounded-lg">→</button>
                </div>
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-3 max-w-full">
                <div className="text-center text-xs text-vybe-gray-400 py-2">S</div>
                <div className="text-center text-xs text-vybe-gray-400 py-2">M</div>
                <div className="text-center text-xs text-vybe-gray-400 py-2">T</div>
                <div className="text-center text-xs text-vybe-gray-400 py-2">W</div>
                <div className="text-center text-xs text-vybe-gray-400 py-2">T</div>
                <div className="text-center text-xs text-vybe-gray-400 py-2">F</div>
                <div className="text-center text-xs text-vybe-gray-400 py-2">S</div>
                
                {/* Calendar Days */}
                {[...Array(31)].map((_, i) => {
                  const day = i + 1;
                  const isAvailable = [11, 15, 22, 29].includes(day);
                  const isBooked = day === 18;
                  const isToday = day === 21;
                  const isSelected = day === selectedDate;
                  
                  let className = "text-center py-3 text-vybe-gray-500";
                  
                  if (isSelected) {
                    className = "text-center py-3 bg-vybe-purple border border-vybe-purple text-white rounded-md cursor-pointer";
                  } else if (isToday) {
                    className = "text-center py-3 bg-purple-900/80 border border-purple-800/60 text-purple-200 rounded-md cursor-pointer hover:bg-purple-700";
                  } else if (isBooked) {
                    className = "text-center py-3 bg-red-900/80 border border-red-800/60 text-red-200 rounded-md cursor-not-allowed";
                  } else if (isAvailable) {
                    className = "text-center py-3 bg-green-800/80 border border-green-700/60 text-green-200 rounded-md cursor-pointer hover:bg-green-700";
                  }
                  
                  return (
                    <div 
                      key={day} 
                      className={className}
                      onClick={() => isAvailable && setSelectedDate(day)}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
              
              {/* Calendar Legend */}
              <div className="flex flex-wrap items-center gap-4 text-xs mt-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="text-vybe-gray-400">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <span className="text-vybe-gray-400">Today</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <span className="text-vybe-gray-400">Booked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-vybe-gray-500 rounded-full"></div>
                  <span className="text-vybe-gray-400">Unavailable</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">💡</span>
                  <span className="text-vybe-gray-400">Tip: Click and drag to select multiple dates</span>
                </div>
              </div>
              
              {/* Time Slots */}
              <div className="mt-6">
                <h5 className="text-sm font-medium text-white mb-3">Available Times on January {selectedDate}</h5>
                <div className="grid grid-cols-3 gap-2 max-w-full">
                  {timeSlots.map((time) => (
                    <button 
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-4 py-2 text-sm rounded transition-colors ${
                        selectedTime === time 
                          ? 'border border-vybe-purple bg-vybe-purple/10 text-white' 
                          : 'bg-vybe-gray-800 text-white hover:bg-vybe-purple'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Choose Your Session */}
              <div className="mt-8">
                <h4 className="vybe-section-header mb-4">
                  <div className="vybe-gradient-accent-bar"></div>
                  Choose Your Session
                </h4>
                
                <div className="space-y-3">
                  {services.map((service) => (
                    <div 
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`border rounded-lg p-4 transition-colors cursor-pointer ${
                        selectedService === service.id 
                          ? 'border-vybe-purple bg-vybe-purple/10' 
                          : 'border-vybe-gray-700 hover:border-vybe-purple/50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="text-white font-medium">{service.name}</h5>
                          <p className="text-sm text-vybe-gray-400">{service.duration}</p>
                          <p className="text-xs text-vybe-gray-500 mt-1">{service.description}</p>
                        </div>
                        <span className="text-white font-medium">${service.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Session Details */}
              <div className="mt-8">
                <h4 className="vybe-section-header mb-4">
                  <div className="vybe-gradient-accent-bar"></div>
                  Session Details
                </h4>
                
                <div className="mb-4">
                  <label className="text-sm text-vybe-gray-400 mb-2 block">What would you like help with?</label>
                  <textarea 
                    className="w-full bg-vybe-gray-800 border border-vybe-gray-700 rounded-lg p-3 text-white placeholder-vybe-gray-500 resize-none h-24" 
                    placeholder="Describe your goals for this session, what you're working on, and any specific questions you have..."
                  ></textarea>
                </div>
              </div>
              
              {/* Choose Your Platform */}
              <div className="mt-8">
                <h4 className="vybe-section-header mb-4">
                  <div className="vybe-gradient-accent-bar"></div>
                  Choose Your Platform
                </h4>
                
                <div className="grid grid-cols-2 gap-3">
                  {platforms.map((platform) => (
                    <div 
                      key={platform.id}
                      onClick={() => setSelectedPlatform(platform.id)}
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        selectedPlatform === platform.id 
                          ? 'border-vybe-purple bg-vybe-purple/10' 
                          : 'border-vybe-gray-700 hover:border-vybe-purple/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          selectedPlatform === platform.id ? 'bg-vybe-purple' : 'bg-vybe-gray-600'
                        }`}></div>
                        <span className={selectedPlatform === platform.id ? 'text-white font-medium' : 'text-vybe-gray-300'}>
                          {platform.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              </div>
            </div>
                
            {/* Right Column: Summary & Payment (40%) */}
            <div className="lg:col-span-2">
              {/* Session Summary Container */}
              <div className="vybe-card overflow-hidden mb-6">
                <div className="vybe-card-header">
                  <h2 className="vybe-section-header">
                    <div className="vybe-gradient-accent-bar"></div>
                    Session Summary
                  </h2>
                </div>
                {/* Booking Summary */}
                <div className="p-6 sticky top-20">
                
                {/* Selected Date & Time */}
                <div className="mb-4 pb-4 border-b border-vybe-gray-800">
                  <p className="text-sm text-vybe-gray-400 mb-1">Date & Time</p>
                  <p className="text-white">January {selectedDate}, 2025 at {selectedTime} EST</p>
                </div>
                
                {/* Service Type */}
                <div className="mb-4 pb-4 border-b border-vybe-gray-800">
                  <p className="text-sm text-vybe-gray-400 mb-1">Service</p>
                  <p className="text-white">{selectedServiceData?.name}</p>
                  <p className="text-sm text-vybe-gray-500">{selectedServiceData?.duration}</p>
                </div>
                
                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-vybe-gray-400">Session Rate</span>
                    <span className="text-white">${selectedServiceData?.price}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-vybe-gray-800">
                    <span className="text-white font-medium">Total</span>
                    <span className="text-white font-medium">${selectedServiceData?.price}</span>
                  </div>
                </div>
                
                {/* Book Button */}
                <button className="w-full py-3 bg-gradient-to-r from-vybe-purple to-vybe-orange text-white rounded-lg hover:opacity-90 transition-opacity font-medium">
                  Book Session
                </button>
                
                {/* Terms */}
                <p className="text-xs text-vybe-gray-500 mt-4 text-center">
                  By booking, you agree to our terms and cancellation policy
                </p>
                </div>
              </div>
              
              {/* Services Offered Container */}
              <div className="vybe-card overflow-hidden mb-6">
                <div className="vybe-card-header">
                  <h4 className="vybe-section-header">
                    <div className="vybe-gradient-accent-bar"></div>
                    Services Offered
                  </h4>
                </div>
                <div className="p-6">
                
                {/* Technical Services */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Code className="w-3 h-3 text-blue-400" />
                    </div>
                    <h5 className="text-white font-medium">Technical Services</h5>
                  </div>
                  <div className="ml-7 space-y-2 text-sm text-vybe-gray-400">
                    <p className="flex items-center gap-2"><span className="text-blue-400">•</span> Full-stack code reviews</p>
                    <p className="flex items-center gap-2"><span className="text-blue-400">•</span> System architecture design</p>
                    <p className="flex items-center gap-2"><span className="text-blue-400">•</span> Performance optimization</p>
                    <p className="flex items-center gap-2"><span className="text-blue-400">•</span> AI/ML integration</p>
                  </div>
                </div>
                
                {/* Career Development */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 bg-pink-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-pink-400" />
                    </div>
                    <h5 className="text-white font-medium">Career Development</h5>
                  </div>
                  <div className="ml-7 space-y-2 text-sm text-vybe-gray-400">
                    <p className="flex items-center gap-2"><span className="text-pink-400">•</span> Technical interview prep</p>
                    <p className="flex items-center gap-2"><span className="text-pink-400">•</span> Resume reviews</p>
                    <p className="flex items-center gap-2"><span className="text-pink-400">•</span> Career planning</p>
                    <p className="flex items-center gap-2"><span className="text-pink-400">•</span> Salary negotiation</p>
                  </div>
                </div>
                
                {/* Areas of Expertise */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Star className="w-3 h-3 text-purple-400" />
                    </div>
                    <h5 className="text-white font-medium">Areas of Expertise</h5>
                  </div>
                  <div className="ml-7 space-y-2 text-sm text-vybe-gray-400">
                    <p className="flex items-center gap-2"><span className="text-purple-400">•</span> Frontend frameworks</p>
                    <p className="flex items-center gap-2"><span className="text-purple-400">•</span> Backend & API development</p>
                    <p className="flex items-center gap-2"><span className="text-purple-400">•</span> Cloud & DevOps practices</p>
                    <p className="flex items-center gap-2"><span className="text-purple-400">•</span> Database design</p>
                  </div>
                </div>
                </div>
              </div>
              
              {/* Quick Question Container */}
              <div className="vybe-card overflow-hidden mb-6">
                <div className="vybe-card-header">
                  <h4 className="vybe-section-header">
                    <div className="vybe-gradient-accent-bar"></div>
                    Quick Question?
                  </h4>
                </div>
                <div className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-vybe-gray-300 mb-4">Have a quick question before booking? Message me on Discord for a faster response!</p>
                    <a href="https://discord.com/users/alexdev#1234" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                      </svg>
                      Message on Discord
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Recent Reviews Container */}
              <div className="vybe-card overflow-hidden">
                <div className="vybe-card-header">
                  <h4 className="vybe-section-header">
                    <div className="vybe-gradient-accent-bar"></div>
                    Recent Reviews
                  </h4>
                </div>
                <div className="p-6">
                
                {/* Review 1 */}
                <div className="mb-4 pb-4 border-b border-vybe-gray-800 last:border-b-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-400">
                      <span>★★★★★</span>
                    </div>
                    <span className="text-white font-medium">Sarah K.</span>
                    <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">⚡</span>
                    </div>
                  </div>
                  <p className="text-xs text-vybe-gray-500 mb-2">React live mentoring session • 2 days ago</p>
                  <p className="text-sm text-vybe-gray-300">Alex helped me identify and fix critical performance issues in my React app. His systematic approach and clear explanations made complex concepts easy to understand.</p>
                </div>
                
                {/* Review 2 */}
                <div className="mb-4 pb-4 border-b border-vybe-gray-800 last:border-b-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-400">
                      <span>★★★★★</span>
                    </div>
                    <span className="text-white font-medium">Mike D.</span>
                    <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">⚡</span>
                    </div>
                  </div>
                  <p className="text-xs text-vybe-gray-500 mb-2">System Architecture Review • 1 week ago</p>
                  <p className="text-sm text-vybe-gray-300">Excellent session! Alex reviewed our architecture design with attention to scalability and best practices. Highly recommended for architecture decisions.</p>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}