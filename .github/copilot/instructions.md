# Tari Website 2025 Development Guidelines

## Project Overview
This repository contains the source code for the new Tari website (tari.com) planned for 2025. The website is built using React, Next.js, and styled-components.

## Code Style & Standards
- Use Typescript
- Dont pass props to SVG components
- Keep code clear and easy to read
- Dont add code comments 
- Don't delete code that has been commented out
- Format the code using prettier

## Prettier settings

```
{
    "printWidth": 120,
    "singleQuote": true,
    "tabWidth": 4
}
```

### Component Structure
- Use functional components with hooks
- Each component should be in its own directory with:
  - Component file (ComponentName.tsx)
  - Styles file (styles.ts)
  - Don't use Index files for exports
- Sub-components should be in a `components` directory within the parent component directory

### Styling
- Use styled-components for styling
- Use px units for font sizes and spacing
- Always add a $ to the beginning of props passed to styled-components

### Animation Guidelines
- Use motion/react (framer-motion) for animations
- For parallax effects, use spring animations for smooth transitions
- For spring animations, use appropriate parameters:
  - Lower stiffness (80-120) for smoother motion
  - Medium damping (20-30)
  - Mass between 1-2 for realistic physics

### File Naming
- Components: PascalCase (e.g., `HeaderSection.tsx`)
- Styles: camelCase (e.g., `styles.ts`)
- Utility files: camelCase (e.g., `formatUtils.ts`)
- Images/assets: kebab-case (e.g., `hero-background.png`)

### Imports
- Group imports in the following order:
  1. React and framework imports
  2. Third-party libraries
  3. Component styles
  4. Local components
  5. Assets/images
  6. Utilities/helpers

## Project Structure
```
src/
├── sites/
│   ├── tari-dot-com/         # Main website
│   │   ├── ui/               # Global UI components
│   │   ├── pages/            # Website pages
│   │   ├── hooks/            # Custom hooks
│   │   └── utils/            # Utility functions
├── ui-shared/                # Shared UI components
│   ├── components/           # Reusable components
│   ├── hooks/                # Shared hooks
│   └── utils/                # Shared utilities
```

## Performance Optimization
- Use `will-change` property for elements that will animate
- Prefer CSS transforms over position changes
- Use React.memo for complex components that rarely update
- Avoid unnecessary re-renders by using proper state management
- Use hardware acceleration hints (transform, opacity) for animations

## Accessibility
- Use semantic HTML elements
- Include proper aria attributes where needed
