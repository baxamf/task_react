import { useEffect, useState } from "react";
import { BiTask } from "react-icons/bi";
import { BiTaskX } from "react-icons/bi";
import Queries from "../../api";
import Button from "../UI/Button";
import Input from "../UI/Input/Input";
import styles from "./EditTodoItem.module.css";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";

export default function EditTodoItem() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [task, setTask] = useState({});
  const [completed, setCompleted] = useState(null);
  const [taskInput, setTaskInput] = useState("");
  const [inputVisibility, setInputVisibility] = useState(false);
  const { editRerender } = useOutletContext();

  useEffect(() => {
    Queries.getSingle(id).then((resp) => {
      setCompleted(resp.data.completed);
      setTask(resp.data);
    });
  }, [id]);

  const editTask = () => {
    setTaskInput(task.title);
    setInputVisibility(() => !inputVisibility);
  };

  const saveTask = () => {
    if (taskInput.trim() !== "" && taskInput.trim() !== task.title) {
      const newTitle = { title: taskInput.trim(), completed: task.completed };
      Queries.edit(id, newTitle);
      editRerender(id, newTitle);
      navigate("/");
    } else if (task.completed !== completed) {
      const newStatus = { completed: task.completed };
      Queries.edit(id, newStatus);
      editRerender(id, newStatus);
      navigate("/");
    } else {
      navigate("/");
    }
  };

  const completeTask = () => {
    setTask((prev) => ({ ...prev, completed: !prev.completed }));
  };

  const taskInputHandler = (e) => setTaskInput(e.target.value);

  return (
    <div className={styles.edit}>
      <div className={styles.status} onClick={completeTask}>
        {task.completed ? <BiTask /> : <BiTaskX />}
        <p>Completed</p>
      </div>
      {inputVisibility ? (
        <Input value={taskInput} changeInput={taskInputHandler} />
      ) : (
        <>
          <h1>{task.title}</h1>
        </>
      )}
      <div className={styles.btn_container}>
        {!inputVisibility && <Button onClick={editTask}>Edit</Button>}
        <Button onClick={saveTask}>{inputVisibility ? "Save" : "Home"}</Button>
      </div>
    </div>
  );
}
