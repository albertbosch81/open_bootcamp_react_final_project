import React from 'react';
import TaskListContainer from './containers/taskListContainer';
// import Tasklist from './lists/TaskList';
// import Settings from './settings/Settings';

/**
 * Función Anónima para crear un Componente principal
 * @returns {React.Component} Componente principal de nuestra aplicación
 */
const App = () => {
    return (
      <div className='App'>
        <header className='App-header'>
          <TaskListContainer />
        </header>
      </div>
    );
};

export default App;
