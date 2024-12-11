import { useState, useEffect } from 'react';
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
  const { updateTotalDishes, decrementDishCount } = useCartContext();

  const [dishes, setDishes] = useState<CartItem[]>([]);
  const [counts, setCounts] = useState<{ [key: number]: number }>({});
  const [selectedDishes, setSelectedDishes] = useState<{ [id: number]: boolean }>({});
  const [total, setTotal] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch dishes data
  useEffect(() => {
    setLoading(true);
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
      .catch((error) => console.error('Error fetching dishes:', error))
      .finally(() => setLoading(false));
  }, []);

  // Calculate total price
  useEffect(() => {
    const newTotal = dishes.reduce((acc, dish) => (selectedDishes[dish.id] ? acc + (counts[dish.id] || 0) * dish.price : acc), 0);
    setTotal(newTotal);
  }, [counts, selectedDishes, dishes]);

  // Handlers
  const handleIncrement = (id: number) => {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleDecrement = (id: number) => {
    setCounts((prev) => {
      const updatedCounts = { ...prev, [id]: Math.max(0, (prev[id] || 0) - 1) };
      if (updatedCounts[id] === 0) {
        setSelectedDishes((prevSelected) => ({ ...prevSelected, [id]: false }));
      }
      return updatedCounts;
    });
  };
  const deleteDishesFromCart = async (dishIds: number[]) => {
    try {
      setLoading(true);

      // Store the count of deleted dishes
      const deletedDishCount = dishIds.reduce((count, id) => count + (counts[id] || 0), 0);

      // Perform the deletion for each dish
      await Promise.all(dishIds.map((id) => axios.delete(`http://localhost:5000/cart?user_id=1&dish_id=${id}`)));

      // Remove deleted dishes from state
      setCounts((prev) => Object.fromEntries(Object.entries(prev).filter(([id]) => !dishIds.includes(Number(id)))));
      setDishes((prev) => prev.filter((dish) => !dishIds.includes(dish.id)));
      setSelectedDishes({});

      // Update the cart count after deleting multiple items
      decrementDishCount(deletedDishCount); // Pass the count of deleted dishes
    } catch (error) {
      console.error('Error deleting dishes from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteDishesFromCart([id]);
  };

  const handleDeleteSelected = async () => {
    const selectedIds = Object.entries(selectedDishes)
      .filter(([id, isSelected]) => isSelected)
      .map(([id]) => Number(id));

    if (selectedIds.length > 0) {
      await deleteDishesFromCart(selectedIds);
    }
  };

  const handleCheckboxChange = (id: number) => {
    if ((counts[id] || 0) > 0) {
      setSelectedDishes((prev) => ({ ...prev, [id]: !prev[id] }));
    }
  };

  const handleSelectAll = () => {
    setSelectedDishes((prev) => {
      const allSelected = dishes.reduce((acc, dish) => {
        if (counts[dish.id] > 0) {
          acc[dish.id] = true;
        }
        return acc;
      }, {} as { [id: number]: boolean });
      return allSelected;
    });
  };

  const handleUnselect = () => {
    setSelectedDishes({});
  };

  const handleCheckout = async () => {
    const selectedItems = dishes.filter((dish) => selectedDishes[dish.id]);

    if (selectedItems.length === 0) {
      setOpenSnackbar(true);
    } else {
      const dishIds = selectedItems.map((dish) => dish.id);
      try {
        const response = await axios.post('http://localhost:5000/order/place', {
          user_id: 1,
          dish_ids: dishIds,
        });
        console.log('API Response:', response);

        if (response.status === 200 && response.data.message === 'All orders placed successfully') {
          updateTotalDishes(0);
          navigate('/order');
        } else {
          console.error('Unexpected response message:', response.data.message);
        }
      } catch (error) {
        console.error('Error placing order:', error);
      }
    }
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Box sx={{ padding: 3 }}>
      <SearchAndFilter />
      {loading ? (
        <Box sx={{ textAlign: 'center' }}>Đang tải...</Box>
      ) : (
        <>
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
        </>
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
