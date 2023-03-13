import { useSelector } from "react-redux";
import "./styles.css";

const TodoResults = () => {
  // Fix an ability to calculate completed tasks
  const tasks = useSelector((state) => state.tasks.data);
  const checkedTasks = tasks.filter((task) => task.checked);

  return <div className="todo-results">Done: {checkedTasks.length}</div>;
};

export default TodoResults;