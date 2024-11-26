import { Box, Grid } from '@mui/material';
import SearchItem from './components/SearchItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CardItem from './components/CardItem';

export default function HomePage() {
  return (
    <Box>
      <Grid
        container
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <Grid item xs={11}>
          <Box sx={{ px: 2 }}>
            <SearchItem />
          </Box>
        </Grid>
        <Grid item xs={1}>
          <ShoppingCartIcon />
        </Grid>
      </Grid>
      <CardItem />
    </Box>
  );
}
