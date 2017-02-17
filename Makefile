CONFIG_DIR = "./config"
DEBUG = channel-midnight:*
NODE_ENV = "production"
PROJECTS= ""

PM2_PROCESS_FILE = "ecosystem.json"

# init
init:
	@mkdir -p logs

# dependency
install:
	@cnpm install

uninstall:
	-rm -rf ./node_modules

reinstall: uninstall
	@cnpm install --cache-min 999999


# server
node:
	@DEBUG=${DEBUG} HOSTNAME=${HOSTNAME} NODE_ENV=development NODE_CONFIG_DIR=${CONFIG_DIR} node ./babel-entry

development:
	@DEBUG=${DEBUG} HOSTNAME=${HOSTNAME} NODE_ENV=development NODE_CONFIG_DIR=${CONFIG_DIR} node-dev ./babel-entry

server: init stop
	@DEBUG=${DEBUG} HOSTNAME=${HOSTNAME} NODE_ENV=${NODE_ENV} NODE_CONFIG_DIR=${CONFIG_DIR} pm2 start ${PM2_PROCESS_FILE}

stop:
	-pm2 delete ${PM2_PROCESS_FILE}


# build
build:
	@cd ./src/static/ && NODE_CONFIG_DIR=../../config gulp build


# alias
dev: development


.PHONY: init install uninstall reinstall node development server stop build dev
