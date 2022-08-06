import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList";
import EditTodoItem from "./components/EditTodoItem";
import Todo from "./components/Todo";
import ThemeProvider from "./context/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todo />}>
            <Route index element={<TodoList />} />
            <Route path=":id" element={<EditTodoItem />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
