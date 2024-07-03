import { useState } from "react";

// let list = [
//   { id: 1, qty: 1, item: "passport", packed: false },
//   { id: 2, qty: 2, item: "socks", packed: false },
//   { id: 3, qty: 1, item: "shoe", packed: false },
// ];

export default function App() {
  const [lists, setLists] = useState([]);

  function submit(gadget) {
    // put this in a its separate function
    setLists((list) => [...list, gadget]);
  }

  function handleDelete(id) {
    setLists((lists) => lists.filter((item) => item.id !== id));
  }

  function updateList(id) {
    setLists((lists) =>
      lists.map((item) =>
        id === item.id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function onClear() {
    if (lists.length === 0) return;
    const confirm = window.confirm("Are you sure you want to clear the list?");
    if (confirm) setLists([]);
  }

  return (
    <div className="view">
      <Banner />
      <Form submit={submit} />
      <Body
        lists={lists}
        handleDelete={handleDelete}
        updateList={updateList}
        handleClear={onClear}
      />
      <Footer lists={lists} />
    </div>
  );
}

function Banner() {
  return (
    <header className="banner">
      <div>
        <p>🌴</p>
        <p className="far">far away </p>
        <p>💼</p>
      </div>
    </header>
  );
}

function Form({ submit }) {
  const [qty, setQty] = useState(1);
  const [item, setItem] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!item) return;
    const gadget = { qty, item, packed: false, id: Date.now() };
    submit(gadget);
    setItem("");
    setQty(1);
  }

  function changeQty(e) {
    // console.log(e.target.value);
    setQty(Number(e.target.value));
  }
  function changeItem(e) {
    // console.log(e.target.value);
    setItem(e.target.value);
  }
  return (
    <div className="form">
      <div>
        <p>what do you need for your 🤩trip</p>
        <form action="" onSubmit={handleSubmit}>
          {/* <input
            className="number"
            type="number"
            placeholder="1"
            value={qty}
            onChange={changeQty}          
          /> */}

          <select className="number" value={qty} onChange={changeQty}>
            {Array.from({ length: 20 }, (_, i) => (
              <option value={i + 1} key={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="item..."
            value={item}
            onChange={changeItem}
          />
          <button className="add">ADD</button>
        </form>
      </div>
    </div>
  );
}

function Body({ lists, handleDelete, updateList, handleClear }) {
  const [sortBy, setSortBy] = useState("input");
  function handleSort(e) {
    setSortBy(e.target.value);
  }

  let sorted;
  if (sortBy === "input") sorted = lists;
  if (sortBy === "item")
    sorted = lists.slice().sort((a, b) => a.item.localeCompare(b.item));
  if (sortBy === "packed")
    sorted = lists.slice().sort((a, b) => Number(b.packed) - Number(a.packed));

  return (
    <div className="body">
      <ul className="upper">
        {sorted.map((item) => (
          <Item
            item={item}
            key={item.id}
            handleDelete={handleDelete}
            updateList={updateList}
          />
        ))}
      </ul>

      <div className="lower">
        <select value={sortBy} onChange={handleSort}>
          <option value="input">SORT BY INPUT ORDER</option>
          <option value="item">SORT BY ITEM</option>
          <option value="packed">SORT BY PACKED STATUS</option>
        </select>
        <p onClick={handleClear}>clear list</p>
      </div>
    </div>
  );
}

function Item({ item, handleDelete, updateList }) {
  return (
    <li>
      <input
        type="checkbox"
        name="item"
        id=""
        // checked={selectedId !== item.id ? false : true}
        value={item.packed}
        onChange={() => updateList(item.id)}
      />
      <span
        style={
          item.packed
            ? { textDecoration: "line-through", color: "red" }
            : { color: "#e5771f" }
        }
      >{`${item.qty} ${item.item}`}</span>{" "}
      <button onClick={() => handleDelete(item.id)}>❌</button>
    </li>
  );
}

function Footer({ lists }) {
  const total = lists.length;
  if (total === 0)
    return (
      <div className="footer">
        {" "}
        start adding some items to your packing list
      </div>
    );

  const packed = lists.filter((list) => list.packed).length;
  const percentage = Math.round((packed / total) * 100);

  return (
    <div className="footer">
      {percentage === 100 ? (
        <p>you have packed all! ready to go.</p>
      ) : (
        <p>
          💼 you have {total} items on your list, and you already packed{" "}
          {packed} ({percentage} %)
        </p>
      )}
    </div>
  );
}
