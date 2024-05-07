# Portfolio Website

Django w/ ReactJS frontend app


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

### Client

1.  Create a second terminal window & enter the `frontend` directory. 
2. Run `nvm use` to use the nvm settings defined in the `.npmrc` 
3. Run `npm install` to install dependencies
4. Run `npm run dev` to run the dev change listening server
   1. `npm run build` will generate a single updated build

## Deployment

Main steps are to build `frontend` app, `collectstatic`, and restart services.

Example script for deployment (in progress): 

```sh

sudo apt-get update
cd ~/eron-salling-portfolio && git stash save -m "Stashing local changes as part of deploy" && git pull origin main
pipenv shell "pipenv install && cd frontend && rm -rf node_modules package-lock.json && npm install && npm run build && cd ../ && python manage.py migrate && python manage.py collectstatic && exit"

# can't get the gunicorn to register in the other folder 
# cd ~/ && rm -rf /var/www/eronsalling.me
# cp -rf ~/eron-salling-portfolio /var/www/eronsalling.me
sudo systemctl restart gunicorn
sudo systemctl restart nginx
echo "Finished"
```