#!/usr/bin/env node

/**
 * BMAD Orchestration Bridge
 * Connects BMAD agents with the orchestration manager for parallel execution
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const OrchestrationManager = require('./orchestration-manager');

class BMADOrchestrationBridge {
    constructor() {
        this.orchestrator = new OrchestrationManager();
        this.storyParser = new StoryParser();
        this.agentInterface = new AgentInterface();
    }

    /**
     * Parse BMAD story file and prepare for orchestration
     */
    async parseAndPrepareStory(storyPath) {
        const story = this.storyParser.parse(storyPath);
        
        // Extract tasks from story format
        const tasks = this.extractTasksFromStory(story);
        
        // Analyze dependencies from acceptance criteria
        const dependencies = this.analyzeDependenciesFromStory(story);
        
        // Create orchestration plan
        const plan = {
            storyId: story.id,
            title: story.title,
            tasks: tasks,
            dependencies: dependencies,
            phases: this.orchestrator.createExecutionPhases(tasks, dependencies),
            estimatedTime: this.orchestrator.estimateExecutionTime(tasks),
            parallelizationOpportunity: this.calculateParallelizationScore(tasks, dependencies)
        };
        
        return plan;
    }

    /**
     * Extract tasks from BMAD story structure
     */
    extractTasksFromStory(story) {
        const tasks = [];
        let taskId = 1;
        
        // Parse main tasks
        if (story.tasks) {
            story.tasks.forEach(task => {
                tasks.push({
                    id: `TASK-${taskId++}`,
                    description: task.description,
                    type: this.classifyTask(task.description),
                    complexity: this.estimateComplexity(task),
                    subtasks: task.subtasks || [],
                    dependencies: []
                });
            });
        }
        
        return tasks;
    }

    /**
     * Classify task type for sub-agent assignment
     */
    classifyTask(description) {
        const lower = description.toLowerCase();
        
        if (lower.includes('component') || lower.includes('ui') || lower.includes('frontend')) {
            return 'frontend';
        }
        if (lower.includes('api') || lower.includes('endpoint') || lower.includes('backend')) {
            return 'backend';
        }
        if (lower.includes('test') || lower.includes('spec')) {
            return 'test';
        }
        if (lower.includes('integrate') || lower.includes('connect')) {
            return 'integration';
        }
        
        return 'general';
    }

    /**
     * Execute story with parallel orchestration
     */
    async executeStoryWithOrchestration(storyPath) {
        console.log('\n🚀 BMAD Orchestrated Execution Starting...\n');
        
        // Step 1: Prepare story for orchestration
        const plan = await this.parseAndPrepareStory(storyPath);
        
        // Step 2: Display execution plan
        this.displayExecutionPlan(plan);
        
        // Step 3: Get user confirmation
        const confirmed = await this.getUserConfirmation();
        if (!confirmed) {
            console.log('Execution cancelled.');
            return;
        }
        
        // Step 4: Update story file with orchestration status
        this.updateStoryWithOrchestrationStatus(storyPath, 'ORCHESTRATING');
        
        // Step 5: Execute phases
        const results = await this.executePhasesWithMonitoring(plan);
        
        // Step 6: Aggregate and validate results
        const aggregatedResults = await this.orchestrator.aggregateResults();
        
        // Step 7: Update story file with results
        this.updateStoryWithResults(storyPath, aggregatedResults);
        
        // Step 8: Generate report
        const report = this.orchestrator.generateReport(aggregatedResults);
        console.log('\n📊 Execution Report Generated\n');
        
        return aggregatedResults;
    }

    /**
     * Execute phases with real-time monitoring
     */
    async executePhasesWithMonitoring(plan) {
        const results = [];
        
        for (const [index, phase] of plan.phases.entries()) {
            console.log(`\n=== Phase ${index + 1} of ${plan.phases.length} ===`);
            console.log(`Tasks: ${phase.map(t => t.id).join(', ')}\n`);
            
            // Distribute tasks to sub-agents
            const distributions = await this.distributeToSubAgents(phase);
            
            // Monitor execution
            await this.monitorPhaseExecution(distributions);
            
            // Collect phase results
            const phaseResults = await this.collectPhaseResults(distributions);
            results.push(phaseResults);
            
            // Validate phase before continuing
            if (!this.validatePhaseResults(phaseResults)) {
                throw new Error(`Phase ${index + 1} validation failed`);
            }
        }
        
        return results;
    }

    /**
     * Distribute tasks to appropriate sub-agents
     */
    async distributeToSubAgents(phaseTasks) {
        const distributions = [];
        
        for (const task of phaseTasks) {
            const subAgent = this.selectSubAgentForTask(task);
            
            // Create task command for sub-agent
            const command = this.createSubAgentCommand(subAgent, task);
            
            // Track distribution
            distributions.push({
                taskId: task.id,
                subAgent: subAgent,
                command: command,
                status: 'DISPATCHED',
                startTime: new Date().toISOString()
            });
            
            // Update TodoWrite
            this.updateTodoWithSubAgent(task, subAgent);
        }
        
        return distributions;
    }

    /**
     * Select most appropriate sub-agent for task
     */
    selectSubAgentForTask(task) {
        const typeMapping = {
            'frontend': '/sub-frontend-impl',
            'backend': '/sub-backend-impl',
            'test': '/sub-test-impl',
            'integration': '/sub-integration',
            'general': '/sub-dispatcher'
        };
        
        return typeMapping[task.type] || '/sub-dispatcher';
    }

    /**
     * Monitor phase execution progress
     */
    async monitorPhaseExecution(distributions) {
        const updateInterval = 5000; // 5 seconds
        let completed = 0;
        
        while (completed < distributions.length) {
            // Check status of each distribution
            for (const dist of distributions) {
                if (dist.status !== 'COMPLETED') {
                    const status = await this.checkSubAgentStatus(dist);
                    dist.status = status.state;
                    dist.progress = status.progress;
                    
                    if (status.state === 'COMPLETED') {
                        completed++;
                        dist.endTime = new Date().toISOString();
                    }
                }
            }
            
            // Display progress
            this.displayProgress(distributions);
            
            if (completed < distributions.length) {
                await this.sleep(updateInterval);
            }
        }
    }

    /**
     * Display execution plan to user
     */
    displayExecutionPlan(plan) {
        console.log('📋 Orchestration Plan\n');
        console.log(`Story: ${plan.storyId} - ${plan.title}`);
        console.log(`Total Tasks: ${plan.tasks.length}`);
        console.log(`Execution Phases: ${plan.phases.length}`);
        console.log(`Estimated Time: ${plan.estimatedTime}`);
        console.log(`Parallelization Score: ${plan.parallelizationOpportunity}%\n`);
        
        plan.phases.forEach((phase, index) => {
            console.log(`Phase ${index + 1}:`);
            phase.forEach(task => {
                console.log(`  - ${task.id}: ${task.description} [${task.type}]`);
            });
        });
    }

    /**
     * Display real-time progress
     */
    displayProgress(distributions) {
        console.clear();
        console.log('⚡ Parallel Execution Progress\n');
        
        distributions.forEach(dist => {
            const progress = dist.progress || 0;
            const bar = this.createProgressBar(progress);
            const status = dist.status === 'COMPLETED' ? '✓' : '⟳';
            
            console.log(`${status} ${dist.taskId} [${dist.subAgent}]`);
            console.log(`  ${bar} ${progress}%\n`);
        });
    }

    /**
     * Create visual progress bar
     */
    createProgressBar(progress) {
        const filled = Math.floor(progress / 10);
        const empty = 10 - filled;
        return '█'.repeat(filled) + '░'.repeat(empty);
    }

    /**
     * Update story file with orchestration results
     */
    updateStoryWithResults(storyPath, results) {
        const story = fs.readFileSync(storyPath, 'utf8');
        
        // Add orchestration section
        const orchestrationSection = `
## Orchestration Results

- Execution Mode: Parallel
- Total Duration: ${results.metrics.totalDuration}
- Parallelization Efficiency: ${results.metrics.parallelizationEfficiency}
- Tasks Completed: ${results.completedTasks.length}
- Files Modified: ${results.filesModified.size}
- Tests Added: ${results.testsAdded}

### Sub-Agent Contributions
${this.formatSubAgentContributions(results)}
`;
        
        // Update story file
        const updatedStory = story + orchestrationSection;
        fs.writeFileSync(storyPath, updatedStory);
    }

    /**
     * Integration with TRAIL system
     */
    async integrateWithTRAIL(task, error = null) {
        if (error) {
            // Trigger TRAIL learning
            execSync(`.solutions/verify-and-learn.sh "${error.message}"`);
        } else {
            // Search for existing solutions
            const search = execSync(`.solutions/search.sh "${task.description}"`).toString();
            if (search) {
                return JSON.parse(search);
            }
        }
        return null;
    }

    /**
     * Helper methods
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    calculateParallelizationScore(tasks, dependencies) {
        const independentTasks = tasks.filter(t => 
            !dependencies.has(t.id) || dependencies.get(t.id).length === 0
        ).length;
        
        return Math.round((independentTasks / tasks.length) * 100);
    }

    async getUserConfirmation() {
        // In real implementation, would prompt user
        return true;
    }

    updateTodoWithSubAgent(task, subAgent) {
        const todo = {
            id: task.id,
            content: `${task.description} [${subAgent}]`,
            status: 'in_progress',
            priority: 'high'
        };
        
        // Update TodoWrite file
        execSync(`echo '${JSON.stringify(todo)}' >> .bmad-todos.json`);
    }
}

/**
 * Story Parser for BMAD format
 */
