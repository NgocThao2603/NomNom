import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

export default function CardItem({ name, price, image }: { name: string; price: number; image: string }) {
  return (
    <Card sx={{ maxWidth: 300, mt: 10 }}>
      <CardMedia sx={{ height: 140 }} image={image} title="pizza" />
      <CardContent sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography gutterBottom variant="body1" component="div">
            {price} VNĐ
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        <Button size="small" variant="contained">
          Show More
        </Button>
      </CardActions>
    </Card>
  );
}
