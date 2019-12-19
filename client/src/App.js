import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import UpdateMovie from './Movies/UpdateMovie';

const App = () => {
	const [ savedList, setSavedList ] = useState([]);
	const [ movies, setMovies ] = useState([]);

	const addToSavedList = (movie) => {
		setSavedList([ ...savedList, movie ]);
	};

	return (
		<div>
			<SavedList list={savedList} />
			<Route exact path='/' render={() => <MovieList movies={movies} setMovies={setMovies} />} />
			<Route
				path='/movies/:id'
				render={(props) => {
					return <Movie {...props} movies={movies} setMovies={setMovies} addToSavedList={addToSavedList} />;
				}}
			/>
			<Route
				path='/update_movie/:id'
				render={(props) => <UpdateMovie {...props} movies={movies} setMovies={setMovies} />}
			/>
		</div>
	);
};

export default App;
