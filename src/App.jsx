import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [money, setMoney] = useState(0);
  const [income, setIncome] = useState(1);
  const [ownedItems, setOwnedItems] = useState([]);

  const incomeItems = [
    incomeItem("bike", "this bike is your life! this bike will allow your performance of walking to the company icnrease which will make donald trump happy and increase your income!", 3, 100),
    incomeItem("potato", "ghosh! THIS IS DA STRONGEST POTATO IN THE WHOLE WORLD IT WILL CONSUME YOUR ENTIRE BODY AND TURN YOU ZMBABWAIAN!", 1000, 5),
  ];

  const EarnMoney = () => {
    updateIncomeByItems();
    setMoney(money + income);
  };

  const updateIncomeByItems = () => {
    console.log(ownedItems);
    let updatedIncome = 1;

    ownedItems.forEach((item) => {
      updatedIncome += item.incomeAddition;
    });

    console.log(updatedIncome);
    setIncome(updatedIncome);
  };

  return (
    <section>
      <div className="App">
      <div className="navTitle">
        <h1>Account Balance</h1>
      </div>

      <p className="paraDefault">total available balance</p>
      <h3>${money}</h3>
      <button class="earnBtn" onClick={EarnMoney}>
        earn money
      </button>
      
      <p className="income"> Income ${income}</p>

      <IncomeItems
        incomeItems={incomeItems}
        setOwnedItems={setOwnedItems}
        ownedItems={ownedItems}
        money={money}
        setMoney={setMoney}
      />
    </div>
    <h3 className="bigItemText">Items</h3>
    {
      ownedItems.map(item => (
        <div className="App2">
            <h4>{item.name}</h4>
            <p className="itemsP">{item.description}</p>
        </div>
      ))
    }
    </section>
  );
}

function IncomeItems({
  incomeItems,
  setOwnedItems,
  ownedItems,
  money,
  setMoney,
}) {
  const ownNewItem = (item) => {
    setOwnedItems([...ownedItems, item]);
    setMoney(money - item.price);
  };

  const ownsItem = (name) => {
    let isOwned = false;

    ownedItems.forEach((item) => {
      if (item.name === name) {
        isOwned = true;
      }
    });
    return isOwned;
  };
  return (
    <div>
      {incomeItems.map((item) => {
        // player has enough money to buy and not own one yet
        if (money < item.price * 2) return;
        if (ownsItem(item.name) === true) return;

        ownsItem(item.name);

        return (
          <button
            onClick={() => {
              ownNewItem(item);
            }}
          >
            you can efford {item.name}! click to buy
          </button>
        );
      })}
    </div>
  );
}

/**
 * @typedef {Object} Income
 * @property {string} name
 * @property {string} description
 * @property {number} incomeAddition
 * @property {number} price
 *
 * @param {string} name
 * @param {string} description
 * @param {number} incomeAddition
 * @param {number} price
 * @returns { Income }
 */
const incomeItem = (name, description, incomeAddition, price) => {
  return {
    name: name,
    description: description,
    incomeAddition: incomeAddition,
    price: price,
  };
};

export default App;
