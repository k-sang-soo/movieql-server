import { gql, useApolloClient, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ALL_MOVIES = gql`
    query getAllMovies {
        allMovies {
            id
            title
        }
    }
`;

function Movies() {
    const { data, loading, error } = useQuery(ALL_MOVIES);
    if (loading) {
        return <h1>Loading...</h1>;
    }
    if (error) {
        return <h1>Could not fetch :</h1>;
    }
    return (
        <div>
            <h1>Movies</h1>
            <ul>
                {data.allMovies.map((movie) => (
                    <li key={movie.id}>
                        <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Movies;
