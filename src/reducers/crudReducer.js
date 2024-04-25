const crudReducer = (state, { type, payload }) => {
  const match = /(LOAD|ADD|UPDATE|DELETE)_(.*)_(SUCCESS)/.exec(type);
  if (!match) return state;
  const [, action] = match;
  switch (action) {
    case "LOAD":
      return payload;

    case "ADD":
      return [...state, payload];

    case "UPDATE": {
      const index = state.findIndex((item) => item.id === payload.id);
      return [...state.slice(0, index), payload, ...state.slice(index + 1)];
    }

    case "DELETE": {
      const index = state.findIndex((item) => item.id === payload.id);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    }

    default:
      return state;
  }
};

export default crudReducer;
