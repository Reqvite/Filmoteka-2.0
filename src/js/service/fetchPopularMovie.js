import axios from "axios"

const API_KEY = 'e145377b3a98d62607e7dc90339d279b'

 export const fetchPopularMovieWeek = async () => {
    return await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=e145377b3a98d62607e7dc90339d279b')
}

export const fetchPopularMovieDay = async (page) => {
    
    return await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=e145377b3a98d62607e7dc90339d279b&page=${page || 1}`)
}
