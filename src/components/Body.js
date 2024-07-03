import { useState } from "react";
import { Item } from "./Item";

export default function Body({ lists, handleDelete, updateList, handleClear }) {
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
