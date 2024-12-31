import { useTranslation } from 'react-i18next';
import { useState, useEffect, useCallback } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import SearchAndFilter from './components/Search/SearchAndFilter';
import DishList from './components/Cart/DishList';
import CartSummary from './components/Cart/CartSummary';
import { useNavigate } from 'react-router-dom';
import { CartItem } from 'src/services/types';
import { useCartContext } from 'src/contexts/cart-context/CartContext';
import { getCart, placeOrder, deleteCartItem } from 'src/services/index';

export default function OrderPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { updateTotalDishes, decrementDishCount } = useCartContext();

  const [dishes, setDishes] = useState<CartItem[]>([]);
  const [counts, setCounts] = useState<{ [key: number]: number }>({});
  const [selectedDishes, setSelectedDishes] = useState<{ [id: number]: boolean }>({});
  const [total, setTotal] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCart()
      .then((fetchedDishes: CartItem[]) => {
        setDishes(fetchedDishes);
        const initialCounts = Object.fromEntries(fetchedDishes.map((dish: CartItem) => [dish.id, dish.quantity]));
        setCounts(initialCounts);
      })
      .catch((error) => console.error('Error fetching dishes:', error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const newTotal = dishes.reduce((acc, dish) => (selectedDishes[dish.id] ? acc + (counts[dish.id] || 0) * dish.price : acc), 0);
    setTotal(newTotal);
  }, [counts, selectedDishes, dishes]);

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

  const deleteDishesFromCart = async (dishIds: number[]) => {
    try {
      await Promise.all(dishIds.map((id) => deleteCartItem(id)));
      const deletedDishCount = dishIds.reduce((count, id) => count + (counts[id] || 0), 0);
      setCounts((prev) => Object.fromEntries(Object.entries(prev).filter(([id]) => !dishIds.includes(Number(id)))));
      setDishes((prev) => prev.filter((dish) => !dishIds.includes(dish.id)));
      setSelectedDishes({});
      decrementDishCount(deletedDishCount);
    } catch (error) {
      console.error('Error deleting dishes from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = useCallback(
    async (id: number) => {
      await deleteDishesFromCart([id]);
    },
    [counts]
  );

  const handleDeleteSelected = useCallback(async () => {
    const selectedIds = Object.entries(selectedDishes)
      .filter(([id, isSelected]) => isSelected)
      .map(([id]) => Number(id));

    if (selectedIds.length > 0) {
      await deleteDishesFromCart(selectedIds);
    }
  }, [selectedDishes]);

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
      const quantities = dishIds.map((id) => counts[id]); // Tạo mảng quantities từ counts

      try {
        await placeOrder(dishIds, quantities); // Truyền hai mảng dishIds và quantities
        updateTotalDishes(0); // Cập nhật lại số lượng món ăn trong giỏ hàng
        navigate('/order'); // Chuyển hướng đến trang đặt hàng
      } catch (error) {
        console.error('Error placing order:', error); // Hiển thị lỗi nếu có
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
            <Box sx={{ padding: 2, textAlign: 'center', color: 'gray' }}>{t('views.cartpage.cartPage.noItem')}</Box>
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
          {t('views.cartpage.cartPage.alert')}
        </Alert>
      </Snackbar>
    </Box>
  );
}
