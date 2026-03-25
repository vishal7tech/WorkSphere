# WorkSphere Development Guide

## Quick Start

### Option 1: Use the Batch Launcher (Recommended)
Double-click `start.bat` to open the interactive menu with all development options.

### Option 2: Manual Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

## Development Tools

### Main Launcher (`start.bat`)
- **Start Development Server**: Launches Vite dev server at http://localhost:5173
- **Build for Production**: Creates optimized build in `dist/` folder
- **Run Linting**: Checks code quality with ESLint
- **Preview Production Build**: Serves the built application
- **Install Dependencies**: Installs/updates npm packages
- **Clean Project**: Removes node_modules, dist, and cache folders
- **Debug Mode**: Starts with verbose logging
- **Project Information**: Shows project details and commands

### Test & Debug Suite (`test-debug.bat`)
- **Run All Tests**: Comprehensive validation (TypeScript, ESLint, Build, Security)
- **Component Tests**: Analyzes React components
- **Integration Tests**: Checks routing, theme, and API integrations
- **Debug Mode**: Development with enhanced debugging
- **Performance Audit**: Analyzes bundle size and performance
- **Check Dependencies**: Updates and security audit
- **Validate TypeScript**: Type checking and configuration validation
- **Chrome DevTools**: Opens with automatic DevTools
- **Monitor Bundle Size**: Detailed bundle analysis

## Project Structure

```
workforce-hub-73-main/
├── start.bat              # Main development launcher
├── test-debug.bat         # Test and debug suite
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── src/
│   ├── App.tsx           # Main application
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── dashboard/   # Dashboard components
│   │   └── layout/      # Layout components
│   └── ...
├── public/               # Static assets
└── dist/                # Production build (generated)
```

## Technology Stack

- **React 18.3.1**: Frontend framework
- **TypeScript**: Type-safe JavaScript
- **Vite 5.4.19**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library
- **React Router**: Client-side routing
- **React Hook Form**: Form management
- **Zod**: Schema validation

## Development Workflow

1. **Initial Setup**: Run `start.bat` → Option 5 (Install Dependencies)
2. **Daily Development**: Run `start.bat` → Option 1 (Start Development Server)
3. **Testing**: Run `test-debug.bat` → Option 1 (Run All Tests)
4. **Before Deploy**: Run `start.bat` → Option 2 (Build for Production)
5. **Debug Issues**: Run `test-debug.bat` → Option 4 (Debug Mode)

## Common Issues & Solutions

### Port Already in Use
- The dev server uses port 5173 by default
- If occupied, Vite automatically finds the next available port
- Check the terminal output for the actual URL

### Dependencies Issues
- Run `start.bat` → Option 6 (Clean Project)
- Then Option 5 (Install Dependencies)

### Build Errors
- Check TypeScript errors: `test-debug.bat` → Option 7
- Check ESLint errors: `start.bat` → Option 3

### Performance Issues
- Run `test-debug.bat` → Option 5 (Performance Audit)
- Check bundle size: Option 9 (Monitor Bundle Size)

## Browser Development

- **Chrome DevTools**: Press F12 or Ctrl+Shift+I
- **React DevTools**: Install browser extension for React debugging
- **Network Tab**: Monitor API calls and resource loading
- **Performance Tab**: Analyze runtime performance

## Production Deployment

1. Build: `start.bat` → Option 2
2. Test: `test-debug.bat` → Option 1
3. Deploy the `dist/` folder to your hosting service

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
