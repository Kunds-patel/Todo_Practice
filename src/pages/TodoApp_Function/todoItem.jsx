/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const TodoItem = ({ item, onChangeText, onDeleteTodo }) => {
  console.log("TodoItem");

  const chanageText = useCallback(async () => {
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
      onChangeText(json);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }, [onChangeText]);

  const deleteTodo = useCallback(async () => {
    try {
      await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: "DELETE",
      });
      onDeleteTodo(item);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }, [onDeleteTodo]);

  return (
    <div key={item.id} className="flex m-6 gap-3 items-center">
      <Checkbox checked={item.isDone} onCheckedChange={chanageText} />
      <p
        className={`flex-1 ${item.isDone ? "line-through text-slate-300	" : ""}`}
      >
        {item.text}
      </p>
      <Button onClick={deleteTodo}>Delete</Button>
    </div>
  );
};

TodoItem.protoTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
  }),
  onChangeText: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
};
export default memo(TodoItem);
