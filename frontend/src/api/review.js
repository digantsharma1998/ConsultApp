import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = process.env.REACT_APP_API_URL;

export const getResumeReviews = createAsyncThunk(
  'review/getResumeReviews',
  async (resumeId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/resumes/${resumeId}/reviews/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createResumeReview = createAsyncThunk(
  'review/createResumeReview',
  async ({ resumeId, reviewData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/resumes/${resumeId}/reviews/create/`,
        reviewData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);