import React, { PureComponent, createRef } from "react";
import FormData from "./formData";
import Footer from "./footer";
import Loading from "./loading";

const per_page = 5;
export default class Todo extends PureComponent {
  state = {
    todoList: [],
    filterType: "All",
    editMode: 0,
    page: 1,
    totle_page: 0,
    apistatus: [],
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
        {/* {error && (
          <div className="flex items-center gap-2 absolute top-4 right-4 bg-red-500 p-4 text-white rounded-lg">
            <ExclamationTriangleIcon className="h-4 w-4" />
            {error}
          </div>
        )} */}
      </div>
    );
  }
}
