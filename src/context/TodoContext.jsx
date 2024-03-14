import react, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const TodoContext = createContext();

import React from "react";

export function TodoProvider({ children }) {
  const [todoList, setTodoList] = useState([]);
  const [filterType, setFilterType] = useState("All");

  const inputRef = useRef();

  const loadTodo = useCallback(async (ft = "All") => {
    try {
      let url = `http://localhost:3000/todoList`;
      if (ft !== "All") {
        url += `?isDone=${ft === "Completed" ? 1 : 0}`;
      }
      const res = await fetch(url);
      const json = await res.json();
      setTodoList(json);
      setFilterType(ft);
    } catch (error) {}
  }, []);

  const addTodo = useCallback(async (event) => {
    try {
      event.preventDefault();
      const data = inputRef.current;
      const input = data.value;
      const res = await fetch("http://localhost:3000/todoList", {
        method: "POST",
        body: JSON.stringify({
          text: input,
          isDone: false,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await res.json();
      setTodoList((val) => [...val, json]);
      data.value = "";
    } catch (error) {}
  }, []);

  const chanageText = useCallback(async (item) => {
    try {
      const res = await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...item,
          isDone: !item.isDone,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await res.json();
      setTodoList((val) => {
        const index = val.findIndex((x) => x.id === json.id);
        return [...val.slice(0, index), json, ...val.slice(index + 1)];
      });
    } catch (error) {}
  }, []);

  const deleteTodo = useCallback(async (item) => {
    try {
      await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: "DELETE",
      });
      setTodoList((val) => {
        const index = val.findIndex((x) => x.id === item.id);
        return [...val.slice(0, index), ...val.slice(index + 1)];
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }, []);

  useEffect(() => {
    loadTodo();
  }, [loadTodo]);

  const value = useMemo(
    () => ({
      todoList,
      filterType,
      loadTodo,
      addTodo,
      chanageText,
      deleteTodo,
      inputRef,
    }),
    [todoList, filterType, loadTodo, addTodo, chanageText, deleteTodo, inputRef]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export default TodoContext;
