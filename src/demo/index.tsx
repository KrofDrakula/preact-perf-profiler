import { render } from "preact";
import { track } from "../index.js";
import Hackernews from "./hackernews.js";

const root = document.getElementById("app")!;

track(Hackernews);

render(<Hackernews maxStories={100} />, root);
