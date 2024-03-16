import react, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";

const TodoContext = createContext();

const initialState = {
  todoList: [],
  filterType: "All",
  loading: false,
  error: null,
};

const todoReducer = (state, { type, payload }) => {
  switch (type) {
    case "LOAD_TODO_REQEST":
    case "ADD_TODO_REQEST":
    case "UPDATE_TODO_REQEST":
    case "DELETE_TODO_REQEST":
      return { ...state, loading: true };

    case "LOAD_TODO_SUCCSESS":
      return { ...state, loading: false, ...payload };

    case "ADD_TODO_SUCCSESS":
      return {
        ...state,
        loading: false,
        todoList: [...state.todoList, payload],
      };

    case "UPDATE_TODO_SUCCSESS": {
      const index = state.todoList.findIndex((x) => x.id === payload.id);
      return {
        ...state,
        loading: false,
        todoList: [
          ...state.todoList.slice(0, index),
          payload,
          ...state.todoList.slice(index + 1),
        ],
      };
    }
    case "DELETE_TODO_SUCCSESS": {
      const index = state.todoList.findIndex((x) => x.id === payload.id);
      return {
        ...state,
        loading: false,
        todoList: [
          ...state.todoList.slice(0, index),
          ...state.todoList.slice(index + 1),
        ],
      };
    }

    case "LOAD_TODO_FAIL":
    case "ADD_TODO_FAIL":
    case "UPDATE_TODO_FAIL":
    case "DELETE_TODO_FAIL":
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

export function TodoProvider({ children }) {
  const [todoState, dispatch] = useReducer(todoReducer, initialState);

  const inputRef = useRef();

  const loadTodo = useCallback(async (ft = "All") => {
    try {
      dispatch({ type: "LOAD_TODO_REQEST" });
      let url = `http://localhost:3000/todoList`;
      if (ft !== "All") {
        url += `?isDone=${ft === "Completed" ? 1 : 0}`;
      }
      const res = await fetch(url);
      const json = await res.json();
      dispatch({
        type: "LOAD_TODO_SUCCSESS",
        payload: { todoList: json, filterType: ft },
      });
    } catch (error) {
      dispatch({ type: "LOAD_TODO_FAIL", payload: error });
    }
  }, []);

  const addTodo = useCallback(async (event) => {
    try {
      dispatch({ type: "ADD_TODO_REQEST" });
      event.preventDefault();
      const data = inputRef.current;
      const input = data.value;
      const res = await fetch("http://localhost:3000/todoList", {
        method: "POST",
        body: JSON.stringify({
          text: input,
          isDone: false,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await res.json();
      dispatch({
        type: "ADD_TODO_SUCCSESS",
        payload: json,
      });
      data.value = "";
    } catch (error) {
      dispatch({ type: "ADD_TODO_FAIL", payload: error });
    }
  }, []);

  const chanageText = useCallback(async (item) => {
    try {
      dispatch({ type: "UPDATE_TODO_REQEST" });
      const res = await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...item,
          isDone: !item.isDone,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await res.json();
      dispatch({
        type: "UPDATE_TODO_SUCCSESS",
        payload: json,
      });
    } catch (error) {
      dispatch({ type: "UPDATE_TODO_FAIL", payload: error });
    }
  }, []);

  const deleteTodo = useCallback(async (item) => {
    try {
      dispatch({ type: "DELETE_TODO_REQEST" });
      await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: "DELETE",
      });
      dispatch({
        type: "DELETE_TODO_SUCCSESS",
        payload: item,
      });
    } catch (error) {
      dispatch({ type: "DELETE_TODO_FAIL", payload: error });
    }
  }, []);

  useEffect(() => {
    loadTodo();
  }, [loadTodo]);

  const value = useMemo(
    () => ({
      ...todoState,
      loadTodo,
      addTodo,
      chanageText,
      deleteTodo,
      inputRef,
    }),
    [todoState, loadTodo, addTodo, chanageText, deleteTodo, inputRef]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export default TodoContext;
