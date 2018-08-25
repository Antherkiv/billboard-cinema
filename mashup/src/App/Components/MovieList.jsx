import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-gestalt-masonry';
import loremIpsum from 'lorem-ipsum';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap';

const MovieItem = ({ data }) => (
  <Card>
    <CardImg top src={data.image} alt="Card image cap" />
    <CardBody>
      <CardTitle>{data.title}</CardTitle>
      <CardSubtitle>{data.subtile}</CardSubtitle>
      <CardText>{data.description}</CardText>
    </CardBody>
  </Card>
);

MovieItem.propTypes = {
  data: PropTypes.object.isRequired
};

export default class MovieList extends PureComponent {
  constructor(props) {
    super(props);

    this.loadItems = this.loadItems.bind(this);

    this.state = {
      items: []
    };
  }

  loadItems() {
    const {
      state: { items }
    } = this;
    const newItems = Array.from({ length: 10 }, () => ({
      image: `https://picsum.photos/${Math.floor(Math.random() * 600) +
        300}/1000/?random`,
      description: loremIpsum(),
      title: loremIpsum(),
      subtitle: loremIpsum()
    }));
    console.log(newItems);
    this.setState({
      items: items.concat(newItems)
    });
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
