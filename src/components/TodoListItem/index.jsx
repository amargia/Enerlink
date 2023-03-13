import "./styles.css";
import { FaTrash } from "react-icons/fa";

const TodoListItem = ({ onCheck, checked, onDelete, label }) => (
  <div className="todo-list-item">
    <div
      tabIndex="0"
      role="checkbox"
      aria-checked
      className="todo-list-item-content"
    >
      <input
        tabIndex="-1"
        type="checkbox"
        checked={checked}
        onChange={onCheck}
      />
      <span className={checked ? "todo-list-item-checked" : ""}>{label}</span>
    </div>
    <button type="button" className="todo-list-item-delete" onClick={onDelete}>
      <FaTrash />
    </button>
  </div>
);

export default TodoListItem;