// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { expect } from "chai";
import { ethers } from "hardhat";
import { Shopify } from "../typechain-types";
import { parseEther } from "ethers";

describe("Shopify", function () {
  let Shopify: Shopify;
  let marketplace: Shopify;

  const IMAGE_URL =
    "https://res.cloudinary.com/dcwq74lfg/image/upload/c_limit,q_100,w_1000/fl_lossy,f_auto/v1722486546/brand/Doja%20Direct/product/0c25cca2b25d73fd0cd596bf5fde3df6.png";

  beforeEach(async function () {
    Shopify = (await ethers.getContractFactory("Shopify")) as Shopify;
    marketplace = await Shopify.deploy();
    await marketplace.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const [owner] = await ethers.getSigners();

      expect(await marketplace.owner()).to.equal(owner.address);
    });

    it("Should start with store ID counter at 1", async function () {
      const [, addr1] = await ethers.getSigners();

      await marketplace.connect(addr1).createStore("Test Store", "A test store", IMAGE_URL);
      const store = await marketplace.stores(1);
      expect(store.id).to.equal(1);
    });

    it("Should start with item ID counter at 1", async function () {
      const [, addr1] = await ethers.getSigners();

      await marketplace.connect(addr1).createStore("Test Store", "A test store", IMAGE_URL);
      await marketplace.connect(addr1).createItem(1, "Test Item", parseEther("1"), IMAGE_URL, "A test item", 10);
      const item = await marketplace.items(1);
      expect(item.id).to.equal(1);
    });
  });

  describe("Store Management", function () {
    it("Should create a store", async function () {
      const [, addr1] = await ethers.getSigners();

      await expect(marketplace.connect(addr1).createStore("Test Store", "A test store", IMAGE_URL))
        .to.emit(marketplace, "StoreCreated")
        .withArgs(1, addr1.address, "Test Store");

      const store = await marketplace.stores(1);
      expect(store.owner).to.equal(addr1.address);
      expect(store.name).to.equal("Test Store");
      expect(store.description).to.equal("A test store");
      expect(store.coverPhotoUrl).to.equal(IMAGE_URL);
      expect(store.isActive).to.be.true;
    });

    it("Should not create a store with empty name", async function () {
      const [, addr1] = await ethers.getSigners();

      await expect(marketplace.connect(addr1).createStore("", "A test store", IMAGE_URL)).to.be.revertedWith(
        "Store name cannot be empty",
      );
    });

    it("Should update a store", async function () {
      const [, addr1] = await ethers.getSigners();

      await marketplace.connect(addr1).createStore("Test Store", "A test store", IMAGE_URL);
      await expect(marketplace.connect(addr1).updateStore(1, "Updated Store", "An updated store", IMAGE_URL))
        .to.emit(marketplace, "StoreUpdated")
        .withArgs(1, "Updated Store", "An updated store", IMAGE_URL);

      const store = await marketplace.stores(1);
      expect(store.name).to.equal("Updated Store");
      expect(store.description).to.equal("An updated store");
    });

    it("Should not allow non-owner to update store", async function () {
      const [, addr1, addr2] = await ethers.getSigners();

      await marketplace.connect(addr1).createStore("Test Store", "A test store", IMAGE_URL);
      await expect(
        marketplace.connect(addr2).updateStore(1, "Hacked Store", "A hacked store", IMAGE_URL),
      ).to.be.revertedWith("Not the store owner");
    });

    it("Should not allow updating non-existent store", async function () {
      const [, addr1] = await ethers.getSigners();

      await expect(
        marketplace.connect(addr1).updateStore(999, "Non-existent Store", "This store doesn't exist", IMAGE_URL),
      ).to.be.revertedWith("Not the store owner");
    });

    it("Should toggle store active status", async function () {
      const [, addr1] = await ethers.getSigners();

      await marketplace.connect(addr1).createStore("Test Store", "A test store", IMAGE_URL);
      await marketplace.connect(addr1).toggleStoreActive(1);
      let store = await marketplace.stores(1);
      expect(store.isActive).to.be.false;

      await marketplace.connect(addr1).toggleStoreActive(1);
      store = await marketplace.stores(1);
      expect(store.isActive).to.be.true;
    });

    it("Should not allow non-owner to toggle store active status", async function () {
      const [, addr1, addr2] = await ethers.getSigners();

      await marketplace.connect(addr1).createStore("Test Store", "A test store", IMAGE_URL);
      await expect(marketplace.connect(addr2).toggleStoreActive(1)).to.be.revertedWith("Not the store owner");
    });
  });

  describe("Item Management", function () {
    beforeEach(async function () {
      const [, addr1] = await ethers.getSigners();

      await marketplace.connect(addr1).createStore("Test Store", "A test store", IMAGE_URL);
    });

    it("Should create an item", async function () {
      const [, addr1] = await ethers.getSigners();

      await expect(marketplace.connect(addr1).createItem(1, "Test Item", parseEther("1"), IMAGE_URL, "A test item", 10))
        .to.emit(marketplace, "ItemCreated")
        .withArgs(1, 1, "Test Item", parseEther("1"));

      const item = await marketplace.items(1);
      expect(item.name).to.equal("Test Item");
      expect(item.price).to.equal(parseEther("1"));
      expect(item.photoUrl).to.equal(IMAGE_URL);
      expect(item.description).to.equal("A test item");
      expect(item.inventory).to.equal(10);
      expect(item.isActive).to.be.true;
    });

    it("Should not create an item with empty name", async function () {
      const [, addr1] = await ethers.getSigners();

      await expect(
        marketplace.connect(addr1).createItem(1, "", parseEther("1"), IMAGE_URL, "A test item", 10),
      ).to.be.revertedWith("Item name cannot be empty");
    });

    it("Should not create an item with zero price", async function () {
      const [, addr1] = await ethers.getSigners();

      await expect(
        marketplace.connect(addr1).createItem(1, "Test Item", 0, IMAGE_URL, "A test item", 10),
      ).to.be.revertedWith("Price must be greater than zero");
    });

    it("Should not create an item for non-existent store", async function () {
      const [, addr1] = await ethers.getSigners();

      await expect(
        marketplace.connect(addr1).createItem(999, "Test Item", parseEther("1"), IMAGE_URL, "A test item", 10),
      ).to.be.revertedWith("Not the store owner");
    });

    it("Should update an item", async function () {
      const [, addr1] = await ethers.getSigners();

      await marketplace.connect(addr1).createItem(1, "Test Item", parseEther("1"), IMAGE_URL, "A test item", 10);
      await expect(
        marketplace.connect(addr1).updateItem(1, "Updated Item", parseEther("2"), IMAGE_URL, "An updated item", 20),
      )
        .to.emit(marketplace, "ItemUpdated")
        .withArgs(1, "Updated Item", parseEther("2"), IMAGE_URL, "An updated item", 20);

      const item = await marketplace.items(1);
      expect(item.name).to.equal("Updated Item");
      expect(item.price).to.equal(parseEther("2"));
      expect(item.description).to.equal("An updated item");
      expect(item.inventory).to.equal(20);
    });

    it("Should not allow non-owner to update item", async function () {
      const [, addr1, addr2] = await ethers.getSigners();

      await marketplace.connect(addr1).createItem(1, "Test Item", parseEther("1"), IMAGE_URL, "A test item", 10);
      await expect(
        marketplace.connect(addr2).updateItem(1, "Hacked Item", parseEther("0.1"), IMAGE_URL, "A hacked item", 100),
      ).to.be.revertedWith("Not the store owner");
    });

    it("Should toggle item active status", async function () {
      const [, addr1] = await ethers.getSigners();

      await marketplace.connect(addr1).createItem(1, "Test Item", parseEther("1"), IMAGE_URL, "A test item", 10);
      await marketplace.connect(addr1).toggleItemActive(1);
      let item = await marketplace.items(1);
      expect(item.isActive).to.be.false;

      await marketplace.connect(addr1).toggleItemActive(1);
      item = await marketplace.items(1);
      expect(item.isActive).to.be.true;
    });

    it("Should not allow non-owner to toggle item active status", async function () {
      const [, addr1, addr2] = await ethers.getSigners();

      await marketplace.connect(addr1).createItem(1, "Test Item", parseEther("1"), IMAGE_URL, "A test item", 10);
      await expect(marketplace.connect(addr2).toggleItemActive(1)).to.be.revertedWith("Not the store owner");
    });
  });
});
