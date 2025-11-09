import {ListProvider, useListContext } from '../../contexts/ListContext';

import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';

function TaskList({ tasks=[], onError , modifyMode=false}) {
    return (
        <div>
            <ListProvider initialItems={tasks}>
                <TaskListContent onError={onError} modifyMode={modifyMode} />
            </ListProvider>
        </div>
    );
}


function TaskListContent({onError, modifyMode}) {
    const tasks = useListContext();
    return (
        <>
            { !modifyMode && (
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h1 className="mb-1">Mes Tâches</h1>
                        <p className="text-muted mb-0">Gérez et suivez l'avancement de vos tâches</p>
                    </div>
                    {tasks.length > 0 && (
                        <span className="badge bg-primary fs-6">{tasks.length} tâche{tasks.length > 1 ? 's' : ''}</span>
                    )}
                </div>
            )}
            {tasks.length === 0 && (
                <div className="text-center py-5">
                    <i className="bi bi-clipboard-x text-muted" style={{fontSize: '3rem'}}></i>
                    <h5 className="text-muted mt-3">Aucune tâche pour ce projet</h5>
                    <p className="text-muted">Commencez par ajouter des tâches à ce projet.</p>
                </div>
            )}
            <ul className="list-group">
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
        </>
    );
}

export default TaskList;