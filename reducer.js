export const GET_WEATHER='GET_WEATHER'
export const GET_WEATHER_SUCCESS='GET_WEATHER_SUCCESS'
export const GET_WEATHER_FAIL='GET_WEATHER_FAIL'

export default function reducer(state = {data:{list:[], city:{}}, loading: false}, action) {
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


