import { Box } from '@mui/material';
import Providers from 'src/contexts/Providers';
import Header from './header/Header';
import Content from './content/Content';

export default function Layout() {
  const headerHeight = '66px';
  return (
    <Providers>
      <Box>
        <Header />
        <Content headerHeight={headerHeight} />
      </Box>
    </Providers>
  );
}
