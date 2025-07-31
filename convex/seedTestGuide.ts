import { v } from "convex/values";
import { mutation } from "./_generated/server";

// Seed a test guide for development and testing
export const seedTestGuide = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Get the current user
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    
    if (!user) throw new Error("User not found");

    // Check if test guide already exists
    const existingGuide = await ctx.db
      .query("guides")
      .withIndex("by_slug", (q) => q.eq("slug", "test-guide-placeholder"))
      .first();

    if (existingGuide) {
      return { 
        success: true, 
        message: "Test guide already exists", 
        guideId: existingGuide._id,
        slug: existingGuide.slug 
      };
    }

    // Create comprehensive test content
    const testContent = `# 🧪 TEST GUIDE - PLACEHOLDER CONTENT

> **⚠️ This is a test guide for development purposes only. All content is placeholder text.**

## Introduction to Testing

This test guide demonstrates all the features of our guide system. It includes multiple sections, code examples, and interactive elements to ensure everything works correctly.

### What You'll Learn

This is placeholder content to test the guide rendering system:

- ✅ How markdown rendering works
- ✅ Code syntax highlighting
- ✅ Interactive elements
- ✅ Progress tracking
- ✅ Lesson navigation

## Getting Started with Testing

Let's begin with a simple example to test code rendering:

\`\`\`javascript
// Test code block
function testFunction() {
  console.log("🧪 This is a test!");
  return {
    status: "success",
    message: "Test completed"
  };
}

// Call the test function
const result = testFunction();
console.log(result);
\`\`\`

### Basic Concepts

Here's some placeholder text to test paragraph rendering. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

#### Key Points to Remember:

1. **First Point**: This is the first test point with **bold text**
2. **Second Point**: This includes *italic text* for emphasis
3. **Third Point**: This has a [test link](#) to verify link rendering
4. **Fourth Point**: This tests \`inline code\` rendering

## Advanced Testing Concepts

### Testing Lists

**Unordered List:**
- First item
- Second item with sub-items:
  - Sub-item A
  - Sub-item B
- Third item

**Ordered List:**
1. First numbered item
2. Second numbered item
3. Third numbered item

### Testing Tables

| Feature | Status | Notes |
|---------|--------|-------|
| Markdown | ✅ Working | Basic markdown rendering |
| Code Blocks | ✅ Working | Syntax highlighting active |
| Tables | ✅ Working | Table rendering confirmed |
| Images | 🧪 Testing | Placeholder for image tests |

### Testing Blockquotes

> This is a test blockquote to verify styling.
> It can span multiple lines and should have distinct styling.

### Testing Horizontal Rules

Here's content before the rule.

---

Here's content after the rule.

## Code Examples in Different Languages

### Python Example

\`\`\`python
# Test Python syntax highlighting
def test_function(name):
    """A simple test function"""
    print(f"Hello, {name}! This is a test.")
    return {"status": "success", "tested_by": name}

# Execute test
result = test_function("Developer")
print(result)
\`\`\`

### TypeScript Example

\`\`\`typescript
// Test TypeScript syntax highlighting
interface TestResult {
  status: 'success' | 'failure';
  message: string;
  timestamp: Date;
}

function runTest(testName: string): TestResult {
  console.log(\`Running test: \${testName}\`);
  return {
    status: 'success',
    message: 'Test completed successfully',
    timestamp: new Date()
  };
}

const result = runTest('Guide System Test');
\`\`\`

## Interactive Elements Test

### Task Checklist

- [x] Set up development environment
- [x] Install dependencies
- [ ] Run test suite
- [ ] Deploy to production

### Emoji Support Test

Testing various emojis: 🚀 🎯 💡 🔥 ⚡ 🌟 ✨ 🎨 🛠️ 📚

## Conclusion

This test guide has demonstrated all major features of our guide rendering system. If you can read this and all elements above rendered correctly, the system is working as expected!

---

**Remember:** This is a test guide with placeholder content. For real guides, please browse our actual content library.`;

    // Create test lessons
    const testLessons = [
      {
        title: "🧪 Lesson 1: Introduction to Testing",
        content: `# Lesson 1: Introduction to Testing\n\n**This is test lesson content.**\n\nIn this lesson, we'll cover the basics of testing. This is placeholder content to verify lesson navigation works correctly.\n\n## Key Concepts\n- Test concept 1\n- Test concept 2\n- Test concept 3\n\n\`\`\`javascript\nconsole.log("Lesson 1 test code");\n\`\`\``,
        duration: 5,
        order: 0
      },
      {
        title: "🧪 Lesson 2: Advanced Testing",
        content: `# Lesson 2: Advanced Testing\n\n**This is test lesson 2 content.**\n\nNow we move on to more advanced testing concepts. This lesson tests the navigation between lessons.\n\n## Advanced Topics\n1. Advanced topic 1\n2. Advanced topic 2\n3. Advanced topic 3\n\n> Test blockquote in lesson 2`,
        duration: 10,
        order: 1
      },
      {
        title: "🧪 Lesson 3: Testing Best Practices",
        content: `# Lesson 3: Testing Best Practices\n\n**This is test lesson 3 content.**\n\nLearn about best practices for testing. This content verifies multi-lesson navigation.\n\n### Best Practices Checklist\n- [ ] Write clear test names\n- [ ] Test edge cases\n- [ ] Keep tests simple\n- [ ] Document test purpose`,
        duration: 8,
        order: 2
      },
      {
        title: "🧪 Lesson 4: Final Test Review",
        content: `# Lesson 4: Final Test Review\n\n**This is the final test lesson.**\n\nCongratulations on completing all test lessons! This verifies the lesson completion system.\n\n## Summary\nYou've successfully navigated through all test lessons. The system is working correctly if you can:\n- ✅ Navigate between lessons\n- ✅ Track progress\n- ✅ Mark lessons as complete\n- ✅ See this final lesson\n\n🎉 **Test Complete!**`,
        duration: 5,
        order: 3
      }
    ];

    // Create test resources
    const testResources = [
      {
        name: "📄 Test Resource 1 - Documentation",
        url: "https://github.com/test/placeholder-docs",
        type: "github" as const
      },
      {
        name: "🔗 Test Resource 2 - External Link", 
        url: "https://example.com/test-resource",
        type: "website" as const
      },
      {
        name: "📚 Test Resource 3 - Tutorial",
        url: "https://github.com/test/placeholder-tutorial",
        type: "github" as const
      }
    ];

    // Create the test guide
    const guideId = await ctx.db.insert("guides", {
      title: "🧪 TEST GUIDE - Development Placeholder",
      slug: "test-guide-placeholder",
      content: testContent,
      excerpt: "⚠️ This is a test guide for development purposes. All content is placeholder text for testing the guide system functionality.",
      category: "development",
      difficulty: "beginner",
      tags: ["test", "placeholder", "development", "demo"],
      authorId: user._id,
      status: "published",
      views: 42,
      completions: 7,
      readingTime: 15,
      publishedAt: Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    });

    return { 
      success: true, 
      message: "Test guide created successfully!", 
      guideId,
      slug: "test-guide-placeholder"
    };
  },
});

// Delete the test guide
export const deleteTestGuide = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Find the test guide
    const testGuide = await ctx.db
      .query("guides")
      .withIndex("by_slug", (q) => q.eq("slug", "test-guide-placeholder"))
      .first();

    if (!testGuide) {
      return { success: false, message: "Test guide not found" };
    }

    // Delete associated reading progress
    const progressRecords = await ctx.db
      .query("guideReadingProgress")
      .withIndex("by_guide", (q) => q.eq("guideId", testGuide._id))
      .collect();

    for (const record of progressRecords) {
      await ctx.db.delete(record._id);
    }

    // Delete the guide
    await ctx.db.delete(testGuide._id);

    return { 
      success: true, 
      message: "Test guide deleted successfully" 
    };
  },
});