import React, { PureComponent } from 'react';
import axios from 'axios';

import { Value } from 'slate';
import { Editor } from 'slate-react';

import { initialValue, renderNode, reviewPlugins } from './MoviesAdminPanel';

export default class MoviesReview extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: Value.fromJS(initialValue)
    };
  }
  componentDidMount() {
    const {
      props: {
        moviesApi,
        match: {
          params: { param }
        }
      }
    } = this;
    axios(`${moviesApi}/movies/${param}/review`, {
      method: 'get',
      withCredentials: true
    }).then(({ data: { body } }) => {
      this.setState({ value: Value.fromJS(body) });
    });
  }
  render() {
    const {
      state: { value }
    } = this;
    return (
      <div className="mx-auto" style={{ width: '90%', marginTop: 60 }}>
        <Editor
          value={value}
          plugins={reviewPlugins}
          renderNode={renderNode}
          readOnly
        />
      </div>
    );
  }
}
