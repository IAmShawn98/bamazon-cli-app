:: Quick Launcher For Bamazon CLI App (Highly Recommended).
@echo off

:: Let the user pick which node script they wish to run.
:selectMenu
cls
echo.
echo  Welcome to Bamazon CLI, the command line storefront! Select how you'd like to use Bamazon.
echo.
echo  Type 1, 2, or 3 and press 'enter' to select an option.
echo.
echo  1.) View As A Customer.
echo  2.) View As A Manager.
echo  3.) View As A Supervisor.
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
echo Loading View.... Please Wait.
node bamazonManager.js
pause
exit

:: Launch Supervisor View.
:supervisorView
cls
echo Loading View.... Please Wait.
node bamazonSupervisor.js
pause
goto supervisorView