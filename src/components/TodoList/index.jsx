import styles from "./TodoList.module.css";
import TodoItem from "../TodoItem";
import useFetch from "../hooks";
import Queries from "../../api";
import { useEffect } from "react";

export default function TodoList() {
  const { run, tasks, setTasks } = useFetch(Queries.get);

  useEffect(() => {
    run();
  }, []);

  const removeRerender = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const editRerender = (id, update) => {
    const task = tasks.find((task) => task.id === id);
    const editedTask = { ...task, ...update };
    setTasks(tasks.map((task) => (task.id === id ? editedTask : task)));
  };

  return (
    <ul className={styles.container}>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          {...task}
          rerender={{ removeRerender, editRerender }}
        />
      ))}
    </ul>
  );
}
