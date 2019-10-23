# fall-2019-term-project-wade_ramos_knack_anjomshoaa

## Getting Started

__Clone the repo__
Use git clone "" to clone the repo to your machine using the command line
_DO NOT EXIT OUT OF THE COMMAND LINE YET_

__Create a .env file__
Create a .env file in the root of the project after cloning it. 

>
    unix: 'vi .env' => ':wq'
    windows: just use VScode  
            'code .' => add new file button
>

The .env file should contain the following variables.  If you leave the Postgres default settings, then you won't need to change the variable values

> 
    DB_HOST=localhost
    DB_USER=postgres
    DB_PASS="YOUR_PASSWORD"
    DB_NAME=postgres
    DB_DIALECT=postgres

__Download Postgres__
https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

Follow the above link and download the Version 12 install for your operating system. 

Here is the youtube tutorial I watched: 
https://www.youtube.com/watch?v=e1MwsT5FJRQ

