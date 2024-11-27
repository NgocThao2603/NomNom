export interface Restaurant {
  id: number;
  res_name: string;
  res_address: string;
  distance: number;
}

export interface Category {
  id: number;
  category: string;
}

export interface Dish {
  dish_name: string;
  price: number;
  average_rating: number;
  calories: number;
  img_url: string;
  category_id: number;
  restaurant_id: number;
  distance?: number;
}

const restaurants: Restaurant[] = [
  { id: 1, res_name: 'Bò tơ Quán Mộc', res_address: '02 P. Hoa Lư, Lê Đại Hành, Hai Bà Trưng, Hà Nội', distance: 1.2 },
  { id: 2, res_name: 'Tokyo Tan-Tan Ramen', res_address: '148B P. Bùi Thị Xuân, Bùi Thị Xuân, Hai Bà Trưng, Hà Nội, Việt Nam', distance: 1.8 },
  { id: 3, res_name: 'Pizza 4P', res_address: 'Lầu 1, Toà nhà Keangnam Hanoi Landmark 72, Mễ Trì, Nam Từ Liêm, Hà Nội', distance: 0.5 },
  { id: 4, res_name: 'Hanuri', res_address: '34 P. Đại La, Trương Định, Hai Bà Trưng, Hà Nội 11600, Việt Nam', distance: 1.5 },
  { id: 5, res_name: 'Bánh Cuốn Đức Hạnh', res_address: 'B9 Ng. 43 P. Phạm Ngọc Thạch, Khu tập thể Kim Liên, Hoàn Kiếm, Hà Nội, Việt Nam', distance: 2.0 },
  { id: 6, res_name: 'Cháo Sườn Bà Táo', res_address: '24 P. Hoa Lư, Lê Đại Hành, Hai Bà Trưng, Hà Nội, Việt Nam', distance: 1.1 },
  { id: 7, res_name: 'Mì cay Seoul', res_address: '91 P. Trần Đại Nghĩa, Bách Khoa, Hai Bà Trưng, Hà Nội, Việt Nam', distance: 0.8 },
  { id: 8, res_name: 'Gojumong', res_address: 'Tầng 1, Keangnam Landmark 72, Hà Nội', distance: 0.4 },
  { id: 9, res_name: 'Nam Phương', res_address: '111E5 Tạ Quang Bửu', distance: 0.7 },
  { id: 10, res_name: 'Bún Ngon Atom', res_address: '37 Tạ Quang Bửu', distance: 0.65 },
  { id: 11, res_name: 'Tuấn Mai', res_address: '78 Tạ Quang Bửu', distance: 0.6 },
  { id: 12, res_name: 'Singapore Chicken Rice', res_address: 'Tầng B1, Landmark 72', distance: 0.3 },
  { id: 13, res_name: 'Okonomi', res_address: 'Tầng 2, Landmark 72', distance: 0.35 },
  { id: 14, res_name: 'Xôi Minh Tâm', res_address: 'Gần Đại học Bách Khoa', distance: 0.5 },
  { id: 15, res_name: 'Đậu Mơ', res_address: 'Ngõ 78 Đại La', distance: 1.25 },
  { id: 16, res_name: 'Spicy Bowl', res_address: 'Tầng B1, Landmark 72', distance: 0.4 },
  { id: 17, res_name: 'Cơm Việt', res_address: 'Tầng G, Landmark 72', distance: 0.55 },
  { id: 18, res_name: 'Bún Chả Ngọc Anh', res_address: '44 Đại La', distance: 1.3 },
  { id: 19, res_name: 'Bánh mì Phượng', res_address: '12 Tạ Quang Bửu', distance: 0.6 },
  { id: 20, res_name: 'Bún đậu mắm tôm Thanh Hương', res_address: '82 Đại La', distance: 1.1 },
  { id: 21, res_name: 'Phở Hà Nội', res_address: '25 Nguyễn Du, Hai Bà Trưng', distance: 2.3 },
  { id: 22, res_name: 'Sushi Bar', res_address: '4 Ngọc Khánh, Ba Đình', distance: 4.5 },
  { id: 23, res_name: 'Bánh xèo Ba Miền', res_address: '17 Cầu Giấy', distance: 4.0 },
  { id: 24, res_name: 'Gà rán KFC', res_address: '86 Phố Huế, Hai Bà Trưng', distance: 2.0 },
  { id: 25, res_name: 'Bánh cuốn Gia An', res_address: '42 Đại Cồ Việt', distance: 1.5 },
  { id: 26, res_name: 'Mì ý La Dune', res_address: '4 Đặng Thái Thân', distance: 2.4 },
  { id: 27, res_name: 'Bún đậu mắm tôm Mẹt', res_address: '30 Nguyễn Khang, Cầu Giấy', distance: 4.2 },
  { id: 28, res_name: 'Bánh mì Kẹp', res_address: '16 Nguyễn Bỉnh Khiêm', distance: 3.5 },
  { id: 29, res_name: 'Kyo Sushi', res_address: 'Tầng 2, Landmark 72', distance: 0.4 },
  { id: 30, res_name: 'Cơm rang Kimchi', res_address: '35 Nguyễn Khuyến', distance: 2.8 },
  { id: 31, res_name: 'Bún bò Huế Thịnh', res_address: '12 Phan Đình Giót', distance: 3.0 },
  { id: 32, res_name: 'The Pizza Company', res_address: 'Tầng 1, Landmark 72', distance: 0.3 },
  { id: 33, res_name: 'Noodle & Rice', res_address: '9 Đại Cồ Việt', distance: 1.4 },
  { id: 34, res_name: 'Bún đậu Hương Béo', res_address: '56 Đình Thôn', distance: 2.8 },
  { id: 35, res_name: 'La Pasta', res_address: '29 Nguyễn Lương Bằng', distance: 3.5 },
  { id: 36, res_name: 'Bánh mì 36', res_address: '36 Tạ Quang Bửu', distance: 0.75 },
  { id: 37, res_name: 'KFC (Hà Nội)', res_address: '92 Nguyễn Trãi', distance: 4.5 },
  { id: 38, res_name: 'Viva Pizza', res_address: 'Tầng 2, Landmark 72', distance: 0.35 },
  { id: 39, res_name: 'Bánh mì chảo Hoàng Mai', res_address: '12 Hoàng Mai', distance: 2.0 },
  { id: 40, res_name: 'Bún chả Hương Liên', res_address: '24 Lê Văn Hưu', distance: 1.6 },
  { id: 41, res_name: 'Kimbap Kimbap', res_address: '14 Nguyễn Trãi', distance: 4.1 },
  { id: 42, res_name: 'Gà rán Lee', res_address: '24 Nguyễn Bỉnh Khiêm', distance: 3.6 },
  { id: 43, res_name: 'Mì xào hải sản Hoàng Gia', res_address: '15 Kim Mã', distance: 4.0 },
  { id: 44, res_name: 'Bánh mì 37', res_address: '37 Hàng Buồm', distance: 4.5 },
  { id: 45, res_name: 'Salad ăn kiêng', res_address: '20 Tạ Quang Bửu', distance: 0.85 },
  { id: 46, res_name: 'Cơm cuộn Hàn Quốc', res_address: '10 Hoàng Cầu', distance: 3.8 },
  { id: 47, res_name: 'Bún chả cá Lã Vọng', res_address: '33 Đường Láng', distance: 4.2 },
  { id: 48, res_name: 'Bánh xèo Bà Vui', res_address: '7 Đặng Tiến Đông', distance: 3.6 },
  { id: 49, res_name: 'Mì gà xé phay', res_address: '20 Phan Huy Chú', distance: 2.8 },
  { id: 50, res_name: 'Gỏi cuốn', res_address: '5 Bà Triệu', distance: 1.5 },
  { id: 51, res_name: 'Mì Ý La Dune', res_address: '12 Trần Đại Nghĩa', distance: 0.8 },
  { id: 52, res_name: 'Mì gà Đào Duy Từ', res_address: '20 Đào Duy Từ', distance: 3.8 },
  { id: 53, res_name: 'Mì xào tôm thịt', res_address: '8 Hoàng Quốc Việt', distance: 4.5 },
  { id: 54, res_name: 'Cơm rang dưa bò', res_address: '14 Nguyễn Khuyến', distance: 2.7 },
  { id: 55, res_name: 'Cháo gà Hạnh', res_address: '10 Nguyễn Hữu Thọ', distance: 3.0 },
  { id: 56, res_name: 'Phở trộn Hà Nội', res_address: '13 Trường Chinh', distance: 2.2 },
  { id: 57, res_name: 'Bánh bao Hương Việt', res_address: '22 Nguyễn Thái Học', distance: 4.0 },
  { id: 58, res_name: 'Bánh cuốn Thanh Vân', res_address: '13 Phố Huế', distance: 1.7 },
  { id: 59, res_name: 'Phở Gà Lý Quốc Sư', res_address: '10 Lý Quốc Sư', distance: 4.0 },
  { id: 60, res_name: 'Xôi chè Hòa Mã', res_address: '32 Hòa Mã', distance: 1.9 },
  { id: 61, res_name: 'Bánh xèo Nhật Quang', res_address: '45 Cầu Giấy', distance: 4.3 },
  { id: 62, res_name: 'Gà rán KFC', res_address: '18 Nguyễn Lương Bằng', distance: 3.4 },
  { id: 63, res_name: 'Mì Nhật Sumo', res_address: '55 Lê Thanh Nghị', distance: 1.1 },
  { id: 64, res_name: 'Bánh mì Phố Cổ', res_address: '24 Lương Văn Can', distance: 4.5 },
  { id: 65, res_name: 'Cơm Tấm Sài Gòn', res_address: '14 Trường Chinh', distance: 2.5 },
  { id: 66, res_name: 'Mì Vịt Tiềm', res_address: '10 Tô Hiệu', distance: 4.2 },
  { id: 67, res_name: 'Bánh cuốn Thanh Sơn', res_address: '7 Phan Đình Phùng', distance: 4.8 },
  { id: 68, res_name: 'Bún đậu mắm tôm', res_address: '15 Lê Đức Thọ', distance: 2.9 },
  { id: 69, res_name: 'Bánh mì 15 phút', res_address: '21 Phố Huế', distance: 1.4 },
  { id: 70, res_name: 'Mì xào bò', res_address: '28 Láng Hạ', distance: 4.0 },
  { id: 71, res_name: 'Cơm gà Hồng Kông', res_address: '17 Nguyễn Chí Thanh', distance: 4.0 },
  { id: 72, res_name: 'Bún bò Huế', res_address: '26 Phan Đình Phùng', distance: 4.7 },
  { id: 73, res_name: 'Bánh cuốn chả mực', res_address: '12 Phố Huế', distance: 1.6 },
  { id: 74, res_name: 'Mì hoành thánh', res_address: '18 Thái Thịnh', distance: 3.7 },
  { id: 75, res_name: 'Cháo ếch', res_address: '25 Cầu Giấy', distance: 4.2 },
  { id: 76, res_name: 'Bánh tráng cuốn thịt', res_address: '5 Nguyễn Cơ Thạch', distance: 3.5 },
  { id: 77, res_name: 'Phở Hòa', res_address: '1 Nguyễn Văn Cừ', distance: 3.8 },
  { id: 78, res_name: 'Cơm Trộn Sài Gòn', res_address: '16 Xã Đàn', distance: 2.3 },
  { id: 79, res_name: 'Mì Xào Đài Loan', res_address: '22 Phạm Hùng', distance: 2.1 },
  { id: 80, res_name: 'Bánh Bao Minh Đức', res_address: '8 Phương Mai', distance: 1.7 },
  { id: 81, res_name: 'Cơm Gà Xối Mỡ', res_address: '10 Lê Thanh Nghị', distance: 1.0 },
  { id: 82, res_name: 'Bún Chả Hồ Tây', res_address: '39 Hàng Than', distance: 4.5 },
];

