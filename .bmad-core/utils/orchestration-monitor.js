#!/usr/bin/env node

/**
 * BMAD Orchestration Monitor
 * Real-time visualization of parallel task execution
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

class OrchestrationMonitor {
    constructor() {
        this.todoFile = '.bmad-todos.json';
        this.metricsFile = '.bmad-metrics.json';
        this.refreshRate = 1000; // 1 second
        this.displayMode = 'dashboard'; // dashboard, timeline, metrics
    }

    /**
     * Start monitoring parallel execution
     */
    async startMonitoring() {
        console.clear();
        console.log('🎯 BMAD Orchestration Monitor v1.0\n');
        
        // Monitor loop
        setInterval(() => {
            this.updateDisplay();
        }, this.refreshRate);
        
        // Handle keyboard input
        this.setupKeyboardHandlers();
    }

    /**
     * Update display based on current mode
     */
    async updateDisplay() {
        const data = this.gatherMonitoringData();
        
        console.clear();
        console.log('🎯 BMAD Orchestration Monitor | Mode: ' + this.displayMode.toUpperCase());
        console.log('Press [D]ashboard [T]imeline [M]etrics [Q]uit\n');
        
        switch (this.displayMode) {
            case 'dashboard':
                this.displayDashboard(data);
                break;
            case 'timeline':
                this.displayTimeline(data);
                break;
            case 'metrics':
                this.displayMetrics(data);
                break;
        }
    }

    /**
     * Gather current monitoring data
     */
    gatherMonitoringData() {
        const data = {
            todos: [],
            metrics: [],
            subAgents: new Map(),
            phases: [],
            startTime: null,
            totalTasks: 0,
            completedTasks: 0
        };
        
        // Read todos
        if (fs.existsSync(this.todoFile)) {
            data.todos = JSON.parse(fs.readFileSync(this.todoFile, 'utf8'));
        }
        
        // Read metrics
        if (fs.existsSync(this.metricsFile)) {
            data.metrics = JSON.parse(fs.readFileSync(this.metricsFile, 'utf8'));
        }
        
        // Process todos by sub-agent
        data.todos.forEach(todo => {
            if (todo.agent) {
                if (!data.subAgents.has(todo.agent)) {
                    data.subAgents.set(todo.agent, {
                        tasks: [],
                        completed: 0,
                        inProgress: 0,
                        pending: 0
                    });
                }
                
                const agent = data.subAgents.get(todo.agent);
                agent.tasks.push(todo);
                
                switch (todo.status) {
                    case 'completed':
                        agent.completed++;
                        data.completedTasks++;
                        break;
                    case 'in_progress':
                        agent.inProgress++;
                        break;
                    case 'pending':
                        agent.pending++;
                        break;
                }
            }
            
            data.totalTasks++;
        });
        
        // Calculate phases from metrics
        if (data.metrics.length > 0) {
            data.startTime = new Date(data.metrics[0].timestamp);
            
            // Group tasks by phase based on start times
            const phaseTimes = new Map();
            data.todos.forEach(todo => {
                if (todo.startTime) {
                    const phaseKey = new Date(todo.startTime).getMinutes();
                    if (!phaseTimes.has(phaseKey)) {
                        phaseTimes.set(phaseKey, []);
                    }
                    phaseTimes.get(phaseKey).push(todo);
                }
            });
            
            data.phases = Array.from(phaseTimes.values());
        }
        
        return data;
    }

    /**
     * Display main dashboard view
     */
    displayDashboard(data) {
        const progress = data.totalTasks > 0 ? 
            Math.round((data.completedTasks / data.totalTasks) * 100) : 0;
        
        // Overall progress
        console.log('📊 Overall Progress');
        console.log(`${this.createProgressBar(progress, 40)} ${progress}%`);
        console.log(`Tasks: ${data.completedTasks}/${data.totalTasks}\n`);
        
        // Sub-agent status
        console.log('🤖 Sub-Agent Status');
        console.log('─'.repeat(60));
        
        data.subAgents.forEach((agent, name) => {
            const agentProgress = agent.tasks.length > 0 ?
                Math.round((agent.completed / agent.tasks.length) * 100) : 0;
            
            console.log(`${name.padEnd(25)} ${this.createProgressBar(agentProgress, 20)} ${agentProgress}%`);
            console.log(`${''.padEnd(25)} ✓ ${agent.completed} ⚡ ${agent.inProgress} ○ ${agent.pending}\n`);
        });
        
        // Current activities
        console.log('⚡ Active Tasks');
        console.log('─'.repeat(60));
        
        const activeTasks = data.todos.filter(t => t.status === 'in_progress');
        activeTasks.slice(0, 5).forEach(task => {
            const duration = task.startTime ? 
                this.formatDuration(new Date() - new Date(task.startTime)) : 'just started';
            console.log(`• ${task.content.substring(0, 40).padEnd(40)} [${duration}]`);
        });
        
        if (activeTasks.length === 0) {
            console.log('No active tasks');
        }
    }

    /**
     * Display timeline view
     */
    displayTimeline(data) {
        console.log('📅 Execution Timeline\n');
        
        const now = new Date();
        const timeSlots = new Array(20).fill(null).map(() => []);
        
        // Distribute tasks across time slots
        data.todos.forEach(todo => {
            if (todo.startTime) {
                const startTime = new Date(todo.startTime);
                const slot = Math.floor((startTime - data.startTime) / 60000); // minutes
                if (slot >= 0 && slot < 20) {
                    timeSlots[slot].push({
                        ...todo,
                        duration: todo.endTime ? 
                            new Date(todo.endTime) - startTime : 
                            now - startTime
                    });
                }
            }
        });
        
        // Display timeline
        console.log('Time   │ ' + data.subAgents.keys().next().value);
        console.log('───────┼' + '─'.repeat(50));
        
        timeSlots.forEach((slot, index) => {
            const time = `+${index}min`.padEnd(7);
            let line = '';
            
            slot.forEach(task => {
                const char = task.status === 'completed' ? '█' : '▓';
                const width = Math.ceil(task.duration / 60000); // minutes
                line += char.repeat(Math.min(width, 10)) + ' ';
            });
            
            if (line) {
                console.log(`${time}│ ${line}`);
            }
        });
    }

    /**
     * Display metrics view
     */
    displayMetrics(data) {
        console.log('📈 Performance Metrics\n');
        
        // Calculate metrics
        const totalDuration = data.startTime ? 
            (new Date() - data.startTime) / 1000 / 60 : 0; // minutes
        
        const tasksPerMinute = totalDuration > 0 ? 
            (data.completedTasks / totalDuration).toFixed(2) : 0;
        
        const avgTaskTime = data.completedTasks > 0 ?
            (totalDuration / data.completedTasks * 60).toFixed(0) : 0; // seconds
        
        // Efficiency calculation
        const parallelEfficiency = this.calculateParallelEfficiency(data);
        
        // Display metrics
        console.log('Performance Indicators');
        console.log('─'.repeat(40));
        console.log(`Total Duration:        ${totalDuration.toFixed(1)} minutes`);
        console.log(`Tasks Completed:       ${data.completedTasks}`);
        console.log(`Tasks/Minute:          ${tasksPerMinute}`);
        console.log(`Avg Task Time:         ${avgTaskTime} seconds`);
        console.log(`Parallel Efficiency:   ${parallelEfficiency}%\n`);
        
        // Sub-agent efficiency
        console.log('Sub-Agent Efficiency');
        console.log('─'.repeat(40));
        
        data.subAgents.forEach((agent, name) => {
            const utilization = totalDuration > 0 ?
                Math.round((agent.completed / totalDuration) * 100) : 0;
            
            console.log(`${name.padEnd(25)} ${agent.completed} tasks (${utilization}% utilization)`);
        });
        
        // Bottlenecks
        console.log('\n⚠️  Potential Bottlenecks');
        console.log('─'.repeat(40));
        
        const bottlenecks = this.identifyBottlenecks(data);
        bottlenecks.forEach(b => console.log(`• ${b}`));
        
        if (bottlenecks.length === 0) {
            console.log('No bottlenecks detected');
        }
    }

    /**
     * Calculate parallel execution efficiency
     */
    calculateParallelEfficiency(data) {
        // Estimate sequential time
        const avgTaskTime = 5; // minutes per task
        const sequentialTime = data.totalTasks * avgTaskTime;
        
        // Actual parallel time
        const actualTime = data.startTime ? 
            (new Date() - data.startTime) / 1000 / 60 : 0;
        
        if (actualTime === 0) return 0;
        
        const efficiency = ((sequentialTime - actualTime) / sequentialTime) * 100;
        return Math.max(0, Math.min(100, Math.round(efficiency)));
    }

    /**
     * Identify execution bottlenecks
     */
    identifyBottlenecks(data) {
        const bottlenecks = [];
        
        // Check for idle sub-agents
        data.subAgents.forEach((agent, name) => {
            if (agent.inProgress === 0 && agent.pending > 0) {
                bottlenecks.push(`${name} is idle with ${agent.pending} pending tasks`);
            }
        });
        
        // Check for unbalanced distribution
        const taskCounts = Array.from(data.subAgents.values()).map(a => a.tasks.length);
        const avgTasks = taskCounts.reduce((a, b) => a + b, 0) / taskCounts.length;
        const variance = taskCounts.reduce((sum, count) => 
            sum + Math.pow(count - avgTasks, 2), 0) / taskCounts.length;
        
        if (variance > avgTasks * 2) {
            bottlenecks.push('Unbalanced task distribution detected');
        }
        
        // Check for long-running tasks
        const longRunning = data.todos.filter(t => 
            t.status === 'in_progress' && 
            t.startTime && 
            (new Date() - new Date(t.startTime)) > 10 * 60 * 1000 // 10 minutes
        );
        
        if (longRunning.length > 0) {
            bottlenecks.push(`${longRunning.length} tasks running longer than 10 minutes`);
        }
        
        return bottlenecks;
    }

    /**
     * Create visual progress bar
     */
    createProgressBar(progress, width = 20) {
        const filled = Math.floor((progress / 100) * width);
        const empty = width - filled;
        return '█'.repeat(filled) + '░'.repeat(empty);
    }

    /**
     * Format duration for display
     */
    formatDuration(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        
        if (hours > 0) {
            return `${hours}h ${minutes % 60}m`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds % 60}s`;
        } else {
            return `${seconds}s`;
        }
    }

    /**
     * Setup keyboard handlers
     */
    setupKeyboardHandlers() {
        const stdin = process.stdin;
        stdin.setRawMode(true);
        stdin.resume();
        stdin.setEncoding('utf8');
        
        stdin.on('data', (key) => {
            switch (key.toLowerCase()) {
                case 'd':
                    this.displayMode = 'dashboard';
                    break;
                case 't':
                    this.displayMode = 'timeline';
                    break;
                case 'm':
                    this.displayMode = 'metrics';
                    break;
                case 'q':
                case '\u0003': // Ctrl-C
                    console.clear();
                    console.log('Monitor stopped.');
                    process.exit(0);
                    break;
            }
        });
    }

    /**
     * Generate snapshot report
     */
    generateSnapshot() {
        const data = this.gatherMonitoringData();
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `.bmad-monitor-snapshot-${timestamp}.json`;
        
        const snapshot = {
            timestamp: new Date().toISOString(),
            summary: {
                totalTasks: data.totalTasks,
                completedTasks: data.completedTasks,
                progress: Math.round((data.completedTasks / data.totalTasks) * 100),
                duration: data.startTime ? 
                    this.formatDuration(new Date() - data.startTime) : 'Not started',
                efficiency: this.calculateParallelEfficiency(data) + '%'
            },
            subAgents: Object.fromEntries(data.subAgents),
            bottlenecks: this.identifyBottlenecks(data),
            todos: data.todos
        };
        
        fs.writeFileSync(filename, JSON.stringify(snapshot, null, 2));
        console.log(`\nSnapshot saved to ${filename}`);
    }
}

// CLI interface
if (require.main === module) {
    const monitor = new OrchestrationMonitor();
    const command = process.argv[2];
    
    switch (command) {
        case 'snapshot':
            monitor.generateSnapshot();
            break;
            
        default:
            monitor.startMonitoring();
    }
}

module.exports = OrchestrationMonitor;