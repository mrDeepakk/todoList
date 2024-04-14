// reducers.js
import { useEffect } from 'react';
import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  MARK_COMPLETED,
  MARK_INCOMPLETE,
  FILTER_TODOS,
  MARK_ALL_COMPLETED,
  UPDATE_SEARCH_TERM,
} from './actionTypes';
import toast from 'react-hot-toast';

const data= localStorage.getItem('todos')!=null?JSON.parse(localStorage.getItem('todos')):[];

const initialState = { todos: data, filter: 'ALL', searchTerm: '' };

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      localStorage.setItem('todos',JSON.stringify([...state.todos, { text: action.payload.text, completed: false }]));
      return {
        todos: [...state.todos, { text: action.payload.text, completed: false }],
        filter: state.filter,
        searchTerm: state.searchTerm,
      };

    case TOGGLE_TODO:
      localStorage.setItem('todos',JSON.stringify(state.todos.map((todo, index) =>
      index === action.payload.id ? { ...todo, completed: !todo.completed } : todo
    ),));
      return {
        todos: state.todos.map((todo, index) =>
          index === action.payload.id ? { ...todo, completed: !todo.completed } : todo
        ),
        filter: state.filter,
        searchTerm: state.searchTerm,
      };

    case REMOVE_TODO:
      toast('Good Job!', {
        icon: '👏',
      });        // task remove
      localStorage.setItem('todos',JSON.stringify(state.todos.filter((todo, index) => index !== action.payload.id)));
      return {
        todos: state.todos.filter((todo, index) => index !== action.payload.id),
        filter: state.filter,
        searchTerm: state.searchTerm,
      };

    case MARK_COMPLETED:
      localStorage.setItem('todos',JSON.stringify(state.todos.map((todo, index) =>
      index === action.payload.id ? { ...todo, completed: true } : todo
    ),));
      return {
        todos: state.todos.map((todo, index) =>
          index === action.payload.id ? { ...todo, completed: true } : todo
        ),
        filter: state.filter,
        searchTerm: state.searchTerm,
      };

    case MARK_INCOMPLETE:
      localStorage.setItem('todos',JSON.stringify(state.todos.map((todo, index) =>
      index === action.payload.id ? { ...todo, completed: false } : todo
    ),));
      return {
        todos: state.todos.map((todo, index) =>
          index === action.payload.id ? { ...todo, completed: false } : todo
        ),
        filter: state.filter,
        searchTerm: state.searchTerm,
      };

    case FILTER_TODOS:
      return {
        todos: state.todos,
        filter: action.payload.filter,
        searchTerm: state.searchTerm,
      };

    case UPDATE_SEARCH_TERM:
      return {
        todos: state.todos,
        filter: state.filter,
        searchTerm: action.payload.searchTerm,
      };

    case MARK_ALL_COMPLETED:
      localStorage.setItem('todos',JSON.stringify(state.todos.map((todo) => ({ ...todo, completed: true }))));
      return {
        todos: state.todos.map((todo) => ({ ...todo, completed: true })),
        filter: state.filter,
        searchTerm: state.searchTerm,
      };

    default:
      return state;
  }
};

export default todoReducer;
