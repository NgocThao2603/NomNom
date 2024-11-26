import { Box, Button, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HelpIcon from '@mui/icons-material/Help';

export default function Header() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 5, py: 2, borderBottom: '1px solid #000' }}>
      <Typography variant="h4">NomNom</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FavoriteIcon sx={{ fontSize: '24px' }} />
          Favourite
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <HelpIcon sx={{ fontSize: '24px' }} />
          Help
        </Box>
        <Box>
          <Button variant="contained" sx={{ mr: 0.5 }}>
            Log in
          </Button>
          <Button variant="outlined">Sign up</Button>
        </Box>
      </Box>
    </Box>
  );
}
