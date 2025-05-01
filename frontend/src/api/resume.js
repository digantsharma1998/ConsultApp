import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:8000/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return{
        headers: {
            Authorization: token ? `Token ${token}` : '',
        },
    };
};

export const getTemplates = createAsyncThunk(
    'resume/getTemplates',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${API_URL}/templates/`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

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

export const saveResume = createAsyncThunk(
    'resume/saveResume',
    async (resumeData, { rejectWithValue }) => {
      try {
        const url = resumeData.id 
          ? `${API_URL}/resumes/${resumeData.id}/` 
          : `${API_URL}/resumes/`;
        
        const method = resumeData.id ? 'put' : 'post';
        
        const response = await axios[method](url, resumeData, getAuthHeaders());
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const selectTemplate = createAsyncThunk(
    'resume/selectTemplate',
    async (templateId, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${API_URL}/resumes/select-template/`,
          { template_id: templateId },
          getAuthHeaders()
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );