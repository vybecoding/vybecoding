'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
interface UniversalSearchProps<T = any> {
  placeholder?: string
  value?: string
  onSearch: (query: string) => void
  onSuggestionSelect?: (suggestion: T) => void
  suggestions?: T[]
  className?: string
}

export const UniversalSearch = <T extends any>({
  placeholder = "Search members by name, skills, or expertise...",
  value = "",
  onSearch,
  onSuggestionSelect,
  suggestions = [],
  className
}: UniversalSearchProps<T>) => {
  const [query, setQuery] = useState(value)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setQuery(value)
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
        setHighlightedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    onSearch(newQuery)
    
    if (newQuery.trim() && suggestions.length > 0) {
      setShowSuggestions(true)
      setHighlightedIndex(-1)
    } else {
      setShowSuggestions(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter') {
        onSearch(query)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          handleSuggestionClick(suggestions[highlightedIndex])
        } else {
          onSearch(query)
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setHighlightedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const handleSuggestionClick = (suggestion: T) => {
    const label = (suggestion as any).label || (suggestion as any).title || String(suggestion)
    setQuery(label)
    setShowSuggestions(false)
    setHighlightedIndex(-1)
    onSuggestionSelect?.(suggestion)
    onSearch(label)
  }

  const handleSearchClick = () => {
    onSearch(query)
    setShowSuggestions(false)
  }

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'member':
        return '👤'
      case 'skill':
        return '🔧'
      case 'expertise':
        return '⚡'
      case 'guide':
        return '📚'
      case 'app':
        return '📱'
      case 'news':
        return '📰'
      case 'content':
        return '📄'
      default:
        return '🔍'
    }
  }

  return (
    <div ref={containerRef} className={cn("relative w-full max-w-[600px] mx-auto", className)}>
      {/* Search Input Container */}
      <div className="relative">
        {/* Search Icon */}
        <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-white/50 pointer-events-none z-10" />
        
        {/* Input Field */}
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.trim() && suggestions.length > 0) {
              setShowSuggestions(true)
            }
          }}
          placeholder={placeholder}
          className={cn(
            // Base styles matching demo exactly
            "w-full pr-24 pl-12 py-3 md:pr-32 md:pl-14 md:py-4",
            "bg-[rgba(26,26,26,0.5)] border border-white/10 rounded-xl",
            "text-white text-sm md:text-base",
            "transition-all duration-300",
            // Focus styles
            "focus:outline-none focus:border-[rgba(138,43,226,0.5)]",
            "focus:bg-[rgba(26,26,26,0.7)] focus:shadow-[0_0_0_3px_rgba(138,43,226,0.1)]",
            // Placeholder styles
            "placeholder:text-white/50"
          )}
        />
        
        {/* Search Button */}
        <button
          onClick={handleSearchClick}
          className={cn(
            "absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2",
            "px-3 py-2 md:px-5 md:py-3 bg-vybe-purple border-none rounded-lg",
            "text-white font-medium text-xs md:text-sm min-h-[32px] md:min-h-[36px]",
            "transition-all duration-200 z-20",
            "hover:bg-[rgba(138,43,226,0.8)] hover:scale-105"
          )}
        >
          Search
        </button>
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          className={cn(
            "absolute top-full left-0 right-0 mt-2 z-50",
            "bg-[rgba(26,26,26,0.9)] backdrop-blur-md border border-white/10 rounded-lg",
            "shadow-lg shadow-black/20 max-h-64 overflow-y-auto"
          )}
        >
          {suggestions.map((suggestion, index) => {
            const suggestionAny = suggestion as any
            const type = suggestionAny.type || 'unknown'
            const label = suggestionAny.label || suggestionAny.title || String(suggestion)
            const value = suggestionAny.value || suggestionAny.id || index
            
            return (
              <div
                key={`${type}-${value}`}
                onClick={() => handleSuggestionClick(suggestion)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 cursor-pointer",
                  "text-sm text-white/80 hover:text-white",
                  "hover:bg-white/5 transition-colors",
                  "first:rounded-t-lg last:rounded-b-lg",
                  highlightedIndex === index && "bg-white/10 text-white"
                )}
              >
                <span className="text-base">{getSuggestionIcon(type)}</span>
                <span className="flex-1">{label}</span>
                <span className="text-xs text-white/40 capitalize">{type}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}