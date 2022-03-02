import { useState, useEffect } from "react";
import styles from "./App.module.css";

const defaultLength = 10;

const Board = (props) => {
  return (
    <div className={styles.container}>
      {props.board.map((item, index) => (
        <div
          key={index}
          id={index}
          style={{ backgroundColor: item ? "tomato" : "white" }}
          className={styles.item}
          onClick={props.onClick}
        >
          {item ? item : "?"}
        </div>
      ))}
    </div>
  );
};

const ChooseSize = (props) => {
  return (
    <div className={styles.select}>
      <span>아이템 개수를 선택하세요 &nbsp;&nbsp;</span>
      <select defaultValue={defaultLength} onChange={props.onChange}>
        {[8, 10, 12, 14, 16, 20].map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

const App = () => {
  const [backItems, setBackItems] = useState(getBackItems(defaultLength));
  const [solvedIndex, setSolvedIndex] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState([]);

  function handleClick(event) {
    setSelectedIndex([...selectedIndex, +event.target.id]);
  }

  function handleChange(event) {
    const newLength = +event.target.value;
    setBackItems(getBackItems(newLength));
    setSolvedIndex([]);
    setSelectedIndex([]);
  }

  useEffect(() => {
    if (selectedIndex.length > 2) {
      setSelectedIndex([]);
    } else if (selectedIndex.length === 2) {
      if (backItems[selectedIndex[0]] === backItems[selectedIndex[1]]) {
        setSolvedIndex([...solvedIndex, ...selectedIndex]);
        setSelectedIndex([]);
      } else {
        setTimeout(() => {
          setSelectedIndex([]);
        }, 1000);
      }
    }
  }, [selectedIndex]);

  const indexForDisplay = [...solvedIndex, ...selectedIndex];
  const boardForDisplay = backItems.map((item, index) =>
    indexForDisplay.includes(index) ? item : null
  );

  return (
    <div>
      <h1 className={styles.title}>Welcome to Pairing Game!</h1>
      <Board
        board={boardForDisplay}
        onClick={handleClick}
      />
      <ChooseSize onChange={handleChange} />
    </div>
  );
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getBackItems(length) {
  const temp = Array.from({ length: length / 2 }, (_, i) => i + 1);
  let temp2 = [...temp, ...temp];
  return shuffle(temp2);
}

export default App;