// scripts/deploy.js
async function main () {
  // We get the contract to deploy
  const OpenZeppelinTeamNFT = await ethers.getContractFactory('OpenZeppelinTeamNFT');
  console.log('Deploying OpenZeppelinTeamNFT...');
  const token = await OpenZeppelinTeamNFT.deploy(
    'OpenZeppelin Team NFT',
    'OZT',
    'http://my-json-server.typicode.com/OpenZeppelin/openzeppelin-team-nft/tokens/',
  );
  await token.deployed();
  console.log('OpenZeppelinTeamNFT deployed to:', token.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
