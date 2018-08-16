import axios from 'axios'
import reducer from './reducer'
import {createStore, applyMiddleware} from 'redux'
import axiosMiddleware from 'redux-axios-middleware'
import {GET_WEATHER} from './reducer'

export const APP_ID='b6907d289e10d714a6e88b30761fae22'

const client = axios.create({
    baseURL: 'https://samples.openweathermap.org/data/2.5',
    responseType: 'json'
  });

export const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

export const getWeather = (zipcode, country = 'us') => {
    return {
        type: GET_WEATHER,
        payload: {
            request: {
                url: `/forecast?zip=${zipcode},${country}&appid=${APP_ID}`
            }
        }
    };
  }