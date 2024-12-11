import { useTranslation } from 'react-i18next';
import { Box, Grid, Typography, Button } from '@mui/material';

type DishItemProps = {
  dish: { id: number; name: string; price: number; calories: string; description: string; image: string; quantity: number; confirmed: boolean };
  onConfirm: (id: number) => void;
};

export default function DishItem({ dish, onConfirm }: DishItemProps) {
  const { t, i18n } = useTranslation();
  return (
    <Grid container key={dish.id} sx={{ boxShadow: 'inset 0px 0px 6px #D5D9D985, 0px 3px 6px #00000014', borderRadius: 2, mb: 3 }}>
      <Grid item xs={2}>
        <Box sx={{ position: 'relative', width: '100%', paddingTop: '100%', overflow: 'hidden', borderRadius: 2, cursor: 'pointer' }}>
          <Box
            component="img"
            sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            src={dish.image}
            alt={dish.name}
            onDragStart={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
          />
        </Box>
      </Grid>
      <Grid item xs={2} sx={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: '1.5em',
            height: '3em',
          }}
        >
          {dish.name}
        </Typography>
        <Typography variant="body2">{t('views.orderpage.components.order.dishItem.calories')} {dish.calories} Kcal</Typography>
        <Typography
          variant="body2"
          sx={{
            textAlign: 'justify',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '1.5em',
            height: '6em',
          }}
        >
          {dish.description}
        </Typography>
      </Grid>
      <Grid item xs={2} sx={{ padding: '10px', textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>{(dish.price * 1000).toLocaleString()}</Box>
      </Grid>
      <Grid item xs={2}>
        <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>{dish.quantity || 0}</Box>
      </Grid>
      <Grid item xs={2} sx={{ padding: '10px', textAlign: 'center' }}>
        <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>{((dish.quantity || 0) * dish.price * 1000).toLocaleString()} VNĐ</Box>
      </Grid>
      <Grid item xs={2} sx={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <Button variant="contained" onClick={() => onConfirm(dish.id)} disabled={dish.confirmed}>
          {dish.confirmed ? 'Confirmed' : 'Confirm'}
        </Button>
      </Grid>
    </Grid>
  );
}
