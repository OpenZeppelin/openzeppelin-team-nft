// scripts/generateMetaData.js
async function main () {
  const fs = require('fs');

  const repository = 'https://github.com/OpenZeppelin/openzeppelin-team-nft/';

  for (let tokenId = 0; tokenId < 50; tokenId++) {
    /* eslint-disable camelcase */
    // Add token.
    const jsonMetaData = {
      id: tokenId,
      description: 'OpenZeppelin Virtual Retreat, March 2021 - Commemorative tee-shirt',
      external_url: 'https://openzeppelin.com',
      image: repository + 'raw/main/images/virtual-retreat-tshirt-march-2021.png',
      name: 'Virtual Retreat Tee, March 2021',
    };

    fs.writeFile('api/token/' + tokenId.toString(), jsonMetaData, function (err) {
      if (err) console.log(err);
      console.log('Generated JSON');
    });
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
