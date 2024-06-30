import './App.css'
import { Content } from './components/content/content'
import { Layout } from './components/layout/component'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import  {store } from "./redux/store";
import { MoviePage } from './components/movie_page/movie_page';

const router = createBrowserRouter([
  {
      path: "/",
      element: <Content />,
  },
  {
      path: "movies/:movieId",
      element: <MoviePage />,
    },
 ]);


function App() {

  
  return (
      <Provider store={ store}>
        <Layout> 
          <RouterProvider router={router}>
            <Content/>
          </RouterProvider>
        </Layout>
        </Provider>

  )
}

export default App
