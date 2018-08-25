import React, { Fragment } from 'react';
import { Container } from 'reactstrap';

import MainCarousel from '../Components/MainCarousel';
import MovieList from '../Components/MovieList';

export default () => (
  <Fragment>
    <MainCarousel />
    <Container>
      <MovieList />
    </Container>
  </Fragment>
);
