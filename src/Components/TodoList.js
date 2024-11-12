// TodoList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, deleteTodo } from '../redux/todoSlice';
import TodoModal from './TodoModal';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.lists);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const openModal = (todo = null) => {
    setSelectedTodo(todo);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTodo(null);
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Multi To-Do List</h1>
        <button className="btn btn-success" onClick={() => openModal()}>
          Add New Task
        </button>
      </div>
      
      {/* Add table-responsive for horizontal scrolling on smaller screens */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">List Name</th>
              <th scope="col">Task Details</th>
              <th scope="col" style={{ width: '150px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.name}</td>
                <td>{todo.details}</td>
                <td>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => openModal(todo)}
                      style={{ width: '60px' }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => dispatch(deleteTodo(todo.id))}
                      style={{ width: '60px' }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalVisible && <TodoModal todo={selectedTodo} closeModal={closeModal} />}
    </div>
  );
};

export default TodoList;
