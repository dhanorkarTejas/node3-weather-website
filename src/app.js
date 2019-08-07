const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine to read data from correct location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup the default path of the resources
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather APP',
        name: 'Tejas Dhanorkar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Tejas Dhanorkar'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Dynamic help page',
        msg: 'This is the help page',
        name: 'Tejas Dhanorkar'
    })
})
// The below will not be called as the default root will be used by the above line to set response
app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'An address query parameter is required.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, data) => {
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                forecast: data,
                location,
                address: req.query.address
            })
        })
    })
 /*    res.send({
        forecast: 'Its going to rain heavily.',
        location: 'Chicago',
        address: req.query.address
    }) */
})


app.get('/products', (req, res) => {
    if(!req.query.search){
       return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'HELP - 404',
        msg: 'Help article not found.',
        name: 'Tejas Dhanorkar'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'GENERIC - 404',
        msg: 'Page not found.',
        name: 'Tejas Dhanorkar'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})