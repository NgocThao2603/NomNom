import { Box, Grid } from '@mui/material';
import CardItem from '../CartItem/CardItem';
import { Dish } from 'src/services/types';

export default function AllItem({ Item }: { Item: Dish[] }) {
  return (
    <Box>
      <Grid container spacing={2}>
        {Item.map((item) => (
          <Grid item xs={6} sm={4} md={2.4} key={item.id}>
            <CardItem name={item.dish_name} price={item.price * 1000} img_url={item.img_url} average_rating={item.average_rating} distance={item.distance} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
