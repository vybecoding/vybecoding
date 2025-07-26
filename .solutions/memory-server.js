#!/usr/bin/env node

// Simple MCP Server for Solutions Memory
// This provides Claude Code with access to previous solutions

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const SOLUTIONS_DIR = process.env.SOLUTIONS_DIR || path.join(__dirname);
const LOG_FILE = path.join(SOLUTIONS_DIR, 'solutions.log');

// MCP Server implementation
class SolutionsMemoryServer {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async start() {
    // Send server info
    this.send({
      jsonrpc: "2.0",
      method: "server.info",
      params: {
        name: "solutions-memory",
        version: "1.0.0",
        capabilities: {
          resources: true,
          tools: true
        }
      }
    });

    // Listen for requests
    this.rl.on('line', (line) => {
      try {
        const request = JSON.parse(line);
        this.handleRequest(request);
      } catch (e) {
        // Ignore parse errors
      }
    });
  }

  handleRequest(request) {
    switch (request.method) {
      case 'resources/list':
        this.listResources(request);
        break;
      case 'resources/read':
        this.readResource(request);
        break;
      case 'tools/list':
        this.listTools(request);
        break;
      case 'tools/call':
        this.callTool(request);
        break;
    }
  }

  listResources(request) {
    this.send({
      jsonrpc: "2.0",
      id: request.id,
      result: {
        resources: [
          {
            uri: "solutions://all",
            name: "All Solutions",
            description: "View all logged solutions"
          },
          {
            uri: "solutions://recent",
            name: "Recent Solutions",
            description: "View recent solutions"
          }
        ]
      }
    });
  }

  readResource(request) {
    const uri = request.params.uri;
    let content = "";

    try {
      if (uri === "solutions://all") {
        content = fs.readFileSync(LOG_FILE, 'utf8');
      } else if (uri === "solutions://recent") {
        const allContent = fs.readFileSync(LOG_FILE, 'utf8');
        const solutions = allContent.split('================================================================================');
        content = solutions.slice(-5).join('================================================================================');
      }
    } catch (e) {
      content = "No solutions found yet.";
    }

    this.send({
      jsonrpc: "2.0",
      id: request.id,
      result: {
        contents: [{
          uri: uri,
          mimeType: "text/plain",
          text: content
        }]
      }
    });
  }

  listTools(request) {
    this.send({
      jsonrpc: "2.0",
      id: request.id,
      result: {
        tools: [
          {
            name: "search_solutions",
            description: "Search for previous solutions",
            inputSchema: {
              type: "object",
              properties: {
                query: {
                  type: "string",
                  description: "Search term"
                }
              },
              required: ["query"]
            }
          }
        ]
      }
    });
  }

  callTool(request) {
    if (request.params.name === "search_solutions") {
      const query = request.params.arguments.query;
      let results = "";

      try {
        const content = fs.readFileSync(LOG_FILE, 'utf8');
        const lines = content.split('\n');
        const matches = [];
        
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].toLowerCase().includes(query.toLowerCase())) {
            // Get context around the match
            const start = Math.max(0, i - 10);
            const end = Math.min(lines.length, i + 20);
            matches.push(lines.slice(start, end).join('\n'));
          }
        }

        results = matches.length > 0 
          ? matches.join('\n\n---\n\n')
          : `No solutions found for "${query}"`;
      } catch (e) {
        results = "Error searching solutions: " + e.message;
      }

      this.send({
        jsonrpc: "2.0",
        id: request.id,
        result: {
          content: [{
            type: "text",
            text: results
          }]
        }
      });
    }
  }

  send(message) {
    console.log(JSON.stringify(message));
  }
}

// Start the server
const server = new SolutionsMemoryServer();
server.start();