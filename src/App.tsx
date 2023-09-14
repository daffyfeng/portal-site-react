import './App.scss';

import { Router } from '@/router';
import { RouterProvider } from 'react-router-dom';

function App() {
  // const outlet = useRoutes(Router)

  return (
    <>
      {/* {outlet} */}
      <RouterProvider router={Router()} />
    </>
  );
}

export default App;
