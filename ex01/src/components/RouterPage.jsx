import React from 'react';
import { Route, Routes } from 're';
const RouterPage = () => {
	return (
		<Routes>
			<Route path="/book/search" element={<BookSearch />} />
		</Routes>
	);
};

export default RouterPage;
