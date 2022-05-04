"use strict";

const Decimal = require("decimal.js");
const Decimal8 = Decimal.clone({ precision:8, rounding:8 });

const sfnFun = require("./sfnFun.js");

const blockRewardEras = [ new Decimal8(50) ];
for (let i = 1; i < 34; i++) {
	let previous = blockRewardEras[i - 1];
	blockRewardEras.push(new Decimal8(previous).dividedBy(2));
}

const currencyUnits = [
	{
		type:"native",
		name:"SFN",
		multiplier:1,
		default:true,
		values:["", "sfn", "SFN"],
		decimalPlaces:8
	},
	{
		type:"native",
		name:"mSFN",
		multiplier:1000,
		values:["msfn"],
		decimalPlaces:5
	},
	{
		type:"native",
		name:"bits",
		multiplier:1000000,
		values:["bits"],
		decimalPlaces:2
	},
	{
		type:"native",
		name:"sat",
		multiplier:100000000,
		values:["sat", "satoshi"],
		decimalPlaces:0
	},
	{
		type:"exchanged",
		name:"USD",
		multiplier:"usd",
		values:["usd"],
		decimalPlaces:2,
		symbol:"$"
	},
	{
		type:"exchanged",
		name:"EUR",
		multiplier:"eur",
		values:["eur"],
		decimalPlaces:2,
		symbol:"€"
	},
];

