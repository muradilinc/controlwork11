import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectItems, selectItemsLoading } from './itemsSlice';
import { getItems } from './itemsThunk';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { BASE_URL } from '../../constants/links';
import Spinner from '../../components/Spinner/Spinner';

const Items = () => {
  const items = useAppSelector(selectItems);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectItemsLoading);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid item key={item._id}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={BASE_URL + '/' + item.image}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Items;
