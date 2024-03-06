import React, { PureComponent, createRef } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const per_page = 5;
export default class Todo extends PureComponent {
  state = {
    todoList: [],
    filterType: "All",
    editMode: 0,
    page: 1,
    totle_page: 0,
    apistatus: [],
    error: null,
  };

  async componentDidMount() {
    this.loadTodo(1, "All");
  }

  loadTodo = async (currentPage, filterType) => {
    const action = "LOAD_TODO";
    try {
      this.setState(({ apistatus }) => ({
        apistatus: [...apistatus, { action, status: "Loading" }],
      }));
      let url = `http://localhost:3000/todoList?_page=${currentPage}&_per_page=${per_page}`;
      if (filterType !== "All") {
        url += `&isDone=${filterType === "Completed" ? 1 : 0}`;
        console.log(url);
      }
      const res = await fetch(url);
      const json = await res.json();

      this.setState(({ apistatus }) => ({
        todoList: json.data,
        totle_page: json.pages,
        page: currentPage,
        filterType,
        apistatus: apistatus.filter((x) => x.action !== action),
      }));
    } catch (error) {
      this.setState(({ apistatus }) => ({
        error: error.message,
        apistatus: apistatus.map((x) =>
          x.action === action ? { ...x, status: "error" } : x
        ),
      }));
    }
  };
  inputRef = createRef();
  editRef = createRef();

  addTodo = async (event) => {
    try {
      event.preventDefault();
      const input = this.inputRef.current;
      const res = await fetch("http://localhost:3000/todoList", {
        method: "POST",
        body: JSON.stringify({
          text: input.value,
          isDone: false,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await res.json();
      this.setState(
        ({ todoList }) => ({
          todoList: [...todoList, json],
        }),
        () => {
          input.value = "";
        }
      );
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  deleteTodo = async (event) => {
    try {
      await fetch(`http://localhost:3000/todoList/${event.id}`, {
        method: "DELETE",
      });
      this.setState(({ todoList }) => {
        const index = todoList.findIndex((x) => x.id === event.id);
        return {
          todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
        };
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  change = (filterType) => {
    this.setState({ filterType });
  };

  chanageText = async (e) => {
    try {
      const res = await fetch(`http://localhost:3000/todoList/${e.id}`, {
        method: "PUT",
        body: JSON.stringify(e),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await res.json();
      this.setState(({ todoList }) => {
        const index = todoList.findIndex((x) => x.id === e.id);
        return {
          todoList: [
            ...todoList.slice(0, index),
            json,
            ...todoList.slice(index + 1),
          ],
          editMode: 0,
        };
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const { todoList, filterType, editMode, page, totle_page, error } =
      this.state;
    return (
      <div className="flex flex-col gap-6 min-h-screen">
        <form
          onSubmit={this.addTodo}
          className="flex flex-col gap-4 max-w-sm mx-auto"
        >
          <h1 className="text-center text-3xl font-bold mt-6">My Todo Lists</h1>
          <div className="flex">
            <Input
              placeholder="Enter Data"
              ref={this.inputRef}
              className="rounded-e-none"
              required
            />
            <Button type="submit" className="rounded-s-none">
              Submit
            </Button>
          </div>
        </form>
        <div className="flex-1">
          {todoList.map((x) => {
            return (
              <div key={x.id} className="flex m-6 gap-3 items-center">
                <Checkbox
                  checked={x.isDone}
                  onCheckedChange={() => {
                    this.chanageText({
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
                      this.chanageText({
                        ...x,
                        text: this.editRef.current.value,
                      });
                    }}
                  >
                    <Input className="flex-1" ref={this.editRef} />
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
                      this.editRef.current.value = x.text;
                    })
                  }
                >
                  Edit
                </Button>
                <Button onClick={() => this.deleteTodo(x)}>Delete</Button>
              </div>
            );
          })}
          <div className="flex gap-96 mx-80 flex-row-reverse">
            <Button
              className="flex-1"
              onClick={() => this.loadTodo(page + 1, filterType)}
              disabled={page >= totle_page}
            >
              Next
            </Button>
            <Button
              className="flex-1"
              onClick={() => this.loadTodo(page - 1, filterType)}
              disabled={page <= 1}
            >
              Previous
            </Button>
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            className="flex-1 rounded-none"
            variant={filterType === "All" ? "destructive" : "default"}
            onClick={() => this.loadTodo(page, "All")}
          >
            All
          </Button>
          <Button
            variant={filterType === "Pending" ? "destructive" : "default"}
            className="flex-1 rounded-none"
            onClick={() => this.loadTodo(1, "Pending")}
          >
            Pending
          </Button>
          <Button
            variant={filterType === "Completed" ? "destructive" : "default"}
            className="flex-1 rounded-none"
            onClick={() => this.loadTodo(1, "Completed")}
          >
            Completed
          </Button>
        </div>
        {error && (
          <div className="flex items-center gap-2 absolute top-4 right-4 bg-red-500 p-4 text-white rounded-lg">
            <ExclamationTriangleIcon className="h-4 w-4" />
            {error}
          </div>
        )}
      </div>
    );
  }
}
