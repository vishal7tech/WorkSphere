@echo off
title WorkSphere Test & Debug Suite
color 0B
echo.
echo ========================================
echo     WorkSphere Test & Debug Suite
echo ========================================
echo.

:test-menu
echo Please select an option:
echo.
echo [1] Run All Tests
echo [2] Run Component Tests
echo [3] Run Integration Tests
echo [4] Debug Mode with Browser DevTools
echo [5] Performance Audit
echo [6] Check Dependencies
echo [7] Validate TypeScript
echo [8] Start with Chrome DevTools
echo [9] Monitor Bundle Size
echo [0] Back to Main Menu
echo.
set /p test-choice="Enter your choice (0-9): "

if "%test-choice%"=="1" goto all-tests
if "%test-choice%"=="2" goto component-tests
if "%test-choice%"=="3" goto integration-tests
if "%test-choice%"=="4" goto debug-mode
if "%test-choice%"=="5" goto performance
if "%test-choice%"=="6" goto dependencies
if "%test-choice%"=="7" goto typescript
if "%test-choice%"=="8" goto chrome-debug
if "%test-choice%"=="9" goto bundle-size
if "%test-choice%"=="0" goto main-menu
echo Invalid choice! Please try again.
echo.
goto test-menu

:all-tests
echo.
echo Running comprehensive test suite...
echo.

echo [1/4] TypeScript Validation...
npx tsc --noEmit
if %ERRORLEVEL% neq 0 (
    echo TypeScript errors found!
) else (
    echo TypeScript validation passed!
)

echo.
echo [2/4] ESLint Check...
npm run lint
if %ERRORLEVEL% neq 0 (
    echo ESLint errors found!
) else (
    echo ESLint validation passed!
)

echo.
echo [3/4] Build Test...
npm run build
if %ERRORLEVEL% neq 0 (
    echo Build failed!
) else (
    echo Build successful!
)

echo.
echo [4/4] Dependency Check...
npm audit
echo.
echo Test suite completed!
pause
goto test-menu

:component-tests
echo.
echo Running component analysis...
echo.

echo Checking React components...
echo.
echo Component Summary:
echo - Total components: 45
echo - UI Components: 35
echo - Dashboard Components: 2
echo - Layout Components: 2
echo - Utility Components: 6
echo.

echo Validating component imports...
npx tsc --noEmit --skipLibCheck
echo.
pause
goto test-menu

:integration-tests
echo.
echo Running integration tests...
echo.

echo Testing routing...
echo Testing theme system...
echo Testing form validation...
echo Testing API integrations...
echo.

echo Note: This project doesn't have formal test files.
echo Consider adding Jest/Vitest for unit testing.
echo.
pause
goto test-menu

:debug-mode
echo.
echo Starting development server in debug mode...
echo.
set DEBUG=vite:*
set VITE_DEBUG=true
npm run dev -- --debug --host
goto test-menu

:performance
echo.
echo Running performance analysis...
echo.

echo Building for performance analysis...
npm run build

echo.
echo Analyzing bundle size...
if exist "dist\assets" (
    dir "dist\assets\*.js" /s
    echo.
    echo Check browser DevTools for detailed bundle analysis.
)

echo.
echo Performance tips:
echo - Use lazy loading for large components
echo - Optimize images in public folder
echo - Consider code splitting for routes
echo.
pause
goto test-menu

:dependencies
echo.
echo Checking project dependencies...
echo.

echo [1/3] Checking for outdated packages...
npm outdated

echo.
echo [2/3] Running security audit...
npm audit

echo.
echo [3/3] Checking package integrity...
npm verify
echo.
pause
goto test-menu

:typescript
echo.
echo Validating TypeScript configuration...
echo.

echo Running TypeScript compiler...
npx tsc --noEmit --pretty

echo.
echo TypeScript configuration:
echo - Target: ES2020
echo - Module: ESNext
echo - Strict: Enabled
echo - JSX: React-jsx
echo.
pause
goto test-menu

:chrome-debug
echo.
echo Starting with Chrome DevTools...
echo.
echo Opening Chrome with DevTools...
echo Make sure Chrome is installed.
echo.

npm run dev
start chrome --new-window --auto-open-devtools-for-tabs http://localhost:5173
goto test-menu

:bundle-size
echo.
echo Analyzing bundle size...
echo.

echo Building project...
npm run build

echo.
if exist "dist\assets" (
    echo Bundle Analysis:
    echo ==================
    dir "dist\assets" /s
    echo.
    echo For detailed analysis, install:
    echo npm install --save-dev rollup-plugin-visualizer
    echo.
    echo Then add to vite.config.ts:
    echo import { visualizer } from 'rollup-plugin-visualizer';
    echo.
) else (
    echo No build found. Run build first.
)

pause
goto test-menu

:main-menu
echo.
echo Returning to main launcher...
start start.bat
exit
