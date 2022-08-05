import { useEffect, useState } from "react";
import Queries from "../../api";
import Button from "../UI/Button";
import Input from "../UI/Input/Input";
import styles from "./EditTodoItem.module.css";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";

export default function EditTodoItem() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [task, setTask] = useState({});
  const [inputVisibility, setInputVisibility] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const { editRerender } = useOutletContext();

  useEffect(() => {
    Queries.getSingle(id).then((resp) => {
      setTask(resp.data);
    });
  }, [id]);

  const editTask = (e) => {
    e.stopPropagation();
    if (taskInput.trim() === "") {
      setTaskInput(task.title);
      setInputVisibility(() => !inputVisibility);
      return;
    }
    if (inputVisibility && taskInput !== task.title) {
      const newTitle = { title: taskInput.trim() };
      Queries.edit(id, newTitle);
      editRerender(id, newTitle);
      navigate("/");
    }
    setInputVisibility(() => !inputVisibility);
  };

  const completeTask = (e) => {
    if (inputVisibility) return {};
    const newStatus = { completed: !task.completed };
    Queries.edit(id, newStatus);
  };

  const taskInputHandler = (e) => setTaskInput(e.target.value);

  return (
    <div className={styles.edit} onClick={completeTask}>
      {inputVisibility ? (
        <Input value={taskInput} changeInput={taskInputHandler} />
      ) : (
        <h1>{task.title}</h1>
      )}
      <Button onClick={editTask}>
        {inputVisibility ? "Save" : "Edit task"}
      </Button>
    </div>
  );
}
