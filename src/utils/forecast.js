const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d7bc13ebd5efd1464bce688729c993a8/' + longitude + ',' + latitude

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to find weather service', undefined)
        }else if(body.error){
            callback('Unable to find the location. Service response: ' + body.error, undefined)
        }else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain. Today\'s temprature will vary between ' + body.daily.data[0].temperatureHigh + 'F and ' + body.daily.data[0].temperatureLow + 'F.')
        }
    })
}

module.exports = forecast