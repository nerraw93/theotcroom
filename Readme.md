## TheOTCRoom
### Laravel **(5.6)** + React (Redux) App

#### Setup
1. Go to `/api` directory and run `make setup`.
2. Create database on your computer.
3. Update the `.env` file base on your environment setup like database etc.
4. And finally run `php artisan passport:install`.
5. Go to `/webroot` directory and run `npm install`.
6. Create `.env` file _(If not exist)_ and add variables `REACT_APP_API_HOST=http://api.backend_url.here/api` **don't forget to add `/api` at the end**.
7. On your `/webroot` directory run `yarn start`.

#### On updating scss *stylesheets*
1. Run `yarn run watch-css` on `/webroot`.

##### Important Information
1. On live `node` version is `6.11.2`. Please use it on local so we won't have problem on deploying.
2. Bootstrap version is `4.1`.

#### On deployment
1. On front-end server run go to `webroot` dir and run `make deploy`.
2. On backend server on root folder go to `api` dir and run `make deploy`.
3. Run `php artisan generate:uuid`.
