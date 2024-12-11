import { Grid, Box, Button } from '@mui/material';
import DishItem from './DishItem';

type DishListProps = {
  dishes: any[];
  onConfirm: (id: number) => void;
  onConfirmAll: () => void;
};

const boxStyle = {
  padding: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
};

export default function DishList({ dishes, onConfirm, onConfirmAll }: DishListProps) {
  return (
    <Box>
      {/* Tiêu đề */}
      <Grid container sx={{ backgroundColor: 'rgb(76, 173, 211)', color: 'white', borderRadius: 2, fontWeight: 'bold', mt: 2, mb: 3 }}>
        <Grid item xs={4}>
          <Box sx={boxStyle}>Dish</Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={boxStyle}>Unit price</Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={boxStyle}>Quantity</Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={boxStyle}>Total price</Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={boxStyle}>Action</Box>
        </Grid>
      </Grid>
      {dishes.map((dish) => (
        <DishItem key={dish.id} dish={dish} onConfirm={onConfirm} />
      ))}

      {/* Button Confirm All */}
      <Box sx={{ paddingTop: 2, textAlign: 'center' }}>
        <Button variant="contained" color="primary" onClick={onConfirmAll} disabled={dishes.every((dish) => dish.confirmed)}>
          Confirm All
        </Button>
      </Box>
    </Box>
  );
}
