import React, { memo, useRef } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function TodoForm({ onAddTodo }) {
  const inputRef = useRef();

  const addTodo = async (event) => {
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
      onAddTodo(json);
      data.value = "";
    } catch (error) {}
  };

  return (
    <form onSubmit={addTodo} className="flex flex-col gap-4 max-w-sm mx-auto">
      <h1 className="text-center text-3xl font-bold mt-6">My Todo Lists</h1>
      <div className="flex">
        <Input
          placeholder="Enter Data"
          ref={inputRef}
          className="rounded-e-none"
          required
        />
        <Button type="submit" className="rounded-s-none">
          Submit
        </Button>
      </div>
    </form>
  );
}

TodoForm.protoTypes = {
  onAddTodo: PropTypes.func.isRequireds,
};

export default memo(TodoForm);
