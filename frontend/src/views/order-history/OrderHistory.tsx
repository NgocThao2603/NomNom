import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getOrdersHistory, postRating } from 'src/services';
import DishList from './components/DishList';

export interface Ordered_Dish {
  order_id: number;
  dish_id: number;
  name: string;
  total_price: number;
  image: string;
  quantity: number;
  confirmed: boolean;
}
export default function OrderHistory() {
  const [dishes, setDishes] = useState<Ordered_Dish[]>([]);

  async function fetchOrderHistory() {
    try {
      const response = await getOrdersHistory(); // hardcode user_id
      const data = response.data.orders[0];
      setDishes(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRate(order_id: number, dish_id: number, rating: number, comment: string | null) {
    try {
      const body = {
        order_id,
        dish_id,
        rating,
        comment,
      };
      await postRating(body);
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
        Order History
      </Typography>
      <DishList dishes={dishes} onRate={handleRate} />
    </>
  );
}
