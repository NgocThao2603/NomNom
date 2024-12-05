import { Box, Grid, Typography } from '@mui/material';
import CardItem from '../CartItem/CardItem';
import { Dish, Item } from 'src/services/types';
import { IconSpinLoading } from 'src/assets/icon';

export default function AllItem({ Item }: { Item: Item }) {
  return (
    <Box>
      {(Item.status == 'fetching' || Item.status == 'idle') && <IconSpinLoading sx={{ fontSize: '100px', mt: 10 }} />}
      {Item.status == 'failed' && (
        <Typography variant="h6" sx={{ mt: 10, textAlign: 'center' }}>
          No data
        </Typography>
      )}
      {Item.status == 'success' && (
        <Grid container spacing={2}>
          {Item.data.map((item) => (
            <Grid item xs={6} sm={4} md={2.4} key={item.id}>
              <CardItem name={item.dish_name} price={item.price * 1000} img_url={item.img_url} average_rating={item.average_rating} distance={item.distance} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
