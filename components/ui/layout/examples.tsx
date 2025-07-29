import React from 'react';
import { 
  Container, 
  Section, 
  Grid, 
  Stack, 
  Box, 
  Spacer, 
  Center, 
  Divider 
} from './index';
import { Heading, Text, Code } from '../typography';
import { Card } from '../card';

export const LayoutExamples = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section Example */}
      <Section spacing="xl" background="gradient" border="bottom">
        <Container>
          <Center className="min-h-[60vh]">
            <Stack gap="lg" align="center">
              <Heading as="h1" color="gradient" align="center">
                Layout Component System
              </Heading>
              <Text size="lg" color="muted" align="center" className="max-w-2xl">
                A comprehensive set of responsive layout components for building 
                consistent, beautiful interfaces with ease.
              </Text>
              <Stack direction="row" gap="md">
                <button className="px-6 py-3 bg-accent-cyan text-white rounded-lg">
                  Get Started
                </button>
                <button className="px-6 py-3 border border-gray-700 rounded-lg">
                  View Docs
                </button>
              </Stack>
            </Stack>
          </Center>
        </Container>
      </Section>

      {/* Container Sizes */}
      <Section spacing="lg">
        <Container>
          <Heading as="h2" className="mb-8">Container Sizes</Heading>
        </Container>
        
        <Stack gap="md">
          <Container size="sm" className="bg-gray-900 p-4 rounded">
            <Text>Small Container (max-w-3xl)</Text>
          </Container>
          <Container size="md" className="bg-gray-900 p-4 rounded">
            <Text>Medium Container (max-w-5xl)</Text>
          </Container>
          <Container size="lg" className="bg-gray-900 p-4 rounded">
            <Text>Large Container (max-w-7xl) - Default</Text>
          </Container>
          <Container size="xl" className="bg-gray-900 p-4 rounded">
            <Text>Extra Large Container (max-w-[90rem])</Text>
          </Container>
        </Stack>
      </Section>

      {/* Grid Layouts */}
      <Section spacing="lg" background="subtle">
        <Container>
          <Stack gap="xl">
            <div>
              <Heading as="h2">Grid Layouts</Heading>
              <Text color="muted">Responsive grid system with automatic breakpoints</Text>
            </div>

            <Stack gap="lg">
              <Heading as="h3" size="sm">Auto Grid</Heading>
              <Grid cols="auto" gap="md">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <Box key={i} padding="md" rounded="lg" border="thin" className="bg-gray-900">
                    <Text align="center">Item {i}</Text>
                  </Box>
                ))}
              </Grid>
            </Stack>

            <Stack gap="lg">
              <Heading as="h3" size="sm">Fixed Columns</Heading>
              <Grid cols={3} gap="lg">
                <Box padding="lg" rounded="lg" className="bg-gray-900">
                  <Heading as="h4">Column 1</Heading>
                  <Text color="muted">Content goes here</Text>
                </Box>
                <Box padding="lg" rounded="lg" className="bg-gray-900">
                  <Heading as="h4">Column 2</Heading>
                  <Text color="muted">Content goes here</Text>
                </Box>
                <Box padding="lg" rounded="lg" className="bg-gray-900">
                  <Heading as="h4">Column 3</Heading>
                  <Text color="muted">Content goes here</Text>
                </Box>
              </Grid>
            </Stack>

            <Stack gap="lg">
              <Heading as="h3" size="sm">12-Column Grid</Heading>
              <Grid cols={12} gap="md">
                <Box className="col-span-8 bg-gray-900 p-6 rounded-lg">
                  <Text>Main Content (8 columns)</Text>
                </Box>
                <Box className="col-span-4 bg-gray-900 p-6 rounded-lg">
                  <Text>Sidebar (4 columns)</Text>
                </Box>
              </Grid>
            </Stack>
          </Stack>
        </Container>
      </Section>

      {/* Stack Examples */}
      <Section spacing="lg">
        <Container>
          <Stack gap="xl">
            <div>
              <Heading as="h2">Stack Layouts</Heading>
              <Text color="muted">Flexible layouts with consistent spacing</Text>
            </div>

            <Grid cols={2} gap="lg">
              <Stack gap="md">
                <Heading as="h3" size="sm">Vertical Stack</Heading>
                <Box padding="md" rounded="lg" border="thin">
                  <Stack gap="sm">
                    <Box padding="sm" className="bg-gray-800 rounded">Item 1</Box>
                    <Box padding="sm" className="bg-gray-800 rounded">Item 2</Box>
                    <Box padding="sm" className="bg-gray-800 rounded">Item 3</Box>
                  </Stack>
                </Box>
              </Stack>

              <Stack gap="md">
                <Heading as="h3" size="sm">Horizontal Stack</Heading>
                <Box padding="md" rounded="lg" border="thin">
                  <Stack direction="row" gap="sm" align="center">
                    <Box padding="sm" className="bg-gray-800 rounded">A</Box>
                    <Box padding="sm" className="bg-gray-800 rounded">B</Box>
                    <Box padding="sm" className="bg-gray-800 rounded">C</Box>
                  </Stack>
                </Box>
              </Stack>
            </Grid>

            <Box padding="lg" rounded="lg" border="thin">
              <Stack gap="md">
                <Heading as="h3" size="sm">Complex Stack Layout</Heading>
                <Stack direction="row" justify="between" align="center">
                  <Stack gap="xs">
                    <Heading as="h4">Product Name</Heading>
                    <Text color="muted" size="sm">by Company Name</Text>
                  </Stack>
                  <Stack direction="row" gap="sm" align="center">
                    <Code>v2.1.0</Code>
                    <button className="px-4 py-2 bg-accent-cyan text-white rounded">
                      Install
                    </button>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Section>

      {/* Divider Examples */}
      <Section spacing="lg" background="dark">
        <Container>
          <Stack gap="xl">
            <Heading as="h2">Dividers</Heading>
            
            <Stack gap="lg">
              <Stack gap="md">
                <Text>Default Divider</Text>
                <Divider />
                <Text>Content after divider</Text>
              </Stack>

              <Stack gap="md">
                <Text>Gradient Divider</Text>
                <Divider color="gradient" />
                <Text>Content after divider</Text>
              </Stack>

              <Stack gap="md">
                <Text>Divider with Label</Text>
                <Divider label="OR" />
                <Text>Alternative content</Text>
              </Stack>

              <Stack gap="md">
                <Text>Thick Divider with Large Spacing</Text>
                <Divider size="thick" spacing="lg" />
                <Text>Well separated content</Text>
              </Stack>

              <Box padding="md" rounded="lg" border="thin">
                <Stack direction="row" gap="md" align="center">
                  <button className="px-4 py-2 bg-gray-800 rounded">Option A</button>
                  <Divider orientation="vertical" />
                  <button className="px-4 py-2 bg-gray-800 rounded">Option B</button>
                  <Divider orientation="vertical" />
                  <button className="px-4 py-2 bg-gray-800 rounded">Option C</button>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Section>

      {/* Spacer Examples */}
      <Section spacing="lg">
        <Container>
          <Stack gap="xl">
            <Heading as="h2">Spacers</Heading>
            
            <Box padding="lg" rounded="lg" border="thin">
              <Stack direction="row" align="center">
                <Text>Logo</Text>
                <Spacer grow />
                <Stack direction="row" gap="sm">
                  <Text>Home</Text>
                  <Text>About</Text>
                  <Text>Contact</Text>
                </Stack>
              </Stack>
            </Box>

            <Box padding="lg" rounded="lg" border="thin">
              <Stack direction="row">
                <button className="px-4 py-2 bg-gray-800 rounded">Save</button>
                <Spacer size="md" direction="horizontal" />
                <button className="px-4 py-2 bg-gray-800 rounded">Cancel</button>
                <Spacer size="xl" direction="horizontal" />
                <button className="px-4 py-2 bg-red-900 rounded">Delete</button>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Section>

      {/* Real-world Example */}
      <Section spacing="xl" background="pattern">
        <Container>
          <Stack gap="xl">
            <Center>
              <Stack gap="md" align="center">
                <Heading as="h2" color="gradient">Real-world Example</Heading>
                <Text color="muted">A complete page layout using all components</Text>
              </Stack>
            </Center>

            <Grid cols={12} gap="lg">
              {/* Sidebar */}
              <Box className="col-span-12 lg:col-span-3">
                <Stack gap="md">
                  <Box padding="md" rounded="lg" className="bg-gray-900">
                    <Stack gap="sm">
                      <Text weight="semibold">Navigation</Text>
                      <Divider />
                      <Stack gap="xs">
                        <Text size="sm">Dashboard</Text>
                        <Text size="sm">Projects</Text>
                        <Text size="sm">Team</Text>
                        <Text size="sm">Settings</Text>
                      </Stack>
                    </Stack>
                  </Box>
                  
                  <Box padding="md" rounded="lg" className="bg-gray-900">
                    <Stack gap="sm">
                      <Text weight="semibold">Quick Stats</Text>
                      <Divider />
                      <Stack gap="xs">
                        <Stack direction="row" justify="between">
                          <Text size="sm" color="muted">Projects</Text>
                          <Text size="sm">12</Text>
                        </Stack>
                        <Stack direction="row" justify="between">
                          <Text size="sm" color="muted">Tasks</Text>
                          <Text size="sm">48</Text>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
              </Box>

              {/* Main Content */}
              <Box className="col-span-12 lg:col-span-9">
                <Stack gap="lg">
                  {/* Header */}
                  <Box padding="lg" rounded="lg" className="bg-gray-900">
                    <Stack direction="row" justify="between" align="center">
                      <Stack gap="xs">
                        <Heading as="h3">Project Dashboard</Heading>
                        <Text color="muted" size="sm">Manage your projects and tasks</Text>
                      </Stack>
                      <button className="px-4 py-2 bg-accent-cyan text-white rounded-lg">
                        New Project
                      </button>
                    </Stack>
                  </Box>

                  {/* Content Grid */}
                  <Grid cols={2} gap="md">
                    <Card>
                      <Stack gap="sm">
                        <Heading as="h4">Active Tasks</Heading>
                        <Text size="3xl" weight="bold" color="primary">24</Text>
                        <Text color="muted" size="sm">8 due this week</Text>
                      </Stack>
                    </Card>
                    
                    <Card>
                      <Stack gap="sm">
                        <Heading as="h4">Completed</Heading>
                        <Text size="3xl" weight="bold" color="success">142</Text>
                        <Text color="muted" size="sm">+12 this month</Text>
                      </Stack>
                    </Card>
                  </Grid>

                  {/* Recent Activity */}
                  <Box padding="lg" rounded="lg" className="bg-gray-900">
                    <Stack gap="md">
                      <Heading as="h4">Recent Activity</Heading>
                      <Divider />
                      <Stack gap="sm">
                        {[1, 2, 3].map(i => (
                          <Stack key={i} direction="row" gap="sm" align="center">
                            <Box padding="xs" rounded="full" className="bg-gray-800">
                              <div className="w-2 h-2 bg-accent-cyan rounded-full" />
                            </Box>
                            <Stack gap="xs" className="flex-1">
                              <Text size="sm">Task completed in Project {i}</Text>
                              <Text size="xs" color="muted">2 hours ago</Text>
                            </Stack>
                          </Stack>
                        ))}
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          </Stack>
        </Container>
      </Section>
    </div>
  );
};