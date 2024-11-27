import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { formatNumber } from 'src/utils/format';
import StarIcon from '@mui/icons-material/Star';

type CardItemProps = {
  name: string;
  price: number;
  img_url: string;
  average_rating: number;
  distance: number;
};

export default function CardItem({ name, price, img_url, average_rating, distance }: CardItemProps) {
  return (
    <Card sx={{ maxWidth: 300, mt: 5 }}>
      <CardMedia sx={{ height: 200 }} image={img_url} title="pizza" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          {formatNumber(price)} VNĐ
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <StarIcon sx={{ color: '#FAAF00' }} />
            {average_rating}
          </Box>
          <Typography variant="body1" color="text.secondary">
            ~ {distance}km
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        <Button size="small" variant="contained">
          Show More
        </Button>
      </CardActions>
    </Card>
  );
}
