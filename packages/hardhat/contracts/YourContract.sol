//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Shopify is Ownable {
    uint256 private _storeIdCounter = 1;
    uint256 private _itemIdCounter = 1;

    struct Store {
        uint256 id;
        address owner;
        string name;
        string description;
        string coverPhotoUrl;
        bool isActive;
    }

    struct Item {
        uint256 id;
        uint256 storeId;
        string name;
        uint256 price;
        string photoUrl;
        string description;
        uint256 inventory;
        bool isActive;
    }

    mapping(uint256 => Store) public stores;
    mapping(uint256 => Item) public items;
    mapping(address => uint256[]) public userStores;
    mapping(uint256 => uint256[]) public storeItems;

    

    event StoreCreated(uint256 indexed storeId, address indexed owner, string name);
    event StoreUpdated(uint256 indexed storeId, string name, string description, string coverPhotoUrl);
    event ItemCreated(uint256 indexed itemId, uint256 indexed storeId, string name, uint256 price);
    event ItemUpdated(uint256 indexed itemId, string name, uint256 price, string photoUrl, string description, uint256 inventory);
    event ItemPurchased(uint256 indexed itemId, address indexed buyer, uint256 quantity);


    constructor() Ownable(msg.sender) {}

}