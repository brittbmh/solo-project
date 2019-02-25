import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <div>
      <p>
        Thanks to everyone who helped me with this app!
      </p>
      <p>Tech Used: React.js, Node.js/Express.js, AJAX/Axios, Redux.js, PostgreSQL, Sweetalert.js, HTML, CSS </p>
    </div>
  </div>
);

export default AboutPage;
