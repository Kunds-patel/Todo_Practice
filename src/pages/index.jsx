import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import React, { Component, createRef } from "react";
import FormData from "./formData";
import Footer from "./footer";
import Loading from "./loading";
// import uuid from "react-uuid";

const per_page = 5;
export default class Todo extends Component {
  state = {
    todoList: [],
    filterType: "All",
    editMode: 0,
    page: 1,
    totle_page: 0,
  };

  async componentDidMount() {
    this.loadTodo(1, "All");
  }

  loadTodo = async (currentPage, filterType) => {
    try {
      console.log("All");
      let url = `http://localhost:3000/todoList?_page=${currentPage}&_per_page=${per_page}`;
      if (filterType !== "All") {
        url += `&isDone=${filterType === "Completed" ? 1 : 0}`;
        console.log(url);
      }
      const res = await fetch(url);
      const json = await res.json();
      this.setState({
        todoList: json.data,
        totle_page: json.pages,
        page: currentPage,
        filterType,
      });
    } catch (error) {}
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
    } catch (error) {}
  };

  render() {
    const { todoList, filterType, editMode, page, totle_page } = this.state;
    return (
      <div className="flex flex-col gap-6 min-h-screen">
        <FormData addTodo={this.addTodo} ref={this.inputRef} />
        <Loading
          todoList={todoList}
          chanageText={this.chanageText}
          editMode={editMode}
          ref={this.editRef}
          deleteTodo={this.deleteTodo}
          loadTodo={this.loadTodo}
          page={page}
          filterType={filterType}
          totle_page={totle_page}
        />
        <Footer loadTodo={this.loadTodo} filterType={filterType} page={page} />
      </div>
    );
  }
}
