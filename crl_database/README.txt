Deployment of CRL-Database
----------------------------------

Login Details for Admin Accounts: 

CRL-Database Admin Login
Email: mefny-crldatabase10@outlook.com
Password: iL@v3_crlApplications

Outlook
Email: mefny-crldatabase10@outlook.com
Password: N4d47wEuYKuy

----------------------------------
NOTE! The verify email process uses a setup Outlook account to foward the verify emails to user's accounts.  The login details are listed below for the account if you encounter any problems with not receiving the emails to verify accounts: These details can also be found in the .env file for the backend in the source code.

email: crl-database@outlook.com
Password: DRt846bizaEnqA2EG5L0PDPK4
-----------------------------------
Setup Tutorial

1. Download source files onto local system from repository 
https://bitbucket.org/curtincomputingprojects/2023-10-crl-database/src/master/

2. Setup MongoDB login
- We have created a MongoDB accounts for the Admin to access the database
- Username/email:mefny-crldatabase10@outlook.com | Password: 74e2dd294cd1ffe4e6cdbdcf71e6039b
- In order to run the web application locally, you'll need to whitelist the IP for the device you are currently using on MongoDB.  
  On the MongoDB account we have given you above, follow the navigation instructions below to whitelist your IP;

[Whitelisting IP]
- Navigate to 'Projects'
- Select the CRL Database project 'CRL-Database'
-Navigate to 'Network Access'
-Add IP Address (green button in top right)
-Press the Add Current IP Address option and then choose a time to live for the IP
-Press save

Now you will be able have access to the database with your current IP

3. Run the bash script to compile application

Use the bash script provided in the source file to compile and run the application

./install.sh







