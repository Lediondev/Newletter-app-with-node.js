const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const { fdatasync } = require("fs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/login.html")
})



app.post("/", function(req, res) {
    const emri1 = req.body.emri;
    const mbiemri1 = req.body.mbiemri;
    const email1 = req.body.email;
    const data = {
        members: [
            {
                email_address: email1,
                status: "subscribed",
                merge_fields: {
                    FNAME: emri1,
                    LNAME: mbiemri1
                }
            }
        ]
       
    }

    
    const jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/6e71d494f8";
    const options = {
        method: "POST",
        auth: "Ledion1:9181b280f477b1f07c4088f05759a143-us14"
    }
   const request =  https.request(url, options, function(response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })

    })

    request.write(jsonData);
    request.end();
})

app.post("/failure", function(req, res) {
    res.redirect("/");
})
app.listen(process.env.PORT || 3000, function() {
    console.log("server started on port 3000")
})





