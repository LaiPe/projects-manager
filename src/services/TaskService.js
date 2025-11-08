import { apiRequest } from "../utils/ApiRequest";


export const createTask = async (taskData) => {
    return await apiRequest('/tasks', 'POST', taskData);
}

export const updateTask = async (taskId, taskData) => {
    return await apiRequest(`/tasks/${taskId}`, 'PATCH', taskData);
}

export const updateTaskStatus = async (taskId, status) => {
    return await apiRequest(`/tasks/${taskId}/status`, 'PATCH', { status });
}

export const deleteTask = async (taskId) => {
    return await apiRequest(`/tasks/${taskId}`, 'DELETE');
}

export const getUserTasks = async (userId) => {
    return await apiRequest(`/users/${userId}/tasks`, 'GET');
}

export const getProjectTasks = async (projectId) => {
    return await apiRequest(`/projects/${projectId}/tasks`, 'GET');
}