module.exports = {
	name:"Softnote",
	ticker:"SFN",
	logoUrlsByNetwork:{
		"main":"./img/logo/mainnet/logo.svg",
		"test":"./img/logo/testnet/logo.svg",
		"regtest":"./img/logo/regtest/logo.svg",
		"signet":"./img/logo/signet/logo.svg"
	},
	coinIconUrlsByNetwork:{
		"main":"./img/logo/mainnet/coin-icon.svg",
		"test":"./img/logo/testnet/coin-icon.svg",
		"signet":"./img/logo/signet/coin-icon.svg"
	},
	coinColorsByNetwork: {
		"main": "#389AEB",
		"test": "#1daf00",
		"signet": "#af008c",
		"regtest": "#777"
	},
	siteTitlesByNetwork: {
		"main":"SoftNote Explorer",
		"test":"Testnet Explorer",
		"regtest":"Regtest Explorer",
		"signet":"Signet Explorer",
	},
	demoSiteUrlsByNetwork: {
		"main": "https://bitcoinexplorer.org",
		"test": "https://testnet.bitcoinexplorer.org",
		"signet": "https://signet.bitcoinexplorer.org",
	},
	knownTransactionsByNetwork: {
		main: "0c34f9cd0541cbe220b95f89403a542cd20b0cee6e78b6b41b187e2c39e54865",
		test: "",
		signet: ""
	},
	miningPoolsConfigUrls:[	
		"./miningpoolconfig/pools.json"	
	],
	maxBlockWeight: 12000000,
	maxBlockSize: 12000000,
	minTxBytes: 166, // ref: https://en.softnote.it/wiki/Maximum_transaction_rate
	minTxWeight: 166 * 4, // hack
	difficultyAdjustmentBlockCount: 2016,
	maxSupplyByNetwork: {
		"main": new Decimal(90070000), // ref: https://softnote.stackexchange.com/a/38998
		"test": new Decimal(90070000),
		"regtest": new Decimal(90070000),
		"signet": new Decimal(90070000)
	},
	targetBlockTimeSeconds: 600,
	targetBlockTimeMinutes: 10,
	currencyUnits:currencyUnits,
	currencyUnitsByName:{"SFN":currencyUnits[0], "mSFN":currencyUnits[1], "bits":currencyUnits[2], "sat":currencyUnits[3]},
	baseCurrencyUnit:currencyUnits[3],
	defaultCurrencyUnit:currencyUnits[0],
	feeSatoshiPerByteBucketMaxima: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50, 75, 100, 150],
	
	halvingBlockIntervalsByNetwork: {
		"main": 449914,
		"test": 449914,
		"regtest": 150,
		"signet": 449914
	},

	// used for supply estimates that don't need full gettxoutset accuracy
	coinSupplyCheckpointsByNetwork: {
		"main": [ 2048, new Decimal(102400) ],
		"test": [ 0, new Decimal(0) ],
		"signet": [ 0, new Decimal(0) ],
		"regtest": [ 0, new Decimal(0) ]
	},

	utxoSetCheckpointsByNetwork: {
		"main": {"height":2277,"bestblock":"00000000797c13f5243530b8e430efcccfdb78b7877044cd96e80e14a33947c1","transactions":1596,"txouts":1597,"bogosize":114984,"hash_serialized_2":"f43aa2af230281b00c449fc216965221799083ae6b97dd1b69b96c1450ecbfd0","disk_size":152966,"total_amount":"45148800.00000000","lastUpdated":1646939371}
	},
	
	genesisBlockHashesByNetwork:{
		"main":	"00000000579fb2c32b1df9ae58bb0c23b89fafe69a8a40dffa5835653a177b1e",
		"test":	"00000000368e1d05913204a1191bd808dc3f8be260fddaef97621a12eed9753d",
		"regtest": "11e7891d3cdebf71550f81b278b225b0698175ad41d855977a96b69882677048",
		"signet":  "0000023a16958313160ff508a5b5b010f87c0d9954c07b8f86178a3a19348554", 
	},
	genesisCoinbaseTransactionIdsByNetwork: {
		"main":	"e34b98e4c69275692d186f9df31ffb069c7b6cbc909c053f57ac1320f6590104",
		"test":	"e34b98e4c69275692d186f9df31ffb069c7b6cbc909c053f57ac1320f6590104",
		"regtest": "e34b98e4c69275692d186f9df31ffb069c7b6cbc909c053f57ac1320f6590104",
		"signet":  "e34b98e4c69275692d186f9df31ffb069c7b6cbc909c053f57ac1320f6590104"
	},
	genesisCoinbaseTransactionsByNetwork:{
		"main": {
			"hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff5d04ffff001d01044c544e5954696d657320596f74616d204f74746f6c656e6768692030372f4a616e756172792f32303231204120506f7461746f2047726174696e205468617420496e6e6f7661746573206f6e20547261646974696f6effffffff0100f2052a0100000043410425934f1cf67be710dd2aa3a1e573e0a786d70253450f2f83f94713daeff405c3e122206a68cb411b09ff74eabd6a7944b2c798d6538eaeb70714a234d7464ccfac00000000"
 ,
			"txid": "e34b98e4c69275692d186f9df31ffb069c7b6cbc909c053f57ac1320f6590104",
			"hash": "e34b98e4c69275692d186f9df31ffb069c7b6cbc909c053f57ac1320f6590104",
			"size": 220,
			"vsize": 220,
			"version": 1,
			"confirmations":2308,
			"vin": [
				{
					"coinbase": "04ffff001d01044c544e5954696d657320596f74616d204f74746f6c656e6768692030372f4a616e756172792f32303231204120506f7461746f2047726174696e205468617420496e6e6f7661746573206f6e20547261646974696f6e",
					"sequence": 4294967295
				}
			],
			"vout": [
				{
					"value": 50,
					"n": 0,
					"scriptPubKey": {
						"asm": "0425934f1cf67be710dd2aa3a1e573e0a786d70253450f2f83f94713daeff405c3e122206a68cb411b09ff74eabd6a7944b2c798d6538eaeb70714a234d7464ccf OP_CHECKSIG",
						"hex": "410425934f1cf67be710dd2aa3a1e573e0a786d70253450f2f83f94713daeff405c3e122206a68cb411b09ff74eabd6a7944b2c798d6538eaeb70714a234d7464ccfac",
			                        "type": "pubkey",						
					}
				}
			],
			"blockhash": "00000000579fb2c32b1df9ae58bb0c23b89fafe69a8a40dffa5835653a177b1e",
			"time": 1641705427,
			"blocktime": 1641705427
		}
		

	},
	genesisBlockStatsByNetwork:{
		"main": {
			"avgfee": 0,
			"avgfeerate": 0,
			"avgtxsize": 0,
			"blockhash": "00000000579fb2c32b1df9ae58bb0c23b89fafe69a8a40dffa5835653a177b1e",
			"feerate_percentiles": [
				0,
				0,
				0,
				0,
				0
			],
			"height": 0,
			"ins": 0,
			"maxfee": 0,
			"maxfeerate": 0,
			"maxtxsize": 0,
			"medianfee": 0,
			"mediantime": 1641705427,
			"mediantxsize": 0,
			"minfee": 0,
			"minfeerate": 0,
			"mintxsize": 0,
			"outs": 1,
			"subsidy": 5000000000,
			"swtotal_size": 0,
			"swtotal_weight": 0,
			"swtxs": 0,
			"time": 1641705427,
			"total_out": 0,
			"total_size": 0,
			"total_weight": 0,
			"totalfee": 0,
			"txs": 1,
			"utxo_increase": 1,
			"utxo_size_inc": 117
		}
		
	},
	testData: {
		txDisplayTestList: {
			"634b57cf0673c50b98560dbdf48d0a8633303b5d9162175e08b304df159c259e" : {
				blockHeight: 694670, blockHash: "0000000000000000000ba61d43854a2460b219b5281db2c731ae03a4347eaf43"
			},
			"f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16" : {
				blockHeight: 170, blockHash: "00000000d1145790a8694403d4063f323d499e655c83426834d4ce2f8dd4a2ee"
			},
			"a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d" : {
				blockHeight: 57043, blockHash: "00000000152340ca42227603908689183edc47355204e7aca59383b0aaac1fd8"
			},
			"7b6e490670a5cfcc9b66d8aab142ac2e9b489ae7f40cadadfc69c19878ae81b0" : {
				blockHeight: 227835, blockHash: "00000000000001aa077d7aa84c532a4d69bdbff519609d1da0835261b7a74eb6"
			},
			"8f7f13d6b56ea9013f13d298bc0e9e9f4f9825f3e7fd96083a564b10b01025d9" : {
				blockHeight: 694521, blockHash: "00000000000000000009974b5f6011d7ec8af460dafcc668c7ede4324896b9ca"
			},
			"3215f4a32a26938ddf9eeb4de7f5f42e751410876500f6e93d943abb2c3cccc4" : {
				blockHeight: 694521, blockHash: "00000000000000000009974b5f6011d7ec8af460dafcc668c7ede4324896b9ca"
			},
			"333d5f27c6fc2d07ef8c19e17d33568706bc3d6875198aba6cff0a996698d46e" : {
				blockHeight: 694521, blockHash: "00000000000000000009974b5f6011d7ec8af460dafcc668c7ede4324896b9ca"
			},
			"a9ceb47b092f703c30b29cb8b864fb8fa895a5999b24aa56ae08a967b643087c" : {
				blockHeight: 694521, blockHash: "00000000000000000009974b5f6011d7ec8af460dafcc668c7ede4324896b9ca"
			},
			"bc968c93c6ff39f022f974504a22d548902fe5a8c4fb294f052f845e4c388fcb" : {
				blockHeight: 694521, blockHash: "00000000000000000009974b5f6011d7ec8af460dafcc668c7ede4324896b9ca"
			},
			"e4bd7949cbf067d17629a5f588bba051b4436d29b5978d674118539356745bd0" : {
				blockHeight: 227835, blockHash: "00000000000001aa077d7aa84c532a4d69bdbff519609d1da0835261b7a74eb6"
			},
			"54e48e5f5c656b26c3bca14a8c95aa583d07ebe84dde3b7dd4a78f4e4186e713" : {
				blockHeight: 230009, blockHash: "00000000000000ecbbff6bafb7efa2f7df05b227d5c73dca8f2635af32a2e949"
			},
			"d29c9c0e8e4d2a9790922af73f0b8d51f0bd4bb19940d9cf910ead8fbe85bc9b" : {
				blockHeight: 268060, blockHash: "000000000000000743aee48cf264e1aa4a05fc3018677be3c1bdbd2429ffeede"
			},
			"143a3d7e7599557f9d63e7f224f34d33e9251b2c23c38f95631b3a54de53f024" : {
				blockHeight: 306204, blockHash: "000000000000000038dea6f503ed3593b1495e135d9ed646c2ebb97a1ff35bd7"
			},
			"8f907925d2ebe48765103e6845c06f1f2bb77c6adc1cc002865865eb5cfd5c1c" : {
				blockHeight: 481824, blockHash: "0000000000000000001c8018d9cb3b742ef25114f27563e3fc4a1902167f9893"
			},
			"8f5834d39a634c1b4c6283b546e16e931cb34d28570c77860de1a86256c4344d" : {
				blockHeight: 629999, blockHash: "0000000000000000000d656be18bb095db1b23bd797266b0ac3ba720b1962b1e"
			},
			"7836d12e741ffc6e50dba9b461e117cfbe444e7daa73df648b3a441d5a9ee958" : {
				blockHeight: 230009, blockHash: "00000000000000ecbbff6bafb7efa2f7df05b227d5c73dca8f2635af32a2e949"
			},
			"29a3efd3ef04f9153d47a990bd7b048a4b2d213daaa5fb8ed670fb85f13bdbcf" : {
				blockHeight: 153509, blockHash: "00000000000000fb62bbadc0a9dcda556925b2d0c1ad8634253ac2e83ab8382f"
			},
			"fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33" : {
				blockHeight: 1000, blockHash: "00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"
			},
			"b10c007c60e14f9d087e0291d4d0c7869697c6681d979c6639dbd960792b4d41" : {
				blockHeight: 692261, blockHash: "0000000000000000000f14c35b2d841e986ab5441de8c585d5ffe55ea1e395ad"
			},
			"777c998695de4b7ecec54c058c73b2cab71184cf1655840935cd9388923dc288" : {
				blockHeight: 709632, blockHash: "0000000000000000000687bca986194dc2c1f949318629b44bb54ec0a94d8244"
			},
			"b53e3bc5edbb41b34a963ecf67eb045266cf841cab73a780940ce6845377f141" : {
				blockHeight: 608548, blockHash: "00000000000000000009cf4a72b39c634586e6e328365f0d7293964111148094"
			}
		}
	},
	genesisCoinbaseOutputAddressScripthash:"",
	historicalData: sfnFun.items,
	exchangeRateData:{
		jsonUrl:"https://bitcoin-otc.com/orderbook.json",
		responseBodySelectorFunction:function(responseBody) {
			//console.log("Exchange Rate Response: " + JSON.stringify(responseBody));

			var exchangedCurrencies = ["USD", "GBP", "EUR"];

			if (responseBody[0].buysell) {
var USDcurrentPrice = 0;
var GBPcurrentPrice = 0;
var EURcurrentPrice = 0;

var USDprice = 0;
var GBPprice = 0;
var EURprice = 0;

var USDcounter = 0;
var GBPcounter = 0;
var EURcounter = 0;

for(var i = 0; i < responseBody.length ; i++){ 

if(responseBody[i].thing.toUpperCase() == 'SFN' && responseBody[i].otherthing.toUpperCase() == 'USD' && (/^[0-9\s]*$/.test(responseBody[i].price)) ){ 

var USDprice = Number(USDprice) + Number(responseBody[i].price); var USDcounter = Number(USDcounter) + 1;}


 else { if(responseBody[i].thing.toUpperCase() == 'SFN' && responseBody[i].otherthing.toUpperCase() == 'GBP' && (/^[0-9\s]*$/.test(responseBody[i].price)) ){ 
var GBPprice = Number(GBPprice) + Number(responseBody[i].price); var USDcounter = Number(USDcounter) + 1;}


 else { if(responseBody[i].thing.toUpperCase() == 'SFN' && responseBody[i].otherthing.toUpperCase() == 'EUR' && (/^[0-9\s]*$/.test(responseBody[i].price))){ 
var EURprice = Number(EURprice) + Number(responseBody[i].price); var USDcounter = Number(USDcounter) + 1;}
      }}}

if(USDcounter !== 0){
var USDcurrentPrice = USDprice/USDcounter;} else { var USDcurrentPrice = 0.00;}

if(GBPcounter !== 0){
var GBPcurrentPrice = GBPprice/GBPcounter;} else { var GBPcurrentPrice = 0.00;}

if(EURcounter !== 0){
var EURcurrentPrice = EURprice/EURcounter;} else { var EURcurrentPrice = 0.00;}


        



				var exchangeRates = {};

				
					
						exchangeRates[exchangedCurrencies[0].toLowerCase()] = USDcurrentPrice;
					        exchangeRates[exchangedCurrencies[1].toLowerCase()] = GBPcurrentPrice;
				                exchangeRates[exchangedCurrencies[2].toLowerCase()] = EURcurrentPrice;

				return exchangeRates;
			}
			
			return null;
		}
	},
	goldExchangeRateData:{
		jsonUrl:"https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/XAU/USD",
		responseBodySelectorFunction:function(responseBody) {
			//console.log("Exchange Rate Response: " + JSON.stringify(responseBody));

			if (responseBody[0].topo && responseBody[0].topo.platform == "MT5") {
				var prices = responseBody[0].spreadProfilePrices[0];
				
				return {
					usd: prices.ask
				};
			}
			
			return null;
		}
	},
	blockRewardFunction:function(blockHeight, chain) {
		let halvingBlockInterval = (chain == "regtest" ? 150 : 449914);
		let index = Math.floor(blockHeight / halvingBlockInterval);

		return blockRewardEras[index];
	}
};
