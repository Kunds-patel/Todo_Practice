import React, { memo } from "react";
import TodoItem from "./todoItem";
import { useTodo } from "../../context/TodoContext";

const TodoList = () => {
  const { todoList } = useTodo();

  return (
    <div className="flex-1">
      {todoList.map((x) => {
        return <TodoItem key={x.id} item={x} />;
      })}
    </div>
  );
};

export default memo(TodoList);
