const errorReducer = (state, { type, payload }) => {
  const match = /(.*)_(REQUEST|FAIL)/.exec(type);
  if (!match) return state;
  const [, task, action] = match;

  if (action === "FAIL") {
    return state.map((x) => {
      if (x.task === task && x.state === "REQUEST" && x.id === payload?.id) {
        return { ...x, state: action, ...payload };
      }
      return x;
    });
  }

  return state.filter((x) => !(x.task === action));
};

export default errorReducer;
