// TodoList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, deleteTodo } from '../redux/todoSlice';
import TodoModal from './TodoModal';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.lists);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="container my-5" 
    style={{
        background: 'linear-gradient(to bottom right, #c4e0e5,#4ca1af )',
        borderRadius: '10px',
      }}>
      <h1 className="text-center mb-4">Multi To-Do List</h1>
      
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th scope="col">List Name</th>
            <th scope="col">Task Details</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.name}</td>
              <td>{todo.details}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  data-bs-toggle="modal"
                  data-bs-target={`#editModal-${todo.id}`}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => dispatch(deleteTodo(todo.id))}
                >
                  Delete
                </button>
                <TodoModal todo={todo} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center mt-4" style={{ paddingBottom: '20px' }}>
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#addModal"
        >
          Add New Task
        </button>
        <TodoModal />
      </div>
    </div>
  );
};

export default TodoList;
