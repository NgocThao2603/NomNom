import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

export default function CardItem() {
  return (
    <Card sx={{ maxWidth: 345, mt: 10 }}>
      <CardMedia sx={{ height: 140 }} image="/public/img/pizza.jpg" title="pizza" />
      <CardContent sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography gutterBottom variant="body1" component="div" sx={{ fontWeight: 400 }}>
            Title
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            Pizza
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography gutterBottom variant="body1" component="div" sx={{ fontWeight: 400 }}>
            Price
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            $50
          </Typography>
        </Box>
        {/* <Typography gutterBottom variant="h5" component="div">
          Pizza
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
        </Typography> */}
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        <Button size="small" variant="contained">
          Show More
        </Button>
      </CardActions>
    </Card>
  );
}
