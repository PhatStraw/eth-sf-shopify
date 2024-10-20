//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
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

	function updateStore(
		uint256 _storeId,
		string memory _name,
		string memory _description,
		string memory _coverPhotoUrl
	) external {
		require(stores[_storeId].owner == msg.sender, "Not the store owner");
		require(stores[_storeId].isActive, "Store is not active");

		Store storage store = stores[_storeId];
		store.name = _name;
		store.description = _description;
		store.coverPhotoUrl = _coverPhotoUrl;

		emit StoreUpdated(_storeId, _name, _description, _coverPhotoUrl);
	}

	function toggleStoreActive(uint256 _storeId) external {
		require(stores[_storeId].owner == msg.sender, "Not the store owner");
		stores[_storeId].isActive = !stores[_storeId].isActive;
	}

	function updateItem(
		uint256 _itemId,
		string memory _name,
		uint256 _price,
		string memory _photoUrl,
		string memory _description,
		uint256 _inventory
	) external {
		require(
			stores[items[_itemId].storeId].owner == msg.sender,
			"Not the store owner"
		);
		require(items[_itemId].isActive, "Item is not active");

		Item storage item = items[_itemId];
		item.name = _name;
		item.price = _price;
		item.photoUrl = _photoUrl;
		item.description = _description;
		item.inventory = _inventory;

		emit ItemUpdated(
			_itemId,
			_name,
			_price,
			_photoUrl,
			_description,
			_inventory
		);
	}

	function purchaseItem(uint256 _itemId, uint256 _quantity) external payable {
		Item storage item = items[_itemId];
		require(item.isActive, "Item is not active");
		require(item.inventory >= _quantity, "Not enough inventory");
		require(msg.value >= item.price * _quantity, "Insufficient payment");

		item.inventory -= _quantity;
		address storeOwner = stores[item.storeId].owner;

		// Transfer funds to store owner
		(bool sent, ) = payable(storeOwner).call{ value: msg.value }("");
		require(sent, "Failed to send Ether");

		emit ItemPurchased(_itemId, msg.sender, _quantity);
	}

	function toggleItemActive(uint256 _itemId) external {
		require(
			stores[items[_itemId].storeId].owner == msg.sender,
			"Not the store owner"
		);
		items[_itemId].isActive = !items[_itemId].isActive;
	}

	function getStoresByOwner(
		address _owner
	) external view returns (uint256[] memory) {
		return userStores[_owner];
	}

	function getItemsByStore(
		uint256 _storeId
	) external view returns (uint256[] memory) {
		return storeItems[_storeId];
	}
}
