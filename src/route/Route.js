import { createBrowserRouter } from "react-router-dom";
import Edit from "../component/Edit";
import Todo from "../component/Todo.js/Todo";
import Main from "../layout/Main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Todo />,
      },
      {
        path: "/edit/:id",
        element: <Edit />,
      },
    ],
  },
]);
