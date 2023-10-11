import request from "postman-request";
import "dotenv/config"
import yargs from "yargs/yargs"
import {hideBin} from "yargs/helpers"
const API_KEY = process.env.OPENWEATHER_API_KEY

const forecast = (lat,lon, callback)=>{
    request(
        {url: `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`, json:true,},
        (error, response, body)=>{
            if(error){
                callback("Can't find forecast")
            }else if( body.length === 0){
                callback("Can't find")
            }
            else{
                callback(body)
            }
        }
        )
}

export {forecast}