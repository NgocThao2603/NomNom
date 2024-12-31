import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardMedia, Button, IconButton, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { formatNumber } from 'src/utils/format';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import { useCartContext } from 'src/contexts/cart-context/CartContext';
import { addDishToCart, addDishToFavorite, deleteDishFavorite } from 'src/services/index';
import { useAuth } from '../../../contexts/AuthContext';

interface DetailProps {
  id: number;
  image: string;
  name: string;
  average_rating: number;
  calories: number;
  price: number;
  address: string;
  description: string;
  favorite: boolean;
}

const Detail: React.FC<DetailProps> = ({ id, image, name, average_rating, calories, price, address, description, favorite }) => {
  const { t, i18n } = useTranslation();
  const [quantity, setQuantity] = useState<number>(1);
  const [tempInput, setTempInput] = useState<string>('1');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { loggedIn } = useAuth();
  const [isFavorited, setIsFavorited] = useState<boolean>(favorite);

  const navigate = useNavigate();
  console.log('aaa');

  // const handleFavoriteToggle = async () => {
  //   try {
  //     await addDishToFavorite('1', id.toString());
  //     setIsFavorited(!favorite);
  //   } catch (error) {
  //     console.error('Error adding to favorite:', error);
  //   }
  const { updateTotalDishes } = useCartContext();

  const handleFavoriteToggle = async () => {
    if (!loggedIn) {
      navigate('/login');
      return;
    }
    try {
      if (isFavorited) {
        await deleteDishFavorite(id.toString());
      } else {
        await addDishToFavorite(id.toString());
      }
      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const increaseQuantity = () => {
    setQuantity((prev) => {
      const newQuantity = prev < 99 ? prev + 1 : prev;
      setTempInput(newQuantity.toString());
      return newQuantity;
    });
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => {
      const newQuantity = prev > 1 ? prev - 1 : prev;
      setTempInput(newQuantity.toString());
      return newQuantity;
    });
  };

  const addToCart = async () => {
    if (!loggedIn) {
      navigate('/login');
      return;
    }
    try {
      const response = await addDishToCart(id, quantity);
      const totalDishes = response.data.totalDish[0]?.[0]?.total_dishes;
      updateTotalDishes(totalDishes);
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleOpenDialog = () => {
    if (!loggedIn) {
      navigate('/login');
      return;
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmBuyNow = async () => {
    if (!loggedIn) {
      navigate('/login');
      return;
    }
    setOpenDialog(false);
    try {
      await addToCart();
      navigate('/cart');
    } catch (error) {
      console.error('Error during Buy Now process:', error);
    }
  };

  return (
    <Box sx={{ padding: 2, marginTop: 2 }}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia component="img" height="400" image={image} alt="Dish Image" />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                {name}
              </Typography>
              <Button
                variant="outlined"
                startIcon={isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                onClick={handleFavoriteToggle}
                sx={{
                  marginLeft: 'auto',
                  color: isFavorited ? '#FF1493' : 'gray',
                  borderColor: isFavorited ? '#FF1493' : 'gray',
                  '&:hover': {
                    backgroundColor: 'rgb(255,240,245)',
                    borderColor: '#FF1493',
                    boxShadow: '0px 4px 4px 0px rgb(255,192,203)',
                  },
                }}
              >
                {isFavorited ? t('views.dish-detail.components.detail.favorite.favorited') : t('views.dish-detail.components.detail.favorite.favorite')}
              </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                {t('views.dish-detail.components.detail.rating')}
              </Typography>
              <StarIcon sx={{ color: '#FAAF00', marginRight: 1 }} />
              {average_rating}
            </Box>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {t('views.dish-detail.components.detail.calories')} {calories} kcal
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              {t('views.dish-detail.components.detail.price')} {formatNumber(price)} VNĐ
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <RoomRoundedIcon sx={{ fontSize: 20, marginRight: 1, color: 'ActiveBorder' }} />
              {t('views.dish-detail.components.detail.address')} {address}
            </Typography>
            <Box sx={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body1">{t('views.dish-detail.components.detail.quantity')}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={decreaseQuantity} sx={{ padding: 1 }}>
                  <RemoveIcon sx={{ color: 'red' }} />
                </IconButton>
                <input
                  type="number"
                  value={tempInput}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '') {
                      setTempInput('');
                    } else {
                      const numericValue = Number(value);
                      if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 99) {
                        setTempInput(value);
                        setQuantity(numericValue);
                      }
                    }
                  }}
                  onBlur={() => {
                    if (tempInput === '') {
                      setTempInput(quantity.toString());
                    }
                  }}
                  max={99}
                  style={{
                    width: '80px',
                    height: '40px',
                    textAlign: 'center',
                    padding: '0',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '16px',
                  }}
                />
                <IconButton onClick={increaseQuantity}>
                  <AddIcon sx={{ color: 'green' }} />
                </IconButton>
              </Box>
            </Box>
            <Box>
              <Button variant="outlined" startIcon={<ShoppingCartIcon />} onClick={addToCart}>
                {t('views.dish-detail.components.detail.button.addToCart')}
              </Button>
              <Button variant="contained" color="primary" sx={{ marginLeft: 2 }} onClick={handleOpenDialog}>
                {t('views.dish-detail.components.detail.button.buyNow')}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">
          <InfoIcon sx={{ fontSize: 20, marginRight: 1, color: 'ActiveBorder' }} />
          {t('views.dish-detail.components.detail.info')}
        </Typography>
        <Typography variant="body1">{description}</Typography>
      </Box>

      {/* Snackbar for success message */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', backgroundColor: 'green', color: 'white', boxShadow: 2, borderRadius: 1 }}>
          {t('views.dish-detail.components.detail.alert.addedToCart')}
        </Alert>
      </Snackbar>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{t('views.dish-detail.components.detail.buyNow.confirmTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('views.dish-detail.components.detail.buyNow.confirmMessage')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained" color="error">
            {t('views.dish-detail.components.detail.buyNow.cancel')}
          </Button>
          <Button onClick={handleConfirmBuyNow} variant="contained" autoFocus>
            {t('views.dish-detail.components.detail.buyNow.confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Detail;
