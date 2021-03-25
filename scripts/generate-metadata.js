// scripts/generateMetaData.js
async function main () {
  const fs = require('fs').promises;

  for (let tokenId = 0; tokenId < 50; tokenId++) {
    /* eslint-disable camelcase */
    // Add token.
    const jsonMetaData = {
      description: 'OpenZeppelin Virtual Retreat, March 2021 - Commemorative tee-shirt',
      external_url: 'https://openzeppelin.com',
      image: 'https://OpenZeppelin.github.io/openzeppelin-team-nft/images/virtual-retreat-tshirt-march-2021.png',
      name: 'Virtual Retreat Tee',
    };

    await fs.writeFile('api/token/' + tokenId.toString(), JSON.stringify(jsonMetaData));
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
