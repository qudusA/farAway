import { useState } from "react";
import Footer from "./Footer";
import Banner from "./Banner";
import Form from "./Form";
import Body from "./Body";

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
