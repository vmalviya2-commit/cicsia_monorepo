# Shared UI Components Demo

This VS Code extension demonstrates the usage of shared UI components built with Lit and used across both Angular applications and VS Code extensions.

## Features

- Shared Button component with primary/secondary variants and disabled state
- Shared Card component with title and content slots
- Integration with VS Code's theming system
- Event handling between WebView and extension

## Usage

1. Install the extension
2. Open the Command Palette (Ctrl+Shift+P)
3. Run the command "Show Shared UI Components"

## Development

This extension is part of a monorepo demonstrating component sharing between different platforms:

- Angular web application
- VS Code extension WebView

The shared components are built using Lit and can be found in the `libs/shared-ui` directory.
