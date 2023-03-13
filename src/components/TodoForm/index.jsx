import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "store/reducers/tasks/tasksSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.css";

const TodoForm = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addTask(task))
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      <input
        type="text"
        value={task}
        onChange={(event) => setTask(event.target.value)}
        className={styles["todo-input"]}
        placeholder="Enter new to do"
        required
      />
      <button type="submit" className={styles["todo-btn"]}>
        ADD TO DO
      </button>
    </form>
  );
};

export default TodoForm;