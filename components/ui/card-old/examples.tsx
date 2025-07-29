/**
 * Card Component System Examples
 * 
 * This file demonstrates how to use the universal card system
 * to avoid CSS conflicts and maintain consistency.
 */

import React from 'react';
import { 
  Card, 
  CardGrid, 
  GuideCard, 
  AppCard, 
  MemberCard, 
  NewsCard 
} from './index';

export const CardExamples = () => {
  return (
    <div className="space-y-8 p-8">
      <h1 className="text-2xl font-bold">Card Component System Examples</h1>
      
      {/* Basic Card Grid */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Basic Card Grid</h2>
        <CardGrid columns="auto" gap="md">
          <Card variant="default" onClick={() => console.log('Card clicked')}>
            <h3 className="text-lg font-semibold">Default Card</h3>
            <p className="text-gray-400">This is a basic card with minimal styling.</p>
          </Card>
          
          <Card variant="guide" date={new Date()}>
            <h3 className="text-lg font-semibold">Guide Card Variant</h3>
            <p className="text-gray-400">Automatically includes GUIDE label and date.</p>
          </Card>
          
          <Card 
            variant="app" 
            stats={<span className="text-sm text-gray-500">1.2k downloads</span>}
          >
            <h3 className="text-lg font-semibold">App Card with Stats</h3>
            <p className="text-gray-400">Stats section is pinned to the bottom.</p>
          </Card>
        </CardGrid>
      </section>

      {/* Guide Cards */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Guide Cards</h2>
        <CardGrid columns={3} gap="lg">
          <GuideCard
            title="Getting Started with React Hooks"
            author={{ name: "John Doe", avatar: "/avatars/john.jpg" }}
            description="Learn the fundamentals of React Hooks and how to use them effectively in your applications."
            tags={["React", "Hooks", "JavaScript"]}
            views={5432}
            likes={234}
            difficulty="beginner"
            duration="20 min"
            date={new Date()}
            onClick={() => console.log('Guide clicked')}
          />
          
          <GuideCard
            title="Advanced TypeScript Patterns"
            author={{ name: "Jane Smith" }}
            description="Deep dive into advanced TypeScript patterns and type gymnastics."
            tags={["TypeScript", "Advanced", "Patterns"]}
            views={3210}
            likes={189}
            difficulty="advanced"
            duration="45 min"
            date="Jan 15, 2024"
          />
          
          <GuideCard
            title="Building Scalable APIs"
            author={{ name: "Mike Johnson", avatar: "/avatars/mike.jpg" }}
            tags={["API", "Node.js", "Architecture"]}
            views={8765}
            likes={567}
            difficulty="intermediate"
            duration="30 min"
          />
        </CardGrid>
      </section>

      {/* App Cards */}
      <section>
        <h2 className="text-xl font-semibold mb-4">App Cards</h2>
        <CardGrid columns={4} gap="md">
          <AppCard
            title="Code Editor Pro"
            developer="DevTools Inc"
            description="A powerful code editor with AI assistance"
            icon="/apps/editor-icon.png"
            category="Development"
            pricing="freemium"
            rating={4.8}
            downloads={12500}
            tags={["Editor", "AI"]}
          />
          
          <AppCard
            title="Task Manager"
            developer="Productivity Co"
            category="Productivity"
            pricing="free"
            rating={4.5}
            downloads={8900}
            tags={["Tasks", "GTD"]}
          />
          
          <AppCard
            title="Design System Kit"
            developer="UI Labs"
            description="Complete design system for modern apps"
            category="Design"
            pricing="paid"
            rating={4.9}
            downloads={3200}
          />
          
          <AppCard
            title="API Tester"
            developer="Test Tools"
            category="Development"
            pricing="free"
            rating={4.3}
            downloads={5600}
          />
        </CardGrid>
      </section>

      {/* Member Cards */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Member Cards</h2>
        <CardGrid columns={4} gap="md">
          <MemberCard
            name="Sarah Wilson"
            avatar="/members/sarah.jpg"
            role="Full Stack Developer"
            expertise={["React", "Node.js", "TypeScript", "AWS"]}
            location="San Francisco"
            isAvailable={true}
            rating={4.9}
            hourlyRate={150}
          />
          
          <MemberCard
            name="David Chen"
            role="UI/UX Designer"
            expertise={["Figma", "Prototyping", "Design Systems"]}
            location="New York"
            isAvailable={false}
            rating={4.8}
            hourlyRate={120}
          />
          
          <MemberCard
            name="Emily Brown"
            avatar="/members/emily.jpg"
            role="DevOps Engineer"
            expertise={["K8s", "Docker", "CI/CD", "AWS", "Terraform"]}
            location="London"
            isAvailable={true}
            rating={5.0}
            hourlyRate={180}
          />
          
          <MemberCard
            name="Alex Rivera"
            role="Mobile Developer"
            expertise={["React Native", "Flutter", "iOS"]}
            isAvailable={true}
            rating={4.7}
          />
        </CardGrid>
      </section>

      {/* News Cards */}
      <section>
        <h2 className="text-xl font-semibold mb-4">News Cards</h2>
        <CardGrid columns={3} gap="lg">
          <NewsCard
            title="React 19 Released with Major Performance Improvements"
            excerpt="The React team announces React 19 with significant performance enhancements and new features."
            author={{ name: "React Team", avatar: "/authors/react.jpg" }}
            readTime="5 min"
            category="Framework"
            image="/news/react-19.jpg"
            tags={["React", "Performance"]}
            date={new Date()}
          />
          
          <NewsCard
            title="The Future of AI in Web Development"
            excerpt="Exploring how AI is transforming the way we build and deploy web applications."
            author={{ name: "Tech Reporter" }}
            readTime="8 min"
            category="AI"
            tags={["AI", "Future", "Web Dev"]}
            date="Jan 18, 2024"
          />
          
          <NewsCard
            title="Best Practices for Secure API Development"
            excerpt="Essential security practices every developer should follow when building APIs."
            readTime="6 min"
            category="Security"
            tags={["Security", "API", "Best Practices"]}
            date="Jan 10, 2024"
          />
        </CardGrid>
      </section>

      {/* Mixed Content Grid */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Mixed Content (Responsive Auto Grid)</h2>
        <CardGrid columns="auto" gap="md" maxWidth="full">
          <GuideCard
            title="CSS Grid Mastery"
            author={{ name: "CSS Expert" }}
            tags={["CSS", "Grid", "Layout"]}
            views={2100}
            difficulty="intermediate"
          />
          
          <AppCard
            title="Color Picker Pro"
            developer="Design Tools"
            category="Design"
            pricing="free"
            rating={4.6}
          />
          
          <NewsCard
            title="New Web Standards Announced"
            excerpt="W3C announces new standards for web components and accessibility."
            category="Standards"
            date={new Date()}
          />
          
          <MemberCard
            name="Tech Mentor"
            role="Senior Architect"
            expertise={["Architecture", "Mentoring"]}
            isAvailable={true}
            hourlyRate={200}
          />
        </CardGrid>
      </section>
    </div>
  );
};