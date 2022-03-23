import React from 'react'
import useMovieData from '../../hooks/useMovieData'
import { useRouter } from 'next/router'

export default function Movie() {
    const router = useRouter()
    const movieId = router.query.id
    const { isLoading, data, isError, error } = useMovieData(movieId)
    
    if (isLoading) return <p>Loading...</p>
    
    if (isError) return <p>{error.message}</p>

    const { title, poster_path, overview } = data.data

    return (
        <div>
            <h2>{title}</h2>
            <p>{overview}</p>
        </div>
    )
}