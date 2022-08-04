import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import Queries from "./api";
import Error from "./components/UI/Error/Error";

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState({ state: false, text: "" });

  const errorHandler = (state, text) => {
    setError({ text, state });
  };

  const errorUpdater = (e) => {
    e.stopPropagation();
    error.state && setError(false, "");
  };

  const addRerender = (updateTask) => {
    setTasks([...tasks, updateTask]);
  };

  return (
    <div onClick={errorUpdater} className="App">
      <Form rerender={addRerender} error={errorHandler} />
      {error.state ? <Error>{error.text}</Error> : null}
      <TodoList />
    </div>
  );
}

export default App;
