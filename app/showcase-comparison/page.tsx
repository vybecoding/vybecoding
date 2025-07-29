'use client';

import React from 'react';
import { Container, Section, Stack, Grid, Box, Divider } from '@/components/ui/layout';
import { Heading, Text } from '@/components/ui/typography';

// Old components (custom)
import { Button as OldButton } from '@/components/ui/button';
import { Input as OldInput, Label as OldLabel, Textarea as OldTextarea, Select as OldSelect, Checkbox as OldCheckbox } from '@/components/ui/form';
import { Card as OldCard } from '@/components/ui/card';
import { Badge as OldBadge } from '@/components/ui/badge';
import { Modal as OldModal, Dialog as OldDialog } from '@/components/ui/modal';

// New components (Shadcn)
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function ShowcaseComparisonPage() {
  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <Container>
        <Stack gap="xl">
          <Section>
            <Heading as="h1" color="gradient" align="center">
              Component Migration Comparison
            </Heading>
            <Text color="muted" align="center">
              Side-by-side comparison of custom vs Shadcn components
            </Text>
          </Section>

          <Divider />

          {/* Buttons */}
          <Section>
            <Heading as="h2">Buttons</Heading>
            <Grid cols={2} gap="lg">
              <Box>
                <Text size="sm" weight="bold" className="mb-4">Custom Button</Text>
                <Stack direction="row" gap="md">
                  <OldButton>Default</OldButton>
                  <OldButton variant="primary">Primary</OldButton>
                  <OldButton variant="secondary">Secondary</OldButton>
                  <OldButton variant="outline">Outline</OldButton>
                </Stack>
              </Box>
              <Box>
                <Text size="sm" weight="bold" className="mb-4">Shadcn Button</Text>
                <Stack direction="row" gap="md">
                  <Button>Default</Button>
                  <Button variant="default">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                </Stack>
              </Box>
            </Grid>
          </Section>

          <Divider />

          {/* Forms */}
          <Section>
            <Heading as="h2">Form Components</Heading>
            <Grid cols={2} gap="lg">
              <Box>
                <Text size="sm" weight="bold" className="mb-4">Custom Forms</Text>
                <Stack gap="md">
                  <Box>
                    <OldLabel>Email</OldLabel>
                    <OldInput type="email" placeholder="email@example.com" />
                  </Box>
                  <Box>
                    <OldLabel>Message</OldLabel>
                    <OldTextarea placeholder="Enter message..." />
                  </Box>
                  <Box>
                    <OldCheckbox /> Accept terms
                  </Box>
                </Stack>
              </Box>
              <Box>
                <Text size="sm" weight="bold" className="mb-4">Shadcn Forms</Text>
                <Stack gap="md">
                  <Box>
                    <Label>Email</Label>
                    <Input type="email" placeholder="email@example.com" />
                  </Box>
                  <Box>
                    <Label>Message</Label>
                    <Textarea placeholder="Enter message..." />
                  </Box>
                  <Box className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms">Accept terms</Label>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          </Section>

          <Divider />

          {/* Cards */}
          <Section>
            <Heading as="h2">Cards</Heading>
            <Grid cols={2} gap="lg">
              <Box>
                <Text size="sm" weight="bold" className="mb-4">Custom Card</Text>
                <OldCard>
                  <Heading as="h3">Card Title</Heading>
                  <Text>Card content goes here</Text>
                </OldCard>
              </Box>
              <Box>
                <Text size="sm" weight="bold" className="mb-4">Shadcn Card</Text>
                <Card>
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Card content goes here</p>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Section>

          <Divider />

          {/* Badges */}
          <Section>
            <Heading as="h2">Badges</Heading>
            <Grid cols={2} gap="lg">
              <Box>
                <Text size="sm" weight="bold" className="mb-4">Custom Badge</Text>
                <Stack direction="row" gap="md">
                  <OldBadge>Default</OldBadge>
                  <OldBadge variant="primary">Primary</OldBadge>
                  <OldBadge variant="success">Success</OldBadge>
                </Stack>
              </Box>
              <Box>
                <Text size="sm" weight="bold" className="mb-4">Shadcn Badge</Text>
                <Stack direction="row" gap="md">
                  <Badge>Default</Badge>
                  <Badge variant="default">Primary</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </Stack>
              </Box>
            </Grid>
          </Section>

          <Divider />

          {/* Toasts */}
          <Section>
            <Heading as="h2">Toast Notifications</Heading>
            <Grid cols={2} gap="lg">
              <Box>
                <Text size="sm" weight="bold" className="mb-4">Custom Toast</Text>
                <Text size="sm" color="muted">Uses our custom toast system</Text>
              </Box>
              <Box>
                <Text size="sm" weight="bold" className="mb-4">Shadcn Toast (Sonner)</Text>
                <Button onClick={() => toast.success('Success toast!')}>
                  Show Toast
                </Button>
              </Box>
            </Grid>
          </Section>
        </Stack>
      </Container>
    </div>
  );
}