import { useState, useEffect } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import SearchAndFilter from './components/Search/SearchAndFilter';
import DishList from './components/Cart/DishList';
import CartSummary from './components/Cart/CartSummary';
import { useNavigate } from 'react-router-dom';

export default function OrderPage() {
  const navigate = useNavigate();

  // State lưu danh sách món ăn
  const [dishes, setDishes] = useState([
    {
      id: 1,
      name: 'Bò tơ cuốn bánh tráng Bò tơ cuốn bánh tráng',
      calories: '200',
      description: 'Bò tơ cuốn bánh tráng cực ngon giòn rụm',
      price: 100000,
      quantity: 3,
      image: 'https://i.pinimg.com/736x/86/57/dd/8657dd9dbc90ecb2a74143340549e983.jpg',
    },
    {
      id: 2,
      name: 'Gà quay mật ong',
      calories: '250',
      description: 'Gà quay mật ong thơm lừng hấp dẫn ăn ngay!!! Gà quay mật ong thơm lừng hấp dẫn ăn ngay!!! Gà quay mật ong thơm lừng hấp dẫn ăn ngay!!!',
      price: 120000,
      quantity: 2,
      image: 'https://i.pinimg.com/736x/58/e3/03/58e303ed0cbdb8cc49cac96261a997b9.jpg',
    },
    {
      id: 3,
      name: 'Tôm chiên xù nhiều xù',
      calories: '180',
      description: 'Tôm chiên giòn rụm, chấm sốt mayonnaise',
      price: 90000,
      quantity: 1,
      image: 'https://i.pinimg.com/736x/9f/f0/df/9ff0dfd8c2b96b711301294120596695.jpg',
    },
  ]);

  // State lưu số lượng từng món ăn
  const [counts, setCounts] = useState<{ [id: number]: number }>({});
  // State lưu trạng thái chọn của từng món ăn
  const [selectedDishes, setSelectedDishes] = useState<{ [id: number]: boolean }>({});
  // State lưu tổng tiền giỏ hàng
  const [total, setTotal] = useState(0);

  // State để quản lý Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Hàm tính tổng tiền dựa trên các món đã chọn
  const calculateTotal = () =>
    dishes.reduce((total, dish) => {
      const dishCount = counts[dish.id] || 0;
      return selectedDishes[dish.id] ? total + dishCount * dish.price : total;
    }, 0);

  // Cập nhật tổng tiền khi số lượng hoặc trạng thái chọn thay đổi
  useEffect(() => {
    setTotal(calculateTotal());
  }, [counts, selectedDishes]);

  // Khởi tạo số lượng món ăn từ danh sách dishes
  useEffect(() => {
    const initialCounts = Object.fromEntries(dishes.map((dish) => [dish.id, dish.quantity || 0]));
    setCounts(initialCounts);
  }, [dishes]);

  // Hàm tăng số lượng món ăn
  const handleIncrement = (id: number) => setCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

  const handleDecrement = (id: number) => {
    setCounts((prev) => {
      const newCounts = { ...prev, [id]: Math.max(0, (prev[id] || 0) - 1) };

      // Nếu số lượng giảm về 0, bỏ chọn checkbox
      if (newCounts[id] === 0) {
        setSelectedDishes((prevSelected) => ({ ...prevSelected, [id]: false }));
      }

      return newCounts;
    });
  };

  // Hàm xóa món ăn khỏi danh sách
  const handleDelete = (id: number) => {
    setCounts((prev) => {
      const { [id]: _, ...remainingCounts } = prev; // Xóa key id
      return remainingCounts;
    });
    setDishes((prev) => prev.filter((dish) => dish.id !== id));
  };

  // Hàm thay đổi trạng thái checkbox, chỉ thay đổi nếu quantity > 0
  const handleCheckboxChange = (id: number) => {
    if ((counts[id] || 0) > 0) {
      setSelectedDishes((prev) => ({ ...prev, [id]: !prev[id] }));
      console.log(selectedDishes);
    }
  };

  // Hàm chọn tất cả món ăn
  const handleSelectAll = () => setSelectedDishes(Object.fromEntries(dishes.map((dish) => [dish.id, (counts[dish.id] || 0) > 0])));

  // Hàm bỏ chọn tất cả món ăn
  const handleUnselect = () => setSelectedDishes({});

  // Hàm xóa tất cả món ăn đã chọn
  const handleDeleteSelected = () => {
    const selectedIds = Object.keys(selectedDishes).map(Number);
    setCounts((prev) => Object.fromEntries(Object.entries(prev).filter(([id]) => !selectedDishes[Number(id)])));
    setDishes((prev) => prev.filter((dish) => !selectedIds.includes(dish.id)));
  };

  // Hàm checkout
  const handleCheckout = () => {
    const selectedItems = dishes.filter((dish) => selectedDishes[dish.id]);
    if (selectedItems.length === 0) {
      setOpenSnackbar(true); // Hiển thị Snackbar thay vì alert
    } else {
      navigate('/order', { state: { selectedItems } });
    }
  };

  // Đóng Snackbar
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
      {/* Kiểm tra nếu dishes rỗng, nếu có món ăn thì hiển thị CartSummary */}
      {dishes.length > 0 ? (
        <CartSummary total={total} onSelectAll={handleSelectAll} onUnselect={handleUnselect} onDeleteSelected={handleDeleteSelected} onCheckout={handleCheckout} />
      ) : (
        <Box sx={{ padding: 2, textAlign: 'center', color: 'gray' }}>Không có món ăn nào</Box>
      )}

      {/* Snackbar thông báo nếu không chọn món */}
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
