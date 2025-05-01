import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  TextField,
  Button,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { getResumeReviews, createResumeReview } from '../../api/review';

const ResumeReviewPage = () => {
  const { resumeId } = useParams();
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.review);
  const [newReview, setNewReview] = useState({
    comments: [],
    overallRating: 0,
    currentComment: ''
  });

  useEffect(() => {
    dispatch(getResumeReviews(resumeId));
  }, [resumeId, dispatch]);

  const handleAddComment = () => {
    if (newReview.currentComment.trim()) {
      setNewReview(prev => ({
        ...prev,
        comments: [...prev.comments, {
          section: 'general',
          comment: prev.currentComment,
          suggestion: ''
        }],
        currentComment: ''
      }));
    }
  };

  const handleSubmitReview = () => {
    dispatch(createResumeReview(resumeId, {
      comments: newReview.comments,
      overall_rating: newReview.overallRating
    })).then(() => {
      setNewReview({
        comments: [],
        overallRating: 0,
        currentComment: ''
      });
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Resume Reviews
      </Typography>
      
      {/* Existing Reviews */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Previous Reviews
        </Typography>
        {reviews.length === 0 ? (
          <Typography>No reviews yet</Typography>
        ) : (
          reviews.map((review, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Rating value={review.overall_rating} readOnly />
                <List>
                  {review.comments.map((comment, idx) => (
                    <React.Fragment key={idx}>
                      <ListItem>
                        <ListItemText
                          primary={comment.comment}
                          secondary={comment.suggestion || 'No suggestion provided'}
                        />
                      </ListItem>
                      {idx < review.comments.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          ))
        )}
      </Box>

      {/* New Review Form */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Add Your Review
        </Typography>
        <Card>
          <CardContent>
            <Box sx={{ mb: 2 }}>
              <Typography component="legend">Overall Rating</Typography>
              <Rating
                value={newReview.overallRating}
                onChange={(e, newValue) => setNewReview(prev => ({
                  ...prev,
                  overallRating: newValue
                }))}
              />
            </Box>
            
            <TextField
              label="Your comment"
              multiline
              rows={4}
              fullWidth
              value={newReview.currentComment}
              onChange={(e) => setNewReview(prev => ({
                ...prev,
                currentComment: e.target.value
              }))}
              sx={{ mb: 2 }}
            />
            
            <Button 
              variant="contained" 
              onClick={handleAddComment}
              sx={{ mr: 2 }}
            >
              Add Comment
            </Button>
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Your comments:</Typography>
              <List dense>
                {newReview.comments.map((comment, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={comment.comment} />
                  </ListItem>
                ))}
              </List>
            </Box>
            
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitReview}
              disabled={newReview.comments.length === 0 || newReview.overallRating === 0}
              sx={{ mt: 2 }}
            >
              Submit Review
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ResumeReviewPage;