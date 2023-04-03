import "./App.css";
// import Todo from "./component/Todo.js/Todo";
import { RouterProvider } from "react-router-dom";
import { router } from "./route/Route";

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