class StoryParser {
    parse(storyPath) {
        const content = fs.readFileSync(storyPath, 'utf8');
        
        // Parse BMAD story structure
        const story = {
            id: this.extractStoryId(content),
            title: this.extractTitle(content),
            tasks: this.extractTasks(content),
            acceptanceCriteria: this.extractAcceptanceCriteria(content)
        };
        
        return story;
    }

    extractStoryId(content) {
        const match = content.match(/Story ID:\s*(.+)/i);
        return match ? match[1].trim() : 'UNKNOWN';
    }

    extractTitle(content) {
        const match = content.match(/##\s+(.+)/); 
        return match ? match[1].trim() : 'Untitled Story';
    }

    extractTasks(content) {
        const tasks = [];
        const taskRegex = /- \[ \] (.+)/g;
        let match;
        
        while ((match = taskRegex.exec(content)) !== null) {
            tasks.push({
                description: match[1].trim(),
                completed: false
            });
        }
        
        return tasks;
    }

    extractAcceptanceCriteria(content) {
        // Extract acceptance criteria section
        const acMatch = content.match(/##\s*Acceptance Criteria([\s\S]*?)##/i);
        return acMatch ? acMatch[1].trim() : '';
    }
}

/**
 * Agent Interface for communication
 */
class AgentInterface {
    async notifyAgent(agent, message) {
        // Implement agent notification
        console.log(`Notifying ${agent}: ${JSON.stringify(message)}`);
    }

    async checkAgentStatus(agent) {
        // Implement status checking
        return {
            state: 'IN_PROGRESS',
            progress: Math.floor(Math.random() * 100)
        };
    }
}

// CLI Interface
if (require.main === module) {
    const bridge = new BMADOrchestrationBridge();
    const command = process.argv[2];
    const args = process.argv.slice(3);

    switch (command) {
        case 'execute':
            bridge.executeStoryWithOrchestration(args[0])
                .then(results => {
                    console.log('\n✅ Orchestrated execution complete!');
                    process.exit(0);
                })
                .catch(err => {
                    console.error('\n❌ Execution failed:', err.message);
                    process.exit(1);
                });
            break;

        case 'analyze':
            bridge.parseAndPrepareStory(args[0])
                .then(plan => {
                    console.log(JSON.stringify(plan, null, 2));
                })
                .catch(err => {
                    console.error('Analysis failed:', err.message);
                    process.exit(1);
                });
            break;

        default:
            console.log('Usage: bmad-orchestration-bridge.js <execute|analyze> <story-file>');
            console.log('\nCommands:');
            console.log('  execute <story>  - Execute story with parallel orchestration');
            console.log('  analyze <story>  - Analyze story for parallelization opportunities');
    }
}

module.exports = BMADOrchestrationBridge;