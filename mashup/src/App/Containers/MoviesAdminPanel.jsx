import React, { PureComponent } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Button,
  Navbar
} from 'reactstrap';

import Dropzone from 'react-dropzone';

import InsertImages from 'slate-drop-or-paste-images';
import Plain from 'slate-plain-serializer';
import { Value } from 'slate';

import { Editor } from 'slate-react';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import classNames from 'classnames';

import pluginTitleBody from '../../tools/slate-plugins/slate-title-body';

import 'react-datepicker/dist/react-datepicker.css';

export const initialValue = {
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [{}]
          }
        ]
      }
    ]
  }
};

export const renderNode = props => {
  const { attributes, children, node } = props;

  switch (node.type) {
    case 'image': {
      const src = node.data.get('src');
      return <image src={src} {...attributes} />;
    }
    case 'title':
      return <h2 {...attributes}>{children}</h2>;
    case 'body':
      return <div>{children}</div>;
    case 'paragraph':
      return <p {...attributes}>{children}</p>;
  }
};

const uploadImages = (filesApi, file, fileName, size, callback) => {
  return axios(`${filesApi}/${fileName}`, {
    method: 'post',
    data: file,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*'
    },
    withCredentials: true
  }).then(callback);
};

const titleBodyPlugin = pluginTitleBody();
const InsertImagesPlugin = InsertImages({
  extensions: ['png'],
  insertImage: (transform, file) => {
    return transform.insertBlock({
      type: 'image',
      isVoid: true,
      data: { src: file }
    });
  }
});
export const reviewPlugins = [titleBodyPlugin, InsertImagesPlugin];

export default class MoviesAdminPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onChangeReview = this.onChangeReview.bind(this);
    this.onChangeSynopsis = this.onChangeSynopsis.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeReleaseDate = this.onChangeReleaseDate.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onSave = this.onSave.bind(this);

    this.state = {
      poster: '',
      titleValue: Plain.deserialize(''),
      synopsisValue: Plain.deserialize(''),
      reviewValue: Value.fromJSON(initialValue),
      activeTab: '1',
      releaseDate: moment()
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  onDrop(acceptedFiles) {
    const {
      props: { filesApi }
    } = this;
    acceptedFiles.forEach(file => {
      // eslint-disable-next-line no-undef
      const reader = new FileReader();
      const _this = this;
      reader.onload = () => {
        _this.setState(() => ({
          poster: file.preview
        }));
        const fileAsBinaryString = reader.result;
        uploadImages(
          filesApi,
          fileAsBinaryString,
          file.name,
          file.size,
          ({ data: { file_url: fileURL } }) =>
            _this.setState({
              poster: fileURL
            })
        );
      };
      reader.readAsArrayBuffer(file);
    });
  }

  onChangeTitle({ value: titleValue }) {
    this.setState({ titleValue });
  }

  onChangeReview({ value: reviewValue }) {
    this.setState({ reviewValue });
  }

  onChangeSynopsis({ value: synopsisValue }) {
    this.setState({ synopsisValue });
  }

  onChangeReleaseDate(date) {
    this.setState({
      releaseDate: date
    });
  }

  onSave() {
    const {
      state: { poster, titleValue, synopsisValue, reviewValue, releaseDate },
      props: {
        alert,
        moviesApi,
        history: { push }
      }
    } = this;

    if (
      !poster ||
      titleValue.document.isEmpty() ||
      synopsisValue.document.isEmpty() ||
      reviewValue.document.isEmpty() ||
      !releaseDate
    ) {
      alert.error(
        'Necesitas escribir un título, proveer una portada, sinopsis, una fecha de lanzamiento y review para proceder'
      );
      return;
    }
    const data = {
      poster: poster,
      synopsis: Plain.serialize(synopsisValue),
      title: Plain.serialize(titleValue),
      release_date: releaseDate,
      review: reviewValue.toJSON()
    };
    return axios(`${moviesApi}/movies`, {
      method: 'post',
      data,
      withCredentials: true
    })
      .then(() => {
        alert.success('La entrada se ha creado éxitosamente');
        push('/');
      })
      .catch(err => {
        if (err.response && err.response.data) {
          alert.error(err.response.data.description);
        } else {
          alert.error('No ha sido posible crear la entrada.');
        }
      });
  }

  render() {
    const {
      state: { reviewValue, synopsisValue, titleValue, poster, releaseDate },
      onChangeSynopsis,
      onChangeReview,
      onChangeTitle,
      onChangeReleaseDate,
      onDrop,
      onSave
    } = this;
    return (
      <div style={{ marginTop: 55 }}>
        <Navbar>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classNames({ active: this.state.activeTab === '1' })}
                onClick={() => {
                  this.toggle('1');
                }}
              >
                Ingresar la información básica de la película
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classNames({ active: this.state.activeTab === '2' })}
                onClick={() => {
                  this.toggle('2');
                }}
              >
                Ingresar la reseña de la película
              </NavLink>
            </NavItem>
          </Nav>
          <Nav>
            <NavItem>
              <NavLink
                tag={DatePicker}
                selected={releaseDate}
                onChange={onChangeReleaseDate}
              />
            </NavItem>
            <NavItem className="ml-1">
              <NavLink tag={Button} onClick={onSave}>
                Guardar
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <h1>
              <Editor
                value={titleValue}
                onChange={onChangeTitle}
                placeholder={
                  <p className="font-weight-bold">Escriba un título..</p>
                }
              />
            </h1>
            <hr />
            <Row className="ml-1 mr-1">
              <Col sm="12" md="6">
                <Dropzone
                  onDrop={onDrop}
                  style={{ height: '40%' }}
                  accept="image/jpeg, image/png"
                >
                  {(!poster && (
                    <div className="justify-content-center align-items-center">
                      <p>Aroje la portada aquí</p>
                      <p>O añadala con doble click</p>
                    </div>
                  )) || (
                    <img
                      className="img-fluid"
                      src={poster}
                      style={{ width: '100%' }}
                    />
                  )}
                </Dropzone>
              </Col>
              <Col sm="12" md="6">
                <Editor
                  value={synopsisValue}
                  onChange={onChangeSynopsis}
                  placeholder={<p className="font-weight-bold">Sinopsis...</p>}
                />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <div className="mx-auto" style={{ width: '90%' }}>
              <Editor
                value={reviewValue}
                plugins={reviewPlugins}
                onChange={onChangeReview}
                renderNode={renderNode}
                placeholder={
                  <p className="font-weight-bold">
                    Comience a esribir una título para la reseña...
                  </p>
                }
                contentPlaceholder={
                  <p className="font-weight-bold">
                    Comience a esribir una la reseña...
                  </p>
                }
              />
            </div>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

MoviesAdminPanel.propTypes = {
  filesApi: PropTypes.string,
  alert: PropTypes.function,
  moviesApi: PropTypes.string,
  history: PropTypes.object
};
