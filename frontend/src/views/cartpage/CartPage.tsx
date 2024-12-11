import { useState, useEffect } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import SearchAndFilter from './components/Search/SearchAndFilter';
import DishList from './components/Cart/DishList';
import CartSummary from './components/Cart/CartSummary';
import { useNavigate } from 'react-router-dom';
import { CartItem } from 'src/services/types';
import axios from 'axios';

export default function OrderPage() {
  const navigate = useNavigate();
  const [dishes, setDishes] = useState<CartItem[]>([]);
  const [counts, setCounts] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    axios
      .get('http://localhost:5000/cart?user_id=1')
      .then((response) => {
        const fetchedDishes = response.data.data[0];
        const formattedDishes: CartItem[] = fetchedDishes.map((dish: any) => ({
          id: dish.id,
          name: dish.dish_name,
          calories: dish.calories,
          description: dish.desrip,
          price: dish.price,
          quantity: dish.quantity,
          image: dish.img_url,
        }));

        setDishes(formattedDishes);

        // Khởi tạo counts bằng giá trị quantity từ API
        const initialCounts = Object.fromEntries(formattedDishes.map((dish) => [dish.id, dish.quantity]));
        setCounts(initialCounts);
      })
      .catch((error) => {
        console.error('Error fetching dishes:', error);
      });
  }, []);

  const [selectedDishes, setSelectedDishes] = useState<{ [id: number]: boolean }>({});
  const [total, setTotal] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const calculateTotal = () =>
    dishes.reduce((total, dish) => {
      const dishCount = counts[dish.id] || 0;
      return selectedDishes[dish.id] ? total + dishCount * dish.price : total;
    }, 0);

  useEffect(() => {
    setTotal(calculateTotal());
  }, [counts, selectedDishes]);

  useEffect(() => {
    const initialCounts = Object.fromEntries(dishes.map((dish) => [dish.id, dish.quantity || 0]));
    setCounts(initialCounts);
  }, [dishes]);

  const handleIncrement = (id: number) => setCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

  const handleDecrement = (id: number) => {
    setCounts((prev) => {
      const newCounts = { ...prev, [id]: Math.max(0, (prev[id] || 0) - 1) };
      if (newCounts[id] === 0) {
        setSelectedDishes((prevSelected) => ({ ...prevSelected, [id]: false }));
      }
      return newCounts;
    });
  };

  const handleDelete = (id: number) => {
    setCounts((prev) => {
      const { [id]: _, ...remainingCounts } = prev;
      return remainingCounts;
    });
    setDishes((prev) => prev.filter((dish) => dish.id !== id));
  };

  const handleCheckboxChange = (id: number) => {
    if ((counts[id] || 0) > 0) {
      setSelectedDishes((prev) => ({ ...prev, [id]: !prev[id] }));
      console.log(selectedDishes);
    }
  };

  const handleSelectAll = () => setSelectedDishes(Object.fromEntries(dishes.map((dish) => [dish.id, (counts[dish.id] || 0) > 0])));

  const handleUnselect = () => setSelectedDishes({});

  const handleDeleteSelected = () => {
    const selectedIds = Object.keys(selectedDishes).map(Number);
    setCounts((prev) => Object.fromEntries(Object.entries(prev).filter(([id]) => !selectedDishes[Number(id)])));
    setDishes((prev) => prev.filter((dish) => !selectedIds.includes(dish.id)));
  };

  const handleCheckout = () => {
    const selectedItems = dishes.filter((dish) => selectedDishes[dish.id]);
    if (selectedItems.length === 0) {
      setOpenSnackbar(true);
    } else {
      navigate('/order', { state: { selectedItems } });
    }
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Box sx={{ padding: 3 }}>
      <SearchAndFilter />
      <DishList
        dishes={dishes}
        counts={counts}
        selectedDishes={selectedDishes}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onDelete={handleDelete}
        onCheckboxChange={handleCheckboxChange}
      />
      {dishes.length > 0 ? (
        <CartSummary total={total} onSelectAll={handleSelectAll} onUnselect={handleUnselect} onDeleteSelected={handleDeleteSelected} onCheckout={handleCheckout} />
      ) : (
        <Box sx={{ padding: 2, textAlign: 'center', color: 'gray' }}>Không có món ăn nào</Box>
      )}

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert
          onClose={handleCloseSnackbar}
          severity="warning"
          sx={{
            width: '100%',
            backgroundColor: 'orange',
            color: 'white',
            boxShadow: 2,
            borderRadius: 1,
          }}
        >
          Vui lòng chọn món trước khi thanh toán!
        </Alert>
      </Snackbar>
    </Box>
  );
}
