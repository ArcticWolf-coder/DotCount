import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from 'components/App';

export async function serverRenderer() {
  

  return Promise.resolve({
    
    initialMarkup: ReactDOMServer.renderToString(
      <App  />
    ),
    
  });
}
