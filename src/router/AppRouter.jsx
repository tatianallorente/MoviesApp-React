import { Route, Routes, Navigate } from 'react-router-dom';

import { HomePage, MovieDetailsPage, PersonPage } from '../pages';


export const AppRouter = () => {
  return (
    <Routes>
			<Route path="/movie/:movieID" element={<MovieDetailsPage />} />
			<Route path="/person/:personID" element={<PersonPage />} />

			<Route path="/" element={<HomePage />} />
			<Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
