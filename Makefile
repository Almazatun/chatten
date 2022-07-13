install:
	npm install
build:
	npm run build
start:
	npm run start
dev:
	npm run start:dev
prod:
	npm run start:prod
tests:
	npm test
compose-up:
	docker-compose up --build -d
compose-down:
	docker-compose down
compose-up-swagger:
	docker-compose --profile swaggerapi up --build
