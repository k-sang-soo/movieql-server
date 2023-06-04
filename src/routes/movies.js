import { gql, useApolloClient, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

const ALL_MOVIES = gql`
    query {
        allMovies {
            id
            title
        }
        allTweets {
            id
            text
            author {
                fullName
            }
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
                    <li key={movie.id}>{movie.title}</li>
                ))}
            </ul>
            <h1>Tweet</h1>
            {data.allTweets.map((tweet) => (
                <li key={tweet.id}>
                    {tweet.text} /by: {tweet.author.fullName}
                </li>
            ))}
        </div>
    );
}

export default Movies;
