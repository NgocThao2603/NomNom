import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import Detail from './components/Detail';
import Feedback from './components/Feedback';
import { useFilter } from 'src/contexts/filter-context/FilterContext.tsx';
import { getDishById } from 'src/services/index.tsx';

const DishDetail = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id?: string }>();
  const [dish, setDish] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [searchKeyword, setSearchKeyword] = useState('');
  const { filters, setFilters } = useFilter();

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await getDishById(id);
        setDish(response.data[0]);
      } catch (error) {
        console.error('Error fetching dish:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDish();
  }, [id]);

  if (loading) return <div>{t('views.dish-detail.dishDetail.loading')}</div>;
  if (!dish) return <div>{t('views.dish-detail.dishDetail.notFound')}</div>;

  return (
    <div>
      <SearchBar searchKeyword={searchKeyword} filters={filters} setFilters={setFilters} setSearchKeyword={setSearchKeyword} />
      <Detail
        id={id ? parseInt(id, 10) : NaN}
        image={dish.img_url}
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
            comment: dish.comment,
          },
        ]}
      />
    </div>
  );
};

export default DishDetail;
