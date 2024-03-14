import React, { memo, useContext } from "react";
import TodoItem from "./todoItem";
import TodoContext from "../../context/TodoContext";

const TodoList = () => {
  console.log("Todolist");

  const { todoList } = useContext(TodoContext);

  return (
    <div className="flex-1">
      {todoList.map((x) => {
        return <TodoItem key={x.id} item={x} />;
      })}
    </div>
  );
};

export default memo(TodoList);