const categories: Category[] = [
  { id: 1, category: 'Món cơm' },
  { id: 2, category: 'Món mì, phở, bún' },
  { id: 3, category: 'Món xôi, bánh bao' },
  { id: 4, category: 'Món salad và cuốn' },
  { id: 5, category: 'Món ăn nhanh' },
  { id: 6, category: 'Món Nhật' },
  { id: 7, category: 'Đồ khô: bánh mì' },
];

const dishes: Dish[] = [
  {
    dish_name: 'Bò tơ cuốn bánh tráng',
    price: 175,
    average_rating: 4.7,
    calories: 250,
    img_url: 'https://i.pinimg.com/736x/aa/09/fd/aa09fd603a16196e86e3470a60584c08.jpg',
    category_id: 4,
    restaurant_id: 1,
  },
  { dish_name: 'Tan Tan Ramen', price: 129, average_rating: 4.4, calories: 550, img_url: 'https://i.pinimg.com/736x/31/d4/dd/31d4dd8e32cb9f80999ffc5df376b86c.jpg', category_id: 6, restaurant_id: 1 },
  {
    dish_name: 'Toku TanTan Ramen',
    price: 169,
    average_rating: 4.4,
    calories: 650,
    img_url: 'https://i.pinimg.com/736x/05/45/80/05458036394edf41c89fafdb83a9a1f9.jpg',
    category_id: 6,
    restaurant_id: 1,
  },
  { dish_name: 'Miso Ramen', price: 119, average_rating: 4.4, calories: 500, img_url: 'https://i.pinimg.com/736x/03/46/10/034610fefbb7c4e3dbfe6f0bc35df29a.jpg', category_id: 6, restaurant_id: 1 },
  { dish_name: 'Yakisoba', price: 89, average_rating: 4.4, calories: 350, img_url: 'https://i.pinimg.com/736x/db/dd/e3/dbdde3498518c11af035d374807eca41.jpg', category_id: 6, restaurant_id: 1 },
];

export { restaurants, categories, dishes };
