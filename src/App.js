import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Routes/Routes';

function App() {
  return (
    <div data-theme='light' className='min-h-screen pb-10' >
      <RouterProvider router={router}>

      </RouterProvider>
    </div>
  );
}

export default App;
