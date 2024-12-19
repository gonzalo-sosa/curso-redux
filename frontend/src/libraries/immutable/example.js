import { Map } from "immutable";

let book = Map({ title: "La tercera" });

function publish(book) {
  return book.set("isPublished", true);
}

book = publish(book);

console.log(book.toJS());
