import React, { useCallback, useMemo } from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { categories, Category } from 'src/constants/data';

type CategoryFilterProps = {
  onCategoryToggle: (id: number) => void;
};

function getRandomCategories({ categories, count }: { categories: Category[]; count: number }) {
  const shuffled = categories.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const CategoryCard = React.memo(({ category, onClick }: { category: Category; onClick: () => void }) => (
  <Box
    sx={{
      width: '100%',
      cursor: 'pointer',
    }}
    onClick={onClick}
  >
    <Card>
      <CardActionArea>
        <CardMedia component="img" height="250" image={category.img_url} alt={category.category} loading="lazy" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {category.category}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Box>
));

export default function CategoryFilter({ onCategoryToggle }: CategoryFilterProps) {
  const randomCategories = useMemo(() => getRandomCategories({ categories, count: 3 }), [categories]);
  const handleCategoryToggle = useCallback((id: number) => onCategoryToggle(id), [onCategoryToggle]);

  return (
    <>
      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
        Favourite Food
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, mt: 2.5 }}>
        {randomCategories.map((category) => (
          <CategoryCard key={category.id} category={category} onClick={() => handleCategoryToggle(category.id)} />
        ))}
      </Box>
    </>
  );
}
