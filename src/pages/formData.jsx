import React, { forwardRef, memo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function formData({ addTodo }, inputRef) {
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

export default memo(forwardRef(formData));
