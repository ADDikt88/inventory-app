const ItemList = ({ items, onDelete }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.id} - {item.name} - {item.category} - Last Used:{" "}
          {item.last_used}
          <button key={item.id} onClick={() => onDelete(item.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
