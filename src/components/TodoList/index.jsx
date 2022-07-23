import styles from "./TodoList.module.css";
import TodoItem from "../TodoItem";

export default function TodoList({ tasks, rerender }) {
  return (
    <ul className={styles.container}>
      {tasks.map((task) => (
        <TodoItem key={task.id} {...task} rerender={rerender} />
      ))}
    </ul>
  );
}
