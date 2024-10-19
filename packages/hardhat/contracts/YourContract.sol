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

	event StoreCreated(
		uint256 indexed storeId,
		address indexed owner,
		string name
	);
	event StoreUpdated(
		uint256 indexed storeId,
		string name,
		string description,
		string coverPhotoUrl
	);
	event ItemCreated(
		uint256 indexed itemId,
		uint256 indexed storeId,
		string name,
		uint256 price
	);
	event ItemUpdated(
		uint256 indexed itemId,
		string name,
		uint256 price,
		string photoUrl,
		string description,
		uint256 inventory
	);
	event ItemPurchased(
		uint256 indexed itemId,
		address indexed buyer,
		uint256 quantity
	);

	constructor() Ownable(msg.sender) {}

	function createStore(
		string memory _name,
		string memory _description,
		string memory _coverPhotoUrl
	) external {
		require(bytes(_name).length > 0, "Store name cannot be empty");

		uint256 newStoreId = _storeIdCounter;
		stores[newStoreId] = Store(
			newStoreId,
			msg.sender,
			_name,
			_description,
			_coverPhotoUrl,
			true
		);
		userStores[msg.sender].push(newStoreId);

		emit StoreCreated(newStoreId, msg.sender, _name);
		_storeIdCounter++;
	}

	function createItem(
		uint256 _storeId,
		string memory _name,
		uint256 _price,
		string memory _photoUrl,
		string memory _description,
		uint256 _inventory
	) external {
		require(stores[_storeId].owner == msg.sender, "Not the store owner");
		require(stores[_storeId].isActive, "Store is not active");
		require(bytes(_name).length > 0, "Item name cannot be empty");
		require(_price > 0, "Price must be greater than zero");

		uint256 newItemId = _itemIdCounter;
		items[newItemId] = Item(
			newItemId,
			_storeId,
			_name,
			_price,
			_photoUrl,
			_description,
			_inventory,
			true
		);
		storeItems[_storeId].push(newItemId);

		emit ItemCreated(newItemId, _storeId, _name, _price);
		_itemIdCounter++;
	}
}
