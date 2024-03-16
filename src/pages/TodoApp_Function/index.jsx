import React, { useCallback, useContext, useEffect, useState } from "react";
import TodoForm from "./todoForm";
import TodoList from "./todoList";
import TodoFilter from "./todoFilter";

function Todo() {
  console.log("todo Main");

  return (
    <div className="flex flex-col gap-6 min-h-screen">
      <TodoForm />
      <TodoList />
      <TodoFilter />
    </div>
  );
}

export default Todo;
