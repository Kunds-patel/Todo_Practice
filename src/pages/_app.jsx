import "@/styles/globals.css";
import React from "react";
import { TodoProvider } from "../context/TodoContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Todo from "./TodoApp";
import TodoAppFunction from "./TodoApp_Function";
import TicTacToe from "./TicTacToe";
import Weather from "./Weather";
import Login from "./Login";
import AuthLayout from "../layouts/authLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Register from "./Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <TodoProvider>
            <Todo />
          </TodoProvider>
        ),
      },
      {
        path: "TodoApp",
        element: <Todo />,
      },
      {
        path: "TodoApp_Function",
        element: <TodoAppFunction />,
      },
      {
        path: "TicTacToe",
        element: <TicTacToe />,
      },
      {
        path: "Weather",
        element: <Weather />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

root.render(
  <>
    <>
      <RouterProvider router={router} />
    </>
  </>
);
