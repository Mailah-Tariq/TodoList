// TodoModal.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '../redux/todoSlice';

const TodoModal = ({ todo = null }) => {
  const [name, setName] = useState(todo ? todo.name : '');
  const [details, setDetails] = useState(todo ? todo.details : '');
  const dispatch = useDispatch();

  useEffect(() => {
    if (todo) {
      setName(todo.name);
      setDetails(todo.details);
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo) {
      dispatch(updateTodo({ id: todo.id, updatedTodo: { name, details } }));
    } else {
      dispatch(addTodo({ name, details }));
    }
    setName('');
    setDetails('');
  };

  return (
    <div
      className="modal fade"
      id={todo ? `editModal-${todo.id}` : 'addModal'}
      tabIndex="-1"
      aria-labelledby="todoModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="todoModalLabel">
              {todo ? 'Edit Task' : 'Add New Task'}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">List Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Task Details</label>
                <textarea
                  className="form-control"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
