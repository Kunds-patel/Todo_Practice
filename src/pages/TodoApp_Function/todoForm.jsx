import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTodo } from "../../context/TodoContext";
import { ADD_TODO } from "../../constants/action";

function TodoForm() {
  const { addTodo, inputRef, loading } = useTodo();

  const isLoading = loading.some((x) => x.task === ADD_TODO);
  console.log(loading);

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
        <Button type="submit" className="rounded-none" disabled={isLoading}>
          Submit
        </Button>
      </div>
    </form>
  );
}

export default memo(TodoForm);
