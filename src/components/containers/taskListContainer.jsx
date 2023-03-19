import React, { useReducer } from 'react';
import TaskFormik from '../../forms/taskFormik';
import { LEVELS } from '../../models/filter.enum';
import { Task } from '../../models/task.class';
import Filter from '../pure/filter';
import TaskListComponent from './taskList';

const ADD = 'ADD'
const DELETE = 'DELETE'
const STATUS = 'STATUS'
const FILTER = 'FILTER'

export const todosContext = React.createContext(null)

const defaultTask1 = new Task('Example1', 'Description1', true);

const initialState = {
    todos: [defaultTask1],
    filter: LEVELS.ALL,
}

const todosReducer = (state, action) => {
    switch (action.type) {
        case ADD:
            const task = new Task(action.payload.title, action.payload.description, false)
            state.todos.push(task)
            return{
                ...state,
                todos: state.todos,
            }
        case DELETE:
            const toDelete = state.todos.find(
                todo => todo.name === action.payload.title
            )
            state.todos.splice(state.todos.indexOf(toDelete), 1);
            return {
                ...state,
                todos: state.todos,
            }
        case STATUS:
            const toComplete = state.todos.find(
                todo => todo.name === action.payload.title
            )
            toComplete.completed = action.payload.completed
            return {
                ...state,
                todos: state.todos
            }
        case FILTER:
            return {
                ...state,
                filter: action.payload.value
            }
    
        default:
            break;
    }
}

function TaskListContainer() {
    const [state, dispatch] = useReducer(todosReducer, initialState)

    const addTask = (title, description) => {
        dispatch({
            type: ADD,
            payload: {
                title: title,
                description: description,
            }
        })
    }    

    const deleteTodo = (task) => {
        dispatch({
            type: DELETE,
            payload: {
                title: task.name
            }
        })
    }

    const changeState = (title, completed) => {
        dispatch({
            type: STATUS,
            payload:{
                title,
                completed
            }
        })
    }

    const filterItems = (value) => {
        dispatch({
            type: FILTER,
            payload:{
                value
            }
        })
    }

    return (
        <div>
            <h1>My todo list</h1>
            <Filter filterItems={filterItems}></Filter>
            <todosContext.Provider value={state}>
                <TaskListComponent deleteTodo={deleteTodo} changeState={changeState}></TaskListComponent>
            </todosContext.Provider>
            <TaskFormik add={addTask}></TaskFormik>
        </div>
    );
}

export default TaskListContainer;
