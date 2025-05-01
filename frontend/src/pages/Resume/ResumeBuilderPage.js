import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTemplates, getResumes } from '../../api/resume';
import { Container, Grid, Typography } from '@mui/material';
import ResumeForm from '../../components/resume/ResumeForm';
import TemplateSelector from '../../components/resume/TemplateSelector';

const ResumeBuilderPage = () => {
  const dispatch = useDispatch();
  const { templates, resumes, loading, error } = useSelector((state) => state.resume);

  useEffect(() => {
    dispatch(getTemplates());
    dispatch(getResumes());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Resume Builder
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TemplateSelector templates={templates} />
          <ResumeForm />
        </Grid>
        <Grid item xs={12} md={8}>
          {/* Resume Preview Component would go here */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ResumeBuilderPage;