const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();
const index = require('./routes/index'); // Handle our requests in routes/index.js
const makePurchase = require('./routes/makePurchase');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public'))); // Expose the public folder
app.set('views', path.join(__dirname, 'views')); // Specify our view folder explicitly
app.engine('html', require('ejs').renderFile);
app.use('/', index); // Serve the index page.
app.use('/makePurchase', makePurchase);
app.listen(3000, function () {
    console.log('Started on port 3000!');
});


//sample URL is http://api.reimaginebanking.com/customers/5995a81dceb8abe24251849e/accounts?key=4e7fe49f0f5ba28b8c28032a43551d7b.
//input parameter is the "customers/5995a81dceb8abe24251849e/accounts" part.
function urlWrap(input) {
    return "http://api.reimaginebanking.com/" + input + "?key=4e7fe49f0f5ba28b8c28032a43551d7b";
}

var customerID = "5995a81dceb8abe24251849e"; //Donald Trump's ID
var request = require('superagent');

// request.get(urlWrap("customers")).end(function (err, res) {
//     if (err || !res.ok) {
//         console.log('Oh no! error');
//     } else {
//         console.log('yay got ' + JSON.stringify(res.body));
//     }
// });

request.post("http://api.reimaginebanking.com/customers/5995a81dceb8abe24251849e/accounts?key=4e7fe49f0f5ba28b8c28032a43551d7b").send({
    "type": "Savings",
    "nickname": "save",
    "rewards": 0,
    "balance": 10000,
    "account_number": "5185139221386420"
}).end();
// request.get(urlWrap("customers")).end(function (err, res) {
//     if (err || !res.ok) {
//         console.log('Oh no! error');
//     } else {
//         console.log('yay got ' + JSON.stringify(res.body));
//     }
// });
// console.log(urlWrap("customers/" + customerID + "/accounts"));
// request.post().send({
//         "first_name": "Donald",
//         "last_name": "Trump",
//         "address": {
//             "street_number": "1600",
//             "street_name": "Pennsylvania Ave",
//             "city": "Washington",
//             "state": "DC",
//             "zip": "20500"
//         }
//     })
//     .end();