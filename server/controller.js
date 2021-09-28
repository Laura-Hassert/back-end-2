const houses = require('./db.json');
let id = 4

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses)
    },

    deleteHouse: (req, res) => {
        const { id } = req.params;

        const tgtIndex = houses.findIndex(function(houseObj) {
            return houseObj.id === parseInt(id);
        })

        if (tgtIndex === -1) {
            res.status(404).send('House not found')
        } else {
            houses.splice(tgtIndex, 1);
            res.status(200).send(houses);
        }
    
    },

    createHouse: (req, res) => {
        const { address, price, imageURL } = req.body;
        let newHouse = {
            id,
            address,
            price,
            imageURL
        }

        houses.push(newHouse)
        res.status(200).send(houses)
        id++
    },

    updateHouse: (req, res) => {
        const { id } = req.params;
        const { type } = req.body;

        const tgtIndex = houses.findIndex(function(houseObj) {
            return houseObj.id === parseInt(id);
        })
        const tgtHouseObj = houses[tgtIndex];

        if (type === 'plus') {
            tgtHouseObj.price += 10000;
            res.status(200).send(houses);
        } else if (type === 'minus') {
            if (tgtHouseObj.price > 10000) {
                tgtHouseObj.price -= 10000;
             } else { 
                 tgtHouseObj.price = 0;
             } res.status(200).send(houses)
        } else {
            res.status(400).send('Something went wrong...')
        }
    }

}