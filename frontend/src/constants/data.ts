export interface Category {
  id: number;
  category: string;
  img_url?: string;
}

const categories: Category[] = [
  { img_url: 'https://i.pinimg.com/736x/70/83/b7/7083b797ace1ccefb8517c5cd0cd4b74.jpg', id: 1, category: 'Món cơm' },
  { img_url: 'https://i.pinimg.com/736x/11/ee/7a/11ee7af5bc5ca03b5ceda6af7a88a85d.jpg', id: 2, category: 'Món mì, phở, bún' },
  { img_url: 'https://i.pinimg.com/736x/61/d4/08/61d4087e66315e779e7f6bb496c3464c.jpg', id: 3, category: 'Món xôi, bánh bao' },
  { img_url: 'https://i.pinimg.com/736x/e5/1d/5a/e51d5a35fd4554d8b1df597f58e876ef.jpg', id: 4, category: 'Món salad và cuốn' },
  { id: 5, category: 'Món ăn nhanh', img_url: 'https://i.pinimg.com/736x/99/ba/ee/99baeeb80d66f03a3389864d7256ec6f.jpg' },
  { id: 6, category: 'Món Nhật', img_url: 'https://i.pinimg.com/736x/cf/7f/4f/cf7f4f4263252b29ca8c1f5b52592970.jpg' },
  { img_url: 'https://i.pinimg.com/736x/a5/f7/5b/a5f75b61f4ec90aa07c585745827091d.jpg', id: 7, category: 'Đồ khô: bánh mì' },
];
