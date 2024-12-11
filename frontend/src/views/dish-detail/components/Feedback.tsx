import React from 'react';
import { Box, Typography, Rating, Paper } from '@mui/material';

interface FeedbackItem {
  rating: number | null;
  comment: string | null;
}

interface FeedbackProps {
  feedbackList: FeedbackItem[];
}

const Feedback: React.FC<FeedbackProps> = ({ feedbackList }) => {
  const validFeedbackList = feedbackList.filter((feedback) => feedback.rating !== null && feedback.comment !== null);

  if (validFeedbackList.length === 0) {
    return null;
  }

  return (
    <Box sx={{ marginTop: 2, padding: 2 }}>
      {validFeedbackList.map((feedback, index) => (
        <Paper key={index} sx={{ padding: 4, marginBottom: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Thao Thao
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            <Rating value={feedback.rating} readOnly precision={0.5} />
            <Typography variant="body2" sx={{ marginLeft: 1 }}>
              {feedback.rating} / 5
            </Typography>
          </Box>
          <Typography variant="body2">{feedback.comment}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default Feedback;
