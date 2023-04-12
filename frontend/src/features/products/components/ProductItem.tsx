import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, styled } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import noImageAvailable from '../../../assets/images/noImageAvailable.jpg';
import { apiURL } from '../../../constants';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%', // 16:9
});

interface Props {
  categoryTitle: string;
  title: string;
  price: number;
  id: string;
  image: string | null;
}

const ProductItem: React.FC<Props> = ({ categoryTitle, title, price, id, image }) => {
  let cardImage = noImageAvailable;

  if (image) {
    cardImage = apiURL + '/' + image;
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardHeader title={title} />
        <ImageCardMedia image={cardImage} title={title} />
        <CardContent>
          <p>
            <strong>Category:</strong> {categoryTitle}
          </p>
          <strong>Price: {price} KGS</strong>
        </CardContent>
        <CardActions>
          <IconButton component={Link} to={'/products/' + id}>
            <ArrowForwardIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;
