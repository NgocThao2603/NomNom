import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getOrdersHistory, postRating } from 'src/services';
import DishList from './components/DishList';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export interface Ordered_Dish {
  order_id: number;
  dish_id: number;
  name: string;
  total_price: number;
  image: string;
  quantity: number;
  confirmed: number;
  rated: number;
  rated_at: number | null;
  confirmed_at: number;
}

export interface Ordered_Dish_With_Status {
  status: 'idle' | 'success' | 'fetching' | 'failed';
  data: Ordered_Dish[];
}

export default function OrderHistory() {
  const { t, i18n } = useTranslation();
  const [dishes, setDishes] = useState<Ordered_Dish_With_Status>({ status: 'idle', data: [] });

  async function fetchOrderHistory() {
    try {
      setDishes({ status: 'fetching', data: [] });
      const response = await getOrdersHistory();
      const data = response.data.orders[0];
      setDishes({ status: 'success', data });
    } catch (error) {
      setDishes({ status: 'failed', data: [] });
      console.error(error);
    }
  }

  async function handleRate(dish_id: number, rating: number, comment: string | null) {
    try {
      const body = {
        order_id: dishes.data.find((dish) => dish.dish_id === dish_id)?.order_id,
        dish_id,
        rating,
        comment,
      };
      await postRating(body);
      fetchOrderHistory();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchOrderHistory();
  }, []);
  return (
    <>
      <Typography variant="h3" my={3}>
        {t('views.orderHistory.components.orderHistory')}
      </Typography>
      <DishList dishes={dishes} onRate={handleRate} />
    </>
  );
}
