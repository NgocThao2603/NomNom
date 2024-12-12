import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, Button, TextField, IconButton, Rating, Snackbar, Alert } from '@mui/material';
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
import { addDishToCart } from 'src/services/index';

interface DetailProps {
  id: number;
  image: string;
  name: string;
  average_rating: number;
  calories: number;
  price: number;
  address: string;
  description: string;
}

const Detail: React.FC<DetailProps> = ({ id, image, name, average_rating, calories, price, address, description }) => {
  const { t, i18n } = useTranslation();
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => (prev < 99 ? prev + 1 : prev));
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const { updateTotalDishes } = useCartContext();

  const addToCart = async () => {
    try {
      const user_id = '1';
      const response = await addDishToCart(user_id, id, quantity);
      const totalDishes = response.data.totalDish[0]?.[0]?.total_dishes;
      updateTotalDishes(totalDishes);
      setOpen(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
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
                  value={quantity}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (!isNaN(value) && value >= 1 && value <= 99) {
                      setQuantity(value);
                    } else if (value > 99) {
                      setQuantity(99);
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
              <Button variant="contained" color="primary" sx={{ marginLeft: 2 }}>
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
      <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', backgroundColor: 'green', color: 'white', boxShadow: 2, borderRadius: 1 }}>
          {t('views.dish-detail.components.detail.alert.addedToCart')}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Detail;
