import react, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import {
  ADD_TODO,
  DELETE_TODO,
  FAIL,
  LOAD_TODO,
  REQUEST,
  SUCCESS,
  UPDATE_TODO,
} from "../constants/action";
import crudReducer from "../reducers/crudReducer";
import errorReducer from "../reducers/errorReducer";
import loadingReducer from "../reducers/loadingReducer";

const TodoContext = createContext();

const todoInitialState = {
  todoList: [],
  filterType: "All",
  loading: [],
  error: [],
};

const todoReducer = (
  state,
  {
    type,
    payload: {
      todoListPayload,
      loadingPayload,
      errorPayload,
      filterTypePayload,
    },
  }
) => ({
  todoList: crudReducer(state.todoList, { type, payload: todoListPayload }),
  filterType: filterTypePayload || state.filterType,
  loading: loadingReducer(state.loading, { type, payload: loadingPayload }),
  error: errorReducer(state.error, { type, payload: errorPayload }),
});

// const todoReducer = (state, { type, payload }) => {
//   switch (type) {
//     case `${LOAD_TODO}_${REQUEST}`:
//       return {
//         ...state,
//         action: [...state.action, { task: LOAD_TODO, state: REQUEST }],
//       };
//     case `${ADD_TODO}_${REQUEST}`:
//       return {
//         ...state,
//         action: [...state.action, { task: ADD_TODO, state: REQUEST }],
//       };
//     case `${UPDATE_TODO}_${REQUEST}`:
//       return {
//         ...state,
//         action: [
//           ...state.action,
//           { task: UPDATE_TODO, state: REQUEST, id: payload.id },
//         ],
//       };
//     case `${DELETE_TODO}_${REQUEST}`:
//       return {
//         ...state,
//         action: [
//           ...state.action,
//           { task: DELETE_TODO, state: REQUEST, id: payload.id },
//         ],
//       };

//     case `${LOAD_TODO}_${SUCCESS}`:
//       return {
//         ...state,
//         ...payload,
//         action: state.action.filter((x) => x.task !== LOAD_TODO),
//       };
//     case `${ADD_TODO}_${SUCCESS}`:
//       return {
//         ...state,
//         todoList: [...state.todoList, payload],
//         action: state.action.filter((x) => x.task !== ADD_TODO),
//       };
//     case `${UPDATE_TODO}_${SUCCESS}`: {
//       const index = state.todoList.findIndex((x) => x.id === payload.id);
//       return {
//         ...state,
//         todoList: [
//           ...state.todoList.slice(0, index),
//           payload,
//           ...state.todoList.slice(index + 1),
//         ],
//         action: state.action.filter(
//           (x) => !(x.task === UPDATE_TODO && x.id === payload.id)
//         ),
//       };
//     }
//     case `${DELETE_TODO}_${SUCCESS}`: {
//       const index = state.todoList.findIndex((x) => x.id === payload.id);
//       return {
//         ...state,
//         todoList: [
//           ...state.todoList.slice(0, index),
//           ...state.todoList.slice(index + 1),
//         ],
//         action: state.action.filter(
//           (x) => !(x.task === DELETE_TODO && x.id === payload.id)
//         ),
//       };
//     }

//     case `${LOAD_TODO}_${FAIL}`:
//       return {
//         ...state,
//         action: state.action.map((x) => {
//           if (x.task === LOAD_TODO && x.state === REQUEST) {
//             return { ...x, state: FAIL, message: "Load Todo Failed" };
//           }
//           return x;
//         }),
//       };

//     case `${ADD_TODO}_${FAIL}`:
//       return {
//         ...state,
//         action: state.action.map((x) => {
//           if (x.task === ADD_TODO && x.state === REQUEST) {
//             return { ...x, state: FAIL, message: "Add Todo Failed" };
//           }
//           return x;
//         }),
//       };
//     case `${UPDATE_TODO}_${FAIL}`:
//       return {
//         ...state,
//         action: state.action.map((x) => {
//           if (x.task === UPDATE_TODO && x.state === REQUEST) {
//             return { ...x, state: FAIL, message: "Update Todo Failed" };
//           }
//           return x;
//         }),
//       };
//     case `${DELETE_TODO}_${FAIL}`:
//       return {
//         ...state,
//         action: state.action.map((x) => {
//           if (x.task === DELETE_TODO && x.state === REQUEST) {
//             return { ...x, state: FAIL, message: "Delete Todo Failed" };
//           }
//           return x;
//         }),
//       };

//     default:
//       return state;
//   }
// };

export function TodoProvider({ children }) {
  const [todoState, dispatch] = useReducer(todoReducer, todoInitialState);

  const inputRef = useRef();

  const loadTodo = useCallback(async (ft = "All") => {
    try {
      dispatch({ type: `${LOAD_TODO}_${REQUEST}`, payload: {} });
      let url = `http://localhost:3000/todoList`;
      if (ft !== "All") {
        url += `?isDone=${ft === "Completed" ? 1 : 0}`;
      }
      const res = await fetch(url);
      const json = await res.json();
      dispatch({
        type: `${LOAD_TODO}_${SUCCESS}`,
        payload: { todoListPayload: json, filterTypePayload: ft },
      });
    } catch (error) {
      dispatch({
        type: `${LOAD_TODO}_${FAIL}`,
        payload: { errorPayload: error },
      });
    }
  }, []);

  const addTodo = useCallback(async (event) => {
    try {
      dispatch({ type: `${ADD_TODO}_${REQUEST}`, payload: {} });
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
        type: `${ADD_TODO}_${SUCCESS}`,
        payload: { todoListPayload: json },
      });
      data.value = "";
    } catch (error) {
      dispatch({
        type: `${ADD_TODO}_${FAIL}`,
        payload: { errorPayload: error },
      });
    }
  }, []);

  const updateTodo = useCallback(async (item) => {
    try {
      dispatch({
        type: `${UPDATE_TODO}_${REQUEST}`,
        payload: { loadingPayload: item },
      });
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
      console.log(json);
      dispatch({
        type: `${UPDATE_TODO}_${SUCCESS}`,
        payload: { todoListPayload: json },
      });
    } catch (error) {
      dispatch({
        type: `${UPDATE_TODO}_${FAIL}`,
        payload: { errorPayload: error },
      });
    }
  }, []);

  const deleteTodo = useCallback(async (item) => {
    try {
      dispatch({
        type: `${DELETE_TODO}_${REQUEST}`,
        payload: { loadingPayload: item },
      });
      await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: "DELETE",
      });
      dispatch({
        type: `${DELETE_TODO}_${SUCCESS}`,
        payload: { todoListPayload: item },
      });
    } catch (error) {
      dispatch({
        type: `${DELETE_TODO}_${FAIL}`,
        payload: { errorPayload: error },
      });
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
      updateTodo,
      deleteTodo,
      inputRef,
    }),
    [todoState, loadTodo, addTodo, updateTodo, deleteTodo, inputRef]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export default TodoContext;

export const useTodo = () => useContext(TodoContext);
