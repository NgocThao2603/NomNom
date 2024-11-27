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
  { dish_name: 'Sashimi cá hồi', price: 179, average_rating: 4.4, calories: 125, img_url: 'https://i.pinimg.com/736x/06/52/1d/06521d80880512d8b8d7806879ef8164.jpg', category_id: 6, restaurant_id: 1 },
  {
    dish_name: 'Cơm cuộn phủ bơ',
    price: 129,
    average_rating: 4.4,
    calories: 300,
    img_url: 'https://hocnauan.edu.vn/wp-content/uploads/2015/06/sushi-cuon-bo-tuoi.jpg',
    category_id: 6,
    restaurant_id: 1,
  },
  { dish_name: 'Cơm cuộn mix', price: 139, average_rating: 4.4, calories: 350, img_url: 'https://i.pinimg.com/736x/f8/2f/80/f82f807b33a1dc41fd018fca69cd7a73.jpg', category_id: 6, restaurant_id: 1 },
  { dish_name: 'Cơm lươn', price: 229, average_rating: 4.4, calories: 400, img_url: 'https://i.pinimg.com/736x/73/21/80/7321805cd1966e41cc3094edd260be0f.jpg', category_id: 6, restaurant_id: 1 },
  {
    dish_name: 'Gà chiên kiểu Nhật',
    price: 109,
    average_rating: 4.4,
    calories: 450,
    img_url: 'https://i.pinimg.com/736x/e2/92/44/e2924439ffd432d1edb9d2ec0467f381.jpg',
    category_id: 6,
    restaurant_id: 1,
  },
  { dish_name: 'Takoyaki', price: 69, average_rating: 4.4, calories: 175, img_url: 'https://i.pinimg.com/736x/66/3b/e7/663be70dcbded36d616b3f726b2683a4.jpg', category_id: 6, restaurant_id: 1 },
  {
    dish_name: 'Pizza 4 loại phô mai',
    price: 240,
    average_rating: 4.6,
    calories: 1050,
    img_url: 'https://i.pinimg.com/736x/99/ba/ee/99baeeb80d66f03a3389864d7256ec6f.jpg',
    category_id: 5,
    restaurant_id: 2,
  },
  {
    dish_name: 'Pizza 4P Margherita',
    price: 150,
    average_rating: 4.6,
    calories: 900,
    img_url: 'https://i.pinimg.com/736x/0e/b5/46/0eb54663f950783eb3e9a76974bbc60a.jpg',
    category_id: 5,
    restaurant_id: 2,
  },
  {
    dish_name: 'Pizza bí ngòi sốt Quế Tây',
    price: 145,
    average_rating: 4.5,
    calories: 800,
    img_url: 'https://i.pinimg.com/736x/0b/11/0f/0b110feaf7638826e55be817331f362e.jpg',
    category_id: 5,
    restaurant_id: 2,
  },
  {
    dish_name: 'Mì Ý sốt kem với cua và sốt cà chua',
    price: 225,
    average_rating: 4.6,
    calories: 700,
    img_url: 'https://th.bing.com/th/id/OIP.PJGnr4DKCNoiu-n5Y-4lUAAAAA?rs=1&pid=ImgDetMain',
    category_id: 5,
    restaurant_id: 2,
  },
  {
    dish_name: 'Salad tôm và bơ',
    price: 115,
    average_rating: 4.6,
    calories: 300,
    img_url: 'https://i.pinimg.com/736x/e5/1d/5a/e51d5a35fd4554d8b1df597f58e876ef.jpg',
    category_id: 4,
    restaurant_id: 1,
  },
  { dish_name: 'Tokbokki', price: 35, average_rating: 4.6, calories: 350, img_url: 'https://i.pinimg.com/736x/69/f9/f6/69f9f67649f501a7bca9ea464b74e772.jpg', category_id: 1, restaurant_id: 2 },
  {
    dish_name: 'Kimbap truyền thống',
    price: 50,
    average_rating: 4.6,
    calories: 275,
    img_url: 'https://i.pinimg.com/736x/24/b8/d7/24b8d7a3bbcac08a79dd2b0cc9cd1bc5.jpg',
    category_id: 4,
    restaurant_id: 2,
  },
  { dish_name: 'Mì tương đen', price: 80, average_rating: 4.6, calories: 450, img_url: 'https://i.pinimg.com/736x/ea/47/54/ea4754fef56c6b043e8c4add03589f8b.jpg', category_id: 2, restaurant_id: 2 },
  { dish_name: 'Miến lạnh', price: 90, average_rating: 4.6, calories: 250, img_url: 'https://i.pinimg.com/736x/d1/bc/5e/d1bc5ea83fee4a0eed0e2b8ff3618808.jpg', category_id: 2, restaurant_id: 2 },
  { dish_name: 'Canh kim chi', price: 65, average_rating: 4.6, calories: 75, img_url: 'https://i.pinimg.com/736x/bd/e9/7a/bde97a7441f5d34f3e33ee5b5e111da1.jpg', category_id: 1, restaurant_id: 2 },
  { dish_name: 'Cơm trộn', price: 80, average_rating: 4.6, calories: 450, img_url: 'https://i.pinimg.com/736x/c5/9f/ef/c59feff1ee1dd19b04e60eefc55043c9.jpg', category_id: 1, restaurant_id: 2 },
  {
    dish_name: 'Bánh xèo hải sản Okonomi',
    price: 150,
    average_rating: 4.6,
    calories: 350,
    img_url: 'https://i.pinimg.com/736x/cf/7f/4f/cf7f4f4263252b29ca8c1f5b52592970.jpg',
    category_id: 6,
    restaurant_id: 2,
  },
  { dish_name: 'Bánh cuốn chả lẫn', price: 40, average_rating: 4.7, calories: 225, img_url: 'https://c1.staticflickr.com/5/4004/4204672923_83782d78f1_b.jpg', category_id: 4, restaurant_id: 3 },
  {
    dish_name: 'Bánh cuốn chả nướng',
    price: 35,
    average_rating: 4.7,
    calories: 275,
    img_url: 'https://i.pinimg.com/736x/f5/11/e6/f511e6ffef198c0b41db1cc7440d346c.jpg',
    category_id: 4,
    restaurant_id: 3,
  },
  {
    dish_name: 'Bánh cuốn chả quế',
    price: 25,
    average_rating: 4.7,
    calories: 275,
    img_url: 'https://i.pinimg.com/736x/c5/10/81/c510819cd449293cedb2843e19fa0c04.jpg',
    category_id: 4,
    restaurant_id: 3,
  },
  { dish_name: 'Bánh cuốn trứng', price: 10, average_rating: 4.7, calories: 275, img_url: 'https://i.pinimg.com/736x/86/57/dd/8657dd9dbc90ecb2a74143340549e983.jpg', category_id: 4, restaurant_id: 3 },
  { dish_name: 'Gà tần', price: 60, average_rating: 4.7, calories: 400, img_url: 'https://i.pinimg.com/736x/58/e3/03/58e303ed0cbdb8cc49cac96261a997b9.jpg', category_id: 2, restaurant_id: 4 },
  { dish_name: 'Mì gà tần', price: 70, average_rating: 4.7, calories: 450, img_url: 'https://i.pinimg.com/736x/b8/cd/a2/b8cda2ffdd0a1243ce3916625c4c7e89.jpg', category_id: 2, restaurant_id: 4 },
  { dish_name: 'Cháo sườn', price: 35, average_rating: 4.6, calories: 300, img_url: 'https://i.pinimg.com/736x/fe/4d/d0/fe4dd0224f8c248cdb424bf0fc9998cd.jpg', category_id: 1, restaurant_id: 5 },
  { dish_name: 'Cháo lưỡi', price: 45, average_rating: 4.6, calories: 225, img_url: 'https://i.pinimg.com/736x/b8/c7/40/b8c740e241f83133a0f8f3dc8c780d4b.jpg', category_id: 1, restaurant_id: 5 },
  { dish_name: 'Cháo móng giò', price: 35, average_rating: 4.6, calories: 275, img_url: 'https://i.pinimg.com/736x/9f/f0/df/9ff0dfd8c2b96b711301294120596695.jpg', category_id: 1, restaurant_id: 5 },
  { dish_name: 'Mì bò', price: 45, average_rating: 4.6, calories: 450, img_url: 'https://i.pinimg.com/736x/57/33/11/573311e58f90bca62664a1c8f0de32e5.jpg', category_id: 2, restaurant_id: 4 },
  { dish_name: 'Takoyaki', price: 39, average_rating: 4.6, calories: 175, img_url: 'https://i.pinimg.com/736x/57/93/07/57930742d9b0d41170f600be2c1fb8a2.jpg', category_id: 6, restaurant_id: 4 },
  { dish_name: 'Kimbap', price: 35, average_rating: 4.6, calories: 275, img_url: 'https://i.pinimg.com/736x/38/2f/16/382f16af8eb48e7a11d238e5e497d2b3.jpg', category_id: 2, restaurant_id: 1 },
  {
    dish_name: 'Cơm trộn Bibimbap',
    price: 35,
    average_rating: 4.6,
    calories: 550,
    img_url: 'https://i.pinimg.com/736x/fc/eb/de/fcebde1e3d6b3f63792749e0914f06a1.jpg',
    category_id: 1,
    restaurant_id: 1,
  },
  { dish_name: 'Tokbokki', price: 35, average_rating: 4.6, calories: 350, img_url: 'https://i.pinimg.com/736x/69/cb/43/69cb432fdbc617e351845109947ae9f1.jpg', category_id: 1, restaurant_id: 1 },
  {
    dish_name: 'Bò nướng Bulgogi',
    price: 120,
    average_rating: 4.7,
    calories: 600,
    img_url: 'https://i.pinimg.com/736x/85/34/c0/8534c04ee92182b4a6c95d3ae7ed545e.jpg',
    category_id: 1,
    restaurant_id: 2,
  },
  {
    dish_name: 'Cơm tấm Sài Gòn',
    price: 40,
    average_rating: 4.3,
    calories: 500,
    img_url: 'https://i.pinimg.com/736x/70/83/b7/7083b797ace1ccefb8517c5cd0cd4b74.jpg',
    category_id: 1,
    restaurant_id: 3,
  },
  {
    dish_name: 'Bún riêu cua',
    price: 35,
    average_rating: 4.5,
    calories: 350,
    img_url: 'https://i.pinimg.com/736x/af/3b/ba/af3bbae091427d8c11c741e09a34e9d8.jpg',
    category_id: 4,
    restaurant_id: 4,
  },
  {
    dish_name: 'Bánh mì chảo',
    price: 50,
    average_rating: 4.6,
    calories: 600,
    img_url: 'https://i.pinimg.com/736x/99/32/5f/99325f293f586c324273d633c94095a2.jpg',
    category_id: 5,
    restaurant_id: 5,
  },
  {
    dish_name: 'Cơm gà Hải Nam',
    price: 80,
    average_rating: 4.4,
    calories: 550,
    img_url: 'https://i.pinimg.com/736x/5c/cb/9c/5ccb9cc310e0ac5be1d2609a5c28353f.jpg',
    category_id: 1,
    restaurant_id: 6,
  },
  {
    dish_name: 'Bánh xèo Nhật Bản',
    price: 70,
    average_rating: 4.3,
    calories: 300,
    img_url: 'https://i.pinimg.com/736x/aa/b7/fd/aab7fd65eb795ee371a037f82a699b5a.jpg',
    category_id: 3,
    restaurant_id: 7,
  },
  {
    dish_name: 'Xôi chim',
    price: 40,
    average_rating: 4.2,
    calories: 450,
    img_url: 'https://i.pinimg.com/736x/61/d4/08/61d4087e66315e779e7f6bb496c3464c.jpg',
    category_id: 6,
    restaurant_id: 8,
  },
  {
    dish_name: 'Bún đậu mắm tôm',
    price: 35,
    average_rating: 4.2,
    calories: 350,
    img_url: 'https://i.pinimg.com/736x/9b/0d/80/9b0d80ee7ff3b75b8fe313af80c75d4a.jpg',
    category_id: 4,
    restaurant_id: 9,
  },
  {
    dish_name: 'Mì cay',
    price: 60,
    average_rating: 4.0,
    calories: 400,
    img_url: 'https://i.pinimg.com/736x/39/82/c7/3982c7f154717df842113ef2894e7138.jpg',
    category_id: 4,
    restaurant_id: 10,
  },
  {
    dish_name: 'Cơm rang thập cẩm',
    price: 50,
    average_rating: 4.5,
    calories: 500,
    img_url: 'https://i.pinimg.com/736x/a0/eb/93/a0eb938b2336fb18ff3f00075b6325af.jpg',
    category_id: 1,
    restaurant_id: 11,
  },
  {
    dish_name: 'Bún chả truyền thống',
    price: 40,
    average_rating: 4.3,
    calories: 450,
    img_url: 'https://i.pinimg.com/736x/fd/f4/97/fdf4976b7465358d77913114b770eb6e.jpg',
    category_id: 4,
    restaurant_id: 12,
  },
  {
    dish_name: 'Bánh mì chả cá',
    price: 30,
    average_rating: 4.6,
    calories: 500,
    img_url: 'https://i.pinimg.com/736x/a5/f7/5b/a5f75b61f4ec90aa07c585745827091d.jpg',
    category_id: 5,
    restaurant_id: 13,
  },
  {
    dish_name: 'Bún đậu mắm tôm',
    price: 40,
    average_rating: 4.5,
    calories: 350,
    img_url: 'https://i.pinimg.com/736x/a5/89/cf/a589cf5f4b4ed5e1d7443c807e2c9a84.jpg',
    category_id: 4,
    restaurant_id: 14,
  },
  {
    dish_name: 'Phở bò',
    price: 50,
    average_rating: 4.7,
    calories: 450,
    img_url: 'https://i.pinimg.com/736x/11/ee/7a/11ee7af5bc5ca03b5ceda6af7a88a85d.jpg',
    category_id: 4,
    restaurant_id: 15,
  },
  { dish_name: 'Bibimbap', price: 110, average_rating: 4.7, calories: 750, img_url: 'https://i.pinimg.com/736x/67/0f/13/670f13d00ae7b3b8cc5ebcba23aba586.jpg', category_id: 1, restaurant_id: 2 },
  { dish_name: 'Cháo trắng', price: 12, average_rating: 4.6, calories: 150, img_url: 'https://i.pinimg.com/736x/1e/45/c8/1e45c81a141c4acf3011e26ca863dfce.jpg', category_id: 3, restaurant_id: 5 },
];

export { restaurants, categories, dishes };