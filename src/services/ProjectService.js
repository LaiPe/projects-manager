import { apiRequest } from '../utils/ApiRequest';


export const getUserProjects = async (userId) => {
    return await apiRequest(`/users/${userId}/projects`, 'GET');
};

export const createProject = async (projectData) => {
    return await apiRequest('/projects', 'POST', projectData);
};

export const updateProject = async (projectId, projectData) => {
    return await apiRequest(`/projects/${projectId}`, 'PATCH', projectData);
};

export const deleteProject = async (projectId) => {
    return await apiRequest(`/projects/${projectId}`, 'DELETE');
};
