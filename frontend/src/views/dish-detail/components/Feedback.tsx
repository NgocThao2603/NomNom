import React from 'react';
import { Box, Typography, Rating, Paper } from '@mui/material';

interface FeedbackItem {
  id: number;
  rating: string;
  username: string;
  comment: string;
}

interface FeedbackProps {
  feedbackList: FeedbackItem[];
}

const Feedback: React.FC<FeedbackProps> = ({ feedbackList }) => {
  if (feedbackList.length === 0) {
    return <Typography variant="body2">No feedback available.</Typography>;
  }

  return (
    <Box sx={{ marginTop: 2, padding: 2 }}>
      {feedbackList.map((feedback) => (
        <Paper key={feedback.id} sx={{ padding: 4, marginBottom: 2 }}>
          <Typography sx={{ marginBottom: 2 }} variant="subtitle1" fontWeight="bold">
            {feedback.username}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            <Rating value={parseFloat(feedback.rating)} readOnly precision={0.5} />
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
