/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useTodo } from "../../context/TodoContext";
import { DELETE_TODO, UPDATE_TODO } from "../../constants/action";

const TodoItem = ({ item }) => {
  const { updateTodo, deleteTodo, loading } = useTodo();
  const todoLoadingState = loading.find((x) => x.id === item.id);

  return (
    <div key={item.id} className="flex m-6 gap-3 items-center">
      <Checkbox
        className="disabled:bg-gray-300"
        checked={item.isDone}
        disabled={todoLoadingState?.task === UPDATE_TODO}
        onCheckedChange={() => updateTodo(item)}
      />
      <p
        className={`flex-1 ${item.isDone ? "line-through text-slate-300	" : ""}`}
      >
        {item.text}
      </p>
      <Button
        className="disabled:bg-gray-300"
        disabled={todoLoadingState?.task === DELETE_TODO}
        onClick={() => deleteTodo(item)}
      >
        Delete
      </Button>
    </div>
  );
};

export default memo(TodoItem);
