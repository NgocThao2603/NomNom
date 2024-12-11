import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  Button,
  TextField,
  IconButton,
  Rating,
} from '@mui/material';
import { formatNumber } from 'src/utils/format';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';

interface DetailProps {
  image: string;
  name: string;
  average_rating: number;
  calories: number;
  price: number;
  address: string;
  description: string;
}

const Detail: React.FC<DetailProps> = ({
  image,
  name,
  average_rating,
  calories,
  price,
  address,
  description,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <Box sx={{ padding: 2, marginTop: 2 }}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={image}
              alt="Dish Image"
            />
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
                {isFavorited ? 'Favorited' : 'Favorite'}
              </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                Rating:
              </Typography>
              <StarIcon sx={{ color: '#FAAF00' }} />
              {average_rating}
            </Box>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Calories: {calories} kcal
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              Price: {formatNumber(price)} VNĐ
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <RoomRoundedIcon sx={{ fontSize: 20, marginRight: 1, color: 'ActiveBorder' }} />
              Address: {address}
            </Typography>
            <Box sx={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body1">Quantity:</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={decreaseQuantity} sx={{ padding: 1 }}>
                  <RemoveIcon sx={{ color: 'red' }} />
                </IconButton>
                <TextField
                  value={quantity}
                  type="number"
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (!isNaN(value) && value >= 1) {
                      setQuantity(value);
                    }
                  }}
                  sx={{
                    width: '50px',
                    textAlign: 'center',
                    marginX: 1,
                    '& input': { textAlign: 'center' },
                  }}
                />
                <IconButton onClick={increaseQuantity} sx={{ padding: 1 }}>
                  <AddIcon sx={{ color: 'green' }} />
                </IconButton>
              </Box>
            </Box>
            <Box>
              <Button variant="outlined" startIcon={<ShoppingCartIcon />}>
                Add to cart
              </Button>
              <Button variant="contained" color="primary" sx={{ marginLeft: 2 }}>
                Buy now
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">
          <InfoIcon sx={{ fontSize: 20, marginRight: 1, color: 'ActiveBorder' }} />
          Info:
        </Typography>
        <Typography variant="body1">{description}</Typography>
      </Box>
    </Box>
  );
};

export default Detail;
