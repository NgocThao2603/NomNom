import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
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
    <Card sx={{ maxWidth: 300, mt: 2, height: '350px', maxHeight: '350px', cursor: 'pointer' }}>
      <CardMedia sx={{ height: 200 }} image={img_url} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{ height: '60px' }}>
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
      {/* <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        <Button size="small" variant="contained">
          Show More
        </Button>
      </CardActions> */}
    </Card>
  );
}
