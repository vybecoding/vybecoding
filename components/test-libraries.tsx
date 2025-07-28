import React from 'react'
import { Button } from '@/components/ui/button'
import { Heart, Star, Moon } from 'lucide-react'

export function TestLibraries() {
  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold">Library Test</h2>
      
      {/* Test Lucide Icons */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Lucide Icons:</h3>
        <div className="flex gap-4">
          <Heart className="w-6 h-6 text-red-500" />
          <Star className="w-6 h-6 text-yellow-500" />
          <Moon className="w-6 h-6 text-blue-500" />
        </div>
      </div>
      
      {/* Test Shadcn/ui Button */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Shadcn/ui Components:</h3>
        <div className="flex gap-2">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
    </div>
  )
}