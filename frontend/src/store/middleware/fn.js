// No es necesario incluir esta lógica en el middleware de la aplicación, ya que Redux Toolkit proporciona una forma más sencilla de implementar middleware.

const fn =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === "function") {
      action(dispatch, getState);
    } else {
      next(action);
    }
  };

export default fn;
