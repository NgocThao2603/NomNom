import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import Detail from './components/Detail';
import Feedback from './components/Feedback';
import axios from 'axios';
import { Filter } from 'src/services/types';
import { Feed } from '@mui/icons-material';
import { useItems } from 'src/contexts/item-context/ItemContext.tsx';
import { useFilter } from 'src/contexts/filter-context/FilterContext.tsx';
import { useNavigate } from 'react-router-dom';

const DishDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [dish, setDish] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [searchKeyword, setSearchKeyword] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCategories, setSelectedCategories] = useState<number>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Adjust the number of items per page
  const items = useItems();
  const navigate = useNavigate();
  const { filters, setFilters } = useFilter();

  const handleCategoryToggle = (id: number) => {
    navigate('/home/filter');
    setSelectedCategories(id);
    setFilters({ ...filters, categories: [id] });
  };

  useEffect(() => {
    const fetchDish = async () => {
      try {
        console.log(`Fetching dish with id: ${id}`); // Debug ID
        const response = await axios.get(`/api/dishes/${id}`); // Proxy API
        console.log('Dish data:', response.data); // Debug response
        setDish(response.data[0]); // Cập nhật state
      } catch (error) {
        console.error('Error fetching dish:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDish();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!dish) return <div>Dish not found.</div>;

  return (
    <div>
      <SearchBar
        searchKeyword={searchKeyword}
        filters={filters}
        setFilters={setFilters}
        setSearchKeyword={setSearchKeyword}
      />
      <Detail
        image={dish.img_url} // Truyền props
        name={dish.dish_name}
        average_rating={parseFloat(dish.average_rating)}
        calories={dish.calories}
        price={dish.price * 1000}
        address={`${dish.res_address} (${dish.distance} km)`}
        description={dish.comment}
      />
      <Feedback
        feedbackList={[
          {
            rating: dish.rating,
            comment: dish.comment
          }
        ]}
      />
    </div>
  );
};

export default DishDetail;
