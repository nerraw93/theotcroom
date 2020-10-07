setup:
	composer install
	cp .env.example .env
	php artisan key:generate
	make authorize

authorize:
	rm -rf ./storage/logs/laravel.log
	touch ./storage/logs/laravel.log
	sudo chmod -R 777 ./storage/
	sudo chmod -R 777 ./vendor/
	composer dump-autoload
	php artisan cache:clear
	php artisan storage:link

update:
	composer install
	composer dump-autoload
	php artisan migrate
	php artisan config:clear
	php artisan cache:clear
	php artisan view:clear
	php artisan route:clear

refresh:
	composer dump-autoload
	php artisan migrate
	php artisan config:clear
	php artisan cache:clear
	php artisan view:clear
	php artisan route:clear

deploy:
	git pull origin master
	make update
