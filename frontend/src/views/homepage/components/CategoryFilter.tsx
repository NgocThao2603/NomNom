import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

export type Category = {
  id: number;
  category: string;
  img_url: string;
};

const categoriesFilter: Category[] = [
  { img_url: 'https://i.pinimg.com/736x/70/83/b7/7083b797ace1ccefb8517c5cd0cd4b74.jpg', id: 1, category: 'Món cơm' },
  { img_url: 'https://i.pinimg.com/736x/11/ee/7a/11ee7af5bc5ca03b5ceda6af7a88a85d.jpg', id: 2, category: 'Món mì, phở, bún' },
  { img_url: 'https://i.pinimg.com/736x/03/46/10/034610fefbb7c4e3dbfe6f0bc35df29a.jpg', id: 6, category: 'Món Nhật' },
];

type CategoryFilterProps = {
  selectedCategories: number[];
  onCategoryToggle: (id: number) => void;
};

export default function CategoryFilter({ onCategoryToggle }: CategoryFilterProps) {
  return (
    <>
      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
        Favourite Food
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, mt: 2.5 }}>
        {categoriesFilter.map((category) => (
          <Box
            key={category.id}
            sx={{
              width: '100%',
              cursor: 'pointer',
            }}
            onClick={() => onCategoryToggle(category.id)}
          >
            <Card>
              <CardActionArea>
                <CardMedia component="img" height="190" image={category.img_url} alt={category.category} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {category.category}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </Box>
    </>
  );
}
