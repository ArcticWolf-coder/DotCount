import React, { useState } from 'react';

import Game from "./Play";



// STAR MATCH - Starting Template
const App = () => {
  const [id, setId] = useState(1);
  const reset = () => setId(id + 1);
  return (
    <Game key={id} reset={reset} />
  );
}





// Color Theme


export default App;

