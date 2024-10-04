sudo apt-get update
echo "Clearing Git status..."
git stash --include-untracked

echo "Updating files..."
git pull origin main

pipenv shell "pipenv install && python manage.py migrate && exit"

echo "Building app..." 
cd frontend 
npm run build

cd ~/
sudo rm -rf /var/www/eronsalling.me 
sudo cp -rf ~/eron-salling-portfolio /var/www/eronsalling.me
sudo systemctl restart gunicorn
sudo systemctl restart nginx
echo "Finished"

