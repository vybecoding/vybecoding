'use client'

import React, { useState } from 'react'
import { Bell, Check, X, Filter, MoreHorizontal, DollarSign, Star, MessageSquare, Calendar, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react'

export default function NotificationsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'sale',
      title: 'New Sale: Claude + VSCode Mastery',
      message: 'John Smith purchased your guide for $47.00',
      timestamp: '2 hours ago',
      read: false,
      icon: DollarSign,
      color: 'green'
    },
    {
      id: '2',
      type: 'review',
      title: 'New 5-star Review',
      message: 'Sarah Chen left a review: "Excellent guide! Helped me integrate Claude perfectly into my workflow."',
      timestamp: '4 hours ago',
      read: false,
      icon: Star,
      color: 'yellow'
    },
    {
      id: '3',
      type: 'message',
      title: 'New Message from Developer',
      message: 'Alex Rivera sent you a message about your React AI Components guide',
      timestamp: '6 hours ago',
      read: true,
      icon: MessageSquare,
      color: 'blue'
    },
    {
      id: '4',
      type: 'system',
      title: 'Guide Approved',
      message: 'Your guide "Advanced Prompt Engineering" has been approved and is now live',
      timestamp: '1 day ago',
      read: true,
      icon: CheckCircle,
      color: 'green'
    },
    {
      id: '5',
      type: 'mentorship',
      title: 'Mentorship Session Reminder',
      message: 'You have a session with Emily Watson tomorrow at 2:00 PM EST',
      timestamp: '1 day ago',
      read: false,
      icon: Calendar,
      color: 'purple'
    },
    {
      id: '6',
      type: 'sale',
      title: 'Weekly Sales Summary',
      message: 'You made $287 this week from 12 sales. Great work!',
      timestamp: '2 days ago',
      read: true,
      icon: DollarSign,
      color: 'green'
    },
    {
      id: '7',
      type: 'system',
      title: 'Guide Needs Revision',
      message: 'Your guide "TypeScript Pro Patterns" needs minor revisions before approval',
      timestamp: '3 days ago',
      read: true,
      icon: XCircle,
      color: 'red'
    },
    {
      id: '8',
      type: 'message',
      title: 'Community Mention',
      message: 'You were mentioned in the #ai-development Discord channel',
      timestamp: '3 days ago',
      read: true,
      icon: MessageSquare,
      color: 'blue'
    }
  ])

  const filters = [
    { id: 'all', label: 'All Notifications', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'sale', label: 'Sales', count: notifications.filter(n => n.type === 'sale').length },
    { id: 'review', label: 'Reviews', count: notifications.filter(n => n.type === 'review').length },
    { id: 'message', label: 'Messages', count: notifications.filter(n => n.type === 'message').length },
    { id: 'system', label: 'System', count: notifications.filter(n => n.type === 'system').length }
  ]

  const filteredNotifications = notifications.filter(notification => {
    if (selectedFilter === 'all') return true
    if (selectedFilter === 'unread') return !notification.read
    return notification.type === selectedFilter
  })

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const markAsUnread = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: false } : n))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getIconColor = (color: string) => {
    switch (color) {
      case 'green': return 'text-green-400 bg-green-500/20'
      case 'yellow': return 'text-yellow-400 bg-yellow-500/20'
      case 'blue': return 'text-blue-400 bg-blue-500/20'
      case 'purple': return 'text-purple-400 bg-purple-500/20'
      case 'red': return 'text-red-400 bg-red-500/20'
      default: return 'text-vybe-gray-400 bg-vybe-gray-500/20'
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="py-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <Bell className="w-8 h-8" />
            Notifications
            {unreadCount > 0 && (
              <span className="px-3 py-1 bg-red-500 text-white text-sm rounded-full font-medium">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-vybe-gray-300 mt-2">
            Stay updated with your sales, reviews, messages, and platform updates
          </p>
        </div>
        
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="btn btn-secondary flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Mark All Read
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(138, 43, 226, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(138, 43, 226, 0.08))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)'}}>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter Notifications
          </h2>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  selectedFilter === filter.id
                    ? 'bg-vybe-purple/20 text-vybe-purple border border-vybe-purple/30'
                    : 'bg-vybe-gray-800 text-vybe-gray-300 hover:bg-vybe-gray-700 hover:text-white border border-vybe-gray-700'
                }`}
              >
                <span className="text-sm font-medium">{filter.label}</span>
                <span className="px-2 py-0.5 bg-vybe-gray-700 text-vybe-gray-300 text-xs rounded-full">
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(217, 70, 160, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(217, 70, 160, 0.2), rgba(217, 70, 160, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h2 className="text-xl font-bold text-white">
            {selectedFilter === 'all' ? 'All Notifications' : 
             selectedFilter === 'unread' ? 'Unread Notifications' :
             filters.find(f => f.id === selectedFilter)?.label}
            <span className="text-sm text-vybe-gray-300 ml-2">
              ({filteredNotifications.length})
            </span>
          </h2>
        </div>
        <div className="p-6">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-vybe-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No notifications found</h3>
              <p className="text-vybe-gray-400">
                {selectedFilter === 'unread' 
                  ? "You're all caught up! No unread notifications."
                  : "No notifications match your current filter."
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-all group ${
                    notification.read 
                      ? 'bg-vybe-gray-800/30 border-vybe-gray-700/50' 
                      : 'bg-vybe-gray-800/50 border-vybe-purple/30'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getIconColor(notification.color)}`}>
                      <notification.icon className="w-5 h-5" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className={`font-semibold mb-1 ${notification.read ? 'text-vybe-gray-300' : 'text-white'}`}>
                            {notification.title}
                            {!notification.read && (
                              <span className="w-2 h-2 bg-vybe-purple rounded-full inline-block ml-2"></span>
                            )}
                          </h3>
                          <p className="text-vybe-gray-400 text-sm mb-2">{notification.message}</p>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-vybe-gray-500" />
                            <span className="text-xs text-vybe-gray-500">{notification.timestamp}</span>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {notification.read ? (
                            <button
                              onClick={() => markAsUnread(notification.id)}
                              className="p-1.5 text-vybe-gray-400 hover:text-vybe-purple hover:bg-vybe-purple/20 rounded transition-colors"
                              title="Mark as unread"
                            >
                              <Bell className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1.5 text-vybe-gray-400 hover:text-green-400 hover:bg-green-500/20 rounded transition-colors"
                              title="Mark as read"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1.5 text-vybe-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded transition-colors"
                            title="Delete notification"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(233, 107, 58, 0.4)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(233, 107, 58, 0.2), rgba(233, 107, 58, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h2 className="text-xl font-bold text-white">Notification Settings</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-vybe-gray-800/30 rounded-lg text-center">
              <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Sales Notifications</h3>
              <p className="text-vybe-gray-400 text-sm mb-3">Get notified instantly when someone purchases your content</p>
              <a href="/dashboard/settings" className="text-vybe-purple hover:text-vybe-pink transition-colors text-sm">
                Configure →
              </a>
            </div>

            <div className="p-4 bg-vybe-gray-800/30 rounded-lg text-center">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Review Notifications</h3>
              <p className="text-vybe-gray-400 text-sm mb-3">Be the first to know when someone reviews your guides</p>
              <a href="/dashboard/settings" className="text-vybe-purple hover:text-vybe-pink transition-colors text-sm">
                Configure →
              </a>
            </div>

            <div className="p-4 bg-vybe-gray-800/30 rounded-lg text-center">
              <MessageSquare className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Message Notifications</h3>
              <p className="text-vybe-gray-400 text-sm mb-3">Stay connected with your community and customers</p>
              <a href="/dashboard/settings" className="text-vybe-purple hover:text-vybe-pink transition-colors text-sm">
                Configure →
              </a>
            </div>

            <div className="p-4 bg-vybe-gray-800/30 rounded-lg text-center">
              <AlertCircle className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">System Notifications</h3>
              <p className="text-vybe-gray-400 text-sm mb-3">Important updates about your account and submissions</p>
              <a href="/dashboard/settings" className="text-vybe-purple hover:text-vybe-pink transition-colors text-sm">
                Configure →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="text-center bg-vybe-gray-800/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-2">Manage All Notifications</h3>
        <p className="text-vybe-gray-300 mb-4">
          Customize your notification preferences, delivery methods, and timing in your settings.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/settings/notifications" className="btn btn-primary-fuchsia">
            Notification Settings
          </a>
          <a href="/dashboard" className="btn btn-secondary">
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}