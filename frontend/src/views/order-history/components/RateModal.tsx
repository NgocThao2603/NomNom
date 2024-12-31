import React, { useState } from 'react';
import { Box, Button, TextField, Rating } from '@mui/material';
import { useModalContext } from 'src/contexts/modal-context/modal-context';
import { useTranslation } from 'react-i18next';

export default function RateModal({ onSubmit }: { onSubmit: (rating: number, comment: string) => void }) {
  const { t, i18n } = useTranslation();
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState('');
  const { closeModal } = useModalContext();

  async function handleSubmit() {
    if (rating !== null) {
      onSubmit(rating, comment);
      closeModal();
    }
  }

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Rating
          name="rate"
          size="large"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </Box>
      <TextField variant="filled" label={t('views.orderHistory.components.comment')} multiline value={comment} onChange={(e) => setComment(e.target.value)} fullWidth />
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button variant="contained" onClick={handleSubmit} disabled={Boolean(!rating)}>
          {t('views.orderHistory.components.submit')}
        </Button>
      </Box>
    </Box>
  );
}
