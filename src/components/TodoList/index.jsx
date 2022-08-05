import styles from "./TodoList.module.css";
import TodoItem from "../TodoItem";
import Form from "../Form";
import { useOutletContext } from "react-router-dom";

export default function TodoList() {
  const { tasks, addRerender, removeRerender, editRerender } =
    useOutletContext();

  return (
    <>
      <Form rerender={addRerender} />
      <ul className={styles.container}>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            {...task}
            rerender={{ removeRerender, editRerender }}
          />
        ))}
      </ul>
    </>
  );
}
