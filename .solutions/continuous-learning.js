#!/usr/bin/env node

/**
 * Continuous Learning System for BMAD + VybeHacks
 * Analyzes patterns, learns from successes, and improves execution over time
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ContinuousLearningSystem {
    constructor() {
        this.solutionsLog = '.solutions/solutions.log';
        this.patternsDb = '.solutions/patterns.json';
        this.metricsHistory = '.solutions/metrics-history.json';
        this.learningConfig = {
            confidenceThreshold: 0.8,
            minOccurrences: 3,
            patternTypes: [
                'ERROR_RESOLUTION',
                'TASK_DISTRIBUTION',
                'PARALLELIZATION',
                'INTEGRATION_CONFLICT',
                'PERFORMANCE_OPTIMIZATION',
                'SECURITY_FIX'
            ]
        };
    }

    /**
     * Analyze all historical data and extract patterns
     */
    async analyzeAndLearn() {
        console.log('🧠 Continuous Learning System - Pattern Analysis\n');
        
        // Load all data sources
        const solutions = this.loadSolutions();
        const metrics = this.loadMetrics();
        const patterns = this.loadPatterns();
        
        // Analyze different aspects
        const errorPatterns = this.analyzeErrorPatterns(solutions);
        const performancePatterns = this.analyzePerformancePatterns(metrics);
        const distributionPatterns = this.analyzeDistributionPatterns(metrics);
        const securityPatterns = this.analyzeSecurityPatterns(solutions);
        
        // Combine and score patterns
        const allPatterns = [
            ...errorPatterns,
            ...performancePatterns,
            ...distributionPatterns,
            ...securityPatterns
        ];
        
        // Update pattern database
        const updatedPatterns = this.updatePatternDatabase(patterns, allPatterns);
        
        // Generate insights
        const insights = this.generateInsights(updatedPatterns);
        
        // Save results
        this.savePatterns(updatedPatterns);
        this.saveInsights(insights);
        
        return {
            patternsFound: allPatterns.length,
            highConfidencePatterns: allPatterns.filter(p => p.confidence > 0.8).length,
            insights: insights,
            recommendations: this.generateRecommendations(insights)
        };
    }

    /**
     * Analyze error resolution patterns
     */
    analyzeErrorPatterns(solutions) {
        const patterns = [];
        const errorGroups = new Map();
        
        // Group similar errors
        solutions.forEach(solution => {
            if (solution.error) {
                const errorType = this.classifyError(solution.error);
                if (!errorGroups.has(errorType)) {
                    errorGroups.set(errorType, []);
                }
                errorGroups.get(errorType).push(solution);
            }
        });
        
        // Extract patterns from groups
        errorGroups.forEach((group, errorType) => {
            if (group.length >= this.learningConfig.minOccurrences) {
                const pattern = {
                    type: 'ERROR_RESOLUTION',
                    subtype: errorType,
                    trigger: this.extractCommonTrigger(group),
                    solution: this.extractCommonSolution(group),
                    confidence: this.calculateConfidence(group),
                    occurrences: group.length,
                    successRate: this.calculateSuccessRate(group),
                    metadata: {
                        firstSeen: group[0].timestamp,
                        lastSeen: group[group.length - 1].timestamp,
                        affectedSubAgents: this.extractAffectedAgents(group)
                    }
                };
                
                if (pattern.confidence >= this.learningConfig.confidenceThreshold) {
                    patterns.push(pattern);
                }
            }
        });
        
        return patterns;
    }

    /**
     * Analyze performance optimization patterns
     */
    analyzePerformancePatterns(metrics) {
        const patterns = [];
        
        // Analyze task completion times
        const taskTimes = this.extractTaskTimes(metrics);
        const optimizations = this.findOptimizations(taskTimes);
        
        optimizations.forEach(opt => {
            patterns.push({
                type: 'PERFORMANCE_OPTIMIZATION',
                subtype: opt.category,
                description: opt.description,
                improvement: opt.improvement,
                confidence: opt.confidence,
                applicableTo: opt.taskTypes,
                implementation: opt.steps
            });
        });
        
        return patterns;
    }

    /**
     * Analyze task distribution patterns
     */
    analyzeDistributionPatterns(metrics) {
        const patterns = [];
        
        // Analyze sub-agent utilization
        const utilization = this.calculateUtilizationPatterns(metrics);
        
        // Find optimal distribution strategies
        utilization.forEach(util => {
            if (util.efficiency > 0.7) {
                patterns.push({
                    type: 'TASK_DISTRIBUTION',
                    strategy: util.strategy,
                    taskTypes: util.taskTypes,
                    subAgentAllocation: util.allocation,
                    efficiency: util.efficiency,
                    confidence: util.sampleSize > 10 ? 0.9 : 0.7,
                    constraints: util.constraints
                });
            }
        });
        
        return patterns;
    }

    /**
     * Generate actionable insights from patterns
     */
    generateInsights(patterns) {
        const insights = {
            topPatterns: this.selectTopPatterns(patterns, 5),
            emergingTrends: this.identifyTrends(patterns),
            optimizationOpportunities: this.findOptimizationOpportunities(patterns),
            riskFactors: this.identifyRisks(patterns),
            learningVelocity: this.calculateLearningVelocity(patterns)
        };
        
        return insights;
    }

    /**
     * Generate recommendations based on insights
     */
    generateRecommendations(insights) {
        const recommendations = [];
        
        // Error prevention recommendations
        insights.topPatterns
            .filter(p => p.type === 'ERROR_RESOLUTION')
            .forEach(pattern => {
                recommendations.push({
                    priority: 'HIGH',
                    type: 'ERROR_PREVENTION',
                    action: `Add validation for ${pattern.subtype}`,
                    implementation: pattern.solution,
                    expectedImpact: `Prevent ${pattern.occurrences} errors/month`
                });
            });
        
        // Performance recommendations
        insights.optimizationOpportunities.forEach(opt => {
            recommendations.push({
                priority: opt.impact > 0.3 ? 'HIGH' : 'MEDIUM',
                type: 'PERFORMANCE',
                action: opt.description,
                implementation: opt.steps,
                expectedImpact: `${Math.round(opt.impact * 100)}% improvement`
            });
        });
        
        // Distribution recommendations
        insights.topPatterns
            .filter(p => p.type === 'TASK_DISTRIBUTION')
            .forEach(pattern => {
                recommendations.push({
                    priority: 'MEDIUM',
                    type: 'ORCHESTRATION',
                    action: `Apply distribution strategy: ${pattern.strategy}`,
                    implementation: pattern.subAgentAllocation,
                    expectedImpact: `${Math.round(pattern.efficiency * 100)}% efficiency`
                });
            });
        
        return recommendations.sort((a, b) => 
            this.priorityScore(a.priority) - this.priorityScore(b.priority)
        );
    }

    /**
     * Apply learned patterns to new tasks
     */
    async applyLearning(context) {
        const patterns = this.loadPatterns();
        const applicablePatterns = this.findApplicablePatterns(patterns, context);
        
        const applications = [];
        
        applicablePatterns.forEach(pattern => {
            switch (pattern.type) {
                case 'ERROR_RESOLUTION':
                    if (context.error && this.matchesPattern(context.error, pattern)) {
                        applications.push({
                            pattern: pattern,
                            action: 'APPLY_FIX',
                            solution: pattern.solution,
                            confidence: pattern.confidence
                        });
                    }
                    break;
                    
                case 'TASK_DISTRIBUTION':
                    if (context.tasks && this.matchesTaskProfile(context.tasks, pattern)) {
                        applications.push({
                            pattern: pattern,
                            action: 'OPTIMIZE_DISTRIBUTION',
                            strategy: pattern.strategy,
                            allocation: pattern.subAgentAllocation
                        });
                    }
                    break;
                    
                case 'PERFORMANCE_OPTIMIZATION':
                    if (context.taskType && pattern.applicableTo.includes(context.taskType)) {
                        applications.push({
                            pattern: pattern,
                            action: 'APPLY_OPTIMIZATION',
                            steps: pattern.implementation
                        });
                    }
                    break;
            }
        });
        
        return applications;
    }

    /**
     * Monitor and update learning in real-time
     */
    async monitorAndUpdate() {
        console.log('📊 Continuous Learning Monitor Started\n');
        
        // Set up file watchers
        fs.watch(this.solutionsLog, (eventType) => {
            if (eventType === 'change') {
                this.processNewSolutions();
            }
        });
        
        fs.watch('.bmad-metrics.json', (eventType) => {
            if (eventType === 'change') {
                this.processNewMetrics();
            }
        });
        
        // Periodic analysis
        setInterval(() => {
            this.performIncrementalLearning();
        }, 300000); // Every 5 minutes
        
        console.log('Monitor active. Learning from new patterns...');
    }

    /**
     * Process new solutions as they arrive
     */
    async processNewSolutions() {
        const recentSolutions = this.getRecentSolutions(5); // Last 5 minutes
        
        recentSolutions.forEach(solution => {
            // Check if it matches existing patterns
            const patterns = this.loadPatterns();
            const matches = this.findMatchingPatterns(solution, patterns);
            
            if (matches.length > 0) {
                // Reinforce existing patterns
                this.reinforcePatterns(matches, solution);
            } else {
                // Potential new pattern
                this.trackPotentialPattern(solution);
            }
        });
    }

    /**
     * Generate learning report
     */
    generateLearningReport() {
        const patterns = this.loadPatterns();
        const metrics = this.loadMetrics();
        
        const report = `# Continuous Learning Report
Generated: ${new Date().toISOString()}

## Pattern Summary
- Total Patterns: ${patterns.length}
- High Confidence: ${patterns.filter(p => p.confidence > 0.8).length}
- Recently Updated: ${patterns.filter(p => this.isRecent(p.lastUpdated)).length}

## Top Patterns by Type
${this.formatPatternsByType(patterns)}

## Learning Velocity
${this.formatLearningVelocity(patterns)}

## Impact Analysis
${this.formatImpactAnalysis(patterns, metrics)}

## Recommendations
${this.formatRecommendations(this.generateRecommendations(this.generateInsights(patterns)))}

## Pattern Details
${this.formatPatternDetails(patterns.slice(0, 10))}
`;
        
        fs.writeFileSync('.solutions/learning-report.md', report);
        return report;
    }

    /**
     * Helper methods
     */
    loadSolutions() {
        if (!fs.existsSync(this.solutionsLog)) return [];
        
        const content = fs.readFileSync(this.solutionsLog, 'utf8');
        return content.split('\n')
            .filter(line => line.trim())
            .map(line => {
                try {
                    return JSON.parse(line);
                } catch {
                    return null;
                }
            })
            .filter(Boolean);
    }

    loadPatterns() {
        if (!fs.existsSync(this.patternsDb)) return [];
        return JSON.parse(fs.readFileSync(this.patternsDb, 'utf8'));
    }

    savePatterns(patterns) {
        fs.writeFileSync(this.patternsDb, JSON.stringify(patterns, null, 2));
    }

    classifyError(error) {
        const classifications = {
            'Cannot read property': 'NULL_REFERENCE',
            'is not a function': 'TYPE_ERROR',
            'SyntaxError': 'SYNTAX_ERROR',
            'Module not found': 'MISSING_DEPENDENCY',
            'Permission denied': 'PERMISSION_ERROR',
            'timeout': 'TIMEOUT_ERROR'
        };
        
        for (const [key, value] of Object.entries(classifications)) {
            if (error.includes(key)) return value;
        }
        
        return 'UNKNOWN_ERROR';
    }

    calculateConfidence(samples) {
        // Confidence based on consistency and sample size
        const consistency = this.calculateConsistency(samples);
        const sizeBonus = Math.min(samples.length / 10, 1);
        
        return (consistency * 0.7 + sizeBonus * 0.3);
    }

    priorityScore(priority) {
        const scores = { 'HIGH': 1, 'MEDIUM': 2, 'LOW': 3 };
        return scores[priority] || 999;
    }

    formatLearningVelocity(patterns) {
        const velocity = this.calculateLearningVelocity(patterns);
        return `
- New Patterns/Week: ${velocity.newPatternsPerWeek}
- Pattern Refinements/Week: ${velocity.refinementsPerWeek}
- Confidence Growth: ${(velocity.confidenceGrowth * 100).toFixed(1)}%
`;
    }

    calculateLearningVelocity(patterns) {
        const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        
        const recentPatterns = patterns.filter(p => 
            new Date(p.metadata?.firstSeen || p.created).getTime() > oneWeekAgo
        );
        
        const recentUpdates = patterns.filter(p =>
            new Date(p.lastUpdated).getTime() > oneWeekAgo
        );
        
        return {
            newPatternsPerWeek: recentPatterns.length,
            refinementsPerWeek: recentUpdates.length - recentPatterns.length,
            confidenceGrowth: this.calculateAverageGrowth(patterns)
        };
    }
}

