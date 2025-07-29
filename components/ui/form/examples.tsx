"use client";

import React from 'react';
import { Input, Label, Textarea, Checkbox } from '@/components/ui/form';
import { Select, Radio, RadioGroup } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

export function FormExamples() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Input Fields</h3>
        <div className="space-y-4 max-w-md">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" />
          </div>
          
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Enter your message" rows={4} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Select Component</h3>
        <div className="max-w-md">
          <Label htmlFor="category">Category</Label>
          <Select id="category" defaultValue="">
            <option value="">Select a category</option>
            <option value="web">Web Development</option>
            <option value="mobile">Mobile Development</option>
            <option value="data">Data Science</option>
          </Select>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Radio Groups</h3>
        <div className="max-w-md">
          <Label>Preferred Framework</Label>
          <RadioGroup name="framework" defaultValue="react">
            <div className="flex items-center space-x-2">
              <Radio id="react" value="react" />
              <Label htmlFor="react">React</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Radio id="vue" value="vue" />
              <Label htmlFor="vue">Vue</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Radio id="angular" value="angular" />
              <Label htmlFor="angular">Angular</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Checkboxes</h3>
        <div className="space-y-2 max-w-md">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">I accept the terms and conditions</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="newsletter" />
            <Label htmlFor="newsletter">Subscribe to newsletter</Label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Complete Form</h3>
        <form className="space-y-4 max-w-md">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" placeholder="John Doe" />
          </div>
          
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" placeholder="Tell us about yourself" rows={3} />
          </div>
          
          <div>
            <Label htmlFor="role">Role</Label>
            <Select id="role">
              <option value="">Select a role</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="manager">Manager</option>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="public" />
            <Label htmlFor="public">Make profile public</Label>
          </div>
          
          <Button type="submit" className="w-full">
            Save Profile
          </Button>
        </form>
      </div>
    </div>
  );
}