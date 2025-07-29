# Convex MCP Server

The Convex MCP (Model Context Protocol) server provides a standardized interface for AI agents to interact with Convex databases and deployments.

## Overview

The Convex MCP server enables AI agents to:
- **Introspect deployments**: View tables, schemas, and metadata
- **Query data**: Execute queries and paginate through results
- **Execute functions**: Call deployed Convex functions with proper arguments
- **Run sandboxed queries**: Write and execute read-only JavaScript queries
- **Manage environment**: Handle environment variables within deployments

## Configuration

Added to `.claude/config/mcp-settings.json`:

```json
"convex": {
  "command": "npx",
  "args": ["-y", "convex@latest", "mcp", "start"],
  "env": {
    "CONVEX_URL": "${CONVEX_URL}",
    "CONVEX_DEPLOY_KEY": "${CONVEX_DEPLOY_KEY}"
  }
}
```

## Available Tools

When the Convex MCP server is active, the following tools become available:

### 1. `convex_list_tables`
Lists all tables in your Convex deployment with their schemas.

Example usage:
```
List all tables in the Convex deployment
```

### 2. `convex_query_table`
Query data from a specific table with optional filtering and pagination.

Example usage:
```
Query the guides table to see all published guides
Query users table with limit 10
```

### 3. `convex_execute_function`
Execute any deployed Convex function with arguments.

Example usage:
```
Execute guides.getPublishedGuides with category "tutorials"
Execute users.getUserProfile with userId "xxx"
```

### 4. `convex_run_query`
Run a custom JavaScript query in a sandboxed environment (read-only).

Example usage:
```
Run query to count total guides by category
Run query to find users who published guides this week
```

### 5. `convex_get_env_vars`
List all environment variables in the deployment.

### 6. `convex_set_env_var`
Set or update an environment variable.

## Integration with VybeCoding Workflow

### Development Flow

1. **Schema Inspection**
   - Use `convex_list_tables` to verify schema changes
   - Ensure migrations are applied correctly
   - Check indexes and field types

2. **Data Verification**
   - Query tables directly without writing test code
   - Verify data integrity after operations
   - Debug user-reported issues quickly

3. **Function Testing**
   - Execute functions with test data
   - Verify business logic without UI interaction
   - Test edge cases and error handling

4. **Debugging**
   - Run custom queries to investigate issues
   - Analyze data patterns and relationships
   - Find performance bottlenecks

### Example Workflows

#### Debugging Guide Publishing Issues
```
1. Use convex_query_table to check guides with status "draft"
2. Execute guides.getGuideById to inspect specific guide
3. Run custom query to check user permissions
4. Execute guides.publishGuide to test the function
```

#### Analyzing User Engagement
```
1. Run query to count guides by category
2. Query guideReadingProgress to see completion rates
3. Execute custom aggregation query for analytics
4. Query users who have published most guides
```

#### Testing New Features
```
1. List tables to verify new schema additions
2. Execute new functions with test data
3. Query results to verify correctness
4. Check for any data inconsistencies
```

## Best Practices

### Security
- The MCP server uses your deployment key - keep it secure
- Queries are read-only by default in sandboxed mode
- Always verify data changes through proper functions

### Performance
- Use pagination for large datasets
- Limit query results when testing
- Avoid complex aggregations in sandboxed queries

### Development
- Test functions through MCP before UI implementation
- Use for rapid prototyping of queries
- Verify data migrations through direct queries

## Integration with BMAD Agents

The Convex MCP server enhances BMAD agent capabilities:

- **bmad-dev**: Can verify data operations during implementation
- **bmad-qa**: Can test data integrity without UI
- **bmad-architect**: Can analyze schema and relationships
- **bmad-sm**: Can verify story requirements against actual data

## Troubleshooting

### Common Issues

1. **Connection Failed**
   - Verify CONVEX_URL and CONVEX_DEPLOY_KEY are set
   - Check internet connectivity
   - Ensure Convex deployment is active

2. **Function Not Found**
   - Verify function is deployed
   - Check function name and module path
   - Ensure proper arguments are provided

3. **Query Errors**
   - Check JavaScript syntax in custom queries
   - Verify table and field names
   - Ensure proper async/await usage

### Debug Commands

```bash
# Check if MCP server is running
ps aux | grep "convex mcp"

# View MCP server logs
tail -f ~/.claude/logs/mcp-convex.log

# Test connection manually
npx convex@latest mcp start
```

## Related Documentation

- [MCP Overview](./overview.md)
- [Convex Documentation](https://docs.convex.dev)
- [BMAD Integration](../bmad/sub-agents-integration.md)
- [TRAIL System](../hooks/trail-system.md)