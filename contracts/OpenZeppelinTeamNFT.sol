// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract OpenZeppelinTeamNFT is ERC721, AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant SET_BASEURI_ROLE = keccak256("SET_BASEURI_ROLE");

    Counters.Counter private _tokenIdTracker;

    string private _baseTokenURI;

    constructor(
        string memory name,
        string memory symbol,
        string memory baseTokenURI
    ) ERC721(name, symbol) {
        _baseTokenURI = baseTokenURI;

        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        _setupRole(SET_BASEURI_ROLE, msg.sender);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function safeMint(address to) public {
        require(hasRole(MINTER_ROLE, msg.sender), "OpenZeppelinTeamNFT: must have minter role to mint");

        _safeMint(to, _tokenIdTracker.current());
        _tokenIdTracker.increment();
    }

    function setBaseURI(string memory baseTokenURI) public {
        require(hasRole(SET_BASEURI_ROLE, msg.sender), "OpenZeppelinTeamNFT: must have set role to set");
        _baseTokenURI = baseTokenURI;
    }
}
