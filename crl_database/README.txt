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


[ Setup Tutorial ]

1. Download source files onto local system from repository 
https://bitbucket.org/curtincomputingprojects/2023-10-crl-database/src/master/


2. Setup MongoDB login
- We have created a MongoDB accounts for the Admin to access the database
    - Username/email:mefny-crldatabase10@outlook.com
    - Password: 74e2dd294cd1ffe4e6cdbdcf71e6039b
- In order to run the web application locally, you will need to whitelist the IP for the device you are currently using on MongoDB.  
  On the MongoDB account we have given you above, follow the navigation instructions below to whitelist your IP;

[Whitelisting IP]
a.  From MongoDB Home page, navigate to 'Projects' (left-side-panel)
b.  Select the CRL Database project 'CRL-Database'
c.  Navigate to 'Network Access' (left-side-panel)
d.  Select "Add IP Address" (green button in top right)
e.  Press the Add Current IP Address button.
        i. (Optionally) toggle your IP address as temporary (bottom-left button) and choose how long your IP address should be active in the DB.
f.  Press save/confirm

Now you will be able to have access to the database with your current IP.


3. Install Node (if not installed yet)
Please install node by following the node's official instruction https://nodejs.org/en/download/package-manager#debian-and-ubuntu-based-linux-distributions.
Version is preferrably v18, to be specific, v18.17.1.


4. Run the bash script to compile the application
Use the bash script provided in the source file to compile and run the application.

First, you must change the permission to allow the script on your computer. (If you want, check the code of each scripts to see if you trust it first)
Note: The following command runs on Linux.

[ a. change the permission of the script to be executable ]
run: chmod +x install.sh run.sh

[ b. To install the application ]
Note: ONLY DO ONCE
run: ./install.sh

[ c. To run the frontend and backend services/application ]
run: ./run.sh
