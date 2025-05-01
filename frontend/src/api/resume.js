import axios from "axios";

const API_URL = 'http://localhost:8000/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return{
        headers: {
            Authorization: token ? `Token ${token}` : '',
        },
    };
};

export const getTemplates = async () => {
    try{
        const response = await axios.get(`${API_URL}/templates/`);
        return response.data;
    } catch(error){
        throw error.response.data;
    }
};

export const getResumes = async () => {
    try{
        const response = await axios.get(`${API_URL}/resumes/`, getAuthHeaders());
        return response.data;
    } catch(error){
        throw error.response.data;
    }
};

export const createResume = async (resumeData) => {
    try{
        const response = await axios.post(
            `${API_URL}/resumes/`,
            resumeData,
            getAuthHeaders()
        );
        return response.data;
    } catch(error){
        throw error.response.data;
    }
};

export const updateResume = async (id, resumeData) => {
    try{
        const response = await axios.put(
            `${API_URL}/resumes/${id}/`,
            resumeData,
            getAuthHeaders()
        );
        return response.data;
    } catch(error){
        throw error.response.data;
    }
};

export const deleteResume = async (id) => {
    try{
        await axios.delete(`${API_URL}/resumes/${id}/`, getAuthHeaders());
    } catch(error){
        throw error.response.data;
    }
};

export const getResumeReviews = async (resumeId) => {
    try{
        const response = await axios.get(
            `${API_URL}/resumes/${resumeId}/reviews/`,
            getAuthHeaders()
        );
        return response.data;
    } catch(error){
        throw error.response.data;
    }
};

export const createResumeReview = async (resumeId, reviewData) => {
    try{
        const response = await axios.post(
            `${API_URL}/resumes/${resumeId}/reviews/create/`,
            reviewData,
            getAuthHeaders()
        );
        return response.data;
    } catch(error){
        throw error.response.data;
    }
};