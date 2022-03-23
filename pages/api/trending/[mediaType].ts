import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { getTrendingUrl } from '../../../data/apiVars'

const getTrending = async ( mediaType: 'movie' | 'tv' | 'person' | 'all' ) => {
    try {
        const response = await axios.get(getTrendingUrl(mediaType))
        return response.data
    }
    catch (error) {
        return error
    }
}

type Data = {
    page: number,
    results: Array<{
        poster_path: string | null,
        original_title: string,
        overview: string,
        release_date: string,
        vote_count: number,
        vote_average: number,
        id: number,
        backdrop_path: string | null,
        original_language: string,
        title: string,
        video: boolean,
    }>,
    total_results: number,
    total_pages: number,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    
    const { mediaType } = req.query
    getTrending(mediaType).then(data => {
        res.status(200).json(data)
    })
}
