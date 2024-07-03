import { useState } from "react";

export default function Form({ submit }) {
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
