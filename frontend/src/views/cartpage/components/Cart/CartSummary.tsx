import { Box, Button, Grid } from '@mui/material';

type CartSummaryProps = {
  total: number;
  onSelectAll: () => void;
  onUnselect: () => void;
  onDeleteSelected: () => void;
  onCheckout: () => void;
};

export default function CartSummary({ total, onSelectAll, onUnselect, onDeleteSelected, onCheckout }: CartSummaryProps) {
  return (
    <Grid container sx={{ padding: '10px', border: '1px solid #000000', borderRadius: 2, fontWeight: 'bold', mb: 2 }}>
      <Grid item xs={6}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" sx={{ borderRadius: 2 }} onClick={onSelectAll}>
            Select all
          </Button>
          <Button variant="contained" sx={{ borderRadius: 2 }} onClick={onUnselect}>
            Unselect
          </Button>
          <Button variant="contained" color="error" sx={{ borderRadius: 2 }} onClick={onDeleteSelected}>
            Delete Selected
          </Button>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', alignItems: 'center' }}>
          Total: {(total * 1000).toLocaleString()} VNĐ
          <Button variant="contained" onClick={onCheckout}>
            Checkout
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
