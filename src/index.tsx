
import { createRoot } from "react-dom/client";
import Test from "./test";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Test />);