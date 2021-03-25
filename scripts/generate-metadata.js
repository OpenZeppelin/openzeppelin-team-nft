// scripts/generateMetaData.js
async function main () {
  const repository = 'https://github.com/OpenZeppelin/openzeppelin-team-nft/';
  // Define root node.
  const jsonMetaData = {
  };

  // Add tokens.
  jsonMetaData.tokens = [];
  for (let tokenId = 0; tokenId < 50; tokenId++) {
    /* eslint-disable camelcase */
    // Add token.
    jsonMetaData.tokens[tokenId] = {
      id: tokenId,
      description: 'OpenZeppelin Virtual Retreat, March 2021 - Commemorative tee-shirt',
      external_url: 'https://openzeppelin.com',
      image: repository + 'raw/main/images/virtual-retreat-tshirt-march-2021.png',
      name: 'Virtual Retreat Tee, March 2021',
    };
  }

  const output = JSON.stringify(jsonMetaData, null, 2); // Beautify JSON data structure.
  console.log(output);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
