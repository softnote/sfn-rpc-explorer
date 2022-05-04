### Setup of https://softnoteexplorer.org on Ubuntu 20.04

	# update and install packages
	apt update
	apt upgrade
	apt install docker.io
	
	# get source, npm install
	git clone https://github.com/janoside/sfn-rpc-explorer.git
	cd sfn-rpc-explorer
	
	# build docker image
	docker build -t sfn-rpc-explorer .

	# run docker image: detached mode, share port 3002, sharing config dir, from the "sfn-rpc-explorer" image made above
	docker run --name=sfn-rpc-explorer -d -v /host-os/env-dir:/container/env-dir --network="host" sfn-rpc-explorer
	