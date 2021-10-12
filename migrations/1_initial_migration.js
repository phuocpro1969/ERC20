const TokenArtifacts = artifacts.require("OaxisToken");
const MultiTransfersArtifacts = artifacts.require("MultiTransfers");

module.exports = async function (deployer) {
	await deployer.deploy(TokenArtifacts, 1000000000);
	await deployer.deploy(MultiTransfersArtifacts);
};
