import { Box, Grid } from '@mui/material';
import { da } from 'date-fns/locale';
import CardItem from 'src/components/CartItem/CardItem';
import AllItem from 'src/components/Items/AllItem';
import { useFavorite } from 'src/contexts/favorite-context/FavoriteContext';

export default function FavoritePage() {
  const items = useFavorite();
  return (
    <Box>
      {items.status === 'success' && Array.isArray(items.data) && (
        <Grid container spacing={2}>
          {items.data.map((item) => (
            <Grid item xs={6} sm={4} md={2.4} key={item.id}>
              <CardItem id={item.id} name={item.dish_name} price={item.price * 1000} img_url={item.img_url} average_rating={item.rating || ''} distance={String(item.distance || 0)} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
