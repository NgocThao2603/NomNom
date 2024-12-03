import { Box, Button, Container, IconButton, Menu, MenuItem, Select, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HelpIcon from '@mui/icons-material/Help';
import LanguageIcon from '@mui/icons-material/Language';

export default function Header() {
  return (
    <Box sx={{ py: 2, borderBottom: '1px solid #000' }}>
      <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box onClick={() => window.location.reload()} sx={{ cursor: 'pointer' }}>
          <Typography variant="h4">NomNom</Typography>
        </Box>
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton>
              <LanguageIcon sx={{ fontSize: '24px' }} />
            </IconButton>
            <Select value={'en'} size="small">
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="jp">Japanese</MenuItem>
            </Select>
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
