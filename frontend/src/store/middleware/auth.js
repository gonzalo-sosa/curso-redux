const logger = (store) => (next) => (action) => {
  console.log({ store });
  console.log({ next });
  console.log({ action });

  next(action);
};

// Parametrized middleware
const register = (param) => (store) => (next) => (action) => {
  console.log({ param });
  next(action);
};

export default {
  logger,
  register,
};
