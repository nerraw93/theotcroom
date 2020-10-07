update:
	cd ./api/ && make update
	cd ..
	cd webroot/ && yarn

updateAndStart:
	make update
	cd webroot/ && yarn start

deploy:
	cd ./api/ && make update
	cd webroot/ && yarn && yarn prod
