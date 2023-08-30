
import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Replace with your contract's ABI
const CONTRACT_ABI = [];

// Replace with your contract's address
const CONTRACT_ADDRESS = "";

async function fetchFruits(setFruits) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  const fruitCount = await contract.nextFruitId();

  const fruits = [];
  for (let i = 1; i < fruitCount; i++) {
    const [name, price, quantity] = await contract.getFruit(i);
    fruits.push({ id: i, name, price, quantity });
  }
  setFruits(fruits);
}

export default function FruitMarketplace() {
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    fetchFruits(setFruits);
  }, []);

  return (
    <div>
      <h1>Fruit Marketplace</h1>
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit.id}>
            {fruit.name} - Price: {fruit.price} - Quantity: {fruit.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
