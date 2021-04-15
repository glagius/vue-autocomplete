.PHONY: lint develop test

install:
	npm install

develop:
	npx vue-cli-service serve

lint:
	npx vue-cli-service lint

test-components:
	npx cypress open-ct

build: lint test
	npx vue-cli-service build