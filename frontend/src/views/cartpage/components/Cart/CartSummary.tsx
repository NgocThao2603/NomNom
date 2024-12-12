import { useTranslation } from 'react-i18next';
import { Box, Button, Grid } from '@mui/material';

type CartSummaryProps = {
  total: number;
  onSelectAll: () => void;
  onUnselect: () => void;
  onDeleteSelected: () => void;
  onCheckout: () => void;
};

export default function CartSummary({ total, onSelectAll, onUnselect, onDeleteSelected, onCheckout }: CartSummaryProps) {
  const { t, i18n } = useTranslation();
  return (
    <Grid container sx={{ padding: '10px', border: '1px solid #000000', borderRadius: 2, fontWeight: 'bold', mb: 2 }}>
      <Grid item xs={6}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" sx={{ borderRadius: 2 }} onClick={onSelectAll}>
            {t('views.cartpage.components.cart.cartSummary.selectAll')}
          </Button>
          <Button variant="contained" sx={{ borderRadius: 2 }} onClick={onUnselect}>
            {t('views.cartpage.components.cart.cartSummary.unselect')}
          </Button>
          <Button variant="contained" color="error" sx={{ borderRadius: 2 }} onClick={onDeleteSelected}>
            {t('views.cartpage.components.cart.cartSummary.deleteSelected')}
          </Button>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', alignItems: 'center' }}>
          {t('views.cartpage.components.cart.cartSummary.total')} {(total * 1000).toLocaleString()} VNĐ
          <Button variant="contained" onClick={onCheckout}>
            {t('views.cartpage.components.cart.cartSummary.checkout')}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
