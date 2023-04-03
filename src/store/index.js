import { createSlice, configureStore } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: JSON.parse(localStorage.getItem("todos")),
  reducers: {
    updateTodo(state, action) {
      const { id, title, userId, completed } = action.payload;
      const items = state.find((item) => item.id === id);
      if (items) {
        items.id = id;
        items.title = title;
        items.userId = userId;
        items.completed = completed;
      }
      // if (items !== -1) {
      //   state[items] = title;
      //   localStorage.setItem("todos", JSON.stringify(state));
      // }
      localStorage.setItem("todos", JSON.stringify(state));
    },
  },
});

const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
});

export const { updateTodo } = todoSlice.actions;

export default store;
