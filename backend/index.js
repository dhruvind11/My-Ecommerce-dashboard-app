const express = require('express');
require('./db/config');
const User = require('./db/User');
const Product = require('./db/product');
const cors = require('cors');
const product = require('./db/product');
const app = express();
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';
const bcrypt = require('bcrypt');
app.use(express.json())
app.use(cors());

app.post('/register', async(req, res) => {
    try {
        console.log(req.body);
        let data = new User(req.body);

        let result = await data.save();
        result = result.toObject();
        delete result.password;
        Jwt.sign({ result }, jwtKey, { expiresIn: "1h" }, (err, token) => {
            if (err) {
                res.send("something went wrong");
            }
            res.send({ result, auth: token });
        })
    } catch (error) {
        console.log(error);
    }

});

app.post('/login', async(req, res) => {
    try {
        console.log(req.body);
        if (req.body.email && req.body.password) {
            let data = await User.findOne(req.body);
            const isMatch = await bcrypt.compare(req.body.password, data.password);
            let data1 = data.select("-password");
            if (data1) {
                // Jwt.sign({ data }, jwtKey, { expiresIn: "1h" }, (err, token) => {
                //     if (err) {
                //         res.send("something went wrong");
                //     }
                //     res.send({ data, auth: token });
                // })
                res.send(data1);

            } else {
                res.send({ result: 'no match' });
            }
        } else {
            res.send("no user found");
        }
    } catch (error) {
        res.status(400).send(error);
    }

});

app.post('/addProduct', async(req, res) => {
    console.log(req.body);
    let data = new Product(req.body);
    let result = await data.save();
    console.log(result);
    res.send(result);
});

app.get('/product', async(req, res) => {
    let data = await product.aggregate([{
        $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user"
        }
    }]);
    if (data.length > 0) {
        res.send(data);
    } else {
        res.send("no product found");
    }
});

app.delete('/product/:id', async(req, res) => {

    const data = await product.deleteOne({ _id: req.params.id });
    res.send(data);
});

app.get('/product/:id', async(req, res) => {
    const result = await product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.send({ result: "no result found" });
    }
});

app.put('/product/:id', async(req, res) => {
    console.log(req.body.data);
    const result = await product.updateOne({ _id: req.params.id }, {
        $set: req.body
    })
    res.send(result);
});

app.get("/search/:key", async(req, res) => {
    let result = await product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { company: { $regex: req.params.key } }
        ]
    })
    res.send(result);
});

function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        // token.split("|");
        console.log(token);
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                res.status(401).send("please provide valid token")
            } else {
                next();
            }
        })
    } else {
        res.status(403).send("please add token");
    }



}
app.listen(5000);