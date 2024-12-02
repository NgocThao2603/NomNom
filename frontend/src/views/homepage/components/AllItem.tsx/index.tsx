import { Box, Grid, TablePagination } from '@mui/material';
import SortItem from './SortItem';
import { updatedDishes } from '../../HomePage';
import { Dish } from 'src/constants/data';
import CardItem from './CardItem';
import { useState } from 'react';

export default function AllItem({ Item }: { Item?: Dish[] }) {
  const [page, setPage] = useState(0); // Trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(10); // Số item mỗi trang

  // Xử lý đổi trang
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  // Xử lý đổi số item mỗi trang
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset về trang đầu
  };

  // Lấy danh sách phân trang
  const getPaginatedData = (data: Dish[]) => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex);
  };

  // Nếu không có `Item`, sử dụng `updatedDishes`
  const dataToShow = Item || updatedDishes;

  return (
    <Box>
      {!Item ? (
        <Box>
          <Grid container spacing={2}>
            {getPaginatedData(updatedDishes).map((item, index) => (
              <Grid item xs={6} sm={4} md={2.4} key={index}>
                <CardItem name={item.dish_name} price={item.price * 1000} img_url={item.img_url} average_rating={item.average_rating} distance={item.distance || 0} />
              </Grid>
            ))}
          </Grid>
          {/* Pagination */}
          <TablePagination
            component="div"
            count={updatedDishes.length} // Tổng số item
            page={page} // Trang hiện tại
            onPageChange={handleChangePage} // Xử lý đổi trang
            rowsPerPage={rowsPerPage} // Số item mỗi trang
            onRowsPerPageChange={handleChangeRowsPerPage} // Xử lý đổi số item mỗi trang
          />
        </Box>
      ) : (
        <SortItem Item={Item} />
      )}
    </Box>
  );
}
