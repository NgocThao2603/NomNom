import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Snackbar, Alert } from '@mui/material';
import SearchAndFilter from './components/Search/SearchAndFilter';
import DishList from './components/Order/DishList';
import { getOrders, confirmOrder } from 'src/services/index';

type Dish = {
  id: number;
  name: string;
  calories: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  confirmed: boolean;
};

export default function OrderPage() {
  const { t, i18n } = useTranslation();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await getOrders();
        const fetchedDishes = response.data.orders[0].map((dish: any) => ({
          ...dish,
          confirmed: dish.confirmed === 1,
        }));
        setDishes(fetchedDishes);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    fetchDishes();
  }, []);

  const handleConfirm = async (id: number | null = null) => {
    try {
      const orderIds = id ? [id] : dishes.map((dish) => dish.id);
      await confirmOrder(orderIds);
      setDishes((prevDishes) => {
        const updatedDishes = prevDishes.map((dish) => (orderIds.includes(dish.id) ? { ...dish, confirmed: true } : dish));
        const allConfirmed = updatedDishes.every((dish) => dish.confirmed);
        if (allConfirmed) {
          setOpen(true);
        }
        return updatedDishes;
      });
    } catch (error) {
      console.error('Error confirming dishes:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <SearchAndFilter />
      <DishList dishes={dishes} onConfirm={handleConfirm} onConfirmAll={() => handleConfirm()} />
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{
            width: '100%',
            backgroundColor: 'green',
            color: 'white',
            boxShadow: 2,
            borderRadius: 1,
          }}
        >
          {t('views.orderpage.orderPage.alert')}
        </Alert>
      </Snackbar>
    </Box>
  );
}
