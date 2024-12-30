import { useTranslation } from 'react-i18next';
import { Box, Grid, Typography, Button } from '@mui/material';
import { Ordered_Dish } from '../OrderHistory';
import { useNavigate } from 'react-router-dom';

type DishItemProps = {
  dish: Ordered_Dish;
  onRate: (dish: Ordered_Dish) => void;
};

export default function DishItem({ dish, onRate }: DishItemProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const formatDateTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  return (
    <Grid container key={dish.dish_id} sx={{ boxShadow: 'inset 0px 0px 6px #D5D9D985, 0px 3px 6px #00000014', borderRadius: 2, mb: 3, height: '150px', display: 'flex', alignItems: 'center' }}>
      <Grid item xs={1.5}>
        <Box>
          <img src={dish.image} alt={dish.name} style={{ height: '150px', width: '150px', objectFit: 'cover', borderRadius: 8 }} />
        </Box>
      </Grid>
      <Grid item xs={2.5}>
        <Box onClick={() => navigate(`/dish-detail/${dish.dish_id}`)} sx={{ cursor: 'pointer' }}>
          <Typography variant="h6" ml={2}>
            {dish.name}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={2} sx={{ textAlign: 'center' }}>
        {((dish.total_price / dish.quantity) * 1000).toLocaleString()}
      </Grid>
      <Grid item xs={2} sx={{ textAlign: 'center' }}>
        <Box>{dish.quantity}</Box>
      </Grid>
      <Grid item xs={2} sx={{ textAlign: 'center' }}>
        <Box>{(dish.total_price * 1000).toLocaleString()} VNĐ</Box>
      </Grid>
      <Grid item xs={2} sx={{ textAlign: 'center' }}>
        <Button variant="contained" onClick={() => onRate(dish)} disabled={dish.rated == 1}>
          {dish.rated ? t('views.orderHistory.components.rated') : t('views.orderHistory.components.rate')}
        </Button>
        {dish.rated_at && dish.rated == 1 ? <Typography variant="body2">{formatDateTime(dish.rated_at)}</Typography> : <></>}
      </Grid>
    </Grid>
  );
}
