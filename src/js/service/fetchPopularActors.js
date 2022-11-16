import axios from "axios"

const API_KEY = 'e145377b3a98d62607e7dc90339d279b'

 export const fetchPopularActors = async () => {
    return await axios.get('https://api.themoviedb.org/3/person/popular?api_key=e145377b3a98d62607e7dc90339d279b&language=en-US&page=1')
}


