/*
1. Write code in a functional style to convert the input to the output:
*/

let input = { tag: "JAVASCRIPT" };
let output = "(javascript)";

const getValues = (obj) => Object.values(obj).join("");
const toLowerCase = (str) => str.toLowerCase();
const wrapInParentheses = (str) => `(${str})`;

console.log(wrapInParentheses(toLowerCase(getValues(input))));

/*
2. We have a recipe object as follows:
*/

let recipe = {
  name: "Spaghetti Bolognese",
  ingredients: ["egg", "salt"],
};

/*
Assuming that this object is immutable, write code to
- Add a new ingredient (“cream”)
- Replace “egg” with “egg white”
- Remove an ingredient (“egg”)
*/

let newIngredient = {
  ...recipe,
  ingredients: [...recipe.ingredients, "cream"],
};

let replaceIngredient = {
  ...recipe,
  ingredients: recipe.ingredients.map((i) => (i === "egg" ? "egg white" : i)),
};

let removeIngredient = {
  ...recipe,
  ingredients: recipe.ingredients.filter((i) => i !== "egg"),
};

console.log({
  recipe,
  newIngredient,
  replaceIngredient,
  removeIngredient,
});
