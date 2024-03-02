import Items from './Items';
import Categories from '../categories/categories';
import { Box } from '@mui/material';

const ItemsPage = () => {
  return (
    <Box display="flex" padding={2}>
      <Categories />
      <Items />
    </Box>
  );
};

export default ItemsPage;
