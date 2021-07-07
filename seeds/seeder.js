const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 500; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*30) + 10;
        const camp = new Campground({
            author: '6010b93a2cb7f46608016b69',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: 
                [   
                    { 
                        url: 'https://res.cloudinary.com/dr122c4es/image/upload/v1612408572/YelpCamp/nnln4akqysslnlyqxnj8.jpg',
                        filename: 'YelpCamp/nnln4akqysslnlyqxnj8' 
                    },
                    {
                        url: 'https://res.cloudinary.com/dr122c4es/image/upload/v1612408574/YelpCamp/vyc1qsgdxcdy2hcv2bmc.jpg',
                        filename: 'YelpCamp/vyc1qsgdxcdy2hcv2bmc' 
                    },
                    {
                    url: 'https://res.cloudinary.com/dr122c4es/image/upload/v1612408577/YelpCamp/a9mnszsantsxdrfgxnse.jpg',
                    filename: 'YelpCamp/a9mnszsantsxdrfgxnse' 
                    }
                ],
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique mollitia blanditiis assumenda pariatur consectetur iusto molestias aliquam perferendis officiis sunt id, officia rerum atque ipsam aliquid porro a nobis dolorem sapiente. Sapiente at sequi laborum itaque doloremque quisquam dolorum tempore! Inventore tempora debitis dolore animi saepe ratione dolor ipsam id!' ,
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                 ] 
            }
            
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})