import { useTranslation } from 'react-i18next';
import { Grid, Box, Button } from '@mui/material';
import DishItem from './DishItem';

type DishListProps = {
  dishes: any[];
  onConfirm: (id: number) => void;
  onConfirmAll: () => void;
};

const boxStyle = {
  padding: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
};

export default function DishList({ dishes, onConfirm, onConfirmAll }: DishListProps) {
  const { t, i18n } = useTranslation();
  return (
    <Box>
      {/* Tiêu đề */}
      <Grid container sx={{ backgroundColor: 'rgb(76, 173, 211)', color: 'white', borderRadius: 2, fontWeight: 'bold', mt: 2, mb: 3 }}>
        <Grid item xs={4}>
          <Box sx={boxStyle}>{t('views.orderpage.components.order.dishList.dish')}</Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={boxStyle}>{t('views.orderpage.components.order.dishList.unitPrice')}</Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={boxStyle}>{t('views.orderpage.components.order.dishList.quantity')}</Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={boxStyle}>{t('views.orderpage.components.order.dishList.totalPrice')}</Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={boxStyle}>{t('views.orderpage.components.order.dishList.action')}</Box>
        </Grid>
      </Grid>
      {dishes.map((dish) => (
        <DishItem key={dish.id} dish={dish} onConfirm={onConfirm} />
      ))}

      {/* Button Confirm All */}
      <Box sx={{ paddingTop: 2, textAlign: 'center' }}>
        <Button variant="contained" color="primary" onClick={onConfirmAll} disabled={dishes.every((dish) => dish.confirmed)}>
        {t('views.orderpage.components.order.dishList.confirmAll')}
        </Button>
      </Box>
    </Box>
  );
}
