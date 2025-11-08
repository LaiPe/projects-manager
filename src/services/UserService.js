import { apiRequest } from "../utils/ApiRequest";

export const getUserById = async (userId) => {
    return await apiRequest(`/users/${userId}`, 'GET');
}