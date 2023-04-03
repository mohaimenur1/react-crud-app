import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

const url = "https://jsonplaceholder.typicode.com/todos";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const uniqueId = uuid();
  const fetchingTodos = async () => {
    try {
      const response = await axios(url);

      const data = response.data;
      localStorage.setItem("todos", JSON.stringify(data));
      // const storedData = localStorage.getItem("todos");
      // setTodos(JSON.parse(storedData));
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (!todos) {
      fetchingTodos();
      // const fetch = localStorage.getItem("todos");
      // setTodos(JSON.parse(fetch));
    }
    // const storedData = localStorage.getItem("todos");
    // setTodos(JSON.parse(storedData));
  }, [todos]);

  useEffect(() => {
    const storedData = localStorage.getItem("todos");
    setTodos(JSON.parse(storedData));
  }, []);

  const handleDelete = (id) => {
    const getItem = localStorage.getItem("todos");
    const parseData = JSON.parse(getItem);
    const newItems = parseData.filter((todo) => todo.id !== id);

    localStorage.setItem("todos", JSON.stringify(newItems));
    setTodos(newItems);
    console.log("delete button clicked");
  };

  const createTodo = (e) => {
    if (input) {
      const newTodo = {
        id: uniqueId,
        title: input,
        userId: 1,
        completed: true,
      };
      setInput([...todos, newTodo]);
      localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
      setInput("");
    }
  };

  // const sort = [...todos].sort((a, b) => b - a);

  // const AllTodos = [...todos]?.reverse();
  // console.log(AllTodos);

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center main-row">
        <div className="col shadow main-col bg-white">
          <div className="row bg-primary text-white">
            <div className="col  p-2">
              <h4>Todo App</h4>
            </div>
          </div>
          <div className="row justify-content-between text-white p-2">
            <form onSubmit={createTodo}>
              <div className="form-group flex-fill mb-2">
                <input
                  id="todo-input"
                  type="text"
                  className="form-control"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <button type="submit" className="btn bg-primary-subtle mb-2 ml-2">
                Add todo
              </button>
            </form>
          </div>
          <div className="row" id="todo-container">
            <div className="col col-12 p-2 todo-item">
              <>
                {todos?.map((todo) => {
                  // console.log(todo);
                  return (
                    <div
                      key={todo.id}
                      className="d-flex flex-row justify-content-center align-items-center m-2 card p-2"
                    >
                      <div className="w-100 p-2">{todo.title}</div>
                      <div className="input-group-append ms-2">
                        <Link
                          to={`/edit/${todo.id}`}
                          className="btn bg-success bg-opacity-75 text-white"
                          type="button"
                          id="button-addon2 "
                        >
                          <i className="ri-edit-2-line"></i>
                        </Link>
                      </div>
                      <div className="input-group-append ms-2">
                        <button
                          className="btn btn-outline-secondary bg-danger text-white"
                          type="button"
                          onClick={() => handleDelete(todo.id)}
                        >
                          <i className="ri-delete-bin-5-line"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
