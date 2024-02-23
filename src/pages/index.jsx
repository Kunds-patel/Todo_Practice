import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import React, { Component, createRef } from "react";
// import uuid from "react-uuid";
export default class Todo extends Component {
  state = {
    todoList: [],
    filterType: "All",
    editMode: 0,
    page: 1,
  };

  async componentDidMount() {
    try {
      const res = await fetch("http://localhost:3000/todoList");
      const json = await res.json();
      this.setState({ todoList: json });
    } catch (error) {}
  }

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
    } catch (error) {}
  };

  toggoleTodo = async (event) => {
    try {
      const res = await fetch(`http://localhost:3000/todoList/${event.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...event,
          isDone: !event.isDone,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await res.json();
      this.setState(({ todoList }) => {
        const index = todoList.findIndex((x) => x.id === event.id);
        return {
          todoList: [
            ...todoList.slice(0, index),
            json,
            ...todoList.slice(index + 1),
          ],
        };
      });
    } catch (error) {}
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
    } catch (error) {}
  };

  change = (filterType) => {
    this.setState({ filterType });
  };

  chanageText = async (e) => {
    try {
      const res = await fetch(`http://localhost:3000/todoList/${e.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...e,
          text: this.editRef.current.value,
        }),
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
        };
      });
    } catch (error) {}
  };

  render() {
    const { todoList, filterType, editMode } = this.state;
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
            if (
              filterType === "All" ||
              (filterType === "Pending" && x.isDone === false) ||
              (filterType === "Completed" && x.isDone === true)
            ) {
              return (
                <div key={x.id} className="flex m-6 gap-3 items-center">
                  <Checkbox
                    checked={x.isDone}
                    onCheckedChange={() => this.toggoleTodo(x)}
                  />
                  {editMode === x.id ? (
                    <form
                      className="flex-1 flex gap-4"
                      onSubmit={() => this.chanageText(x)}
                    >
                      <Input className="flex-1" ref={this.editRef} />
                      <Button
                        type="submit"
                        onClick={() => this.setState({ editMode: x.id })}
                      >
                        submit
                      </Button>
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
            }
            return null;
          })}
        </div>
        <div className="flex gap-1">
          <Button
            className="flex-1 rounded-none"
            variant={filterType === "All" ? "destructive" : "default"}
            onClick={() => this.change("All")}
          >
            All
          </Button>
          <Button
            variant={filterType === "Pending" ? "destructive" : "default"}
            className="flex-1 rounded-none"
            onClick={() => this.change("Pending")}
          >
            Pending
          </Button>
          <Button
            variant={filterType === "Completed" ? "destructive" : "default"}
            className="flex-1 rounded-none"
            onClick={() => this.change("Completed")}
          >
            Completed
          </Button>
        </div>
      </div>
    );
  }
}
