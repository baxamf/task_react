import { Link } from "react-router-dom";
import Button from "../UI/Button";
import Queries from "../../api";
import styles from "./TodoItem.module.css";

export default function TodoItem({ title, completed, id, rerender }) {
  const removeTask = (e) => {
    e.stopPropagation();
    Queries.del(id);
    rerender.removeRerender(id);
  };

  return (
    <li className={styles.task_item}>
      <Link to={`/${id}`}>{title}</Link>
      <div className={styles.btns_container}>
        {completed ? (
          <h2>Completed</h2>
        ) : (
          <Button onClick={removeTask}>Delete task</Button>
        )}
      </div>
    </li>
  );
}
