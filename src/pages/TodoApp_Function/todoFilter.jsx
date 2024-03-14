import React, { memo, useContext } from "react";
import { Button } from "@/components/ui/button";
import TodoContext from "../../context/TodoContext";

const TodoFilter = () => {
  console.log("TodoFilter");
  const { filterType, loadTodo } = useContext(TodoContext);

  return (
    <div className="flex gap-1">
      <Button
        className="flex-1 rounded-none"
        data-type="All"
        variant={filterType === "All" ? "destructive" : "default"}
        onClick={() => loadTodo("All")}
      >
        All
      </Button>
      <Button
        className="flex-1 rounded-none"
        data-type="Pending"
        variant={filterType === "Pending" ? "destructive" : "default"}
        onClick={() => loadTodo("Pending")}
      >
        Pending
      </Button>
      <Button
        className="flex-1 rounded-none"
        data-type="Completed"
        variant={filterType === "Completed" ? "destructive" : "default"}
        onClick={() => loadTodo("Completed")}
      >
        Completed
      </Button>
    </div>
  );
};

export default memo(TodoFilter);
