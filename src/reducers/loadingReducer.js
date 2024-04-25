const loadingReducer = (state, { type, payload }) => {
  const match = /(.*)_(REQUEST|SUCCESS|FAIL)/.exec(type);
  if (!match) return state;
  const [, task, action] = match;

  if (action === "REQUEST") {
    return [...state, { task: action, id: payload?.id || -1 }];
  }
  return state.filter((x) => !(x.task === task));
};

export default loadingReducer;
