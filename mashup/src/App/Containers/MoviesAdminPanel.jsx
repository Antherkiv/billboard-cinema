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
  Navbar,
  Input
} from 'reactstrap';

import Dropzone from 'react-dropzone';

import { Value } from 'slate';

import { Editor } from 'slate-react';

import classNames from 'classnames';

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

const uploadImages = (filesApi, file, fileName, size, callback) => {
  return axios(`${filesApi}/${fileName}`, {
    method: 'post',
    data: file,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ACCEPT: '*/*'
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
    this.onDrop = this.onDrop.bind(this);

    this.state = {
      reviewValue: Value.fromJSON(initialValue),
      synopsisValue: Value.fromJSON(initialValue),
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
            _this.setState(() => ({
              portrait: fileURL
            }))
        );
      };
      reader.readAsArrayBuffer(file);
    });
  }

  onChangeReview({ value: reviewValue }) {
    this.setState({ reviewValue });
  }

  onChangeSynopsis({ value: synopsisValue }) {
    this.setState({ synopsisValue });
  }

  render() {
    const {
      state: { reviewValue, synopsisValue, portrait },
      onChangeSynopsis,
      onChangeReview,
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
            <Input placeholder="Escriba un título..." />
            <Row className="ml-1 mr-1">
              <Col sm="12">
                <Row>
                  <Col sm="12">
                    <Dropzone
                      onDrop={onDrop}
                      style={{ height: '40%' }}
                      accept="image/jpeg, image/png"
                    >
                      {!portrait &&
                        ((
                          <div className="justify-content-center align-items-center">
                            <p>Aroje la portada aquí</p>
                            <p>O añadala con doble click</p>
                          </div>
                        ) || <img className="img-fluid" src={portrait} />)}
                    </Dropzone>
                    <hr />
                    <div className="mt-2">
                      <Editor
                        value={synopsisValue}
                        onChange={onChangeSynopsis}
                        placeholder={
                          <p className="font-weight-bold">
                            "Comience a esribir la sinopsis..."{' '}
                          </p>
                        }
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <div className="mx-auto" style={{ width: '90%' }}>
              <Editor
                value={reviewValue}
                onChange={onChangeReview}
                placeholder={
                  <p className="font-weight-bold">
                    Comience a esribir una reseña...
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
