
import axios from 'axios' ;

/** export baseUrl  */
export const baseUrl = 'https://bayut.p.rapidapi.com' ;

/**
 * create function fetchApi with URL parameter
 * get request to api 
 * apply headers contains API key
 * store response into data variable
 * return data.
 */

export const fetchApi = async(url) => {
    const {data} = await axios.get(url, {
        headers: { /** get headers from rapidapi bayut api test endpoints */
            'x-rapidapi-host': 'bayut.p.rapidapi.com',
            'x-rapidapi-key': '3abc424682msh2083bf119650bf1p12949ajsn8002a8528241'
          }
    });

    return data ;
}