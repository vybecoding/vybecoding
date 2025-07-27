#!/usr/bin/env node

/**
 * BMAD Orchestration Manager
 * Manages parallel execution of sub-agents and task distribution
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class OrchestrationManager {
    constructor() {
        this.activeSubAgents = new Map();
        this.taskQueue = [];
        this.completedTasks = new Set();
        this.todoFile = '.bmad-todos.json';
        this.metricsFile = '.bmad-metrics.json';
    }

    /**
     * Analyze a story for parallelization opportunities
     */
    analyzeStory(storyPath) {
        const story = this.parseStory(storyPath);
        const tasks = this.extractTasks(story);
        const dependencies = this.analyzeDependencies(tasks);
        
        return {
            story: story.id,
            totalTasks: tasks.length,
            parallelizable: this.identifyParallelTasks(tasks, dependencies),
            phases: this.createExecutionPhases(tasks, dependencies),
            estimatedTime: this.estimateExecutionTime(tasks),
            recommendedAgents: this.recommendAgents(tasks)
        };
    }

    /**
     * Create execution phases based on dependencies
     */
    createExecutionPhases(tasks, dependencies) {
        const phases = [];
        const processed = new Set();
        
        // Phase 1: Tasks with no dependencies
        const phase1 = tasks.filter(task => 
            dependencies.get(task.id).length === 0
        );
        phases.push(phase1);
        phase1.forEach(task => processed.add(task.id));
        
        // Subsequent phases
        while (processed.size < tasks.length) {
            const nextPhase = tasks.filter(task => 
                !processed.has(task.id) &&
                dependencies.get(task.id).every(dep => processed.has(dep))
            );
            
            if (nextPhase.length > 0) {
                phases.push(nextPhase);
                nextPhase.forEach(task => processed.add(task.id));
            }
        }
        
        return phases;
    }

    /**
     * Distribute tasks to sub-agents
     */
    async distributeTasks(phases) {
        const distributions = [];
        
        for (const [index, phase] of phases.entries()) {
            console.log(`\nPhase ${index + 1}: Distributing ${phase.length} tasks`);
            
            const phaseDistribution = await Promise.all(
                phase.map(task => this.assignTaskToAgent(task))
            );
            
            distributions.push({
                phase: index + 1,
                assignments: phaseDistribution,
                startTime: new Date().toISOString()
            });
            
            // Wait for phase completion before next
            if (index < phases.length - 1) {
                await this.waitForPhaseCompletion(phaseDistribution);
            }
        }
        
        return distributions;
    }

    /**
     * Assign task to most suitable sub-agent
     */
    assignTaskToAgent(task) {
        const agentScores = {
            '/sub-frontend-impl': this.scoreFrontendTask(task),
            '/sub-backend-impl': this.scoreBackendTask(task),
            '/sub-test-impl': this.scoreTestTask(task),
            '/sub-integration': this.scoreIntegrationTask(task)
        };
        
        // Get agent with highest score
        const bestAgent = Object.entries(agentScores)
            .sort(([,a], [,b]) => b - a)[0][0];
        
        // Track assignment
        this.trackAssignment(task, bestAgent);
        
        return {
            task: task.id,
            agent: bestAgent,
            description: task.description,
            complexity: task.complexity,
            status: 'ASSIGNED'
        };
    }

    /**
     * Score task suitability for frontend agent
     */
    scoreFrontendTask(task) {
        const keywords = ['ui', 'component', 'frontend', 'react', 'style', 'css', 'animation'];
        return this.calculateKeywordScore(task.description, keywords);
    }

    /**
     * Track task progress in TodoWrite format
     */
    trackAssignment(task, agent) {
        const todo = {
            id: task.id,
            content: `${task.description} [${agent}]`,
            status: 'in_progress',
            priority: this.mapComplexityToPriority(task.complexity),
            agent: agent,
            startTime: new Date().toISOString()
        };
        
        this.updateTodoFile(todo);
    }

    /**
     * Monitor sub-agent progress
     */
    async monitorProgress() {
        const status = {
            timestamp: new Date().toISOString(),
            activeAgents: this.activeSubAgents.size,
            tasksInProgress: 0,
            tasksCompleted: this.completedTasks.size,
            phases: []
        };
        
        // Check each active agent
        for (const [agent, tasks] of this.activeSubAgents) {
            const agentStatus = await this.checkAgentStatus(agent);
            status.tasksInProgress += agentStatus.inProgress;
            
            // Update completed tasks
            agentStatus.completed.forEach(taskId => {
                this.completedTasks.add(taskId);
                this.updateTodoStatus(taskId, 'completed');
            });
        }
        
        // Save metrics
        this.saveMetrics(status);
        
        return status;
    }

    /**
     * Aggregate results from all sub-agents
     */
    async aggregateResults() {
        const results = {
            story: this.currentStory,
            completedTasks: Array.from(this.completedTasks),
            filesModified: new Set(),
            testsAdded: 0,
            conflicts: [],
            metrics: {
                totalDuration: 0,
                parallelizationEfficiency: 0,
                subAgentUtilization: {}
            }
        };
        
        // Collect results from each sub-agent
        for (const [agent, tasks] of this.activeSubAgents) {
            const agentResults = await this.getAgentResults(agent);
            
            // Merge file modifications
            agentResults.files?.forEach(file => results.filesModified.add(file));
            
            // Sum tests
            results.testsAdded += agentResults.tests || 0;
            
            // Check for conflicts
            const conflicts = this.detectConflicts(results.filesModified, agentResults.files);
            results.conflicts.push(...conflicts);
        }
        
        // Calculate metrics
        results.metrics = this.calculateMetrics();
        
        return results;
    }

    /**
     * Calculate orchestration metrics
     */
    calculateMetrics() {
        const metrics = JSON.parse(fs.readFileSync(this.metricsFile, 'utf8'));
        
        const totalDuration = Date.now() - new Date(metrics[0].timestamp).getTime();
        const sequentialEstimate = this.estimatedSequentialTime;
        const efficiency = ((sequentialEstimate - totalDuration) / sequentialEstimate) * 100;
        
        return {
            totalDuration: `${Math.round(totalDuration / 1000 / 60)} minutes`,
            parallelizationEfficiency: `${Math.round(efficiency)}%`,
            tasksPerAgent: this.calculateAgentUtilization(),
            averageTaskTime: this.calculateAverageTaskTime()
        };
    }

    /**
     * TRAIL integration for learning
     */
    integrateWithTRAIL(results) {
        // Log successful patterns
        if (results.conflicts.length === 0) {
            const pattern = {
                type: 'PARALLEL_EXECUTION',
                story_type: this.currentStoryType,
                task_distribution: this.getDistributionPattern(),
                metrics: results.metrics,
                success: true
            };
            
            execSync(`.solutions/log-solution.sh '${JSON.stringify(pattern)}'`);
        }
        
        // Search for similar patterns before distribution
        const search = execSync(`.solutions/search.sh "parallel ${this.currentStoryType}"`).toString();
        if (search) {
            console.log('Found previous parallel execution patterns:', search);
        }
    }

    /**
     * Generate execution report
     */
    generateReport(results) {
        const report = `
# BMAD Parallel Execution Report
Generated: ${new Date().toISOString()}

## Story: ${results.story}

### Summary
- Total Tasks: ${results.completedTasks.length}
- Files Modified: ${results.filesModified.size}
- Tests Added: ${results.testsAdded}
- Conflicts: ${results.conflicts.length}

### Metrics
- Total Duration: ${results.metrics.totalDuration}
- Parallelization Efficiency: ${results.metrics.parallelizationEfficiency}
- Average Task Time: ${results.metrics.averageTaskTime}

### Sub-Agent Utilization
${this.formatAgentUtilization(results.metrics.tasksPerAgent)}

### Conflicts Resolved
${this.formatConflicts(results.conflicts)}

### TRAIL Patterns Applied
${this.formatTRAILPatterns()}

## Recommendations
${this.generateRecommendations(results)}
        `;
        
        fs.writeFileSync('.bmad-execution-report.md', report);
        return report;
    }

    // Helper methods
    parseStory(storyPath) {
        // Parse BMAD story file
        const content = fs.readFileSync(storyPath, 'utf8');
        // Extract story structure
        return { id: 'STORY-001', content };
    }

    extractTasks(story) {
        // Extract tasks from story
        return [];
    }

    analyzeDependencies(tasks) {
        // Analyze task dependencies
        return new Map();
    }

    calculateKeywordScore(description, keywords) {
        return keywords.filter(k => description.toLowerCase().includes(k)).length;
    }

    updateTodoFile(todo) {
        // Update TodoWrite-compatible file
        let todos = [];
        if (fs.existsSync(this.todoFile)) {
            todos = JSON.parse(fs.readFileSync(this.todoFile, 'utf8'));
        }
        todos.push(todo);
        fs.writeFileSync(this.todoFile, JSON.stringify(todos, null, 2));
    }

    saveMetrics(status) {
        let metrics = [];
        if (fs.existsSync(this.metricsFile)) {
            metrics = JSON.parse(fs.readFileSync(this.metricsFile, 'utf8'));
        }
        metrics.push(status);
        fs.writeFileSync(this.metricsFile, JSON.stringify(metrics, null, 2));
    }
}

// CLI interface
if (require.main === module) {
    const manager = new OrchestrationManager();
    const command = process.argv[2];
    const args = process.argv.slice(3);
    
    switch (command) {
        case 'analyze':
            const analysis = manager.analyzeStory(args[0]);
            console.log(JSON.stringify(analysis, null, 2));
            break;
            
        case 'distribute':
            manager.distributeTasks(JSON.parse(args[0]))
                .then(dist => console.log('Distribution complete:', dist));
            break;
            
        case 'monitor':
            manager.monitorProgress()
                .then(status => console.log('Status:', status));
            break;
            
        case 'aggregate':
            manager.aggregateResults()
                .then(results => {
                    console.log('Results aggregated');
                    console.log(manager.generateReport(results));
                });
            break;
            
        default:
            console.log('Usage: orchestration-manager.js <analyze|distribute|monitor|aggregate> [args]');
    }
}

module.exports = OrchestrationManager;