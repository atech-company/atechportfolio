@echo off
echo ========================================
echo Installing Strapi CMS
echo ========================================
echo.
echo This will install Strapi in the 'strapi' folder
echo Using SQLite (no database setup needed)
echo.
echo Press any key to continue or Ctrl+C to cancel...
pause >nul

echo.
echo Creating Strapi installation...
echo This may take 2-5 minutes...
echo.

npx create-strapi-app@latest strapi --quickstart

echo.
echo ========================================
echo Installation complete!
echo ========================================
echo.
echo Next steps:
echo 1. Wait for Strapi to start automatically
echo 2. Create your admin account when prompted
echo 3. Access Strapi at: http://localhost:1337/admin
echo.
echo If Strapi doesn't start automatically, run:
echo   cd strapi
echo   npm run develop
echo.
pause

