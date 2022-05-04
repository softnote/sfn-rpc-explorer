module.exports = {
	items: [
		{
			type: "blockheight",
			date: "2022-01-09",
			chain: "main",
			blockHeight: 0,
			blockHash: "00000000579fb2c32b1df9ae58bb0c23b89fafe69a8a40dffa5835653a177b1e",
			summary: "The Softnote Genesis Block.",
			alertBodyHtml: "This is the first block in the Softnote blockchain, known as the <b>Genesis Block</b>. This block was mined by <b>The SoftNote Developer</b>.",
			referenceUrl: " ./block-height/0"
		},
		{
			type: "tx",
			date: "2022-01-09",
			chain: "main",
			txid: "e34b98e4c69275692d186f9df31ffb069c7b6cbc909c053f57ac1320f6590104",
			blockHeight: 0,
			summary: "The coinbase transaction of the Genesis Block.",
			alertBodyHtml: "This transaction doesn't really exist! This is the <b>coinbase transaction</b> of the <a href='./block/00000000579fb2c32b1df9ae58bb0c23b89fafe69a8a40dffa5835653a177b1e'>Softnote Genesis Block</a>. For more background about this special-case transaction, you can read <a href='https://github.com/softnote/softnote/issues/3303'>this brief discussion.</a>",
			referenceUrl: "https://github.com/softnote/softnote/issues/3303"
		},
		{
			type: "blockheight",
			date: "2022-02-21",
			chain: "main",
			blockHeight: 1595,
			blockHash: "000000002df8d46690963f486f666c4ace4173ae04caf8e740c315619b4dc457",
			summary: "First block containing a (non-coinbase) transaction.",
			alertBodyHtml: "This block contains the first transfer of softnote. Before this block all blocks contained only coinbase transactions, which mint new softnote.",
			referenceUrl: "./block-height/1595"
		},
	



		// testnet
		{
			type: "blockheight",
			date: "2022-01-09",
			chain: "test",
			blockHeight: 0,
			blockHash: "00000000368e1d05913204a1191bd808dc3f8be260fddaef97621a12eed9753d",
			summary: "The Softnote (Testnet) Genesis Block.",
			alertBodyHtml: "This is the first block in the Softnote testnet blockchain, known as the 'Genesis Block'. You can read more about <a href=' ./block-height/0'>the genesis block here</a>.",
			referenceUrl: " ./block-height/0"
		},
		{
			type: "tx",
			date: "2022-01-09",
			chain: "test",
			txid: "e34b98e4c69275692d186f9df31ffb069c7b6cbc909c053f57ac1320f6590104",
			blockHeight: 0,
			summary: "The coinbase transaction of the testnet Genesis Block.",
			alertBodyHtml: "This transaction doesn't really exist! This is the coinbase transaction of the <a href='./block/00000000368e1d05913204a1191bd808dc3f8be260fddaef97621a12eed9753d'>Softnote testnet Genesis Block</a>. For more background about this special-case transaction, you can read <a href='https://github.com/softnote/softnote/issues/3303'>this brief discussion</a>.",
			referenceUrl: "https://github.com/softnote/softnote/issues/3303"
		},


		// regtest
		{
			type: "blockheight",
			date: "2022-01-09",
			chain: "regtest",
			blockHeight: 0,
			blockHash: "11e7891d3cdebf71550f81b278b225b0698175ad41d855977a96b69882677048",
			summary: "The Softnote (regtest) Genesis Block.",
			alertBodyHtml: "This is the first block in the Softnote regtest blockchain, known as the 'Genesis Block'. You can read more about <a href=' ./block-height/0'>the genesis block here</a>.",
			referenceUrl: " ./block-height/0"
		},
		{
			type: "tx",
			date: "2022-01-09",
			chain: "regtest",
			txid: "e34b98e4c69275692d186f9df31ffb069c7b6cbc909c053f57ac1320f6590104",
			blockHeight: 0,
			summary: "The coinbase transaction of the Genesis Block.",
			alertBodyHtml: "This transaction doesn't really exist! This is the coinbase transaction of the <a href='./block/11e7891d3cdebf71550f81b278b225b0698175ad41d855977a96b69882677048'>Softnote (regtest) Genesis Block</a>. For more background about this special-case transaction, you can read <a href='https://github.com/softnote/softnote/issues/3303'>this brief discussion</a>.",
			referenceUrl: "https://github.com/softnote/softnote/issues/3303"
		}
	]
};
