import React, { useState, useEffect } from 'react';
import { Box, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchItem from 'src/components/SearchBar/SearchItem';
import { useModalContext } from 'src/contexts/modal-context/modal-context';
import FilterModal from 'src/components/SearchBar/FilterModal';
import { Filter, initFilters } from 'src/services/types';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from 'src/contexts/cart-context/CartContext';

interface SearchBarProps {
  searchKeyword: string;
  filters: Filter;
  setFilters: (filters: Filter) => void;
  setSearchKeyword: (keyword: string) => void;
}

export default function SearchBar(props: SearchBarProps) {
  const navigate = useNavigate();
  const { setFilters, setSearchKeyword, searchKeyword } = props;
  const { openModal } = useModalContext();

  const { totalDishes } = useCartContext();

  useEffect(() => {}, [totalDishes]);

  const handleSearch = (keyword: string) => {
    setFilters(initFilters);
    setSearchKeyword(keyword.toLowerCase());
  };

  function handleOpenModal() {
    setSearchKeyword('');
    openModal('Filter', <FilterModal />, { maxWidth: 'xsm' }, true);
  }

  const handleNavigateToCart = () => {
    navigate('/cart');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
      <IconButton onClick={handleOpenModal}>
        <FilterListIcon sx={{ fontSize: '30px' }} />
      </IconButton>
      <Box sx={{ px: 2, width: '100%' }}>
        <SearchItem searchKeyword={searchKeyword} onSearch={handleSearch} />
      </Box>
      <IconButton aria-label="View shopping cart" onClick={handleNavigateToCart}>
        <Badge badgeContent={totalDishes} color="error" overlap="circular">
          <ShoppingCartIcon sx={{ fontSize: '30px' }} />
        </Badge>
      </IconButton>
    </Box>
  );
}
