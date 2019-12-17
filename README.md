# fall-2019-term-project-wade_ramos_knack_anjomshoaa
 
 ## frontend repo
https://github.com/jknack0/termproject

## Getting Started

__Clone the repo__

Use git clone "" to clone the repo to your machine using the command line:
_DO NOT EXIT OUT OF THE COMMAND LINE YET_

__Create a .env file__

Create a .env file in the root of the project after cloning it. 


    unix: 'vi .env' => ':wq'
    windows: just use VScode  
            'code .' => add new file button

The .env file should contain the following variables.  If you setup Postgres with default settings, then you won't need to change the variable values.

    DATABASE_URL=postgres://postgres:YOUR_PASSWORD@localhost:5432/postgres

this is a database url the format for postgres is 

    postgres://username:password@url/dbname

Change "YOUR_PASSWORD" to the password your Postgres database.

__Download Postgres__
https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

Follow the above link and download the Version 12 installer for your operating system.  I would reccomend not differing from the default configuration unless you really understand the process. 

Here is the youtube tutorial I watched: 
https://www.youtube.com/watch?v=e1MwsT5FJRQ
