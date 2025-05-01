import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
  Chip
} from '@mui/material';
import { Preview, CheckCircle } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getTemplates, selectTemplate } from '../../api/resume';

const TemplateSelector = ({ onSelect }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const dispatch = useDispatch();
  const { templates, loading } = useSelector((state) => state.resume);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(getTemplates());
  }, [dispatch]);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    if (onSelect) {
      onSelect(template);
    }
  };

  const handleConfirmSelection = () => {
    if (selectedTemplate) {
      dispatch(selectTemplate(selectedTemplate.id));
      setPreviewOpen(false);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Choose a Template
      </Typography>
      
      {loading ? (
        <Typography>Loading templates...</Typography>
      ) : (
        <Grid container spacing={2}>
          {templates.map((template) => (
            <Grid item xs={12} sm={6} md={4} key={template.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  border: selectedTemplate?.id === template.id 
                    ? `2px solid ${theme.palette.primary.main}`
                    : '2px solid transparent'
                }}
              >
                <CardActionArea
                  onClick={() => handleTemplateSelect(template)}
                  sx={{ height: '100%' }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={template.thumbnail}
                    alt={template.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="subtitle1">
                      {template.name}
                      {selectedTemplate?.id === template.id && (
                        <CheckCircle 
                          color="primary" 
                          sx={{ ml: 1, verticalAlign: 'middle' }} 
                        />
                      )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {template.is_premium ? 'Premium Template' : 'Free Template'}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Button
                  fullWidth
                  startIcon={<Preview />}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTemplate(template);
                    setPreviewOpen(true);
                  }}
                  size="small"
                  sx={{ mt: 1 }}
                >
                  Preview
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Template Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>
          {selectedTemplate?.name} - Preview
          {selectedTemplate?.is_premium && (
            <Chip 
              label="Premium" 
              color="primary" 
              size="small" 
              sx={{ ml: 2 }} 
            />
          )}
        </DialogTitle>
        <DialogContent dividers>
          <Box
            dangerouslySetInnerHTML={{ __html: selectedTemplate?.html_content }}
            sx={{
              transform: 'scale(0.8)',
              transformOrigin: 'top left',
              width: '125%',
              pointerEvents: 'none'
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleConfirmSelection}
            disabled={!selectedTemplate}
          >
            Select Template
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TemplateSelector;