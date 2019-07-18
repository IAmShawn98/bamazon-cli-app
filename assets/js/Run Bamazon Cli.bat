:: Quick Launcher For Bamazon CLI App (Highly Recommended).
@echo off

:: Let the user pick which node script they wish to run.
:selectMenu
cls
echo.
echo  Welcome to Bamazon CLI, the command line storefront! What role do you assume? Let us know.
echo.
echo  1.) I'm A Customer.
echo  2.) I'm A Manager.
echo  3.) I'm the Supervisor.
echo.
echo  Type 1, 2, or 3 and press 'enter'.
echo.

:: If the user selects 1, 2, or 3 go to the proper node views.
set /p role=:
if %role% == 1 goto customerView
if %role% == 2 goto managerView
if %role% == 3 goto supervisorView

:: Launch Customer View.
:customerView
cls
echo Loading View.... Please Wait.
node bamazonCustomer.js
pause
goto customerView

:: Launch Manager View.
:managerView
cls
echo This portion of Bamazon is not yet implemented. Try again later.
pause
goto selectMenu

:: Launch Supervisor View.
:supervisorView
cls
echo This portion of Bamazon is not yet implemented. Try again later.
pause
goto selectMenu