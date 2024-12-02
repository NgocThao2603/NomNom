import { Box, Button, Container, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HelpIcon from '@mui/icons-material/Help';

export default function Header() {
  return (
    <Box sx={{ py: 2, borderBottom: '1px solid #000' }}>
      <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4">NomNom</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton>
              <FavoriteIcon sx={{ fontSize: '24px' }} />
            </IconButton>
            Favourite
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton>
              <HelpIcon sx={{ fontSize: '24px' }} />
            </IconButton>
            Help
          </Box>
          <Box>
            <Button variant="contained" sx={{ mr: 0.5 }}>
              Log in
            </Button>
            <Button variant="outlined">Sign up</Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
