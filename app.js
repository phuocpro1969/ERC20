const TOKEN_ARTIFACT = require("./build/contracts/OaxisToken.json");
const MULTI_TRANSFERS_ARTIFACT = require("./build/contracts/MultiTransfers.json");

const Web3 = require("web3");
// const Provider = require("@truffle/hdwallet-provider");
const { pk, rinkeby } = require("./truffle-config");

const sender = "0x8B578Deb4e2A5CFB0A00277E9ef8B0feF566512B";
const receiver = "0x2AcB4E63d5DDe72EF65031aefD4BB9EaA482d262";

const provider = new Web3.providers.WebsocketProvider(rinkeby);
// const provider = new Provider(pk, rinkeby);

const web3 = new Web3(provider);

const amount = web3.utils.toWei("1", "ether");
const amount2 = web3.utils.toWei("2", "ether");

const chainId = 4;

const encodeParameter = (web3, type, value) => {
	return web3.eth.abi.encodeParameter(type, value).substring(2);
};

const encodeParameters = (web3, types, values) => {
	if (types.length !== values.length) return false;

	return web3.eth.abi.encodeParameters(types, values).substring(2);
};

const encodeFunctionSelector = (web3, functionInterface) => {
	if (functionInterface.length < 0) return false;

	return web3.utils.keccak256(functionInterface).substr(0, 10);
};

const encodeFunctionCall = (web3, functionInterface, types, values) => {
	return (
		encodeFunctionSelector(web3, functionInterface) +
		encodeParameters(web3, types, values)
	);
};

const run = async () => {
	try {
		const addressToken = TOKEN_ARTIFACT.networks[chainId].address;

		const encodedCall = await encodeFunctionCall(
			web3,
			"approve(address,uint256)",
			["address", "uint256"],
			[receiver, "1"]
		);

		const gas = await web3.eth.estimateGas({
			from: sender,
			to: addressToken,
			data: encodedCall,
		});

		console.log(gas);

		// const addressMulti = MULTI_TRANSFERS_ARTIFACT.networks[chainId].address;

		// const token = new web3.eth.Contract(TOKEN_ARTIFACT.abi, addressToken);

		// const multiTransfers = new web3.eth.Contract(
		// 	MULTI_TRANSFERS_ARTIFACT.abi,
		// 	addressMulti
		// );

		// single transaction

		// const transfer = await token.methods.transfer(receiver, amount2);
		// const gas = await transfer.estimateGas({ from: sender });
		// const gasPrice = await web3.eth.getGasPrice();
		// const data = transfer.encodeABI();
		// const nonce = await web3.eth.getTransactionCount(sender);

		// const txObj = {
		// 	from: sender,
		// 	to: token.options.address,
		// 	data,
		// 	gas,
		// 	gasPrice,
		// 	nonce,
		// 	chainId,
		// };

		// const signature = await web3.eth.accounts.signTransaction(txObj, pk);

		// console.log(signature);

		// const receipt = await web3.eth.sendSignedTransaction(
		// 	signature.rawTransaction
		// );
		// console.log("receipt :>> ", receipt);

		// multi transaction
		// const addressOfToken = token.options.address;

		// const arrAddressToken = [
		// 	addressOfToken,
		// 	addressOfToken,
		// 	addressOfToken,
		// ];

		// const arrSender = [sender, sender, sender];

		// const arrReceiver = [receiver, receiver, receiver];

		// const arrAmount = [amount, amount, amount2];

		// const multi = await multiTransfers.methods
		// 	.multiTransfers(arrAddressToken, arrSender, arrReceiver, arrAmount)
		// 	.send({ from: sender });

		// console.log("multi :>> ", multi);

		// send single transaction with other signature

		// console.log(await web3.eth.getBalance(sender));

		// const signature = {
		// 	messageHash:
		// 		"0x403ca423e2918b3f9b10a8b85b356587274b4b5327ce20fa6911a4d8aab5e8c4",
		// 	v: "0x00",
		// 	r: "0x00000000000000000000",
		// 	s: "0x00000000000000000000",
		// 	rawTransaction:
		// 		"0xf8a810843b9aca0882871e941eddc59a0ab65b003443eb01b001f2747db6552b80b844a9059cbb0000000000000000000000002acb4e63d5dde72ef65031aefd4bb9eaa482d2620000000000000000000000000000000000000000000000001bc16d674ec800002ca08b5073ab9240b749557c37eee175bb33bef0f1eba745a294a376f4bff63f4afca062ee6fc49e5f86905822ed0dc1ca69fd8275a887a791c5c61846e144c4d325f6",
		// 	transactionHash:
		// 		"0xf754e1089733637ae79351fd7eea8a45a8e399624e94d1295158b8efa4f7cdaf",
		// };

		// const receipt = await web3.eth.sendSignedTransaction(
		// 	signature.rawTransaction
		// );
		// console.log("receipt :>> ", receipt);

		// console.log("\n", await web3.eth.getBalance(sender));

		// const acct = await web3.eth.accounts.create(pk);
		// console.log(acct.privateKey);

		// let balance = await web3.eth.getBalance(sender);
		// console.log(balance);
	} catch (error) {
		console.log("error", error);
	}

	process.exit(0);
};

run();
