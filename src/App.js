import { useEffect, useState } from "react";
import styles from "./App.module.css";

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

function App() {
  const [itemLength, setItemLength] = useState(10);
  // const backItems = useRef(null);
  // useEffect(() => {
  //   backItems.current = getBackItems(itemLength);
  // }, []);
  const [backItems, setBackItems] = useState(getBackItems(itemLength));
  const [currentItems, setCurrentItems] = useState(Array(itemLength).fill("?"));
  const [lastAcheivedItems, setLastAcheivedItems] = useState(
    Array(itemLength).fill("?")
  );
  const [selectedIndex, setSelectedIndex] = useState([]);

  useEffect(() => {
    // backItems.current = getBackItems(itemLength);
    setBackItems(getBackItems(itemLength));
    setCurrentItems(Array(itemLength).fill("?"));
    setLastAcheivedItems(Array(itemLength).fill("?"));
    setSelectedIndex([]);
  }, [itemLength]);

  useEffect(() => {
    if (selectedIndex.length > 2) {
      setCurrentItems([...lastAcheivedItems]);
      setSelectedIndex([]);
    } else if (selectedIndex.length === 2) {
      if (backItems[selectedIndex[0]] === backItems[selectedIndex[1]]) {
        setLastAcheivedItems([...currentItems]);
        setSelectedIndex([]);
      } else {
        setTimeout(() => {
          console.log("count가 2가 됐음.");
          setCurrentItems([...lastAcheivedItems]);
          setSelectedIndex([]);
        }, 1000);
      }
    }
  }, [selectedIndex]);

  function handleClick(event) {
    setCurrentItems((current) =>
      current.map((item, index) =>
        +event.target.id === index ? backItems[index] : item
      )
    );
    setSelectedIndex([...selectedIndex, +event.target.id]);
  }

  function handleChange(event) {
    setItemLength(+event.target.value);
  }

  console.log(backItems);
  console.log(itemLength);
  console.log(currentItems);

  return (
    <div>
      <h1 className={styles.title}>Welcome to Pairing Game!</h1>
      <div className={styles.container}>
        {currentItems.map((currentItem, index) => (
          <div
            key={index}
            id={index}
            className={styles.item}
            onClick={handleClick}
          >
            {currentItem}
          </div>
        ))}
      </div>
      <div className={styles.select}>
        <span>아이템 개수를 선택하세요 &nbsp;&nbsp;</span>
        <select defaultValue={10} onChange={handleChange}>
          {[8, 10, 12, 14, 16, 20].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default App;
