const express=require("express");
const nunjucks=require("nunjucks");
const functions = require('./modules/weatherforecast_mode')
const app=express();
const PORT = 3000


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

// configure
nunjucks.configure('./views', {
    express:app,
    autoscape:true,
    noCache:false,
    watch:true
});

app.get('/', async (req, res) => {
    res.render('index.html')
});

// Getting info from the API using a private API Key then sending the results as JSON to /weatherinfo
app.post('/weatherinfo', async (req, res) => {
    if (req.body.f === 1) {
        const data = await functions.getCurrentWeather(req.body.city);
        res.send(JSON.stringify(data));
    }
    else if (req.body.f === 2) {
        const data = await functions.getFiveDaysForecast(req.body.city);
        res.send(JSON.stringify(data));
    }
});



app.listen(PORT,() => {
    console.log("express server running on ", 3000)
});