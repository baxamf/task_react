import useFetch from "../../hooks";
import Queries from "../../api";
import styles from "./Todo.module.css";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import ThemeChange from "../ThemeChange/ThemeChange";

export default function Todo() {
  const { run, tasks, setTasks } = useFetch(Queries.get);

  useEffect(() => {
    run();
  }, []);

  const addRerender = (updateTask) => {
    setTasks([...tasks, updateTask]);
  };

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
    <div className={styles.wrapper}>
      <ThemeChange />
      <Outlet context={{ tasks, addRerender, removeRerender, editRerender }} />
    </div>
  );
}
