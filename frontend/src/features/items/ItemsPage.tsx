import Items from './Items';
import Categories from '../categories/categories';
import { Box } from '@mui/material';

const ItemsPage = () => {
  return (
    <Box display="flex">
      <Categories />
      <Items />
    </Box>
  );
};

export default ItemsPage;
