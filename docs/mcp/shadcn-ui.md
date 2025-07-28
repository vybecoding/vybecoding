# Shadcn-ui MCP

## Status: ✅ CONFIGURED

Configured to run via npx.

## Overview

The Shadcn-ui MCP server provides Claude with the ability to add, customize, and manage Shadcn/ui components in your project through natural language commands.

## Configuration

Located in `.claude/config/mcp-settings.json`:
```json
"shadcn-ui": {
  "command": "npx",
  "args": ["@jpisnice/shadcn-ui-mcp-server"]
}
```

## Features

### Component Management
- Add new components
- Update existing components
- Remove unused components
- List available components
- Check component dependencies

### Customization
- Modify component styles
- Change variants
- Update themes
- Adjust configurations
- Create custom variants

### Project Integration
- Automatic imports
- Dependency resolution
- Style consistency
- TypeScript support
- Component documentation

## Available Commands

Claude can perform these operations:
1. **Add Components**
   - "Add a card component"
   - "Install button and dialog"
   - "Set up form components"

2. **Configure Components**
   - "Change button variants"
   - "Update card styling"
   - "Modify dialog behavior"

3. **Project Setup**
   - "Initialize shadcn/ui"
   - "Update components.json"
   - "Change theme colors"

## Component Library

Access to all Shadcn/ui components:
- **Layout**: Card, Container, Grid
- **Forms**: Input, Select, Checkbox, Radio
- **Feedback**: Alert, Toast, Dialog, Tooltip
- **Navigation**: Menu, Tabs, Breadcrumb
- **Data Display**: Table, List, Avatar
- **Utilities**: Button, Badge, Skeleton

## Integration with Project

### Existing Setup
- `components.json` configured
- Base dependencies installed
- Button component already added
- New York style selected
- Zinc color scheme

### Adding More Components
Claude can add components as needed:
```
"Please add a card component"
"I need a form with validation"
"Set up a data table"
```

## Style System

### Current Configuration
- **Style**: New York
- **Base Color**: Zinc
- **CSS Variables**: Enabled
- **Tailwind Config**: Connected
- **Dark Mode**: Ready

### Customization Options
- Change color schemes
- Modify border radius
- Update spacing
- Toggle animations
- Adjust typography

## Best Practices

1. Add components as needed
2. Keep consistent styling
3. Use appropriate variants
4. Follow accessibility guidelines
5. Maintain component updates

## Benefits

- Rapid UI development
- Consistent design system
- Accessible components
- TypeScript support
- Easy customization

## Last Tested

January 28, 2025 - Configured via npx, works with existing Shadcn/ui setup