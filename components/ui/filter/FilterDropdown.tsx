'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterOption {
  value: string
  label: string
}

interface FilterDropdownProps {
  label: string
  options: FilterOption[]
  selected: string[]
  onSelectionChange: (selected: string[]) => void
  multiSelect?: boolean
  className?: string
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  selected,
  onSelectionChange,
  multiSelect = false,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleOptionClick = (value: string) => {
    if (multiSelect) {
      if (selected.includes(value)) {
        onSelectionChange(selected.filter(item => item !== value))
      } else {
        onSelectionChange([...selected, value])
      }
    } else {
      onSelectionChange([value])
      setIsOpen(false)
    }
  }

  const selectedCount = selected.length
  const hasSelections = selectedCount > 0

  return (
    <div ref={dropdownRef} className={cn("relative inline-block flex-shrink-0", className)}>
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          // Base styles matching demo exactly
          "flex items-center justify-between gap-2 px-3 py-2 md:px-4 md:py-2.5",
          "bg-[rgba(26,26,26,0.5)] border border-white/10 text-white text-xs md:text-sm",
          "transition-all duration-200 whitespace-nowrap min-w-fit",
          // Hover and active states
          "hover:bg-[rgba(26,26,26,0.7)] hover:border-[rgba(138,43,226,0.3)]",
          isOpen && "border-[rgba(138,43,226,0.5)] text-white",
          // Border radius based on position (handled by parent container)
          "first:rounded-l-lg last:rounded-r-lg",
          // Selection state
          hasSelections && "border-[rgba(138,43,226,0.4)]"
        )}
      >
        <span>{label}</span>
        
        {/* Selection Counter for multi-select */}
        {multiSelect && hasSelections && (
          <span 
            className={cn(
              "ml-1 px-1.5 py-0.5 bg-vybe-purple/20 text-vybe-purple-light",
              "text-xs rounded-full font-medium min-w-[18px] text-center"
            )}
          >
            {selectedCount}
          </span>
        )}
        
        {/* Dropdown Icon */}
        <ChevronDown 
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-200",
            isOpen && "transform rotate-180"
          )} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className={cn(
            "absolute top-full left-0 mt-1 min-w-full w-max z-50",
            "bg-[rgba(26,26,26,0.95)] backdrop-blur-md border border-white/10 rounded-lg",
            "shadow-lg shadow-black/20 py-1"
          )}
        >
          {options.map((option) => {
            const isSelected = selected.includes(option.value)
            
            return (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 cursor-pointer",
                  "text-sm text-white/80 hover:text-white hover:bg-white/5",
                  "transition-colors duration-150",
                  isSelected && "text-white bg-white/10"
                )}
              >
                {/* Checkbox for multi-select */}
                {multiSelect && (
                  <div 
                    className={cn(
                      "w-4 h-4 border border-white/30 rounded",
                      "flex items-center justify-center transition-colors",
                      isSelected && "bg-vybe-purple border-vybe-purple"
                    )}
                  >
                    {isSelected && (
                      <svg 
                        className="w-2.5 h-2.5 text-white" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                )}
                
                <span className="flex-1">{option.label}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// Filter container that handles connected buttons styling
interface FilterContainerProps {
  children: React.ReactNode
  onClearFilters?: () => void
  className?: string
}

export const FilterContainer: React.FC<FilterContainerProps> = ({ 
  children, 
  onClearFilters,
  className 
}) => {
  return (
    <div className={cn("mb-8", className)}>
      <div className="flex flex-col gap-0">
        {/* Filters Row */}
        <div className="flex gap-0 flex-wrap justify-start content-start mx-auto w-fit md:w-auto md:justify-center lg:justify-start">
          {children}
          
          {/* Clear Filters Button */}
          {onClearFilters && (
            <button
              onClick={onClearFilters}
              className={cn(
                "px-4 py-2.5 ml-2 bg-transparent border border-white/20 text-white/70",
                "hover:bg-white/5 hover:text-white hover:border-white/30",
                "text-sm rounded-lg transition-all duration-200"
              )}
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  )
}