import React, { Fragment } from 'react';
import { Container } from 'reactstrap';
import MainCarousel from './MainCarousel';
import MovieList from './MovieList';

export default () => (
  <Fragment>
    <MainCarousel />
    <Container>
      <MovieList />
    </Container>
  </Fragment>
);
