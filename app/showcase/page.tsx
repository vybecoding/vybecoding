'use client';

import React from 'react';
import { Container, Section, Stack, Grid, Box, Divider } from '@/components/ui/layout';
import { Heading, Text, Code, List, ListItem } from '@/components/ui/typography';
import { Card, AppCard, GuideCard, MemberCard } from '@/components/ui/card';
import { Button, ButtonGroup, IconButton } from '@/components/ui/button';
import { Input, Label, Textarea, Select, Checkbox, Radio, RadioGroup, FormField } from '@/components/ui/form';
import { Header, Footer, Logo } from '@/components/ui/navigation';
import { Modal, Dialog, ConfirmDialog } from '@/components/ui/modal';
import { Badge, Tag, TagGroup } from '@/components/ui/badge';
import { ArrowRight, Download, Heart, Mail, Lock, Eye, EyeOff, Star, Zap, TrendingUp } from 'lucide-react';

export default function SimpleShowcasePage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      
      <main className="pt-20 pb-8 px-8">
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

          <Divider />

          {/* Badges and Tags */}
          <Section>
            <Heading as="h2">Badge and Tag Components</Heading>
            <Stack gap="lg">
              {/* Badge Variants */}
              <Box>
                <Text size="sm" color="muted" className="mb-4">Badge Variants:</Text>
                <Stack gap="md">
                  <Stack direction="row" gap="md" align="center">
                    <Badge>Default</Badge>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="danger">Danger</Badge>
                    <Badge variant="info">Info</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </Stack>
                  
                  <Stack direction="row" gap="md" align="center">
                    <Badge size="sm">Small</Badge>
                    <Badge size="md">Medium</Badge>
                    <Badge size="lg">Large</Badge>
                    <Badge size="sm" icon={<Star size={12} />}>With Icon</Badge>
                    <Badge removable onRemove={() => console.log('Removed')}>Removable</Badge>
                  </Stack>
                </Stack>
              </Box>

              {/* Tag Examples */}
              <Box>
                <Text size="sm" color="muted" className="mb-4">Tag Examples:</Text>
                <Stack gap="md">
                  <TagGroup>
                    <Tag>javascript</Tag>
                    <Tag variant="primary">react</Tag>
                    <Tag variant="secondary">nextjs</Tag>
                    <Tag showHash={false}>no-hash</Tag>
                  </TagGroup>
                  
                  <TagGroup gap="lg">
                    <Tag href="#" size="sm">small-link</Tag>
                    <Tag href="#" size="md">medium-link</Tag>
                    <Tag href="#" size="lg">large-link</Tag>
                  </TagGroup>
                  
                  <TagGroup>
                    <Tag onClick={() => console.log('clicked')}>clickable</Tag>
                    <Tag variant="primary" onClick={() => console.log('clicked')}>primary-click</Tag>
                    <Tag variant="outline" onClick={() => console.log('clicked')}>outline-click</Tag>
                  </TagGroup>
                </Stack>
              </Box>
            </Stack>
          </Section>

          <Divider />

          {/* Navigation */}
          <Section>
            <Heading as="h2">Navigation Components</Heading>
            <Stack gap="lg">
              <Box padding="md" border="thin" rounded="lg">
                <Text size="sm" color="muted" className="mb-2">Logo Variations:</Text>
                <Stack direction="row" gap="lg" align="center">
                  <Logo size="sm" />
                  <Logo size="md" />
                  <Logo size="lg" />
                  <Logo size="md" showText={false} />
                </Stack>
              </Box>
              
              <Box>
                <Text size="sm" color="muted" className="mb-2">Header and Footer are shown at the top and bottom of this page</Text>
              </Box>
            </Stack>
          </Section>

          <Divider />

          {/* Modals and Dialogs */}
          <Section>
            <Heading as="h2">Modal and Dialog Components</Heading>
            <Stack gap="lg">
              <Stack direction="row" gap="md">
                <Button onClick={() => setModalOpen(true)}>
                  Open Modal
                </Button>
                <Button variant="secondary" onClick={() => setDialogOpen(true)}>
                  Open Dialog
                </Button>
                <Button variant="outline" onClick={() => setConfirmOpen(true)}>
                  Open Confirm Dialog
                </Button>
              </Stack>

              {/* Modal Example */}
              <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Example Modal"
                description="This is a modal with customizable content and footer"
                footer={
                  <>
                    <Button variant="ghost" onClick={() => setModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={() => setModalOpen(false)}>
                      Save Changes
                    </Button>
                  </>
                }
              >
                <Stack gap="md">
                  <FormField label="Name" required>
                    <Input placeholder="Enter your name" />
                  </FormField>
                  <FormField label="Description">
                    <Textarea placeholder="Add a description..." rows={3} />
                  </FormField>
                </Stack>
              </Modal>

              {/* Dialog Example */}
              <Dialog
                isOpen={dialogOpen}
                onClose={() => setDialogOpen(false)}
                type="success"
                title="Success!"
                message="Your changes have been saved successfully."
                confirmText="Great!"
              />

              {/* Confirm Dialog Example */}
              <ConfirmDialog
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                title="Delete Item?"
                message="Are you sure you want to delete this item? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={() => {
                  console.log('Item deleted');
                }}
              />
            </Stack>
          </Section>
        </Stack>
      </Container>
      </main>
      
      <Footer />
    </div>
  );
}