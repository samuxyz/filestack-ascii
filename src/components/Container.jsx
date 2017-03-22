import React, { Component } from 'react';
import config from '../config';

export default class Container extends Component {

  constructor (props) {
    super(props);
    this.state = { handle: null, ascii: false };
    this.setPicture = this.setPicture.bind(this);
  }

  async setPicture () {
    try {
      const data = await this.uploadImage();
      const { handle } = data.filesUploaded[0];
      this.setState({ handle });
      console.log(JSON.stringify(data.filesUploaded));
    } catch (e) {
      console.log(e);
    }
  }

  uploadImage = () => {
    const { client } = this.props;
    return client.pick(
      {
        accept: 'image/*',
        maxSize: 1024 * 1024 * 5,
        transformOptions: {
          transformations: {
            rotate: true,
            circle: true,
            monochrome: true,
            sepia: true,
            crop: {
              aspectRatio: 16 / 9,
            },
          },
        },
      }
    );
  };

  toggleAscii = () => {
    this.setState({ ascii: !this.state.ascii });
  };

  getPhotoUrl = () => {
    const { handle, ascii } = this.state;
    const { processApi, apiKey } = config;
    return handle
      && `${processApi}/${apiKey}/${ascii ? `urlscreenshot/${processApi}/ascii=c:true,b:black,r:true/` : ''}${handle}`;
  };

  render () {
    const { handle } = this.state;
    return (
      <div className="container">
        <div className="page-header">
          <h1>Filestack <small><em>Ascii transformation</em></small></h1>
          <div className="ascii-check">
            <input type="checkbox" onChange={() => this.toggleAscii()} /> Try me!
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center">
            <div className="thumbnail">
              <img
                className="img-responsive"
                src={this.getPhotoUrl() || 'http://placehold.it/800x600?text=Upload+a+Photo'}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="text-center">
            <button
              type="button"
              className="btn btn-filestack"
              onClick={this.setPicture}
            >
              <i className="glyphicon glyphicon-upload" /> Upload
            </button>
          </div>
        </div>
      </div>
    );
  }
}
