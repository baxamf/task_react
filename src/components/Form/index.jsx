import { useState } from "react";
import Queries from "../../api";
import Button from "../UI/Button";
import Input from "../UI/Input/Input";
import styles from "./Form.module.css";

export default function Form({ rerender, error }) {
  const [title, setTitle] = useState("");

  function addTask(e) {
    e.preventDefault();
    if (title.trim() === "") {
      return error(true, "You can't do nothing. Try something.");
    }
    const newTask = {
      title: title.trim(),
      completed: false,
    };
    Queries.add(newTask).then((resp) => {
      rerender(resp.data);
      setTitle("");
    });
  }

  const changeInput = (e) => {
    setTitle(e.target.value);
  };

  return (
    <form className={styles.primary}>
      <Button onClick={addTask}>+ Add task</Button>
      <Input
        value={title}
        changeInput={changeInput}
        placeholder="Keep calm for example"
      />
    </form>
  );
}
