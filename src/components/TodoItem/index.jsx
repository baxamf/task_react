import axios from "axios";
import { useState } from "react";
import Queries from "../../api";
import Button from "../UI/Button";
import Input from "../UI/Input/Input";
import styles from "./TodoItem.module.css";

export default function TodoItem({ title, completed, id, rerender }) {
  const [taskInput, setTaskInput] = useState(title);
  const [inputVisibility, setInputVisibility] = useState(false);
  const URL = "https://62d926c290883139359c0527.mockapi.io/tasks";

  const removeTask = (e) => {
    e.stopPropagation();
    Queries.del(id);
    rerender.removeRerender(id);
  };

  const editTask = (e) => {
    e.stopPropagation();
    if (taskInput.trim() === "") {
      setTaskInput(title);
      setInputVisibility(() => !inputVisibility);
      return;
    }
    if (inputVisibility && taskInput !== title) {
      Queries.edit(id, { title: taskInput.trim() });
      rerender.editRerender(id, taskInput.trim());
    }
    setInputVisibility(() => !inputVisibility);
  };

  const completeTask = (e) => {
    if (inputVisibility) return {};
    axios.put(`${URL}/${id}`, { completed: !completed });
    rerender.completedRerender(id, !completed);
  };

  const taskInputHandler = (e) => setTaskInput(e.target.value);

  return (
    <li onClick={completeTask} className={styles.task_item}>
      {inputVisibility ? (
        <Input value={taskInput} changeInput={taskInputHandler} />
      ) : (
        <p>{title}</p>
      )}
      <div className={styles.btns_container}>
        {completed ? (
          <h2>Completed</h2>
        ) : (
          <>
            <Button onClick={editTask}>
              {inputVisibility ? "Save" : "Edit task"}
            </Button>
            <Button onClick={removeTask}>Delete task</Button>
          </>
        )}
      </div>
    </li>
  );
}
