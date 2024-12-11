import { useState, useEffect, useCallback } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import SearchAndFilter from './components/Search/SearchAndFilter';
import DishList from './components/Cart/DishList';
import CartSummary from './components/Cart/CartSummary';
import { useNavigate } from 'react-router-dom';
import { CartItem } from 'src/services/types';
import { useCartContext } from 'src/contexts/cart-context/CartContext';
import axios from 'axios';

export default function OrderPage() {
  const navigate = useNavigate();
  const { decrementDishCount } = useCartContext();

  const [dishes, setDishes] = useState<CartItem[]>([]);
  const [counts, setCounts] = useState<{ [key: number]: number }>({});
  const [selectedDishes, setSelectedDishes] = useState<{ [id: number]: boolean }>({});
  const [total, setTotal] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Fetch dishes data
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

        // Set initial counts
        const initialCounts = Object.fromEntries(formattedDishes.map((dish) => [dish.id, dish.quantity]));
        setCounts(initialCounts);
      })
      .catch((error) => console.error('Error fetching dishes:', error));
  }, []);

  // Calculate total price
  useEffect(() => {
    const newTotal = dishes.reduce((acc, dish) => (selectedDishes[dish.id] ? acc + (counts[dish.id] || 0) * dish.price : acc), 0);
    setTotal(newTotal);
  }, [counts, selectedDishes, dishes]);

  // Handlers
  const handleIncrement = useCallback((id: number) => {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }, []);

  const handleDecrement = useCallback((id: number) => {
    setCounts((prev) => {
      const updatedCounts = { ...prev, [id]: Math.max(0, (prev[id] || 0) - 1) };
      if (updatedCounts[id] === 0) {
        setSelectedDishes((prevSelected) => ({ ...prevSelected, [id]: false }));
      }
      return updatedCounts;
    });
  }, []);

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        await axios.delete(`http://localhost:5000/cart?user_id=1&dish_id=${id}`);

        setCounts((prev) => {
          const { [id]: _, ...remainingCounts } = prev;
          return remainingCounts;
        });
        setDishes((prev) => prev.filter((dish) => dish.id !== id));

        decrementDishCount();
      } catch (error) {
        console.error('Error deleting dish from cart:', error);
      }
    },
    [decrementDishCount]
  );

  const handleCheckboxChange = useCallback(
    (id: number) => {
      if ((counts[id] || 0) > 0) {
        setSelectedDishes((prev) => ({ ...prev, [id]: !prev[id] }));
      }
    },
    [counts]
  );

  const handleSelectAll = useCallback(() => {
    setSelectedDishes((prev) => {
      const allSelected = dishes.reduce((acc, dish) => {
        if (counts[dish.id] > 0) {
          acc[dish.id] = true;
        }
        return acc;
      }, {} as { [id: number]: boolean });
      return allSelected;
    });
  }, [counts, dishes]);

  const handleUnselect = useCallback(() => {
    setSelectedDishes({});
  }, []);

  const handleDeleteSelected = useCallback(() => {
    const selectedIds = Object.entries(selectedDishes)
      .filter(([id, isSelected]) => isSelected)
      .map(([id]) => Number(id));
    setCounts((prev) => Object.fromEntries(Object.entries(prev).filter(([id]) => !selectedDishes[Number(id)])));
    setDishes((prev) => prev.filter((dish) => !selectedIds.includes(dish.id)));

    setSelectedDishes({});
  }, [selectedDishes]);

  const handleCheckout = useCallback(() => {
    const selectedItems = dishes.filter((dish) => selectedDishes[dish.id]);
    if (selectedItems.length === 0) {
      setOpenSnackbar(true);
    } else {
      navigate('/order', { state: { selectedItems } });
    }
  }, [selectedDishes, dishes, navigate]);

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
