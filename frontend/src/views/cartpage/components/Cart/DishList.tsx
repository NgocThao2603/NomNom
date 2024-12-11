import { useTranslation } from 'react-i18next';
import { Grid, Box } from '@mui/material';
import DishItem from './DishItem';

type DishListProps = {
  dishes: any[];
  counts: { [id: number]: number };
  selectedDishes: { [id: number]: boolean };
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onDelete: (id: number) => void;
  onCheckboxChange: (id: number) => void;
};

const boxStyle = {
  padding: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
};

export default function DishList({ dishes, counts, selectedDishes, onIncrement, onDecrement, onDelete, onCheckboxChange }: DishListProps) {
  const { t, i18n } = useTranslation();
  return (
    <div>
      {/* Tiêu đề */}
      <Grid container sx={{ backgroundColor: 'rgb(76, 173, 211)', color: 'white', borderRadius: 2, fontWeight: 'bold', mt: 2, mb: 3 }}>
        <Grid item xs={4}>
          <Box sx={boxStyle}>{t('views.cartpage.components.cart.dishList.dish')}</Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={boxStyle}>{t('views.cartpage.components.cart.dishList.unitPrice')}</Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={boxStyle}>{t('views.cartpage.components.cart.dishList.quantity')}</Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={boxStyle}>{t('views.cartpage.components.cart.dishList.totalPrice')}</Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={boxStyle}>{t('views.cartpage.components.cart.dishList.action')}</Box>
        </Grid>
      </Grid>
      {dishes.map((dish) => (
        <DishItem
          key={dish.id}
          dish={dish}
          counts={counts}
          selectedDishes={selectedDishes}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onDelete={onDelete}
          onCheckboxChange={onCheckboxChange}
        />
      ))}
    </div>
  );
}
