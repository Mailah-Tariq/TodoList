// TodoModal.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '../redux/todoSlice';

const TodoModal = ({ todo = null, closeModal }) => {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState({ name: '', details: '' });
  const dispatch = useDispatch();

  // Populate fields if editing an existing todo
  useEffect(() => {
    if (todo) {
      setName(todo.name);
      setDetails(todo.details);
    } else {
      setName('');
      setDetails('');
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim the inputs to remove any leading/trailing spaces
    const trimmedName = name.trim();
    const trimmedDetails = details.trim();

    // Reset error messages
    const newError = { name: '', details: '' };

    // Validation for empty or invalid fields
    if (!trimmedName) {
      newError.name = "This field requires some value.";
    } else if (!/^[A-Za-z]/.test(trimmedName)) {
      newError.name = "'List Name' must start with an alphabetical character.";
    }

    if (!trimmedDetails) {
      newError.details = "This field requires some value.";
    }

    // If there are any errors, set the error state and stop submission
    if (newError.name || newError.details) {
      setError(newError);
      return;
    }

    // Dispatch actions and reset state if no errors
    if (todo) {
      dispatch(updateTodo({ id: todo.id, updatedTodo: { name: trimmedName, details: trimmedDetails } }));
    } else {
      dispatch(addTodo({ name: trimmedName, details: trimmedDetails }));
    }

    // Clear fields and errors after submission
    setName('');
    setDetails('');
    setError({ name: '', details: '' });

    // Close modal
    closeModal();
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{todo ? 'Edit Task' : 'Add New Task'}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
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
                  onChange={(e) => {
                    setName(e.target.value);
                    setError((prev) => ({ ...prev, name: '' })); // Clear error when typing
                  }}
                  required
                />
                {error.name && <small className="text-danger">{error.name}</small>}
              </div>
              <div className="mb-3">
                <label className="form-label">Task Details</label>
                <textarea
                  className="form-control"
                  value={details}
                  onChange={(e) => {
                    setDetails(e.target.value);
                    setError((prev) => ({ ...prev, details: '' })); // Clear error when typing
                  }}
                  rows="3"
                  required
                ></textarea>
                {error.details && <small className="text-danger">{error.details}</small>}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setName('');
                    setDetails('');
                    setError({ name: '', details: '' });
                    closeModal();
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
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
