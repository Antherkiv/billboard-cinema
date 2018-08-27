import React, { PureComponent } from 'react';
import axios from 'axios';
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

import Plain from 'slate-plain-serializer';
import { Value } from 'slate';

import { Editor } from 'slate-react';

import classNames from 'classnames';

import pluginTitleBody from '../../tools/slate-plugins/slate-title-body';

const titleBodyPlugin = pluginTitleBody();
const reviewPlugins = [titleBodyPlugin];

const initialValue = {
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

const renderNode = props => {
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

export default class MoviesAdminPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onChangeReview = this.onChangeReview.bind(this);
    this.onChangeSynopsis = this.onChangeSynopsis.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onDrop = this.onDrop.bind(this);

    this.state = {
      titleValue: Plain.deserialize(''),
      synopsisValue: Plain.deserialize(''),
      reviewValue: Value.fromJSON(initialValue),
      activeTab: '1'
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
          portrait: file.preview
        }));
        const fileAsBinaryString = reader.result;
        uploadImages(
          filesApi,
          fileAsBinaryString,
          file.name,
          file.size,
          ({ data: { file_url: fileURL } }) =>
            _this.setState({
              portrait: fileURL
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

  render() {
    const {
      state: { reviewValue, synopsisValue, titleValue, portrait },
      onChangeSynopsis,
      onChangeReview,
      onChangeTitle,
      onDrop
    } = this;
    console.log(portrait);
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
              <Button>Guardar</Button>
            </NavItem>
          </Nav>
        </Navbar>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <div className="d-flex justify-content-between">
              <h1>
                <Editor
                  value={titleValue}
                  onChange={onChangeTitle}
                  placeholder={
                    <p className="font-weight-bold">Escriba un título..</p>
                  }
                />
              </h1>
            </div>
            <hr />
            <Row className="ml-1 mr-1">
              <Col sm="12" md="6">
                <Dropzone
                  onDrop={onDrop}
                  style={{ height: '40%' }}
                  accept="image/jpeg, image/png"
                >
                  {(!portrait && (
                    <div className="justify-content-center align-items-center">
                      <p>Aroje la portada aquí</p>
                      <p>O añadala con doble click</p>
                    </div>
                  )) || (
                    <img
                      className="img-fluid"
                      src={portrait}
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
