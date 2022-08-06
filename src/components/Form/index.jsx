import { useState } from "react";
import Queries from "../../api";
import Button from "../UI/Button";
import Error from "../UI/Error/Error";
import Input from "../UI/Input/Input";
import styles from "./Form.module.css";

export default function Form({ rerender }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  function addTask(e) {
    e.preventDefault();
    if (title.trim() === "") {
      setError("You can't do nothing. Try something.");
      return;
    }
    const newTask = {
      title: title.trim(),
      completed: false,
    };
    Queries.add(newTask).then((resp) => {
      if (error) {
        errorOff();
      }
      rerender(resp.data);
      setTitle("");
    });
  }

  const errorOff = () => {
    setError("");
  };

  const changeInput = (e) => {
    setTitle(e.target.value);
  };

  return (
    <>
      {error && <Error errorHandler={errorOff}>{error}</Error>}
      <form className={styles.primary}>
        <Button onClick={addTask}>+ Add task</Button>
        <Input
          value={title}
          changeInput={changeInput}
          placeholder="Keep calm for example"
        />
      </form>
    </>
  );
}
