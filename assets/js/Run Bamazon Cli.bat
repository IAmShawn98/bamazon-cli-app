:: Quick Launcher For Bamazon CLI (Highly Recommended).

:: Run Node App.
:QuickLaunchBamazon
:: Shut off dir paths.
@echo off
:: Tell the user to be patient, the node app is executing.
echo Loading, Please Wait....
:: Run node app in CLI.
node bamazonCustomer
:: Press any key to continue.
pause
:: If bamazon finishes an execution with no end handle, loop back to table view.
goto QuickLaunchBamazon