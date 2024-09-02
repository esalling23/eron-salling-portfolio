sudo apt-get update
git pull origin main
pipenv shell "pipenv install && python manage.py migrate && exit"
# cd frontend && rm -rf node_modules package-lock.json && npm install && npm run build && cd ../

cd ~/ && rm -rf /var/www/eronsalling.me
cp -rf ~/eron-salling-portfolio /var/www/eronsalling.me
sudo systemctl restart gunicorn
sudo systemctl restart nginx
echo "Finished"

