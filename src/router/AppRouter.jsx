import { Route, Routes, Navigate } from 'react-router-dom';

import { HomePage, MovieDetailsPage, PersonPage, CollectionPage } from '../pages';


export const AppRouter = () => {
  return (
    <Routes>
			<Route path="/movie/:movieID" element={<MovieDetailsPage />} />
			<Route path="/person/:personID" element={<PersonPage />} />
			<Route path="/collection/:collectionID" element={<CollectionPage />} />

			<Route path="/" element={<HomePage />} />
			<Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
