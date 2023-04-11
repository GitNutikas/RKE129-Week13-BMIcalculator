const express = require("express");
//const { request } = require("http");
const app = express();

app.set('view engine', 'ejs'); //ejs file location
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));  //static files .js .css 

//created as soon as app get request on to main page, some how processing and as soon as it done will be deleted from cash
app.get('/', (request, response) =>
{
    //response.sendFile(__dirname+'\\index.html')
    response.render('index', {resultToRender: ''}); //go take index.ejs file and also add object to your response
});

//create by app as soon as customer submit form and send us post request
app.post('/bmi',(request, response) => 
{
    //console.log(request.body.height);
    let height = Number(request.body.height)/100;
    let weight = Number(request.body.weight);
    let bmi = (weight/(height*height)).toFixed(2);
    //console.log(bmi);
    let userResult = '';    //created new object
    
    //analyse it and give feedback
    if(bmi < 19) {
        userResult = 'underweight';
    }
    else if (bmi >= 19 && bmi <= 24.9) {
        userResult = 'normal weight';
    }
    else if (bmi >= 25 && bmi <= 29.9) {
        userResult = 'overweight';
    }
    else {
        userResult = 'obese';
    }
    //console.log(userResult);

    let finalResult = {
        userBMI:bmi,
        result:userResult
    };
    response.render('index', {resultToRender: finalResult});
    //response.send(userResult);
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running at ${port} now.`);
})