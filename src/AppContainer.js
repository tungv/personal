import React, { PropTypes } from 'react';

import './index.global.css';
import './highlight.global.css';

import Container from './components/Container';
import DefaultHeadMeta from './components/DefaultHeadMeta';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';

const GOOGLE_ANALYTICS_UA = 'UA-92635019-1';
if (typeof window !== 'undefined') {
  /* eslint-disable import/newline-after-import */
  /* eslint-disable import/max-dependencies */

  // eslint-disable-next-line
  window.ga = window.ga ||
    function() {
      (ga.q = ga.q || []).push(arguments);
    };
  ga.l = new Date();
  /* global ga: true */
  // ga comes from google-analytics script injected below
  ga('create', GOOGLE_ANALYTICS_UA, 'auto');

  require('autotrack/lib/plugins/url-change-tracker');
  // check out more here https://github.com/googleanalytics/autotrack#plugins

  // most important plugin for phenomic
  ga('require', 'urlChangeTracker');

  // now that everything is ready, log initial page
  ga('send', 'pageview');
}

const AppContainer = props => (
  <Container>
    <DefaultHeadMeta
      scripts={[
        // GOOGLE Analytics, part 2/2
        { async: true, src: 'https://www.google-analytics.com/analytics.js' },
      ]}
    />
    <Header />
    <Content>
      {props.children}
    </Content>
    <Footer />
  </Container>
);

AppContainer.propTypes = {
  children: PropTypes.node,
};

export default AppContainer;
