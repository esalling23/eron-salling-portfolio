# Portfolio Website

Django server to support frontend Next.js application


## Setup

### Server

1. Enter `pipenv shell` 
2. Install dependencies with `pipenv install`
3. Create a database with Postgres
   1. `psql` then `createdb "db-name"`
4. Create a superuser for your database
   1. `CREATE USER admin;`
   2. `ALTER USER admin WITH SUPERUSER;`
5. Create a `.env` file with the following properties
   1. `ENV` with "development" or "production"
      1. If this does not exist, server will assume a development environment
   2. `SECRET` with literally anything
   3. `DB_NAME_PROD` & `DB_NAME_PROD` with relevant database name
   4. `DB_USER_NAME` with a database user with access
   5. `DB_USER_PASS` with the password for `DB_USER_NAME`
6. Apply existing migrations `python3 manage.py migrate`
7. Create a superuser with `python manage.py createsuperuser`
8. Run server with `python3 manage.py runserver`
