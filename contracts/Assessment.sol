
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FruitMarketplace {
    struct Fruit {
        string name;
        uint256 price;
        uint256 quantity;
    }

    mapping(uint256 => Fruit) public fruits;
    uint256 public nextFruitId = 1;

    function addFruit(string memory name, uint256 price, uint256 quantity) public {
        fruits[nextFruitId] = Fruit(name, price, quantity);
        nextFruitId++;
    }

    function getFruit(uint256 fruitId) public view returns (string memory, uint256, uint256) {
        Fruit memory fruit = fruits[fruitId];
        return (fruit.name, fruit.price, fruit.quantity);
    }

    function buyFruit(uint256 fruitId, uint256 quantity) public payable {
        require(fruits[fruitId].quantity >= quantity, "Not enough fruits available");

        uint256 cost = fruits[fruitId].price * quantity;
        require(msg.value >= cost, "Insufficient funds sent");

        fruits[fruitId].quantity -= quantity;

        // Refund excess amount, if any
        if (msg.value > cost) {
            payable(msg.sender).transfer(msg.value - cost);
        }
    }
}
