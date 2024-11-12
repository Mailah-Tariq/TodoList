// redux/todosSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const initialState = {
  lists: [],
  status: 'idle',
  error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const querySnapshot = await getDocs(collection(db, 'todos'));
  const todos = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return todos;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (newTodo) => {
  const docRef = await addDoc(collection(db, 'todos'), newTodo);
  return { id: docRef.id, ...newTodo };
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, updatedTodo }) => {
  const docRef = doc(db, 'todos', id);
  await updateDoc(docRef, updatedTodo);
  return { id, ...updatedTodo };  // Returning updated todo to update the state
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await deleteDoc(doc(db, 'todos', id));
  return id;  // Returning id for efficient state update
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.lists = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.lists.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.lists.findIndex((todo) => todo.id === action.payload.id);
        state.lists[index] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.lists = state.lists.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todosSlice.reducer;
