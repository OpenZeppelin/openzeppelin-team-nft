// test/OpenZeppelinTeamNFT.test.js
// Based on: openzeppelin-contracts/blob/v4.0.0/test/token/ERC721/presets/ERC721PresetMinterPauserAutoId.test.js
const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;

const { expect } = require('chai');

const OpenZeppelinTeamNFT = artifacts.require('OpenZeppelinTeamNFT');

contract('OpenZeppelinTeamNFT', function (accounts) {
  const [ deployer, other ] = accounts;

  const name = 'OpenZeppelinTeamNFT';
  const symbol = 'NFT';
  const baseURI = 'my.app/';
  const otherBaseURI = 'my.app2/';

  const DEFAULT_ADMIN_ROLE = '0x0000000000000000000000000000000000000000000000000000000000000000';
  const MINTER_ROLE = web3.utils.soliditySha3('MINTER_ROLE');

  beforeEach(async function () {
    this.token = await OpenZeppelinTeamNFT.new(name, symbol, baseURI, { from: deployer });
  });

  it('token has correct name', async function () {
    expect(await this.token.name()).to.equal(name);
  });

  it('token has correct symbol', async function () {
    expect(await this.token.symbol()).to.equal(symbol);
  });

  it('deployer has the default admin role', async function () {
    expect(await this.token.hasRole(DEFAULT_ADMIN_ROLE, deployer)).to.equal(true);
  });

  it('deployer has the minter role', async function () {
    expect(await this.token.hasRole(MINTER_ROLE, deployer)).to.equal(true);
  });

  it('minter role admin is the default admin', async function () {
    expect(await this.token.getRoleAdmin(MINTER_ROLE)).to.equal(DEFAULT_ADMIN_ROLE);
  });

  describe('minting', function () {
    it('deployer can mint tokens', async function () {
      const tokenId = new BN('0');

      const receipt = await this.token.safeMint(other, { from: deployer });
      expectEvent(receipt, 'Transfer', { from: ZERO_ADDRESS, to: other, tokenId });

      expect(await this.token.balanceOf(other)).to.be.bignumber.equal('1');
      expect(await this.token.ownerOf(tokenId)).to.equal(other);

      expect(await this.token.tokenURI(tokenId)).to.equal(baseURI + tokenId);
    });

    it('other accounts cannot mint tokens', async function () {
      await expectRevert(
        this.token.safeMint(other, { from: other }),
        'OpenZeppelinTeamNFT: must have minter role to mint',
      );
    });
  });

  describe('set base uri', function () {
    it('deployer can set base uri', async function () {
      const tokenId = new BN('0');
      await this.token.safeMint(other, { from: deployer });

      await this.token.setBaseURI(otherBaseURI, { from: deployer });

      expect(await this.token.tokenURI(tokenId)).to.equal(otherBaseURI + tokenId);
    });

    it('other accounts cannot set base uri', async function () {
      await expectRevert(
        this.token.setBaseURI(otherBaseURI, { from: other }),
        'OpenZeppelinTeamNFT: must have set role to set',
      );
    });
  });
});
