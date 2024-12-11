import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import SearchAndFilter from './components/Search/SearchAndFilter';
import DishList from './components/Order/DishList';

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
  const location = useLocation();
  const { selectedItems } = location.state || {};

  const [dishes, setDishes] = useState<Dish[]>(selectedItems || []);

  const [open, setOpen] = useState(false);

  const handleConfirm = (id: number) => {
    setDishes((prevDishes) => {
      const updatedDishes = prevDishes.map((dish) => (dish.id === id ? { ...dish, confirmed: true } : dish));
      const allConfirmed = updatedDishes.every((dish) => dish.confirmed);
      if (allConfirmed) {
        setOpen(true);
      }
      return updatedDishes;
    });
  };

  const handleConfirmAll = () => {
    setDishes((prevDishes) => prevDishes.map((dish) => ({ ...dish, confirmed: true })));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <SearchAndFilter />
      <DishList dishes={dishes} onConfirm={handleConfirm} onConfirmAll={handleConfirmAll} />
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
          Đơn hàng đã hoàn tất!
        </Alert>
      </Snackbar>
    </Box>
  );
}
