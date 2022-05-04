#!/usr/bin/env node

var debug = require("debug");
var debugLog = debug("sfnexp:config");

// to debug arg settings, enable the below line:
//debug.enable("sfnexp:*");

const args = require('meow')(`
	Usage
	  $ sfn-rpc-explorer [options]

	Options
	  -p, --port <port>			  port to bind http server [default: 3002]
	  -i, --host <host>			  host to bind http server [default: 127.0.0.1]
	  -a, --basic-auth-password <..> protect web interface with a password [default: no password]
	  -C, --coin <coin>			  crypto-coin to enable [default: SFN]

	  -b, --softnoted-uri <uri>	   connection URI for softnoted rpc (overrides the options below)
	  -H, --softnoted-host <host>	 hostname for softnoted rpc [default: 127.0.0.1]
	  -P, --softnoted-port <port>	 port for softnoted rpc [default: 8332]
	  -c, --softnoted-cookie <path>   path to softnoted cookie file [default: ~/.softnote/.cookie]
	  -u, --softnoted-user <user>	 username for softnoted rpc [default: none]
	  -w, --softnoted-pass <pass>	 password for softnoted rpc [default: none]

	  --address-api <option>		 api to use for address queries (options: electrum, blockchain.com, blockchair.com, blockcypher.com) [default: none]
	  -E, --electrum-servers <..>   comma separated list of electrum servers to use for address queries; only used if --address-api=electrum [default: none]

	  --rpc-allowall				 allow all rpc commands [default: false]
	  --rpc-blacklist <methods>	  comma separated list of rpc commands to block [default: see in config.js]
	  --cookie-secret <secret>	   secret key for signed cookie hmac generation [default: hmac derive from softnoted pass]
	  --demo						 enable demoSite mode [default: disabled]
	  --no-rates					 disable fetching of currency exchange rates [default: enabled]
	  --slow-device-mode			 disable performance-intensive tasks (e.g. UTXO set fetching) [default: enabled]
	  --privacy-mode				 enable privacyMode to disable external data requests [default: disabled]
	  --max-mem <bytes>			  value for max_old_space_size [default: 1024 (1 GB)]

	  --ganalytics-tracking <tid>	tracking id for google analytics [default: disabled]
	  --sentry-url <sentry-url>	  sentry url [default: disabled]

	  -e, --node-env <env>		   nodejs environment mode [default: production]
	  -h, --help					 output usage information
	  -v, --version				  output version number

	Examples
	  $ sfn-rpc-explorer --port 8080 --softnoted-port 18443 --softnoted-cookie ~/.softnote/regtest/.cookie
	  $ sfn-rpc-explorer -p 8080 -P 18443 -c ~/.softnote/regtest.cookie

	Or using connection URIs
	  $ sfn-rpc-explorer -b softnote://bob:myPassword@127.0.0.1:18443/
	  $ sfn-rpc-explorer -b softnote://127.0.0.1:18443/?cookie=$HOME/.softnote/regtest/.cookie

	All options may also be specified as environment variables
	  $ SFNEXP_PORT=8080 SFNEXP_SOFTNOTED_PORT=18443 SFNEXP_SOFTNOTED_COOKIE=~/.softnote/regtest/.cookie sfn-rpc-explorer


`, {
		flags: {
			port: {alias:'p'},
			host: {alias:'i'},
			basicAuthPassword: {alias:'a'},
			coin: {alias:'C'},
			softnotedUri: {alias:'b'},
			softnotedHost: {alias:'H'},
			softnotedPort: {alias:'P'},
			softnotedCookie: {alias:'c'},
			softnotedUser: {alias:'u'},
			softnotedPass: {alias:'w'},
			demo: {},
			rpcAllowall: {},
			electrumServers: {alias:'E'},
			nodeEnv: {alias:'e', default:'production'},
			privacyMode: {},
			slowDeviceMode: {}
		}
	}
).flags;

const envify = k => k.replace(/([A-Z])/g, '_$1').toUpperCase();

Object.keys(args).filter(k => k.length > 1).forEach(k => {
	if (args[k] === false) {
		debugLog(`Config(arg): SFNEXP_NO_${envify(k)}=true`);

		process.env[`SFNEXP_NO_${envify(k)}`] = true;

	} else {
		debugLog(`Config(arg): SFNEXP_${envify(k)}=${args[k]}`);

		process.env[`SFNEXP_${envify(k)}`] = args[k];
	}
});

require('./www');
