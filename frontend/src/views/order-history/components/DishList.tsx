import { useTranslation } from 'react-i18next';
import { Grid, Box } from '@mui/material';
import DishItem from './DishItem';
import { useModalContext } from 'src/contexts/modal-context/modal-context';
import RateModal from './RateModal';
import { Ordered_Dish } from '../OrderHistory';

type DishListProps = {
  dishes: Ordered_Dish[];
  onRate: (id: number, dish_id: number, rating: number, comment: string) => void;
};

const boxStyle = {
  padding: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
};

export default function DishList({ dishes, onRate }: DishListProps) {
  const { t, i18n } = useTranslation();
  const { openModal } = useModalContext();

  const handleOpenModal = (dish: Ordered_Dish) => {
    openModal(`${dish.name}`, <RateModal onSubmit={(rating, comment) => handleSubmit(dish, rating, comment)} />, { maxWidth: 'xs' });
  };

  const handleSubmit = (dish: Ordered_Dish, rating: number, comment: string) => {
    onRate(dish.order_id, dish.dish_id, rating, comment);
  };

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
        <DishItem key={dish.dish_id} dish={dish} onRate={handleOpenModal} />
      ))}
    </Box>
  );
}