// CLI Interface
if (require.main === module) {
    const learner = new ContinuousLearningSystem();
    const command = process.argv[2];
    
    switch (command) {
        case 'analyze':
            learner.analyzeAndLearn()
                .then(results => {
                    console.log('\n✅ Analysis Complete');
                    console.log(`Found ${results.patternsFound} patterns`);
                    console.log(`High confidence: ${results.highConfidencePatterns}`);
                    console.log('\nTop Insights:');
                    results.insights.topPatterns.slice(0, 3).forEach(p => {
                        console.log(`- ${p.type}: ${p.description || p.subtype}`);
                    });
                });
            break;
            
        case 'monitor':
            learner.monitorAndUpdate();
            break;
            
        case 'report':
            const report = learner.generateLearningReport();
            console.log('Report generated: .solutions/learning-report.md');
            break;
            
        case 'apply':
            const context = JSON.parse(process.argv[3] || '{}');
            learner.applyLearning(context)
                .then(applications => {
                    console.log(`Found ${applications.length} applicable patterns`);
                    applications.forEach(app => {
                        console.log(`- ${app.action}: ${app.pattern.type}`);
                    });
                });
            break;
            
        default:
            console.log('Usage: continuous-learning.js <analyze|monitor|report|apply> [context]');
    }
}

module.exports = ContinuousLearningSystem;