"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { 
  ArrowLeft,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PrimaryCard, SecondaryCard } from "@/components/ui/card/CardVariants";

export default function TestStaticGuideViewPage() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set([0]));

  // Simulated modules and lessons structure
  const modules = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: "📚",
      lessons: [
        { 
          id: "1", 
          title: "Introduction to Testing", 
          content: `# Lesson 1: Introduction to Testing

**Welcome to the Getting Started module!**

In this lesson, we'll cover the fundamentals of testing. This is the foundation you need before moving to more advanced concepts.

## What You'll Learn
- Basic testing concepts and terminology
- Setting up your testing mindset
- Understanding test-driven development

## Key Concepts
- **Unit Tests**: Testing individual components in isolation
- **Integration Tests**: Testing how components work together  
- **End-to-End Tests**: Testing complete user workflows

\`\`\`javascript
// Your first test
function add(a, b) {
  return a + b;
}

console.log("Testing basic addition:", add(2, 3)); // 5
\`\`\`

This lesson establishes the foundation for everything we'll cover in this guide.`, 
          duration: 15 
        },
        { 
          id: "2", 
          title: "Setting up your environment", 
          content: `# Lesson 2: Setting up your environment

**Let's get your testing environment ready!**

Before we can write effective tests, we need to set up the proper tools and environment.

## Environment Setup Steps
1. Install testing framework
2. Configure test runner
3. Set up basic project structure
4. Create your first test file

## Tools We'll Use
- **Jest**: JavaScript testing framework
- **Testing Library**: Simple and complete testing utilities
- **Coverage Reports**: Track how much code is tested

\`\`\`bash
# Installation commands
npm install --save-dev jest @testing-library/react
npm install --save-dev @testing-library/jest-dom
\`\`\`

## Project Structure
\`\`\`
src/
  components/
  __tests__/
    unit/
    integration/
package.json
\`\`\`

Your environment is now ready for serious testing!`, 
          duration: 20 
        }
      ]
    },
    {
      id: "core-concepts",
      title: "Core Concepts",
      icon: "🧠", 
      lessons: [
        { 
          id: "3", 
          title: "Understanding test structures", 
          content: `# Lesson 3: Understanding test structures

**Master the anatomy of well-written tests.**

Every good test follows a clear structure that makes it easy to understand and maintain.

## The AAA Pattern
- **Arrange**: Set up test data and conditions
- **Act**: Execute the code being tested
- **Assert**: Verify the results match expectations

## Test Structure Example
\`\`\`javascript
describe('Calculator', () => {
  test('should add two numbers correctly', () => {
    // Arrange
    const calculator = new Calculator();
    const a = 5;
    const b = 3;
    
    // Act
    const result = calculator.add(a, b);
    
    // Assert
    expect(result).toBe(8);
  });
});
\`\`\`

## Best Practices
- Write descriptive test names
- Keep tests focused and simple
- Test one thing at a time
- Use meaningful assertions

## Common Test Patterns
1. **Happy Path**: Test expected behavior
2. **Edge Cases**: Test boundary conditions  
3. **Error Cases**: Test error handling

Understanding these structures will make your tests more reliable and maintainable.`, 
          duration: 25 
        },
        { 
          id: "4", 
          title: "Mocking and stubbing", 
          content: `# Lesson 4: Mocking and stubbing

**Learn to isolate your tests with mocks and stubs.**

Mocking allows us to test components in isolation by replacing dependencies with controlled substitutes.

## Why Mock?
- **Isolation**: Test one thing at a time
- **Speed**: Avoid slow external calls
- **Reliability**: Control test conditions
- **Safety**: Don't affect real systems

## Types of Test Doubles
- **Mock**: Verify interactions occurred
- **Stub**: Return predetermined values
- **Spy**: Watch function calls
- **Fake**: Working implementation with shortcuts

## Mock Examples
\`\`\`javascript
// Mocking a service
const mockUserService = {
  getUser: jest.fn().mockResolvedValue({ id: 1, name: 'John' })
};

// Testing with mocks
test('should display user name', async () => {
  const component = render(<UserProfile userService={mockUserService} />);
  
  await waitFor(() => {
    expect(screen.getByText('John')).toBeInTheDocument();
  });
  
  expect(mockUserService.getUser).toHaveBeenCalledTimes(1);
});
\`\`\`

## When to Mock
- External APIs and services
- Complex dependencies
- Time-dependent code
- File system operations

Mastering mocks will dramatically improve your testing capabilities!`, 
          duration: 30 
        }
      ]
    },
    {
      id: "advanced-patterns",
      title: "Advanced Patterns",
      icon: "⚡",
      lessons: [
        { 
          id: "5", 
          title: "Integration testing", 
          content: `# Lesson 5: Integration testing

**Test how your components work together.**

While unit tests focus on individual pieces, integration tests verify that multiple components collaborate correctly.

## Integration Test Scope
- **Component Integration**: Multiple components working together
- **Service Integration**: Testing service interactions
- **Database Integration**: Testing data layer interactions
- **API Integration**: Testing external service calls

## Testing Strategy
\`\`\`javascript
// Integration test example
test('user can complete signup flow', async () => {
  render(<App />);
  
  // Navigate to signup
  fireEvent.click(screen.getByText('Sign Up'));
  
  // Fill out form
  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: 'test@example.com' }
  });
  fireEvent.change(screen.getByLabelText('Password'), {
    target: { value: 'password123' }
  });
  
  // Submit and verify
  fireEvent.click(screen.getByText('Create Account'));
  
  await waitFor(() => {
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
  });
});
\`\`\`

## Best Practices
- Test realistic user scenarios
- Use actual data structures
- Test error boundaries
- Verify side effects

## Common Patterns
1. **Page Object Model**: Organize test interactions
2. **Test Fixtures**: Reusable test data
3. **Setup/Teardown**: Clean test environment

Integration tests give you confidence that your system works as a whole!`, 
          duration: 28 
        },
        { 
          id: "6", 
          title: "Performance testing", 
          content: `# Lesson 6: Performance testing

**Ensure your application performs under pressure.**

Performance testing helps identify bottlenecks and ensures your application scales well.

## Types of Performance Tests
- **Load Testing**: Normal expected load
- **Stress Testing**: Beyond normal capacity
- **Spike Testing**: Sudden load increases
- **Volume Testing**: Large amounts of data

## Performance Metrics
- **Response Time**: How fast responses return
- **Throughput**: Requests handled per second
- **Resource Usage**: CPU, memory, network
- **Error Rate**: Failures under load

## Testing Tools
\`\`\`javascript
// Performance test example
import { performance } from 'perf_hooks';

test('component renders within performance budget', () => {
  const start = performance.now();
  
  render(<ComplexComponent data={largeDataset} />);
  
  const end = performance.now();
  const renderTime = end - start;
  
  expect(renderTime).toBeLessThan(100); // 100ms budget
});
\`\`\`

## Optimization Strategies
1. **Code Splitting**: Load only what's needed
2. **Lazy Loading**: Defer non-critical content
3. **Memoization**: Cache expensive calculations
4. **Bundle Analysis**: Identify large dependencies

## Monitoring
- Set performance budgets
- Use continuous monitoring
- Track key user journeys
- Monitor real user metrics

Performance testing ensures your users have a smooth experience!`, 
          duration: 25 
        }
      ]
    },
    {
      id: "production-deployment",
      title: "Production Deployment",
      icon: "🚀",
      lessons: [
        { 
          id: "7", 
          title: "CI/CD integration", 
          content: `# Lesson 7: CI/CD integration

**Automate your testing pipeline for reliable deployments.**

Continuous Integration and Continuous Deployment ensure your tests run automatically and deployments are safe.

## CI/CD Benefits
- **Automated Testing**: Run tests on every change
- **Early Detection**: Catch issues before production
- **Consistent Environment**: Same setup every time
- **Fast Feedback**: Quick notification of problems

## Pipeline Stages
1. **Code Commit**: Developer pushes changes
2. **Build**: Compile and package application
3. **Test**: Run automated test suites
4. **Deploy**: Release to staging/production

## GitHub Actions Example
\`\`\`yaml
name: Test and Deploy
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm ci
      - run: npm test
      - run: npm run build
      
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - run: npm run deploy
\`\`\`

## Best Practices
- Run tests on every pull request
- Use different environments (dev, staging, prod)
- Implement deployment rollbacks
- Monitor deployment health

## Quality Gates
- All tests must pass
- Code coverage thresholds
- Security scans pass
- Performance budgets met

CI/CD integration makes your development process more reliable and efficient!`, 
          duration: 22 
        },
        { 
          id: "8", 
          title: "Monitoring and alerts", 
          content: `# Lesson 8: Monitoring and alerts

**Keep watch over your application in production.**

Monitoring helps you understand how your application performs in the real world and alerts you to issues.

## Monitoring Types
- **Application Monitoring**: Code performance and errors
- **Infrastructure Monitoring**: Server health and resources
- **User Experience Monitoring**: Real user interactions
- **Business Metrics**: Key performance indicators

## Key Metrics to Track
\`\`\`javascript
// Error tracking example
try {
  await processUserData(userData);
} catch (error) {
  // Log error with context
  logger.error('User data processing failed', {
    userId: userData.id,
    error: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString()
  });
  
  // Send to monitoring service
  monitoring.recordError(error, { userId: userData.id });
}
\`\`\`

## Monitoring Tools
- **Application**: Sentry, Datadog, New Relic
- **Infrastructure**: Prometheus, Grafana, CloudWatch
- **Logs**: ELK Stack, Splunk, Papertrail
- **Uptime**: Pingdom, UptimeRobot

## Alert Strategies
1. **Error Rate Spikes**: Unusual error increases
2. **Performance Degradation**: Slow response times
3. **Resource Exhaustion**: High CPU or memory usage
4. **Business Impact**: Revenue or conversion drops

## Dashboard Design
- Show most important metrics first
- Use clear visualizations
- Include historical context
- Enable drill-down capabilities

## On-Call Best Practices
- Clear escalation procedures
- Runbook documentation
- Post-incident reviews
- Continuous improvement

Effective monitoring ensures you can maintain high availability and user satisfaction!`, 
          duration: 30 
        }
      ]
    }
  ];

  // Flatten lessons for easy navigation
  const allLessons = modules.flatMap(module => 
    module.lessons.map(lesson => ({
      ...lesson,
      moduleId: module.id,
      moduleTitle: module.title,
      moduleIcon: module.icon
    }))
  );

  const currentLessonData = allLessons[currentLesson];
  const progressPercentage = ((completedLessons.size / allLessons.length) * 100);

  const handleLessonComplete = () => {
    setCompletedLessons(prev => new Set([...Array.from(prev), currentLesson]));
    
    // Auto-advance to next lesson if available
    if (currentLesson < allLessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200 dark:bg-gray-800">
        <div 
          className="h-full bg-gradient-to-r from-vybe-purple to-vybe-pink transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="page-container nebula-background min-h-screen">
        <div className="relative">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <Link href="/guides/test-static-guide/unlocked">
                <Button variant="ghost" className="text-vybe-gray-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Overview
                </Button>
              </Link>
              
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="border-vybe-gray-700">
                  Share
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
              {/* Sidebar - Lesson Navigation */}
              <div className="col-span-12 lg:col-span-3">
                <PrimaryCard title="Course Progress" className="lg:sticky lg:top-6" noHover>
                  {/* Overall Progress */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-vybe-gray-400">Overall Progress</span>
                      <span className="text-vybe-gray-300">{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                  
                  {/* Modules and Lessons List */}
                  <div className="space-y-4">
                    {modules.map((module, moduleIndex) => {
                      const moduleStartIndex = modules.slice(0, moduleIndex).reduce((acc, m) => acc + m.lessons.length, 0);
                      const moduleProgress = module.lessons.filter((_, lessonIndex) => 
                        completedLessons.has(moduleStartIndex + lessonIndex)).length;
                      const isModuleComplete = moduleProgress === module.lessons.length;
                      
                      return (
                        <div key={module.id} className="space-y-2">
                          {/* Module Header */}
                          <div className="flex items-center gap-3 px-2 py-1">
                            <span className="text-lg">{module.icon}</span>
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-white">{module.title}</h4>
                              <div className="text-xs text-vybe-gray-500">
                                {moduleProgress}/{module.lessons.length} lessons completed
                              </div>
                            </div>
                            {isModuleComplete && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                          
                          {/* Module Lessons */}
                          <div className="ml-6 space-y-1">
                            {module.lessons.map((lesson, lessonIndex) => {
                              const globalIndex = moduleStartIndex + lessonIndex;
                              return (
                                <button
                                  key={lesson.id}
                                  onClick={() => setCurrentLesson(globalIndex)}
                                  className={cn(
                                    "w-full text-left p-2 rounded-lg transition-all",
                                    currentLesson === globalIndex 
                                      ? "bg-vybe-purple/20 border border-vybe-purple/30" 
                                      : "hover:bg-vybe-gray-800"
                                  )}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className={cn(
                                      "w-4 h-4 rounded-full flex items-center justify-center text-xs mt-0.5",
                                      completedLessons.has(globalIndex) 
                                        ? "bg-green-500 text-white" 
                                        : currentLesson === globalIndex
                                        ? "bg-vybe-purple text-white"
                                        : "bg-vybe-gray-700 text-vybe-gray-400"
                                    )}>
                                      {completedLessons.has(globalIndex) ? (
                                        <CheckCircle className="w-2.5 h-2.5" />
                                      ) : (
                                        lessonIndex + 1
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <div className={cn(
                                        "text-xs font-medium",
                                        currentLesson === globalIndex ? "text-white" : "text-vybe-gray-300"
                                      )}>
                                        {lesson.title}
                                      </div>
                                      {lesson.duration && (
                                        <div className="text-xs text-vybe-gray-500 mt-0.5">
                                          {lesson.duration} min
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </PrimaryCard>
              </div>

              {/* Main Content */}
              <div className="col-span-12 lg:col-span-9">
                <PrimaryCard noHover>
                  {/* Lesson Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-vybe-gray-400 mb-2">
                      <span className="flex items-center gap-1">
                        {currentLessonData?.moduleIcon} {currentLessonData?.moduleTitle}
                      </span>
                      <span>•</span>
                      <span>Lesson {currentLesson + 1} of {allLessons.length}</span>
                      {currentLessonData?.duration && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {currentLessonData.duration} min
                          </span>
                        </>
                      )}
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4">
                      {currentLessonData?.title}
                    </h1>
                  </div>

                  {/* Lesson Content */}
                  <article className="prose prose-invert max-w-none">
                    <MarkdownRenderer content={currentLessonData?.content || ""} />
                  </article>

                  {/* Lesson Actions */}
                  <div className="flex items-center justify-between mt-12 pt-8 border-t border-vybe-gray-800">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
                      disabled={currentLesson === 0}
                      className="border-vybe-gray-700"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>

                    <Button
                      onClick={handleLessonComplete}
                      disabled={completedLessons.has(currentLesson)}
                      className={cn(
                        "bg-gradient-to-r from-vybe-purple to-vybe-pink text-white",
                        completedLessons.has(currentLesson) && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {completedLessons.has(currentLesson) ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        "Mark as Complete"
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => setCurrentLesson(Math.min(allLessons.length - 1, currentLesson + 1))}
                      disabled={currentLesson === allLessons.length - 1}
                      className="border-vybe-gray-700"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </PrimaryCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}