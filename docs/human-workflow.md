# Human Development Workflow - Minimal Interaction Mode

## Quick Reference for Autonomous BMAD Development

This guide shows only the human interactions needed during actual development. Setup instructions have moved to tech-stack.md.

### 🤖 Claude Handles Automatically
- Story selection and prioritization
- Task analysis and tracking
- Test execution and known error fixes  
- Progress monitoring and reporting
- Most approvals (>90% confidence)

### 👤 You Handle Only
- PRD creation
- True blockers (credentials, ambiguity)
- Architecture decisions
- Production deployment

## 🎯 Development Commands

### Starting Your Day
```bash
"what's ready?"          # Shows prioritized stories
"what's next?"           # Auto-selects best story
"work on [story]"        # Starts specific story
"create stories"         # From new PRD
"review progress"        # Shows task status
```

### During Development
```bash
# Claude handles these automatically:
- Story analysis and delegation
- Task coordination
- Test execution and fixes
- Progress tracking

# You only respond to:
- "Need API key for X"
- "Requirement unclear: Y"
- "Breaking change detected"
```

## 📋 PRD Creation (When Needed)

### Minimal PRD Format
```markdown
# Feature Name

## User Stories
- As a [user], I want [feature] so that [benefit]
- As a [admin], I want [capability] so that [outcome]

## Acceptance Criteria
- [ ] User can...
- [ ] System validates...
- [ ] Data persists...
```

### Then Just Say
```bash
"create stories from PRD"
# Claude handles the rest
```

## 🚨 When Claude Needs You

### True Blockers Only
```bash
# API Credentials
Claude: "Need STRIPE_API_KEY"
You: "STRIPE_API_KEY=sk_test_..."

# Ambiguous Requirements  
Claude: "'User-friendly' is unclear - need specifics"
You: "Large buttons, high contrast, screen reader compatible"

# Architecture Decisions
Claude: "Database choice: PostgreSQL or MongoDB?"
You: "PostgreSQL for strong consistency"

# Breaking Changes
Claude: "This changes public API signature"
You: "Approved - update version to 2.0"
```

## 📊 Progress Monitoring

### Passive Monitoring
```bash
# Optional - Claude tracks everything
"show progress"          # Quick status
"review session"         # Detailed review

# Real-time dashboard (separate terminal)
# View current task progress in logs
```

### Automatic Reviews
- Every 4 hours: Comprehensive session review
- Every 10 tool uses: Learning analysis
- On completion: Story summary

## 🚀 Deployment

### When Ready
```bash
"deploy to staging"      # Claude prepares deployment
"run integration tests"  # Full test suite
"deploy to production"   # Requires explicit approval
```

## 💡 Example Day

### Morning
```
You: what's ready?

Claude: 📋 3 stories ready:
⚡ USER-AUTH (high priority)
📄 PROFILE-MGMT (high priority)
📄 DASHBOARD (medium priority)

Starting USER-AUTH with auto-delegation...
🚀 Starting implementation...
```

### Midday
```
Claude: ✅ USER-AUTH complete
🎯 Starting PROFILE-MGMT...

⚠️ BLOCKER: Need CLOUDINARY_API_KEY

You: CLOUDINARY_API_KEY=abc123...

Claude: ✅ Continuing...
```

### Afternoon  
```
Claude: 📊 4-Hour Session Review:
- Completed: USER-AUTH, PROFILE-MGMT
- In Progress: DASHBOARD (65%)
- Patterns Applied: 12
- Time Saved: 3.2 hours

🎯 Continuing DASHBOARD...
```

## 🎨 Tips for Minimal Interaction

### Be Concise
```bash
# Instead of:
"Can you analyze the stories and tell me which one..."

# Just say:
"what's next?"
```

### Trust Automation
```bash
# Let Claude handle:
- Story selection
- Task delegation
- Error resolution
- Progress tracking

# Only intervene for:
- Real blockers
- Strategic decisions
```

### Batch Reviews
```bash
# Not needed:
- Constant status checks
- Micro-approvals
- Progress monitoring

# Better:
- Check session reviews
- Respond to blockers only
- Review at natural breaks
```

## 📝 Quick Reference

### Essential Commands
```bash
# Development
"what's ready?"          # Show ready stories
"work on X"              # Start specific story
"what's next?"           # Auto-select best story

# Creation
"create stories"         # From PRD
"add feature X"          # Quick story creation

# Monitoring
"show progress"          # Current status
"review session"         # Detailed review

# Deployment
"deploy to staging"      # Prepare deployment
"deploy to production"   # Requires approval
```

### Response Templates
```bash
# For credentials:
"KEY_NAME=value"

# For clarification:
"[specific requirement]"

# For decisions:
"option 1" or "approved"
```

## 🔥 Power User Mode

### Ultra-Minimal Workflow
```bash
Morning: "go"
Claude: [Works all day autonomously]
Evening: "status"
Claude: "✅ 3 stories complete, 1 in progress"
```

### Batch Everything
```bash
# Create multiple stories
"create stories for auth, payments, and dashboard"

# Bulk approvals
Claude: "3 items need approval: [list]"
You: "approve all"

# Session work
"work through priority stories until blocked"
```

### Trust Metrics
- 95%+ patterns = auto-applied
- 90%+ confidence = auto-approved  
- High priority = auto-started
- 4 hours = auto-reviewed

## 🎯 Summary

### You Provide
1. **PRDs** - What to build
2. **Credentials** - When needed
3. **Decisions** - Architecture only
4. **Approval** - Production only

### Claude Handles
- Everything else automatically
- 90% autonomous operation
- 2x faster development
- Continuous improvement

### Success Metrics
- **Before**: 15-20 prompts/story
- **After**: 3-5 prompts/story
- **Time Saved**: 80%
- **Quality**: Maintained or improved

This workflow transforms Claude from an assistant into an autonomous development system that only needs you for what truly matters.

This guide ensures you know exactly when and how to interact with the BMAD workflow for maximum efficiency while maintaining control over critical decisions.