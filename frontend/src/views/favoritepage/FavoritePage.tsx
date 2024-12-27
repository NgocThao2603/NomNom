import { Box, Grid, Pagination, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconSpinLoading } from 'src/assets/icon';
import CardItem from 'src/components/CartItem/CardItem';
import { useFavorite } from 'src/contexts/favorite-context/FavoriteContext';

export default function FavoritePage() {
  const items = useFavorite();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Adjust the number of items per page
  const totalPages = Math.ceil(items.data.data.length / itemsPerPage);
  const paginatedItems = items.data.data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  console.log(paginatedItems);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  return (
    <Box>
      <Box sx={{ my: 3, borderRadius: '10px', borderColor: 'grey.500', border: 1, p: 2, width: 'fit-content' }}>
        <Typography variant="h3">My Favorite Foods</Typography>
      </Box>
      {(items.status === 'fetching' || items.status === 'idle') && <IconSpinLoading sx={{ fontSize: '100px', mt: 10 }} />}
      {items.status === 'failed' && (
        <Typography variant="h6" sx={{ mt: 10, textAlign: 'center' }}>
          {t('components.items.allItem.noData')}
        </Typography>
      )}
      {items.status === 'success' && items.data.data && (
        <>
          <Grid container spacing={2}>
            {paginatedItems.map((item) => (
              <Grid item xs={6} sm={4} md={2.4} key={item.dish_id}>
                <CardItem id={item.dish_id} name={item.name} price={item.price * 1000} img_url={item.image} />
              </Grid>
            ))}
          </Grid>
          <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }} />
        </>
      )}
    </Box>
  );
}
