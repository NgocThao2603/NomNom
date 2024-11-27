import { Box, Grid } from '@mui/material';
import SortItem from './SortItem';
import { updatedDishes } from '../../HomePage';
import { Dish } from 'src/constants/data';
import CardItem from './CardItem';

export default function AllItem({ Item }: { Item?: Dish[] }) {
  return (
    <Box>
      {!Item ? (
        <Grid container spacing={2}>
          {updatedDishes.map((item, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <CardItem name={item.dish_name} price={item.price * 1000} img_url={item.img_url} average_rating={item.average_rating} distance={item.distance ? item.distance : 0} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <SortItem Item={Item} />
      )}
    </Box>
  );
}
