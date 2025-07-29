"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AppCard, GuideCard, MemberCard, NewsCard } from '@/components/ui/card';

export function CardExamples() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Card</CardTitle>
              <CardDescription>A simple card component</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is basic card content.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Another Card</CardTitle>
              <CardDescription>With different content</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Different content in this card.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Specialized Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AppCard
            title="Sample App"
            description="A sample application card"
            category="Web App"
            author="Developer"
            rating={4.5}
            downloads={1200}
            imageUrl="/placeholder.jpg"
            href="/apps/sample"
          />

          <GuideCard
            title="Sample Guide"
            description="A sample guide card"
            category="Tutorial"
            author="Author"
            readTime="5 min"
            publishedAt="2024-01-01"
            imageUrl="/placeholder.jpg"
            href="/guides/sample"
          />

          <MemberCard
            name="John Doe"
            title="Senior Developer"
            bio="Experienced full-stack developer"
            avatar="/placeholder.jpg"
            skills={["React", "TypeScript", "Node.js"]}
            href="/members/john-doe"
          />
        </div>
      </div>
    </div>
  );
}