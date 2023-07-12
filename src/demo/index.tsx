import { render } from "preact";
import { track } from "../index.js";
import Hackernews from "./hackernews.js";
import Instructions from "./instructions.js";

const root = document.getElementById("app")!;

track(Hackernews);

render(
  <>
    <Instructions />
    <Hackernews maxStories={100} />
  </>,
  root
);
