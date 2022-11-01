import axios from '../axios';

const baseURL = 'http://192.168.1.109:3000';

/*const getPredictions = async (txt) => {
    const configurationObject = {
        method: 'get',
        url: `${baseURL}/movie?name=${txt}`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    };
    console.log(1);
    const res = await axios(configurationObject)
                            .then((response) => {console.log(response.data)})
    console.log(2)
    return res;
                           
    
    
}

const synco = (txt) => {
    return axios.get(`${baseURL}/movie?name=${txt}`)
                .then((response) => response)
}*/


const getPredictions = (txt) => axios.get(`/movie?name=${txt}`)



const MovieService = {
    getPredictions
    
}

export default MovieService;