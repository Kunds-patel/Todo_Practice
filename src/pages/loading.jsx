import React, { forwardRef, memo } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

function Loading(
  {
    todoList,
    chanageText,
    editMode,
    deleteTodo,
    loadTodo,
    filterType,
    page,
    totle_page,
  },
  editRef
) {
  return (
    <div className="flex-1">
      {todoList.map((x) => {
        return (
          <div key={x.id} className="flex m-6 gap-3 items-center">
            <Checkbox
              checked={x.isDone}
              onCheckedChange={() => {
                chanageText({
                  ...x,
                  isDone: !x.isDone,
                });
              }}
            />
            {editMode === x.id ? (
              <form
                className="flex-1 flex gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  chanageText({
                    ...x,
                    text: editRef.current.value,
                  });
                }}
              >
                <Input className="flex-1" ref={editRef} />
                <Button type="submit">submit</Button>
              </form>
            ) : (
              <p
                className={`flex-1 ${
                  x.isDone ? "line-through text-slate-300	" : ""
                }`}
              >
                {x.text}
              </p>
            )}
            <Button
              onClick={() =>
                this.setState({ editMode: x.id }, () => {
                  editRef.current.value = x.text;
                })
              }
            >
              Edit
            </Button>
            <Button onClick={() => deleteTodo(x)}>Delete</Button>
          </div>
        );
      })}
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
    </div>
  );
}

export default memo(forwardRef(Loading));
