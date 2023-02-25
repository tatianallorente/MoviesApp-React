import { Route, Routes } from 'react-router-dom';

import { HomePage, MovieDetailsPage } from '../pages';


export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/movie/:movieID" element={<MovieDetailsPage />} />

        <Route path="/*" element={ <HomePage />} />
    </Routes>
  )
}
