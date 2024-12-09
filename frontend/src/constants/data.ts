export interface Category {
  id: number;
  category: string;
  img_url?: string;
}

export const categories: Category[] = [
  { id: 1, category: 'Món cơm', img_url: 'https://vnn-imgs-a1.vgcloud.vn/icdn.dantri.com.vn/2021/06/21/bdimkitchen-1624265016976.jpg' },
  { id: 2, category: 'Món mì, phở, bún', img_url: 'https://giadinh.mediacdn.vn/zoom/740_463/2017/bun-1498639285275.jpg' },
  {
    id: 3,
    category: 'Món xôi, bánh bao',
    img_url: 'https://vcdn1-giadinh.vnecdn.net/2022/03/14/2-Xoi-xeo-9345-1644048211-4709-1647241105.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=kerDlj6Dq2MFe9l7XbjHJQ',
  },
  { id: 4, category: 'Món salad và cuốn', img_url: 'https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/163993/Originals/mon-cuon-boto.jpeg' },
  { id: 5, category: 'Món ăn nhanh', img_url: 'https://statics.vincom.com.vn/xu-huong/chi_tiet_xu_huong/1/14-4/3/do-an-nhanh-cho-nguoi-ban-ron.jpg' },
  { id: 6, category: 'Món Nhật', img_url: 'https://vietmartjp.com/wp-content/uploads/2021/06/Mon-an-nhat-ban.jpg' },
  { id: 7, category: 'Đồ khô: bánh mì', img_url: 'https://i.pinimg.com/736x/a5/f7/5b/a5f75b61f4ec90aa07c585745827091d.jpg' },
];
