import React, { PureComponent, Fragment } from 'react';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

import MainCarousel from '../Components/MainCarousel';
import MovieList from '../Components/MovieList';

export const fetchEntries = (moviesApi, callback, offset = 0, limit = 10) => {
  console.log(offset, limit || []);
  return axios(`${moviesApi}/movies`, {
    method: 'get',
    params: {
      limit,
      offset
    },
    withCredentials: true
  }).then(callback);
};

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  componentDidMount() {
    fetchEntries(this.props.moviesApi, ({ data: { results: items } }) =>
      this.setState({ items })
    );
  }
  render() {
    const {
      state: { items },
      props: { moviesApi }
    } = this;
    return (
      <Fragment>
        <MainCarousel items={items || []} />
        <Container>
          <MovieList items={items || []} moviesApi={moviesApi} />
        </Container>
      </Fragment>
    );
  }
}

PureComponent.defaultProps = {
  items: []
};

Home.propTypes = {
  moviesApi: PropTypes.string
};
