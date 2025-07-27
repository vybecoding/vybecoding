# VybeHacks Integration for BMAD Method

This document configures the integration between BMAD agents/sub-agents and VybeHacks systems (TRAIL, hooks, CLAUDE.md rules).

## Integration Architecture

```
BMAD Agents
    ↓
VybeHacks Layer
    ├── TRAIL System (Error Learning)
    ├── Hook Automation (Auto-commits, etc.)
    ├── CLAUDE.md Rules (Security, Quality)
    └── VERIFY-FIRST (Reality Checks)
    ↓
Sub-Agents (Parallel Execution)
```

## TRAIL System Integration

### 1. Agent-Level Integration

All BMAD agents should integrate with TRAIL for error resolution and learning:

```bash
# Before starting any task
.solutions/search.sh "{{task_description}}"

# On error
.solutions/verify-and-learn.sh

# On success
.solutions/log-solution.sh "{{solution_context}}"
```

### 2. Sub-Agent TRAIL Protocol

Each sub-agent must:
- Search TRAIL before implementing
- Log all errors for learning
- Share solutions with other sub-agents

```yaml
trail_integration:
  before_task: |
    SOLUTION=$(.solutions/search.sh "${TASK_DESCRIPTION}")
    if [ -n "$SOLUTION" ]; then
      echo "Found previous solution: $SOLUTION"
      # Apply solution
    fi
  
  on_error: |
    ERROR_CONTEXT=$(captureErrorContext)
    .solutions/verify-and-learn.sh "$ERROR_CONTEXT"
  
  on_success: |
    SOLUTION_CONTEXT=$(captureSolutionContext)
    .solutions/log-solution.sh "$SOLUTION_CONTEXT"
```

### 3. Knowledge Sharing Protocol

```javascript
// Broadcast solutions to all active sub-agents
const broadcastSolution = async (solution) => {
  const activeSubAgents = getActiveSubAgents();
  
  for (const agent of activeSubAgents) {
    await notifyAgent(agent, {
      type: 'TRAIL_SOLUTION',
      pattern: solution.error_pattern,
      fix: solution.solution,
      confidence: solution.confidence
    });
  }
};
```

## Hook Automation Integration

### 1. Auto-Commit Enhancement

The auto-commit hook now tracks which sub-agent made changes:

```bash
# Enhanced commit message format
claude-03-[01/27 03:45PM]: update user profile [MEDIUM:3 files] [sub-frontend-impl]
```

### 2. Hook Triggers by Agent Type

```yaml
hook_triggers:
  dev_agent:
    post_implementation: "auto-commit-claude.sh"
    post_test: "test-results-capture.sh"
    
  sm_agent:
    post_story_creation: "story-quality-check.sh"
    
  qa_agent:
    post_review: "generate-review.sh"
    
  sub_agents:
    all: "auto-commit-claude.sh"
    test_runner: "continuous-test-report.sh"
    security_scan: "security-alert.sh"
```

### 3. Session Review Integration

```bash
# Generate review including sub-agent metrics
.solutions/generate-review.sh --include-sub-agents

# Output includes:
# - Tasks completed by each sub-agent
# - Parallelization efficiency
# - Cross-agent coordination metrics
```

## CLAUDE.md Rules Enforcement

### 1. Development Principles

All agents and sub-agents must follow:

```markdown
## Minimal Code Impact Rule
- Every change affects smallest code necessary
- Tracked automatically in commits
- Enforced by complexity scoring

## NO TEMPORARY FIXES
- TRAIL ensures permanent solutions
- All fixes logged for reuse
- Temporary fixes rejected by QA
```

### 2. Security Rules Auto-Application

```javascript
// Automatic security rule enforcement
const enforceSecurityRules = {
  validator: (code) => {
    // Auto-add validator.js to all inputs
    if (hasUserInput(code) && !hasValidation(code)) {
      return addValidation(code);
    }
  },
  
  domPurify: (code) => {
    // Auto-add DOMPurify to HTML rendering
    if (hasHTMLRendering(code) && !hasSanitization(code)) {
      return addSanitization(code);
    }
  },
  
  safeCompare: (code) => {
    // Auto-fix timing attacks
    if (hasTokenComparison(code) && !hasSafeCompare(code)) {
      return useSafeCompare(code);
    }
  }
};
```

### 3. Parallel Execution Rules

```yaml
bmad_parallel_rules:
  - "Always delegate parallelizable tasks"
  - "Track complexity per sub-agent"
  - "Integrate results before completion"
  - "Use TodoWrite for coordination"
  - "Apply TRAIL learning across agents"
```

## VERIFY-FIRST Integration

### 1. Reality Checks for Agents

```javascript
// Before any external claim
const verifyFirst = async (claim) => {
  if (claim.type === 'URL') {
    return await webFetch(claim.url);
  }
  if (claim.type === 'PACKAGE') {
    return await bash(`npm info ${claim.package}`);
  }
  if (claim.type === 'FEATURE') {
    return await grep(claim.pattern);
  }
};
```

### 2. Sub-Agent Verification Protocol

```yaml
verification_required:
  - External API endpoints
  - Package availability
  - Feature existence
  - Performance claims
  - Security assertions
```

## Implementation Checklist

### For BMAD Agents

- [ ] Add TRAIL search before tasks
- [ ] Implement error capture and learning
- [ ] Integrate with auto-commit hooks
- [ ] Follow CLAUDE.md security rules
- [ ] Apply VERIFY-FIRST for claims

### For Sub-Agents

- [ ] Include TRAIL integration in each sub-agent
- [ ] Tag commits with sub-agent identifier
- [ ] Follow minimal code impact principle
- [ ] Implement verification protocols
- [ ] Share solutions with other agents

### For Orchestration

- [ ] Track metrics in session reviews
- [ ] Coordinate TRAIL knowledge sharing
- [ ] Monitor hook execution
- [ ] Enforce security rules
- [ ] Aggregate learning insights

## Usage Examples

### 1. Dev Agent with TRAIL

```bash
/dev implement USER-001

[Dev]: Checking TRAIL for similar implementations...
[TRAIL]: Found 3 relevant solutions:
  - User profile component (confidence: 95%)
  - API validation pattern (confidence: 88%)
  - Test structure template (confidence: 92%)

[Dev]: Applying known solutions and delegating tasks...
```

### 2. Sub-Agent Learning

```
[sub-frontend-impl]: Error: Cannot read property 'user' of undefined
[TRAIL]: Searching for solution...
[TRAIL]: Found: Add optional chaining - user?.profile
[sub-frontend-impl]: Applied fix, continuing...
[TRAIL]: Solution logged for future use
```

### 3. Security Auto-Fix

```javascript
// Before (flagged by security rules)
const token = req.body.token;
if (token === storedToken) {

// After (auto-fixed)
const token = validator.escape(req.body.token || '');
if (safeCompare(token, storedToken)) {
```

## Benefits

1. **3-5x Faster Development**: Parallel execution + learned solutions
2. **Higher Quality**: Automatic security fixes + pattern reuse
3. **Continuous Improvement**: Every error makes system smarter
4. **Reality-Based**: No hallucinated features or claims
5. **Complete Tracking**: Every change documented and attributed

This integration creates a self-improving, parallel, secure development system that leverages the best of both BMAD structure and VybeHacks automation.