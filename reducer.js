export const GET_WEATHER='weather/GET';
export const GET_WEATHER_SUCCESS='weather/GET_SUCCESS';
export const GET_WEATHER_FAIL='weather/GET_FAIL';
export const APP_ID='b6907d289e10d714a6e88b30761fae22';

export default function reducer(state = {repos:[]}, action) {
    switch(action.type) {
        case GET_WEATHER:
            return {...state, loading: true};
        case GET_WEATHER_SUCCESS:
            return {...state, loading: false, data: action.payload.data};
        case GET_WEATHER_FAIL:
            return {...state, loading: false, error: 'Error while fetching repositories'};
        default:
            return state;
    }
}

export function getWeather(zipcode, country = 'us') {
    return {
        type: GET_WEATHER,
        payload: {
            request: {
                url: `/forecast?zip=${zipcode},${country}&appid=${APP_ID}`
            }
        }
    };
}

// findCities() {
//     server.get('/forecast?zip=94040,us&appid=b6907d289e10d714a6e88b30761fae22')
//       .then((response) => {
//         this.setState({city:response.data.city.name})
//         console.log('res========')
//         console.log(response)
//         // var res = JSON.stringify(response)
//         // console.log(res)
//         console.log(response.data)
//         this.setState({data:response.data.list})
//       })      
//       .catch((err) => {
//         console.log('error='+err)
//         this.setState({error:err.message})
//       })
//   }