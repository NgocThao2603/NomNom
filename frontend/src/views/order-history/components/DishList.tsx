import { useTranslation } from 'react-i18next';
import { Grid, Box } from '@mui/material';
import DishItem from './DishItem';
import { useModalContext } from 'src/contexts/modal-context/modal-context';
import RateModal from './RateModal';
import { Ordered_Dish, Ordered_Dish_With_Status } from '../OrderHistory';
import { IconSpinLoading } from 'src/assets/icon';

type DishListProps = {
  dishes: Ordered_Dish_With_Status;
  onRate: (id: number, rating: number, comment: string) => void;
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
    onRate(dish.dish_id, rating, comment);
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
      {dishes.status == 'fetching' && <IconSpinLoading sx={{ fontSize: '100px', textAlign: 'center', mt: 10 }} />}
      {dishes.status == 'success' && dishes.data.length == 0 && <Box sx={{ width: '100%', textAlign: 'center', mt: 5 }}>{t('views.orderHistory.orderHistoryPage.noOrder')}</Box>}
      {dishes.status == 'success' && dishes.data.filter((dish) => dish.rated == 0).map((dish) => <DishItem key={dish.dish_id} dish={dish} onRate={handleOpenModal} />)}
      {dishes.status == 'success' && dishes.data.filter((dish) => dish.rated === 1).map((dish) => <DishItem key={dish.dish_id} dish={dish} onRate={handleOpenModal} />)}
    </Box>
  );
}
