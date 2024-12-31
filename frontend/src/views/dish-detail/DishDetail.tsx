import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import Detail from './components/Detail';
import Feedback from './components/Feedback';
import { useFilter } from 'src/contexts/filter-context/FilterContext.tsx';
import { getDishById, getAverageRating, getFeedback } from 'src/services/index.tsx';
import { IconSpinLoading } from 'src/assets/icon';

const DishDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id?: string }>();
  const [dish, setDish] = useState<any>(null);
  const [rating, setRating] = useState<any>(null);
  const [feedback, setFeedback] = useState<any[]>([]);
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

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await getAverageRating(id);
        const rawRating = parseFloat(response.data.average_rating);
        setRating(Math.round(rawRating * 10) / 10); // Làm tròn đến 1 chữ số thập phân
      } catch (error) {
        console.error('Error fetching average rating:', error);
      }
    };

    fetchRating();
  }, [id]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await getFeedback(id);
        const feedbackData = response.data.data.map((feedback: any) => ({
          ...feedback,
          rating: Math.round(parseFloat(feedback.rating)), // Làm tròn rating thành số nguyên
        }));
        setFeedback(feedbackData);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, [id]);

  if (loading) return <IconSpinLoading sx={{ fontSize: '100px', mt: 10 }} />;
  if (!dish) return <div>{t('views.dish-detail.dishDetail.notFound')}</div>;

  return (
    <div>
      <SearchBar searchKeyword={searchKeyword} filters={filters} setFilters={setFilters} setSearchKeyword={setSearchKeyword} />
      <Detail
        id={id ? parseInt(id, 10) : NaN}
        image={dish.img_url}
        name={dish.dish_name}
        average_rating={rating || 0}
        calories={dish.calories}
        price={dish.price * 1000}
        address={`${dish.res_address} (${dish.distance} km)`}
        description={dish.desrip}
        favorite={dish.is_favorite}
      />
      <Feedback feedbackList={feedback} />
    </div>
  );
};

export default DishDetail;
