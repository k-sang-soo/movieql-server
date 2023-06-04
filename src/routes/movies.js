import { gql, useApolloClient } from '@apollo/client';
import { useEffect, useState } from 'react';

function Movies() {
    const [movies, setMovies] = useState([]);
    const client = useApolloClient();
    useEffect(() => {
        client
            .query({
                query: gql`
                    {
                        allMovies {
                            id
                            title
                        }
                    }
                `,
            })
            .then((res) => setMovies(res.data.allMovies));
    }, [client]);

    return (
        <ul>
            {movies.length > 0 &&
                movies.map((movie) => <li key={movie.id}>{movie.title}</li>)}
        </ul>
    );
}

export default Movies;
