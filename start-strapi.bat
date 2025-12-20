@echo off
echo ========================================
echo Starting Strapi CMS
echo ========================================
echo.

if not exist "strapi\package.json" (
    echo ERROR: Strapi is not installed!
    echo.
    echo Please run: install-strapi.bat
    echo Or install manually: npx create-strapi-app@latest strapi --quickstart
    pause
    exit /b 1
)

echo Changing to strapi directory...
cd strapi

echo.
echo Starting Strapi development server...
echo Strapi will be available at: http://localhost:1337/admin
echo.
echo Press Ctrl+C to stop Strapi
echo.

npm run develop

