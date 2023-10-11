
import express from "express"
import { dirname } from 'path';
import path from 'path'
import { fileURLToPath } from 'url';
import hbs from "hbs"
import { geocode } from "./utils/geocode.js";
import { forecast } from "./utils/forecast.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

console.log(fileURLToPath(import.meta.url))
const app = express()


const publicPathDir = (path.join(__dirname, "../public"))
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")


app.set("view engine","hbs")
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up statis directory to serve
app.use(express.static(publicPathDir))

app.get('', (req, res)=>{
    res.render('index',
    {
        "title": "Home"
    })
})
app.get("/weather", (req, res)=>{
    if(!req.query.location){
        return res.send(
        {
            "error": "no address"
        })
    }
    geocode(req.query.location, ({lat, lon, name})=>{
        if(typeof data == 'string'){
            console.log(data)
        }
        else{
            forecast(lat, lon, (forecastData)=>{

                res.send(
                {
                    "title": 'Weatherasd',
                    "data": forecastData
                })
            })
        }
        
    })
    
})
app.get("/about", (req, res)=>{
    res.render("about",
    {
        'title': 'About'
    })
})
app.get('*', (req, res)=>{
    res.render("404",
    {
        'errorMessage' :"Page not found title"
    })
})

app.listen(3000, ()=>{
    console.log("server is up in port 3000")
})