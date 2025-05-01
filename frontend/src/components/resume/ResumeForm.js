import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Chip,
  IconButton,
  Paper
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { saveResume } from '../../api/resume';

const ResumeForm = ({ resumeData, onChange }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: []
  });
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.resume);

  // Initialize form with existing resume data
  useEffect(() => {
    if (resumeData) {
      setFormData(resumeData);
    }
  }, [resumeData]);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value
      }
    }));
  };

  const handleAddExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now(),
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: ''
        }
      ]
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index][field] = value;
    setFormData(prev => ({
      ...prev,
      experience: updatedExperience
    }));
  };

  const handleRemoveExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  // Similar handlers for education, skills, projects
  const handleAddEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          institution: '',
          degree: '',
          fieldOfStudy: '',
          startDate: '',
          endDate: ''
        }
      ]
    }));
  };

  const handleAddSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now(), name: '', level: 'Intermediate' }]
    }));
  };

  const handleSubmit = () => {
    dispatch(saveResume(formData))
      .unwrap()
      .then(() => {
        // Handle success (maybe show notification)
      })
      .catch((error) => {
        // Handle error
      });
  };

  const steps = [
    'Personal Information',
    'Work Experience',
    'Education',
    'Skills',
    'Projects'
  ];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.personalInfo.firstName}
              onChange={handlePersonalInfoChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.personalInfo.lastName}
              onChange={handlePersonalInfoChange}
              margin="normal"
            />
            {/* Add other personal info fields */}
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddExperience}
              variant="outlined"
              sx={{ mb: 2 }}
            >
              Add Experience
            </Button>
            
            {formData.experience.map((exp, index) => (
              <Paper key={exp.id} elevation={2} sx={{ p: 2, mb: 2 }}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">Experience #{index + 1}</Typography>
                  <IconButton onClick={() => handleRemoveExperience(index)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
                <TextField
                  fullWidth
                  label="Company"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Position"
                  value={exp.position}
                  onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                  margin="normal"
                />
                {/* Add other experience fields */}
              </Paper>
            ))}
          </Box>
        );
      // Cases for other steps
      default:
        return 'Unknown step';
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Divider sx={{ my: 3 }} />
      
      {getStepContent(activeStep)}
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
        >
          Back
        </Button>
        
        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={handleSubmit}
            startIcon={<SaveIcon />}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Resume'}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleNext}
            endIcon={<ArrowForwardIcon />}
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ResumeForm;