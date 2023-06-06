import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import client from './../client';

//Apollo Client 쿼리에는 스키마에 정의되지 않은 로컬 전용 필드를 포함 시킬 수 있음
//@client 지시문은 로컬 전용 필드임을 Apollo Client에 알림
//이렇게 저장된 데이터는 Apollo cache에 저정 (브라우저 메모리)
const GET_MOVIE = gql`
    query getMovie($movieId: String!) {
        movie(id: $movieId) {
            id
            title
            isLiked @client
        }
    }
`;

function Movie() {
    const { id } = useParams();
    const {
        data,
        loading,
        client: { cache },
    } = useQuery(GET_MOVIE, {
        variables: {
            movieId: id,
        },
    });

    // cache data 변경하는 방법
    const onClick = () => {
        cache.writeFragment({
            id: `Movie:${id}`,
            fragment: gql`
                fragment MovieFragment on Movie {
                    isLiked
                }
            `,
            data: {
                isLiked: !data.movie.isLiked,
            },
        });
    };

    if (loading) {
        return <h1>Fetching Movie...</h1>;
    }
    return (
        <div>
            <p>{data.movie.title}</p>
            <button onClick={onClick}>
                {data.movie.isLiked ? 'Unlike' : 'Like'}
            </button>
        </div>
    );
}

export default Movie;
