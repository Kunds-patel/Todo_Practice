/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import TodoContext from "../../context/TodoContext";

const TodoItem = ({ item }) => {
  console.log("TodoItem");
  const { chanageText, deleteTodo } = useContext(TodoContext);

  return (
    <div key={item.id} className="flex m-6 gap-3 items-center">
      <Checkbox
        checked={item.isDone}
        onCheckedChange={() => chanageText(item)}
      />
      <p
        className={`flex-1 ${item.isDone ? "line-through text-slate-300	" : ""}`}
      >
        {item.text}
      </p>
      <Button onClick={() => deleteTodo(item)}>Delete</Button>
    </div>
  );
};

export default memo(TodoItem);
