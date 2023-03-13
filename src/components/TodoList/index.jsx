import TodoListItem from "components/TodoListItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  getTasks,
  updateTask,
} from "store/reducers/tasks/tasksSlice";
import "./styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.data);

  useEffect(() => {
    dispatch(getTasks())
  }, []);

  const handleDelete = (todoId) => {
    // Fix an ability to delete task
    dispatch(deleteTask(todoId))
  };

  const toggleCheck = (todoId, isChecked) => {
    // Fix an ability to toggle task
    const data = { todoId, isChecked }
    dispatch(updateTask(data))
  };

  return (
    <div className="todo-list">
      <ToastContainer />
      <span className="todo-list-title">Things to do:</span>
      <div className="todo-list-content">
        {/* Fix an ability to render todos */}
        {tasks.length === 0 ? (
          <div className="no-todos">
            Looks like you&apos;re absolutely free today!
          </div>
        ) : (
          <>
            {tasks.map((task, i) => (
              <TodoListItem
                key={task.id}
                onCheck={() => toggleCheck(task.id, task.checked)}
                onDelete={() => handleDelete(task.id)}
                checked={task.checked}
                label={task.label}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TodoList;