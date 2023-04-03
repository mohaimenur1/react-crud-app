import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateTodo } from "../store/index";

const Edit = () => {
  const { id } = useParams();
  const todos = useSelector((state) => state.todos);
  // console.log(todos);
  const todoFilter = todos?.filter((t) => t.id === id);
  // console.log(todoFilter);
  const { title, userId, completed } = todoFilter;
  // console.log(title);
  const [todotitle, setTitle] = useState(title);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(
      updateTodo({
        todos: [...todos],
        id: id,
        title: todotitle,
        userId: userId,
        completed: completed,
      })
    );
    navigate("/");
  };
  return (
    <div className="d-flex flex-column align-items-center justify-content-center m-5">
      <h2>Edit page</h2>
      <form onSubmit={handleEdit} className="card p-5">
        <div className="mb-3">
          <label className="form-label">Edit Todo Title</label>
          <input
            type="text"
            className="form-control"
            value={todotitle}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <Link className="btn bg-success bg-opacity-75 text-white mt-4" to="/">
        Back To Home Page
      </Link>
    </div>
  );
};

export default Edit;
