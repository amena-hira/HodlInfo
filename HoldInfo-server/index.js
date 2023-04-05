const express = require('express');
const cors = require('cors');
const request = require('request');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cwbwt8c.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


console.log(uri)

async function run() {
    const tickersCollection = client.db('hodlInfo').collection('tickers');

    app.get('/api/data', (req, res) => {
        const url = 'https://api.wazirx.com/api/v2/tickers';
        const limit = 10;
        request(url, (error, response, body) => {
            if (error) {
                console.error(error);
                return res.status(500).send('An error occurred');
            }
    
            const data = JSON.parse(body);

            let tickersData = [];
            
            // Store the data in a variable
            const myData = data;
            Object.entries(myData).slice(0,10).map(item=>{
                console.log(item)
                console.log(item[1].last)
                const postData ={
                    name: item[0],
                    last: item[1].last,
                    sell: item[1].sell,
                    buy: item[1].buy,
                    volume: item[1].volume,
                    base_unit: item[1].base_unit
    
                }
                const result = tickersCollection.insertOne(postData);
            })
    
            res.send(data);
        });
    });

    app.get('/tickersData', async (req, res) => {
        const query = {};
        const result = await tickersCollection.find(query).toArray();
        res.send(result)
    })
}
run().catch(error => console.log(error));
app.get('/', async (req, res) => {
    res.send('HodlInfo server is running');
})

app.listen(port, () => console.log(`HodlInfo running on ${port}`))