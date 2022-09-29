const { ObjectId } = require('bson');
const fs = require('fs');
const path = require('path');
const Product = require ('./model');

//============== Search ================
const index =  async (req, res) => {
    const {q} = req.query;
    const keys = ["name", "price"];
    const search = (data) => {
        return data.filter((item) => 
            keys.some((key) => item[key].toString().toLowerCase().includes(q))
        );
    };

    let data = await Product.find()
    try{
        res.send(search(data));
    }
    catch{
        res.send(err);
    }
}

//============== Read ================
const view =  (req, res) => {
    const {id} = req.params;
    Product.find({ _id: ObjectId(id) })
        .then(result => res.send(result))
        .catch(error => res.send(error));
}

//============== Delete ================
const destroy = (req,res) => {
    const {id} = req.params;
    Product.deleteOne({ _id: ObjectId(id) })
        .then(result => res.send(result))
        .catch(error => res.send(error))
};

//============== Create ================
const store =  (req, res) => {
    const {name, price, stock, status} = req.body;
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.filename + '-' + image.originalname);
        fs.renameSync(image.path, target);
        Product.create({
            name, 
            price, 
            stock, 
            status, 
            image_url: `http://localhost:3030/public/${image.originalname}`
        })
        .then(result => res.send(result))
        .catch(error => res.send(error));
    }else{
        Product.create({
            name, 
            price, 
            stock, 
            status
        })
        .then(result => res.send(result))
        .catch(error => res.send(error));
    };
}

//============== Update ================
const update = (req, res) => {
    const {id} = req.params;
    const {name, price, stock, status} = req.body;
    const image = req.file;

    if(image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        Product.updateOne({
            _id: ObjectId(id)
        }, {$set: {
            name: name, 
            price: price, 
            stock: stock, 
            status: status
            }, image_url: `http://localhost:3030/public/${image.originalname}`
        })
            .then(result => res.send(result))
            .catch(error => res.send(error));
    }else {
        Product.updateOne({
            _id: ObjectId(id)
        }, {$set: {
            name: name, 
            price: price, 
            stock: stock, 
            status: status
            }
        })
            .then(result => res.send(result))
            .catch(error => res.send(error));
    };
};


module.exports = {
    index,
    view,
    store,
    update,
    destroy
};