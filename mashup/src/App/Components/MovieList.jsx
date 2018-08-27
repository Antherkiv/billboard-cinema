import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Masonry from 'react-gestalt-masonry';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

import { fetchEntries } from '../Containers/Home';

const MovieItem = ({ data }) => {
  return (
    <Link to={`/${data.slug}/review`} key={data.id}>
      <Card>
        <CardImg top src={data.poster} alt="Card image cap" />
        <CardBody>
          <CardTitle>{data.title}</CardTitle>
          <CardText>{data.synopsis}</CardText>
        </CardBody>
      </Card>
    </Link>
  );
};

MovieItem.propTypes = {
  data: PropTypes.object.isRequired
};

export default class MovieList extends PureComponent {
  static getDerivedStateFromProps({ items }) {
    return {
      items: items,
      offset: 10,
      limit: 20
    };
  }

  constructor(props) {
    super(props);
    this.loadItems = this.loadItems.bind(this);
    this.state = { items: [] };
  }

  loadItems() {
    const {
      props: { moviesApi },
      state: { items, offset, limit }
    } = this;
    if (!items && offset === 10 && limit === 10) {
      return;
    }
    fetchEntries(
      moviesApi,
      ({ data: { result } }) =>
        this.setState({
          items: items.concat(result),
          offset: offset + 10,
          limit: limit + 10
        }),
      offset,
      limit
    );
  }

  render() {
    const {
      state: { items },
      loadItems
    } = this;
    return (
      <Masonry
        flexible
        virtualize
        comp={MovieItem}
        items={items}
        loadItems={loadItems}
        minCols={1}
        gutterWidth={25}
        scrollContainer={() => window}
      />
    );
  }
}

MovieList.propTypes = {
  moviesApi: PropTypes.string
};
