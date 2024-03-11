import React, { useCallback, useEffect, useState } from "react";
import TodoForm from "./todoForm";
import TodoList from "./todoList";
import TodoFilter from "./todoFilter";

function Todo() {
  console.log("todo");
  const [todoList, setTodoList] = useState([]);
  const [filterType, setFilterType] = useState("All");

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

  const onAddTodo = useCallback((todoItem) => {
    setTodoList((val) => [...val, todoItem]);
  }, []);

  const onChangeText = useCallback((todoItem) => {
    setTodoList((val) => {
      const index = val.findIndex((x) => x.id === todoItem.id);
      return [...val.slice(0, index), todoItem, ...val.slice(index + 1)];
    });
  }, []);

  const onDeleteTodo = useCallback((todoItem) => {
    setTodoList((val) => {
      const index = val.findIndex((x) => x.id === todoItem.id);
      return [...val.slice(0, index), ...val.slice(index + 1)];
    });
  }, []);

  useEffect(() => {
    loadTodo();
  }, [loadTodo]);

  return (
    <div className="flex flex-col gap-6 min-h-screen">
      <TodoForm onAddTodo={onAddTodo} />
      <TodoList
        data={todoList}
        onChangeText={onChangeText}
        onDeleteTodo={onDeleteTodo}
      />
      <TodoFilter filterType={filterType} loadTodo={loadTodo} />
    </div>
  );
}

export default Todo;
