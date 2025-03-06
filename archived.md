
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