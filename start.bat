@echo off
title WorkSphere Development Launcher
color 0A
echo.
echo ========================================
echo     WorkSphere Development Launcher
echo ========================================
echo.

:menu
echo Please select an option:
echo.
echo [1] Start Development Server (Frontend)
echo [2] Build for Production
echo [3] Run Linting
echo [4] Preview Production Build
echo [5] Install Dependencies
echo [6] Clean Project (node_modules, dist, cache)
echo [7] Debug Mode (Development with verbose logs)
echo [8] Project Information
echo [0] Exit
echo.
set /p choice="Enter your choice (0-8): "

if "%choice%"=="1" goto dev
if "%choice%"=="2" goto build
if "%choice%"=="3" goto lint
if "%choice%"=="4" goto preview
if "%choice%"=="5" goto install
if "%choice%"=="6" goto clean
if "%choice%"=="7" goto debug
if "%choice%"=="8" goto info
if "%choice%"=="0" goto exit
echo Invalid choice! Please try again.
echo.
goto menu

:dev
echo.
echo Starting development server...
echo This will open your browser automatically
echo.
npm run dev
goto menu

:build
echo.
echo Building for production...
echo.
npm run build
echo.
echo Build completed! Check the 'dist' folder.
pause
goto menu

:lint
echo.
echo Running ESLint...
echo.
npm run lint
echo.
pause
goto menu

:preview
echo.
echo Starting preview server...
echo Make sure you have built the project first!
echo.
npm run preview
goto menu

:install
echo.
echo Installing dependencies...
echo.
npm install
echo.
echo Dependencies installed successfully!
pause
goto menu

:clean
echo.
echo Cleaning project...
echo.
if exist node_modules (
    echo Removing node_modules...
    rmdir /s /q node_modules
)
if exist dist (
    echo Removing dist folder...
    rmdir /s /q dist
)
if exist .vite (
    echo Removing Vite cache...
    rmdir /s /q .vite
)
echo.
echo Project cleaned successfully!
pause
goto menu

:debug
echo.
echo Starting debug mode with verbose logging...
echo.
set DEBUG=vite:*
npm run dev -- --debug
goto menu

:info
echo.
echo ========================================
echo         Project Information
echo ========================================
echo.
echo Project Name: WorkSphere
echo Technology Stack:
echo   - React 18.3.1
echo   - TypeScript
echo   - Vite 5.4.19
echo   - Tailwind CSS
echo   - shadcn/ui components
echo.
echo Available Scripts:
echo   - npm run dev      : Start development server
echo   - npm run build    : Build for production
echo   - npm run preview  : Preview production build
echo   - npm run lint     : Run ESLint
echo.
echo Development Server: http://localhost:5173
echo.
echo Important Files:
echo   - src/App.tsx     : Main application component
echo   - index.html      : Entry point
echo   - vite.config.ts  : Vite configuration
echo   - package.json    : Dependencies and scripts
echo.
pause
goto menu

:exit
echo.
echo Thank you for using WorkSphere Development Launcher!
echo.
pause
exit
