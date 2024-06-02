import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './users/LoginPage';
import SearchPage from './books/SearchPage';
import ListPage from './books/ListPage';

const RouterPage = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/users/login" element={<LoginPage />} />
			<Route path="/books/search" element={<SearchPage />} />
			<Route path="/books/list" element={<ListPage />} />
			
		</Routes>
	);
};

export default RouterPage;
