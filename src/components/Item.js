export function Item({ item, handleDelete, updateList }) {
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
