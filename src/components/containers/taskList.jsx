import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { todosContext } from './taskListContainer';
import TaskComponent from '../pure/task';
import { LEVELS } from '../../models/filter.enum';

const TaskListComponent = ({deleteTodo, changeState}) => {

    const state =  useContext(todosContext);
    
    let todos = state.todos;
    let filter = state.filter;

    const filterTodos = () => {
        if ( filter === LEVELS.ALL) return todos
        if ( filter === LEVELS.ACTIVE) return todos.filter(
            todo => !todo.completed
            )
            if (filter === LEVELS.COMPLETED) return todos.filter(
                todo => todo.completed
                )
            }
    let filteredTodos = filterTodos()
            
    return (
        <table className='table table-dark my-3'>
            <thead>
                <tr>
                    <th scope='col'>Title</th>
                    <th scope='col'>Description</th>
                    <th scope='col'>Actions</th>
                </tr>
            </thead>
            <tbody>
                { filteredTodos.map((task, index) => {
                    return (
                            <TaskComponent 
                                key={index} 
                                task={task}
                                remove = {deleteTodo}
                                complete = {changeState}
                            >
                            </TaskComponent>
                        )
                    }
                )}
            </tbody>
        </table>
    )
};

TaskListComponent.propTypes = {
    deleteTodo: PropTypes.func.isRequired,
    changeState: PropTypes.func.isRequired,
};

export default TaskListComponent;
