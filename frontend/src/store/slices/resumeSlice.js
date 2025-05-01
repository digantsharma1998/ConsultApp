import { createSlice } from '@reduxjs/toolkit';
import * as resumeAPI from '../../api/resume';
import { saveResume } from '../../api/resume';

const initialState = {
  templates: [],
  resumes: [],
  currentResume: null,
  reviews: [],
  loading: false,
  error: null,
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resumeAPI.getTemplates.pending, (state) => {
        state.loading = true;
      })
      .addCase(resumeAPI.getTemplates.fulfilled, (state, action) => {
        state.templates = action.payload;
        state.loading = false;
      })
      .addCase(resumeAPI.getTemplates.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(saveResume.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveResume.fulfilled, (state, action) => {
        state.loading = false;
        // Update or add the resume to state
        const index = state.resumes.findIndex(r => r.id === action.payload.id);
        if (index >= 0) {
          state.resumes[index] = action.payload;
        } else {
          state.resumes.push(action.payload);
        }
      })
      .addCase(saveResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      // Add similar cases for other API calls
  },
});



export default resumeSlice.reducer;