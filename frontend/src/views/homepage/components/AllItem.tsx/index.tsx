import { Box, Grid } from '@mui/material';
import CardItem from './CardItem';

const dataFake = [
  {
    name: 'Pizza',
    price: 5000,
    image: '/public/img/pizza.jpg',
  },
  {
    name: 'Burger',
    price: 3000,
    image: '/public/img/pizza.jpg',
  },
  {
    name: 'Coca',
    price: 1000,
    image: '/public/img/pizza.jpg',
  },
  {
    name: 'Fried Chicken',
    price: 7000,
    image: '/public/img/pizza.jpg',
  },
  {
    name: 'Hotdog',
    price: 2000,
    image: '/public/img/pizza.jpg',
  },
  {
    name: 'Noodle',
    price: 4000,
    image: '/public/img/pizza.jpg',
  },
  {
    name: 'Pasta',
    price: 6000,
    image: '/public/img/pizza.jpg',
  },
  {
    name: 'Sandwich',
    price: 2500,
    image: '/public/img/pizza.jpg',
  },
  {
    name: 'Sushi',
    price: 8000,
    image: '/public/img/pizza.jpg',
  },
  {
    name: 'Taco',
    price: 1500,
    image: '/public/img/pizza.jpg',
  },
];
export default function AllItem() {
  return (
    <Box>
      <Grid container spacing={2}>
        {dataFake.map((item, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <CardItem name={item.name} price={item.price} image={item.image} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
