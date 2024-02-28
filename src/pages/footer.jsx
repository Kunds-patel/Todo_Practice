import React, { memo } from "react";
import { Button } from "@/components/ui/button";

function Footer({ loadTodo, filterType, page }) {
  return (
    <div className="flex gap-1">
      <Button
        className="flex-1 rounded-none"
        variant={filterType === "All" ? "destructive" : "default"}
        onClick={() => loadTodo(page, "All")}
      >
        All
      </Button>
      <Button
        variant={filterType === "Pending" ? "destructive" : "default"}
        className="flex-1 rounded-none"
        onClick={() => loadTodo(1, "Pending")}
      >
        Pending
      </Button>
      <Button
        variant={filterType === "Completed" ? "destructive" : "default"}
        className="flex-1 rounded-none"
        onClick={() => loadTodo(1, "Completed")}
      >
        Completed
      </Button>
    </div>
  );
}

export default memo(Footer);
