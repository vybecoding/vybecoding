import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProfileEdit } from '@/components/profile/ProfileEdit';
import { Id } from '@/convex/_generated/dataModel';

// Mock the useToast hook
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    addToast: jest.fn()
  })
}));

// Mock the AvatarUpload component
jest.mock('@/components/profile/AvatarUpload', () => ({
  AvatarUpload: ({ currentAvatar, onUpload, userId }: any) => (
    <div data-testid="avatar-upload">
      <span>Current: {currentAvatar || 'none'}</span>
      <button onClick={() => onUpload('new-avatar-url')}>Upload</button>
    </div>
  )
}));

// Mock validator.js
jest.mock('validator', () => ({
  isLength: jest.fn((val: string, options: any) => 
    val.length >= options.min && val.length <= options.max
  ),
  isURL: jest.fn((val: string) => val.startsWith('http')),
}));

// Mock DOMPurify
jest.mock('dompurify', () => ({
  sanitize: jest.fn((input: string) => input)
}));

const mockUser = {
  _id: "user123" as Id<"users">,
  clerkId: "clerk123",
  displayName: "John Doe",
  bio: "Full stack developer",
  avatar: "https://example.com/avatar.jpg",
  location: "San Francisco, CA",
  website: "https://johndoe.dev",
  github: "github.com/johndoe",
  linkedin: "linkedin.com/in/johndoe",
  twitter: "twitter.com/johndoe",
  skills: ["React", "Node.js"],
  profileVisibility: "public" as const,
};

describe('ProfileEdit', () => {
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form with user data pre-filled', () => {
    render(
      <ProfileEdit 
        user={mockUser} 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
      />
    );
    
    // Check that form fields are pre-filled
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Full stack developer')).toBeInTheDocument();
    expect(screen.getByDisplayValue('San Francisco, CA')).toBeInTheDocument();
    expect(screen.getByDisplayValue('https://johndoe.dev')).toBeInTheDocument();
  });

  it('allows editing basic profile information', async () => {
    const user = userEvent.setup();
    
    render(
      <ProfileEdit 
        user={mockUser} 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
      />
    );
    
    // Update display name
    const displayNameInput = screen.getByDisplayValue('John Doe');
    await user.clear(displayNameInput);
    await user.type(displayNameInput, 'Jane Smith');
    
    // Update bio
    const bioInput = screen.getByDisplayValue('Full stack developer');
    await user.clear(bioInput);
    await user.type(bioInput, 'Frontend developer specializing in React');
    
    // Submit form
    const saveButton = screen.getByText('Save Profile');
    await user.click(saveButton);
    
    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith(
        expect.objectContaining({
          displayName: 'Jane Smith',
          bio: 'Frontend developer specializing in React'
        })
      );
    });
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    
    render(
      <ProfileEdit 
        user={mockUser} 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
      />
    );
    
    // Clear required display name
    const displayNameInput = screen.getByDisplayValue('John Doe');
    await user.clear(displayNameInput);
    
    // Try to submit
    const saveButton = screen.getByText('Save Profile');
    await user.click(saveButton);
    
    // Should show validation error
    await waitFor(() => {
      expect(screen.getByText(/Display name must be at least 2 characters/)).toBeInTheDocument();
    });
    
    expect(mockOnSave).not.toHaveBeenCalled();
  });

  it('validates URL fields', async () => {
    const user = userEvent.setup();
    
    render(
      <ProfileEdit 
        user={mockUser} 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
      />
    );
    
    // Enter invalid URL
    const websiteInput = screen.getByDisplayValue('https://johndoe.dev');
    await user.clear(websiteInput);
    await user.type(websiteInput, 'invalid-url');
    
    // Try to submit
    const saveButton = screen.getByText('Save Profile');
    await user.click(saveButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid URL/)).toBeInTheDocument();
    });
    
    expect(mockOnSave).not.toHaveBeenCalled();
  });

  it('allows adding and removing skills', async () => {
    const user = userEvent.setup();
    
    render(
      <ProfileEdit 
        user={mockUser} 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
      />
    );
    
    // Check existing skills are displayed
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    
    // Add new skill
    const skillInput = screen.getByPlaceholderText(/Add a skill/);
    await user.type(skillInput, 'TypeScript');
    
    const addButton = screen.getByRole('button', { name: /plus/i });
    await user.click(addButton);
    
    // Check new skill was added
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    
    // Remove a skill by clicking on it
    const reactSkill = screen.getByText('React');
    await user.click(reactSkill);
    
    // React skill should be removed
    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });

  it('handles profile visibility changes', async () => {
    const user = userEvent.setup();
    
    render(
      <ProfileEdit 
        user={mockUser} 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
      />
    );
    
    // Change visibility to private
    const visibilitySelect = screen.getByDisplayValue(/Public/);
    await user.click(visibilitySelect);
    
    const privateOption = screen.getByText(/Private - Only you can view/);
    await user.click(privateOption);
    
    // Submit form
    const saveButton = screen.getByText('Save Profile');
    await user.click(saveButton);
    
    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith(
        expect.objectContaining({
          profileVisibility: 'private'
        })
      );
    });
  });

  it('calls onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <ProfileEdit 
        user={mockUser} 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
      />
    );
    
    const cancelButton = screen.getByText('Cancel');
    await user.click(cancelButton);
    
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('disables form when loading', () => {
    render(
      <ProfileEdit 
        user={mockUser} 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
        isLoading={true}
      />
    );
    
    const saveButton = screen.getByText('Saving...');
    expect(saveButton).toBeDisabled();
    
    const cancelButton = screen.getByText('Cancel');
    expect(cancelButton).toBeDisabled();
  });

  it('handles avatar upload', async () => {
    const user = userEvent.setup();
    
    render(
      <ProfileEdit 
        user={mockUser} 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
      />
    );
    
    // Find and click the avatar upload button
    const uploadButton = screen.getByText('Upload');
    await user.click(uploadButton);
    
    // Submit form to verify avatar is included
    const saveButton = screen.getByText('Save Profile');
    await user.click(saveButton);
    
    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith(
        expect.objectContaining({
          avatar: 'new-avatar-url'
        })
      );
    });
  });
});