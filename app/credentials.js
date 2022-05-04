"use strict";

const os = require('os');
const path = require('path');
const url = require('url');

const sfnUri = process.env.SFNEXP_SOFTNOTED_URI ? url.parse(process.env.SFNEXP_SOFTNOTED_URI, true) : { query: { } };
const sfnAuth = sfnUri.auth ? sfnUri.auth.split(':') : [];

module.exports = {
	rpc: {
		host: sfnUri.hostname || process.env.SFNEXP_SOFTNOTED_HOST || "127.0.0.1",
		port: sfnUri.port || process.env.SFNEXP_SOFTNOTED_PORT || 8332,
		username: sfnAuth[0] || process.env.SFNEXP_SOFTNOTED_USER,
		password: sfnAuth[1] || process.env.SFNEXP_SOFTNOTED_PASS,
		cookie: sfnUri.query.cookie || process.env.SFNEXP_SOFTNOTED_COOKIE || path.join(os.homedir(), '.softnote', '.cookie'),
		timeout: parseInt(sfnUri.query.timeout || process.env.SFNEXP_SOFTNOTED_RPC_TIMEOUT || 5000),
	},

	// optional: enter your api access key from ipstack.com below
	// to include a map of the estimated locations of your node's
	// peers
	// format: "ID_FROM_IPSTACK"
	ipStackComApiAccessKey: process.env.SFNEXP_IPSTACK_APIKEY,

	// optional: enter your api access key from mapbox.com below
	// to enable the tiles for map of the estimated locations of
	// your node's peers
	// format: "APIKEY_FROM_MAPBOX"
	mapBoxComApiAccessKey: process.env.SFNEXP_MAPBOX_APIKEY,

	// optional: GA tracking code
	// format: "UA-..."
	googleAnalyticsTrackingId: process.env.SFNEXP_GANALYTICS_TRACKING,

	// optional: sentry.io error-tracking url
	// format: "SENTRY_IO_URL"
	sentryUrl: process.env.SFNEXP_SENTRY_URL,
};
