'use client';

import React from 'react';
import { Container, Section, Stack, Grid, Box, Divider } from '@/components/ui/layout';
import { Heading, Text, Code, List, ListItem } from '@/components/ui/typography';
import { Card, AppCard, GuideCard, MemberCard } from '@/components/ui/card';
import { Button, ButtonGroup, IconButton } from '@/components/ui/button';
import { Input, Label, Textarea, Select, Checkbox, Radio, RadioGroup, FormField } from '@/components/ui/form';
import { ArrowRight, Download, Heart, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function SimpleShowcasePage() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <Container>
        <Stack gap="xl">
          <Section>
            <Heading as="h1" color="gradient" align="center">
              Component Showcase
            </Heading>
            <Text color="muted" align="center">
              All components implemented in the vybecoding platform
            </Text>
          </Section>

          <Divider />

          {/* Cards */}
          <Section>
            <Heading as="h2">Card Components</Heading>
            <Grid cols={3} gap="lg">
              <Card variant="default">
                <Heading as="h3">Default Card</Heading>
                <Text>Basic card with content</Text>
              </Card>
              
              <GuideCard
                title="React Best Practices"
                author={{ name: "John Doe" }}
                description="Learn React the right way"
                tags={["React", "JavaScript"]}
                views={1000}
                likes={50}
                difficulty="intermediate"
              />
              
              <AppCard
                title="Code Editor"
                developer="DevCorp"
                category="Development"
                pricing="free"
                rating={4.5}
                downloads={5000}
              />
            </Grid>
          </Section>

          <Divider />

          {/* Typography */}
          <Section>
            <Heading as="h2">Typography</Heading>
            <Stack gap="md">
              <Heading as="h1">Heading Level 1</Heading>
              <Heading as="h2">Heading Level 2</Heading>
              <Heading as="h3">Heading Level 3</Heading>
              <Text>Regular body text</Text>
              <Text color="muted">Muted text</Text>
              <Text size="lg" weight="bold">Large bold text</Text>
              <Code>const example = "inline code";</Code>
              <List>
                <ListItem>First item</ListItem>
                <ListItem>Second item</ListItem>
              </List>
            </Stack>
          </Section>

          <Divider />

          {/* Layout */}
          <Section>
            <Heading as="h2">Layout Components</Heading>
            <Grid cols={2} gap="md">
              <Box padding="md" border="thin" rounded="lg">
                <Text>Box with padding and border</Text>
              </Box>
              <Box padding="lg" className="bg-gray-900" rounded="lg">
                <Text>Box with background</Text>
              </Box>
            </Grid>
          </Section>

          <Divider />

          {/* Buttons */}
          <Section>
            <Heading as="h2">Button Components</Heading>
            <Stack gap="md">
              <Stack direction="row" gap="md">
                <Button>Default</Button>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </Stack>
              
              <Stack direction="row" gap="md">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </Stack>
              
              <Stack direction="row" gap="md">
                <Button leftIcon={<Download size={16} />}>Download</Button>
                <Button rightIcon={<ArrowRight size={16} />}>Continue</Button>
                <IconButton aria-label="Like">
                  <Heart size={20} />
                </IconButton>
              </Stack>
              
              <ButtonGroup>
                <Button variant="outline">One</Button>
                <Button variant="outline">Two</Button>
                <Button variant="outline">Three</Button>
              </ButtonGroup>
            </Stack>
          </Section>

          <Divider />

          {/* Forms */}
          <Section>
            <Heading as="h2">Form Components</Heading>
            <Grid cols={2} gap="lg">
              <Stack gap="md">
                <FormField label="Email" required>
                  <Input type="email" placeholder="email@example.com" leftIcon={<Mail size={18} />} />
                </FormField>
                
                <FormField label="Password" required>
                  <Input 
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    leftIcon={<Lock size={18} />}
                    rightIcon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    onRightIconClick={() => setShowPassword(!showPassword)}
                  />
                </FormField>
                
                <FormField label="Message">
                  <Textarea placeholder="Enter your message..." rows={4} />
                </FormField>
              </Stack>
              
              <Stack gap="md">
                <FormField label="Country">
                  <Select
                    options={[
                      { value: 'us', label: 'United States' },
                      { value: 'uk', label: 'United Kingdom' },
                      { value: 'ca', label: 'Canada' },
                    ]}
                    placeholder="Select country"
                  />
                </FormField>
                
                <Box>
                  <Label>Preferences</Label>
                  <Stack gap="sm">
                    <label className="flex items-center gap-2">
                      <Checkbox />
                      <Text size="sm">Email notifications</Text>
                    </label>
                    <label className="flex items-center gap-2">
                      <Checkbox defaultChecked />
                      <Text size="sm">SMS notifications</Text>
                    </label>
                  </Stack>
                </Box>
                
                <Box>
                  <Label>Plan</Label>
                  <RadioGroup>
                    <label className="flex items-center gap-2">
                      <Radio name="plan" value="free" defaultChecked />
                      <Text size="sm">Free</Text>
                    </label>
                    <label className="flex items-center gap-2">
                      <Radio name="plan" value="pro" />
                      <Text size="sm">Pro - $19/month</Text>
                    </label>
                  </RadioGroup>
                </Box>
              </Stack>
            </Grid>
          </Section>
        </Stack>
      </Container>
    </div>
  );
}