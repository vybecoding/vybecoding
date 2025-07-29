import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProfileView } from '@/components/profile/ProfileView';
import { Id } from '@/convex/_generated/dataModel';

// Mock the profile components that aren't directly tested here
jest.mock('@/components/profile/ProfileSocialLinks', () => ({
  ProfileSocialLinks: ({ github, linkedin, twitter }: any) => (
    <div data-testid="social-links">
      {github && <span>GitHub: {github}</span>}
      {linkedin && <span>LinkedIn: {linkedin}</span>}
      {twitter && <span>Twitter: {twitter}</span>}
    </div>
  )
}));

jest.mock('@/components/profile/ProfileStats', () => ({
  ProfileStats: ({ userId }: any) => (
    <div data-testid="profile-stats">Stats for {userId}</div>
  )
}));

const mockUser = {
  _id: "user123" as Id<"users">,
  clerkId: "clerk123",
  email: "test@example.com",
  firstName: "John",
  lastName: "Doe",
  displayName: "John Doe",
  bio: "Full stack developer passionate about React and Node.js",
  avatar: "https://example.com/avatar.jpg",
  location: "San Francisco, CA",
  website: "https://johndoe.dev",
  github: "github.com/johndoe",
  linkedin: "linkedin.com/in/johndoe",
  twitter: "twitter.com/johndoe",
  skills: ["React", "Node.js", "TypeScript", "Python"],
  profileVisibility: "public" as const,
  isProfileComplete: true,
  profileCompletedAt: Date.now() - 86400000,
  lastActiveAt: Date.now() - 3600000,
  createdAt: Date.now() - 2592000000, // 30 days ago
};

describe('ProfileView', () => {
  it('renders user profile information correctly', () => {
    render(<ProfileView user={mockUser} />);
    
    // Check display name
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    
    // Check bio
    expect(screen.getByText(/Full stack developer passionate/)).toBeInTheDocument();
    
    // Check location
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
    
    // Check skills
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  it('shows edit button for own profile', () => {
    const onEditProfile = jest.fn();
    
    render(
      <ProfileView 
        user={mockUser} 
        isOwnProfile={true} 
        onEditProfile={onEditProfile} 
      />
    );
    
    const editButton = screen.getByText('Edit Profile');
    expect(editButton).toBeInTheDocument();
    
    fireEvent.click(editButton);
    expect(onEditProfile).toHaveBeenCalledTimes(1);
  });

  it('does not show edit button for other users profiles', () => {
    render(<ProfileView user={mockUser} isOwnProfile={false} />);
    
    expect(screen.queryByText('Edit Profile')).not.toBeInTheDocument();
  });

  it('shows profile completion notice for incomplete own profile', () => {
    const incompleteUser = {
      ...mockUser,
      isProfileComplete: false
    };
    
    const onEditProfile = jest.fn();
    
    render(
      <ProfileView 
        user={incompleteUser} 
        isOwnProfile={true} 
        onEditProfile={onEditProfile} 
      />
    );
    
    expect(screen.getByText(/Complete your profile to get discovered/)).toBeInTheDocument();
    
    const completeButton = screen.getByText('Complete now →');
    fireEvent.click(completeButton);
    expect(onEditProfile).toHaveBeenCalledTimes(1);
  });

  it('does not show completion notice for other users', () => {
    const incompleteUser = {
      ...mockUser,
      isProfileComplete: false
    };
    
    render(<ProfileView user={incompleteUser} isOwnProfile={false} />);
    
    expect(screen.queryByText(/Complete your profile/)).not.toBeInTheDocument();
  });

  it('handles missing optional fields gracefully', () => {
    const minimalUser = {
      _id: "user123" as Id<"users">,
      clerkId: "clerk123",
      email: "test@example.com",
      createdAt: Date.now() - 2592000000,
    };
    
    render(<ProfileView user={minimalUser} />);
    
    // Should show anonymous user as fallback
    expect(screen.getByText('Anonymous User')).toBeInTheDocument();
  });

  it('renders social links and stats components', () => {
    render(<ProfileView user={mockUser} />);
    
    expect(screen.getByTestId('social-links')).toBeInTheDocument();
    expect(screen.getByTestId('profile-stats')).toBeInTheDocument();
  });

  it('formats join date correctly', () => {
    render(<ProfileView user={mockUser} />);
    
    // Should show "Joined" text
    expect(screen.getByText(/Joined/)).toBeInTheDocument();
  });

  it('shows website link when provided', () => {
    render(<ProfileView user={mockUser} />);
    
    const websiteLink = screen.getByText('Website');
    expect(websiteLink).toBeInTheDocument();
    expect(websiteLink.closest('a')).toHaveAttribute('href', 'https://johndoe.dev');
  });
});