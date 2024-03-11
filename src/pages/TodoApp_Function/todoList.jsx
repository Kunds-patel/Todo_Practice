import React, { memo } from "react";
import PropTypes from "prop-types";
import TodoItem from "./todoItem";

const TodoList = ({ data, onChangeText, onDeleteTodo }) => {
  console.log("Todolist", data);
  return (
    <div className="flex-1">
      {data.map((x) => {
        return (
          <TodoItem
            key={x.id}
            item={x}
            onChangeText={onChangeText}
            onDeleteTodo={onDeleteTodo}
          />
        );
      })}
    </div>
  );
};

TodoList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      isDone: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onChangeText: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
};

export default memo(TodoList);
