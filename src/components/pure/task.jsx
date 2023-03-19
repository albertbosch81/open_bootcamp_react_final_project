import React from 'react';
import PropTypes from 'prop-types';
import { Task } from '../../models/task.class';

const TaskComponent = ({ task, remove, complete }) => {

    return (
        <tr className={task.completed ? 'task-completed fw-normal': 'task-incompleted fw-normal'}>
            <th>
                <span className='ms-2'>{task.name}</span>
            </th>
            <td>
                <span className='align-middle'>{task.description}</span>
            </td>
            <td>
                {
                    task.completed ? 
                        <i className='bi-toggle-on task-action me-3' style={{color: 'lightgreen', fontSize: '30px'}} onClick={() => complete(task.name, false)}></i>
                    : 
                        <i className='bi-toggle-off task-action me-3' style={{color: 'red', fontSize: '30px'}} onClick={() => complete(task.name, true)}></i>
                }

                <button className='btn btn-danger mx-2' onClick={() => {remove(task)}}>Delete</button>
            </td>

        </tr>
    );
};


TaskComponent.propTypes = {
    task: PropTypes.instanceOf(Task),
    remove: PropTypes.func.isRequired,
    complete: PropTypes.func.isRequired,
};


export default TaskComponent;
