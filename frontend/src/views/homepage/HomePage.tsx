import { Box, Grid } from '@mui/material';
import SearchItem from './components/SearchItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AllItem from './components/AllItem.tsx';

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
          <ShoppingCartIcon sx={{ fontSize: '27px' }} />
        </Grid>
      </Grid>
      <AllItem />
    </Box>
  );
}
