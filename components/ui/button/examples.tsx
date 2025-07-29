"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ButtonGroup, IconButton } from '@/components/ui/button';
import { Download, Heart, Share } from 'lucide-react';

export function ButtonExamples() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Button Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Button Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Icon Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <IconButton icon={Download} aria-label="Download" />
          <IconButton icon={Heart} aria-label="Like" variant="outline" />
          <IconButton icon={Share} aria-label="Share" variant="ghost" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Button Groups</h3>
        <ButtonGroup>
          <Button variant="outline">First</Button>
          <Button variant="outline">Second</Button>
          <Button variant="outline">Third</Button>
        </ButtonGroup>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Loading States</h3>
        <div className="flex flex-wrap gap-4">
          <Button disabled>Disabled</Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            With Icon
          </Button>
        </div>
      </div>
    </div>
  );
}