import request from "postman-request"
import "dotenv/config"
import yargs from "yargs/yargs"
import {hideBin} from "yargs/helpers"

const API_KEY = process.env.OPENWEATHER_API_KEY

const geocode = (address, callback)=>{
    request({
        url: `http://api.openweathermap.org/geo/1.0/direct?q=${address}&limit=5&appid=${API_KEY}`, json: true
    },
    (error, response, body)=>{
        if(body.length === 0){
            callback(body)
        }
        else if(error){
            callback("Can't find location")
        }
        else{
            callback(
                {lat : body[0].lat,
                lon : body[0].lon,
                name: body[0].name}
            )
        }
        
    })
}

export {geocode}