import React from 'react';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';



let movies = [
    { _id: 1, Title: 'Silence of the Lambs', Description: 'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer.', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/8/86/The_Silence_of_the_Lambs_poster.jpg', Genre: 'Thriller', Director: 'Jonathan Demme' },
    { _id: 2, Title: 'Hannibal', Description: 'A decade after tracking down serial killer FBI Special Agent Clarice Starling is blamed for a botched drug raid which results in the deaths of five people. Starling is contacted by Mason Verger, the only surviving victim of the cannibalistic serial killer Hannibal Lecter, who has been missing since escaping custody during the Gumb investigation.', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Hannibal_movie_poster.jpg', Genre: 'Thriller', Director: 'Ridley Scott' },
    { _id: 3, Title: 'The 40-Year-Old Virgin', Description: 'Andy Stitzer is a shy 40-year-old introvert who works as a stock supervisor at electronics store Smart Tech. He gave up trying to have sex after various failed attempts and lives alone in an apartment with a collection of action figures and video games. When a conversation at a poker game with his co-workers David, Jay, and Cal turns to past sexual exploits, they learn that he secretly is still a virgin.', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/4/43/40-Year-OldVirginMoviePoster.jpg', Genre: 'Comedy', Director: 'Judd Apatow' }
];


export default class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: movies,
            selectedMovie: null
        };
    }


    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }




    render() {
        const { movies, selectedMovie } = this.state;

        if (movies.length === 0) return <div className="main-view">The list is empty</div>;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    : movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />)
                }
            </div>
        );
    }
}