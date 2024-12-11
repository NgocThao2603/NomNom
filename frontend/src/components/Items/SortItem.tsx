import { useTranslation } from 'react-i18next';
import { Box, Button, Grid, IconButton, MenuItem, Select, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import CardItem from '../CartItem/CardItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Dish } from 'src/services/types';
import { useNavigate } from 'react-router-dom';

type SortOption = string; // Chấp nhận mọi chuỗi cho linh hoạt hơn
type SelectedFilters = {
  closest: boolean;
  highestRated: boolean;
};

export default function SortItem({ Item }: { Item: Dish[] }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [sortOptions, setSortOptions] = useState<SortOption[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('');  // Giá trị mặc định là chuỗi rỗng

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    closest: false,
    highestRated: false,
  });

  // Cập nhật các lựa chọn sắp xếp và giá trị mặc định khi ngôn ngữ thay đổi
  useEffect(() => {
    const options = [
      t('components.items.sortItem.lowToHigh'),
      t('components.items.sortItem.highToLow'),
    ];
    setSortOptions(options);

    // Đặt giá trị mặc định cho sortOption nếu chưa có
    if (!sortOption) {
      setSortOption(options[0]);
    } else {
      // Giữ nguyên giá trị hiện tại khi ngôn ngữ thay đổi
      const currentOption = options.find(option => option === sortOption);
      console.log(currentOption);
      setSortOption(currentOption || options[0]);  // Nếu không tìm thấy, sử dụng giá trị mặc định
    }
  }, [t]);  // Chạy lại khi ngôn ngữ thay đổi

  const sortedData = () => {
    const filteredItems = [...Item];  // Sao chép để tránh thay đổi dữ liệu gốc

    if (sortOption === sortOptions[0]) {
      filteredItems.sort((a, b) => a.price - b.price);
    } else if (sortOption === sortOptions[1]) {
      filteredItems.sort((a, b) => b.price - a.price);
    }

    if (selectedFilters.closest) {
      filteredItems.sort((a, b) => Number(a.distance) - Number(b.distance));
    }

    if (selectedFilters.highestRated) {
      filteredItems.sort((a, b) => Number(b.average_rating) - Number(a.average_rating));
    }

    return filteredItems;
  };

  const handleButtonClick = (filter: keyof SelectedFilters) => {
    setSelectedFilters((prevState) => {
      return { ...prevState, [filter]: !prevState[filter] };
    });
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton sx={{ mt: 2 }} onClick={() => navigate('/home')}>
          <ArrowBackIcon sx={{ fontSize: 32, cursor: 'pointer' }} />
        </IconButton>
        <Box
          sx={{
            width: '100%',
            border: '1px solid #000',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 2,
            py: 1,
            px: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6">{t('components.items.sortItem.sortBy')}</Typography> {/* Dịch tiêu đề */}
            <Select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              size="small"
            >
              {sortOptions.map((option, index) => (
                <MenuItem key={index} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button variant={selectedFilters.closest ? 'contained' : 'outlined'} onClick={() => handleButtonClick('closest')}>
              {t('components.items.sortItem.closest')}
            </Button>
            <Button variant={selectedFilters.highestRated ? 'contained' : 'outlined'} onClick={() => handleButtonClick('highestRated')}>
              {t('components.items.sortItem.highestRated')}
            </Button>
          </Box>
        </Box>
      </Box>
      {Item.length === 0 && (
        <Typography variant="h6" sx={{ mt: 10, textAlign: 'center' }}>
          {t('components.items.sortItem.notMatch')}
        </Typography>
      )}
      <Grid container spacing={2}>
        {sortedData().map((item) => (
          <Grid item xs={6} sm={4} md={2.4} key={item.id}>
            <CardItem id={item.id} name={item.dish_name} price={item.price * 1000} img_url={item.img_url} average_rating={item.average_rating} distance={item.distance} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
