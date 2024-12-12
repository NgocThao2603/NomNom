import { useTranslation } from 'react-i18next';
import { Box, Grid, Typography, Button, Checkbox } from '@mui/material';

type DishItemProps = {
  dish: { id: number; dish_name: string; price: number; calories: string; desrip: string; img_url: string; quantity: number };
  counts: { [id: number]: number };
  selectedDishes: { [id: number]: boolean };
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onDelete: (id: number) => void;
  onCheckboxChange: (id: number) => void;
};

export default function DishItem({ dish, counts, selectedDishes, onIncrement, onDecrement, onDelete, onCheckboxChange }: DishItemProps) {
  const { t, i18n } = useTranslation();
  return (
    <Grid container key={dish.id} sx={{ boxShadow: 'inset 0px 0px 6px #D5D9D985, 0px 3px 6px #00000014', borderRadius: 2, mb: 3 }}>
      <Grid item xs={2}>
        <Box
          sx={{ position: 'relative', width: '100%', paddingTop: '100%', overflow: 'hidden', borderRadius: 2, cursor: 'pointer' }}
          onClick={() => (window.location.href = `/dish-detail/${dish.id}`)}
        >
          <Box
            component="img"
            sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            src={dish.img_url}
            alt={dish.dish_name}
            onDragStart={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
          />
        </Box>
      </Grid>
      <Grid item xs={2} sx={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', textAlign: 'center', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.5em', height: '3em' }}
        >
          {dish.dish_name}
        </Typography>
        <Typography variant="body2">Calories: {dish.calories} Kcal</Typography>
        <Typography
          variant="body2"
          sx={{ textAlign: 'justify', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '1.5em', height: '6em' }}
        >
          {dish.desrip}
        </Typography>
      </Grid>
      <Grid item xs={2} sx={{ padding: '10px', textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>{(dish.price * 1000).toLocaleString()} VNĐ</Box>
      </Grid>
      <Grid item xs={2}>
        <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Button variant="outlined" sx={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }} onClick={() => onDecrement(dish.id)}>
            -
          </Button>
          <Typography variant="h6" sx={{ margin: '0 10px' }}>
            {counts[dish.id] || 0}
          </Typography>
          <Button variant="outlined" sx={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }} onClick={() => onIncrement(dish.id)}>
            +
          </Button>
        </Box>
      </Grid>
      <Grid item xs={2} sx={{ padding: '10px', textAlign: 'center' }}>
        <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>{((counts[dish.id] || 0) * dish.price * 1000).toLocaleString()} VNĐ</Box>
      </Grid>
      <Grid item xs={2} sx={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <Button variant="contained" color="error" onClick={() => onDelete(dish.id)}>
          {t('views.cartpage.components.cart.dishItem.delete')}
        </Button>
        <Checkbox checked={selectedDishes[dish.id] || false} onChange={() => onCheckboxChange(dish.id)} sx={{ position: 'absolute', top: 0, right: 0 }} />
      </Grid>
    </Grid>
  );
}
