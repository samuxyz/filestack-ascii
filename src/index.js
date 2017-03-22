import React from 'react';
import { render } from 'react-dom';
import filestack from 'filestack-js';
import Container from 'components/Container';
import config from './config';
import '../dist/css/style.css';

const client = filestack.init(config.apiKey);
console.log(`You discovered the Filestack client version! ${filestack.version}`);

render(
  <Container client={client} />,
  document.getElementById('app'),
);
