import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";

const TodoFilter = ({ loadTodo, filterType }) => {
  console.log("TodoFilter");

  const onFilter = useCallback(
    (e) => {
      loadTodo(e.target.getAttribute("data-type"));
    },
    [loadTodo]
  );
  return (
    <div className="flex gap-1">
      <Button
        className="flex-1 rounded-none"
        data-type="All"
        variant={filterType === "All" ? "destructive" : "default"}
        onClick={onFilter}
      >
        All
      </Button>
      <Button
        className="flex-1 rounded-none"
        data-type="Pending"
        variant={filterType === "Pending" ? "destructive" : "default"}
        onClick={onFilter}
      >
        Pending
      </Button>
      <Button
        className="flex-1 rounded-none"
        data-type="Completed"
        variant={filterType === "Completed" ? "destructive" : "default"}
        onClick={onFilter}
      >
        Completed
      </Button>
    </div>
  );
};

TodoFilter.propTypes = {
  loadTodo: PropTypes.func.isRequired,
  filterType: PropTypes.oneOf(["All", "Pending", "Completed"]).isRequired,
};

export default memo(TodoFilter);
