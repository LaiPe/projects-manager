import {ListProvider, useListContext } from '../../contexts/ListContext';

import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';

function TaskList({ tasks=[], onError , modifyMode=false}) {
    return (
        <div>
            <h2>Liste des tâches</h2>
            <ListProvider initialItems={tasks}>
                <TaskListContent onError={onError} modifyMode={modifyMode} />
            </ListProvider>
        </div>
    );
}


function TaskListContent({onError, modifyMode}) {
    const tasks = useListContext();
    return (
        <ul>
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onError={onError}
                    modifyMode={modifyMode}
                />
            ))}
            { modifyMode && <AddTaskForm onError={onError} /> }
        </ul>
    );
}

export default TaskList;