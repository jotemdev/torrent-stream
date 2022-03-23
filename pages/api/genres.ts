import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { getGenreUrl } from '../../data/apiVars';

const getGenres = async () => {
    try {
        const response = await axios.get(getGenreUrl('movie'))
        return response.data
    }
    catch (error) {
        return error
    }
}

type Data = {
  genres: Array<{
    id: number
    name: string
    }>
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    getGenres().then(data => {
        res.status(200).json(data.genres)
    })
}
