import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
	title     : '',
	director  : '',
	metascore : '',
	stars     : []
};

const UpdateMovie = (props) => {
	const [ movie, setMovie ] = useState(initialMovie);
	useEffect(
		() => {
			const movieToEdit = props.movies.find((e) => `${e.id}` === props.match.params.id);
			console.log(props.movies, movieToEdit);
			if (!movieToEdit) {
				return;
			} else {
				setMovie(movieToEdit);
			}
		},
		[ props.movies, props.match.params.id ]
	);

	const changeHandler = (e) => {
		e.persist();
		let value = e.target.value;
		setMovie({
			...movie,
			[e.target.name]: value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
			.then((res) => {
				const updateItems = props.movies.map((item) => {
					if (item.id === movie.id) {
						return (item = res.data);
					} else {
						return item;
					}
				});
				setMovie({ movie: updateItems });
				props.history.push('/');
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<h1>Update Movie</h1>
			<form onSubmit={handleSubmit}>
				<input type='text' name='title' onChange={changeHandler} placeholder='Title' value={movie.title} />
				<input
					type='text'
					name='director'
					onChange={changeHandler}
					placeholder='Director'
					value={movie.director}
				/>
				<input
					type='text'
					name='metascore'
					onChange={changeHandler}
					placeholder='Metascore'
					value={movie.metascore}
				/>
				<input type='text' name='stars' onChange={changeHandler} placeholder='Stars' value={movie.stars} />
				<button type='submit'>Update</button>
			</form>
		</div>
	);
};

export default UpdateMovie;
