import React, { memo } from "react";
import { Button } from "@/components/ui/button";

function PreNext({ loadTodo, page, filterType, totle_page }) {
  return (
    <div className="flex gap-96 mx-80 flex-row-reverse">
      <Button
        className="flex-1"
        onClick={() => loadTodo(page + 1, filterType)}
        disabled={page >= totle_page}
      >
        Next
      </Button>
      <Button
        className="flex-1"
        onClick={() => loadTodo(page - 1, filterType)}
        disabled={page <= 1}
      >
        Previous
      </Button>
    </div>
  );
}

export default memo(PreNext);
