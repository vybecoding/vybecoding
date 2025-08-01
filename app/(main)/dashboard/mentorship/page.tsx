'use client'

import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Star, 
  TrendingUp, 
  Users,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Save,
  X
} from 'lucide-react'

interface TimeSlot {
  time: string
  available: boolean
}

interface DayAvailability {
  date: number
  status: 'available' | 'booked' | 'unavailable' | 'today'
  slots?: TimeSlot[]
}

export default function DashboardMentorshipPage() {
  const { user } = useUser()
  const [isEditingBio, setIsEditingBio] = useState(false)
  const [isEditingAvailability, setIsEditingAvailability] = useState(false)
  const [mentorBio, setMentorBio] = useState(
    "I'm a senior developer with 8+ years in SaaS and React development, specializing in full-stack development & career growth for developers. I help developers level up their technical skills, navigate career growth, and build confidence in system design."
  )
  const [selectedDate, setSelectedDate] = useState(11)
  const [currentMonth, setCurrentMonth] = useState('January 2025')

  // Mock calendar data
  const calendarDays: DayAvailability[] = [
    // First week padding
    { date: 0, status: 'unavailable' },
    { date: 0, status: 'unavailable' },
    { date: 0, status: 'unavailable' },
    { date: 1, status: 'unavailable' },
    { date: 2, status: 'unavailable' },
    { date: 3, status: 'unavailable' },
    { date: 4, status: 'unavailable' },
    // Week 2
    { date: 5, status: 'unavailable' },
    { date: 6, status: 'unavailable' },
    { date: 7, status: 'unavailable' },
    { date: 8, status: 'unavailable' },
    { date: 9, status: 'unavailable' },
    { date: 10, status: 'unavailable' },
    { date: 11, status: 'available', slots: [
      { time: '9:00 AM', available: true },
      { time: '10:00 AM', available: false },
      { time: '11:00 AM', available: false },
      { time: '2:00 PM', available: false },
      { time: '3:00 PM', available: true },
      { time: '4:00 PM', available: false }
    ]},
    // Week 3
    { date: 12, status: 'unavailable' },
    { date: 13, status: 'unavailable' },
    { date: 14, status: 'unavailable' },
    { date: 15, status: 'available' },
    { date: 16, status: 'unavailable' },
    { date: 17, status: 'unavailable' },
    { date: 18, status: 'booked' },
    // Week 4
    { date: 19, status: 'unavailable' },
    { date: 20, status: 'unavailable' },
    { date: 21, status: 'today' },
    { date: 22, status: 'available' },
    { date: 23, status: 'unavailable' },
    { date: 24, status: 'unavailable' },
    { date: 25, status: 'unavailable' },
    // Week 5
    { date: 26, status: 'unavailable' },
    { date: 27, status: 'unavailable' },
    { date: 28, status: 'unavailable' },
    { date: 29, status: 'available' },
    { date: 30, status: 'unavailable' },
    { date: 31, status: 'unavailable' },
    { date: 0, status: 'unavailable' },
  ]

  const sessionTypes = [
    { type: 'Quick Chat', duration: '30 min', price: 75 },
    { type: 'Standard', duration: '60 min', price: 100 },
    { type: 'Deep Dive', duration: '90 min', price: 150 }
  ]

  const getDayClasses = (day: DayAvailability) => {
    if (day.date === 0) return ''
    
    const baseClasses = 'text-center py-2 text-sm rounded cursor-pointer transition-colors'
    
    switch (day.status) {
      case 'available':
        return cn(baseClasses, 'bg-green-600 text-white hover:bg-green-700 font-medium')
      case 'booked':
        return cn(baseClasses, 'bg-red-600 text-white cursor-not-allowed font-medium')
      case 'today':
        return cn(baseClasses, 'bg-purple-600 text-white hover:bg-purple-700 font-medium')
      default:
        return cn(baseClasses, 'text-white hover:bg-vybe-gray-800')
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-6">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Main Content Column (60%) */}
        <div className="col-span-1 lg:col-span-3 space-y-6">
          
          {/* Bio Section */}
          <div className="vybe-card overflow-hidden">
            <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(138, 43, 226, 0.08))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)'}}>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">Mentor Bio</h3>
                {!isEditingBio ? (
                  <button
                    onClick={() => setIsEditingBio(true)}
                    className="px-3 py-1.5 text-sm bg-transparent border border-vybe-purple text-vybe-purple rounded-lg hover:bg-vybe-purple/20 transition-all"
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditingBio(false)}
                    className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <textarea
                  value={mentorBio}
                  onChange={(e) => setMentorBio(e.target.value)}
                  readOnly={!isEditingBio}
                  className={cn(
                    "w-full bg-vybe-gray-800 border border-vybe-gray-700 rounded-lg px-3 py-2 text-white text-sm h-24 resize-none",
                    isEditingBio && "focus:border-vybe-purple focus:ring-1 focus:ring-vybe-purple"
                  )}
                  placeholder="Describe your expertise and what you help mentees with..."
                />
              </div>
              
              {/* Quick Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-vybe-gray-400 block mb-1">Experience</label>
                  <select 
                    className="w-full bg-vybe-gray-800 border border-vybe-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-vybe-purple"
                    disabled={!isEditingBio}
                  >
                    <option>8+ years</option>
                    <option>5-8 years</option>
                    <option>3-5 years</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-xs font-medium text-vybe-gray-400 block mb-1">Response Time</label>
                  <select 
                    className="w-full bg-vybe-gray-800 border border-vybe-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-vybe-purple"
                    disabled={!isEditingBio}
                  >
                    <option>Within 24 hours</option>
                    <option>Within 4 hours</option>
                    <option>Within 1 hour</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Availability Calendar */}
          <div className="vybe-card overflow-hidden">
            <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(217, 70, 160, 0.2), rgba(217, 70, 160, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">Availability Calendar</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-vybe-gray-300">EST (UTC-5)</span>
                    <button className="px-2 py-1 text-xs bg-vybe-gray-800 text-vybe-gray-400 rounded hover:bg-vybe-gray-700 transition-colors">
                      Change
                    </button>
                  </div>
                  {!isEditingAvailability ? (
                    <button
                      onClick={() => setIsEditingAvailability(true)}
                      className="px-3 py-1.5 text-sm bg-transparent border border-vybe-purple text-vybe-purple rounded-lg hover:bg-vybe-purple/20 transition-all"
                    >
                      Edit Availability
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsEditingAvailability(false)}
                        className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditingAvailability(false)}
                        className="px-3 py-1.5 text-sm bg-transparent border border-vybe-gray-600 text-white rounded-lg hover:bg-vybe-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-white font-medium">{currentMonth}</h5>
                <div className="flex items-center gap-2">
                  <button className="p-1 text-vybe-gray-400 hover:text-white rounded transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="px-3 py-1 text-xs bg-vybe-gray-800 text-white rounded-lg hover:bg-vybe-gray-700 transition-colors">
                    Today
                  </button>
                  <button className="p-1 text-vybe-gray-400 hover:text-white rounded transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Bulk Actions (Only visible in edit mode) */}
              {isEditingAvailability && (
                <div className="flex gap-2 flex-wrap mb-3">
                  <button className="px-3 py-1 text-xs bg-vybe-purple/20 text-vybe-purple-light border border-vybe-purple/30 rounded-lg hover:bg-vybe-purple/30 transition-colors">
                    Block Weekends
                  </button>
                  <button className="px-3 py-1 text-xs bg-transparent border border-vybe-gray-600 text-white rounded-lg hover:bg-vybe-gray-800 transition-colors">
                    Copy Last Week
                  </button>
                  <button className="px-3 py-1 text-xs bg-transparent border border-vybe-gray-600 text-white rounded-lg hover:bg-vybe-gray-800 transition-colors">
                    Clear All
                  </button>
                </div>
              )}
              
              {/* View Mode Info */}
              {!isEditingAvailability && (
                <div className="text-sm text-vybe-gray-400 mb-3">
                  <p>Your current availability is shown below. Click "Edit Availability" to make changes.</p>
                </div>
              )}
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-3 w-full">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                  <div key={day} className="text-center text-xs text-vybe-gray-500 py-1">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2 select-none w-full">
                {calendarDays.map((day, index) => (
                  <button
                    key={index}
                    className={getDayClasses(day)}
                    onClick={() => day.date > 0 && setSelectedDate(day.date)}
                    disabled={day.date === 0 || (!isEditingAvailability && day.status === 'booked')}
                  >
                    {day.date > 0 ? day.date : ''}
                  </button>
                ))}
              </div>
              
              {/* Legend */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-4 p-3 bg-vybe-gray-800/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="text-vybe-gray-300 text-sm">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <span className="text-vybe-gray-300 text-sm">Today</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <span className="text-vybe-gray-300 text-sm">Booked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-vybe-gray-600 rounded-full"></div>
                  <span className="text-vybe-gray-300 text-sm">Unavailable</span>
                </div>
                {isEditingAvailability && (
                  <div className="text-xs text-vybe-gray-400">💡 Tip: Click and drag to select multiple dates</div>
                )}
              </div>
              
              {/* Time Selection Panel */}
              <div className="mt-6 p-4 bg-vybe-gray-800/50 rounded-lg">
                <h5 className="text-white font-semibold mb-3">
                  Available Times on January {selectedDate}
                </h5>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {calendarDays.find(d => d.date === selectedDate)?.slots?.map((slot, index) => (
                    <button
                      key={index}
                      className={cn(
                        "px-3 py-2 text-sm rounded-lg transition-all",
                        slot.available
                          ? "bg-gradient-to-b from-vybe-purple to-vybe-purple/80 text-white hover:from-vybe-purple/90 hover:to-vybe-purple/70 shadow-sm"
                          : "border border-vybe-gray-600 text-vybe-gray-400 hover:border-vybe-purple hover:text-white"
                      )}
                      disabled={!isEditingAvailability}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
                
                {/* Quick Time Selection (Edit mode only) */}
                {isEditingAvailability && (
                  <div className="flex gap-2 flex-wrap mb-3">
                    <button className="px-3 py-1 text-xs bg-vybe-purple/20 text-vybe-purple-light border border-vybe-purple/30 rounded-lg hover:bg-vybe-purple/30 transition-colors">
                      Select All Morning
                    </button>
                    <button className="px-3 py-1 text-xs bg-vybe-purple/20 text-vybe-purple-light border border-vybe-purple/30 rounded-lg hover:bg-vybe-purple/30 transition-colors">
                      Select All Afternoon
                    </button>
                    <button className="px-3 py-1 text-xs bg-transparent border border-vybe-gray-600 text-white rounded-lg hover:bg-vybe-gray-800 transition-colors">
                      Clear All
                    </button>
                  </div>
                )}
                
                {/* View Mode Info */}
                {!isEditingAvailability && (
                  <div className="text-sm text-vybe-gray-400">
                    <p>Available times for the selected date are shown above.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Session Pricing */}
          <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(233, 107, 58, 0.4)'}}>
            <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(233, 107, 58, 0.2), rgba(233, 107, 58, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
              <h3 className="text-base font-semibold text-white">Session Pricing</h3>
            </div>
            <div className="p-6">
            
            <div className="overflow-hidden rounded-lg border border-vybe-gray-700">
              <table className="w-full">
                <thead className="bg-vybe-gray-800/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-vybe-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-vybe-gray-400 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-vybe-gray-400 uppercase tracking-wider">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-vybe-gray-700">
                  {sessionTypes.map((session, index) => (
                    <tr key={index} className="bg-vybe-gray-800/30 hover:bg-vybe-gray-800/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-white">{session.type}</div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-sm text-vybe-gray-300">{session.duration}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-sm font-semibold text-white">${session.price}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex gap-3">
              <button className="px-4 py-2 bg-vybe-purple/20 text-vybe-purple-light rounded-lg hover:bg-vybe-purple/30 transition-all text-sm font-medium">
                Edit Pricing
              </button>
              <button className="px-4 py-2 bg-transparent border border-vybe-gray-600 text-white rounded-lg hover:bg-vybe-gray-800 transition-all text-sm font-medium">
                Add Package Deal
              </button>
            </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar Column (40%) */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          
          {/* Mentor Stats */}
          <div className="vybe-card overflow-hidden">
            <div style={{padding: '1rem', background: 'rgba(55, 65, 81, 0.4)', borderBottom: '1px solid rgba(75, 85, 99, 0.3)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
              <h3 className="text-base font-semibold text-white">Mentor Statistics</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-vybe-gray-400">Total Sessions</p>
                    <p className="text-xl font-semibold text-white">147</p>
                  </div>
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-vybe-gray-400">Average Rating</p>
                    <p className="text-xl font-semibold text-white">4.9</p>
                  </div>
                </div>
                <span className="text-xs text-vybe-gray-400">(89 reviews)</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-vybe-purple/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-vybe-purple" />
                  </div>
                  <div>
                    <p className="text-sm text-vybe-gray-400">Monthly Earnings</p>
                    <p className="text-xl font-semibold text-white">$2,450</p>
                  </div>
                </div>
                <span className="text-xs text-green-500">+15%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-vybe-gray-400">Response Time</p>
                    <p className="text-xl font-semibold text-white">2.3h</p>
                  </div>
                </div>
                <span className="text-xs text-vybe-gray-400">avg</span>
              </div>
            </div>
          </div>
          
          {/* Recent Sessions */}
          <div className="vybe-card overflow-hidden">
            <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(217, 70, 160, 0.2), rgba(233, 107, 58, 0.2))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
              <h3 className="text-base font-semibold text-white">Recent Sessions</h3>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between p-3 bg-vybe-gray-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                    JD
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">John Doe</p>
                    <p className="text-xs text-vybe-gray-400">React Performance</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs">5.0</span>
                  </div>
                  <p className="text-xs text-vybe-gray-400">2 days ago</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-vybe-gray-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                    SM
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Sarah Miller</p>
                    <p className="text-xs text-vybe-gray-400">Career Guidance</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs">4.8</span>
                  </div>
                  <p className="text-xs text-vybe-gray-400">5 days ago</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-vybe-gray-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                    AK
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Alex Kim</p>
                    <p className="text-xs text-vybe-gray-400">System Design</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs">5.0</span>
                  </div>
                  <p className="text-xs text-vybe-gray-400">1 week ago</p>
                </div>
              </div>
            </div>
            
            <div className="px-6 pb-6">
              <button className="w-full px-4 py-2 bg-vybe-purple/20 text-vybe-purple-light rounded-lg hover:bg-vybe-purple/30 transition-all text-sm font-medium">
                View All Sessions
              </button>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="vybe-card p-6">
            <h4 className="text-sm font-semibold text-white mb-4">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-transparent border border-vybe-gray-600 text-white rounded-lg hover:bg-vybe-gray-800 transition-all text-sm font-medium text-left flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Message All Mentees
              </button>
              <button className="w-full px-4 py-2 bg-transparent border border-vybe-gray-600 text-white rounded-lg hover:bg-vybe-gray-800 transition-all text-sm font-medium text-left flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Block Time Off
              </button>
              <button className="w-full px-4 py-2 bg-transparent border border-vybe-gray-600 text-white rounded-lg hover:bg-vybe-gray-800 transition-all text-sm font-medium text-left flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Update Pricing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}