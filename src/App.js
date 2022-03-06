import { useState, useEffect } from "react";
import styles from "./App.module.css";

const defaultLength = 10;

const Board = (props) => {
  return (
    <div className={styles.container}>
      {props.board.map(({ item, isColor }, index) => (
        <div
          key={index}
          id={index}
          style={{ backgroundColor: isColor ? "tomato" : "white" }}
          className={styles.item}
          onClick={props.onClick}
        >
          {item}
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
  const [win, setWin] = useState(false);

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

  function handleClick(event) {
    if (event.target.innerText !== "?") {
      return;
    }
    setSelectedIndex([...selectedIndex, +event.target.id]);
  }

  function handleChangeSize(event) {
    const newLength = +event.target.value;
    setBackItems(getBackItems(newLength));
    setSolvedIndex([]);
    setSelectedIndex([]);
  }

  function handleRetry() {
    setSolvedIndex([]);
    setSelectedIndex([]);
    setWin(false);
  }

  useEffect(() => {
    if (selectedIndex.length > 2) {
      setSelectedIndex([]);
    } else if (selectedIndex.length === 2) {
      if (backItems[selectedIndex[0]] === backItems[selectedIndex[1]]) {
        const newSolved = [...solvedIndex, ...selectedIndex];
        setSolvedIndex(newSolved);
        setSelectedIndex([]);
        if (newSolved.length === backItems.length) {
          setWin(true);
        }
      } else {
        setTimeout(() => {
          setSelectedIndex([]);
        }, 1000);
      }
    }
  }, [selectedIndex]);

  const indexForDisplay = [...solvedIndex, ...selectedIndex];
  const boardForDisplay = backItems.map((item, index) => {
    const text = indexForDisplay.includes(index) ? item : "?";
    const isColor = solvedIndex.includes(index) ? true : false;
    return { item: text, isColor: isColor };
  });

  return (
    <div>
      <h1 className={styles.title}>Welcome to Pairing Game!</h1>
      <Board board={boardForDisplay} onClick={handleClick} />
      <ChooseSize onChange={handleChangeSize} />
      <h3 className={styles.win}>
        {win ? "축하합니다! 모두 맞추었습니다!" : null}
      </h3>
      <div className={styles.reBtn}>
        <button onClick={handleRetry}>
          다시
        </button>
      </div>
    </div>
  );
};

export default App;
