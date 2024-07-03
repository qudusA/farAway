export default function Footer({ lists }) {
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
