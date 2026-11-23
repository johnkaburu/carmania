export const NavLinks = [
    { id: 1, title: "Inventory", link: "/cars", Alt: "Browse our stock" },
    { id: 2, title: "Trade In", link: "/TradeIn", Alt: "Trade in your car" },
    { id: 3, title: "Insurance", link: "/Insuarance", Alt: "Car insurance" },
    { id: 4, title: "About", link: "/About", Alt: "About us" },
    { id: 5, title: "Contact", link: "/Contact", Alt: "Contact us" },
]

import car1 from '../assets/car-dark.png'
import car2 from '../assets/car-light.png'
import car3 from '../assets/cardark.png'
import car4 from '../assets/carlight.png'
import car5 from '../assets/carousel1.jpg'
import car6 from '../assets/carsoko.png'
import car7 from '../assets/sclasslight.jpg'
import car8 from '../assets/car-dark.png'
import car9 from '../assets/car-light.png'
import car10 from '../assets/cardark.png'

// Placeholder logos - using the carsoko.png as default for all brands
import Logo from '../assets/carsoko.png'

// Placeholder body types - using carsoko.png as default
import BodyType from '../assets/carsoko.png'

export const Body = [
    {
        id:1,
        name:"convertible",
        logo:BodyType
    },
    {
        id:2,
        name:"Coupe",
        logo:BodyType
    },
    {
        id:3,
        name:"CrossOver",
        logo:BodyType
    },
    {
        id:4,
        name:"Hatchback",
        logo:BodyType
    },
    {
        id:5,
        name:"Pickup",
        logo:BodyType
    },
    {
        id:6,
        name:"Sedan",
        logo:BodyType
    },
    {
        id:7,
        name:"SUV",
        logo:BodyType
    },
    {
        id:8,
        name:"Van",
        logo:BodyType
    },
    {
        id:9,
        name:"Wagon",
        logo:BodyType
    }
]
export const Brands = [
    {
        id:1,
     name:"audi",
     logo:Logo
    },
    {
        id:2,
        name:"BMW",
        logo:Logo
       },
       {
        id:3,
        name:"Honda",
        logo:Logo
       },
       {
        id:4,
        name:"Jaguar",
        logo:Logo
       },
       {
        id:5,
        name:"KIA",
        logo:Logo
       },
       {
        id:6,
        name:"Land Rover",
        logo:Logo
       },
       {
        id:7,
        name:"Lexus",
        logo:Logo
       },
       {
        id:8,
        name:"Mercedes",
        logo:Logo
       },
       {
        id:9,
        name:"Nissan",
        logo:Logo
       },
       {
        id:10,
        name:"Porsche",
        logo:Logo
       },
       {
        id:11,
        name:"Subaru",
        logo:Logo
       },
       {
        id:12,
        name:"Tesla",
        logo:Logo
       },
       {
        id:13,
        name:"Toyota",
        logo:Logo
       },
       {
        id:14,
        name:"Others",
        logo:Logo
       },

 ]


export const Cars = [
    {
        id:1,
        name:"Ferrari f12",
        price:"3,000,000",
        brand:Logo,
        model:"saloon",
        image:car1,
        color:"white",
        cc:5000,
        fuel:"petrol",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste reiciendis, eos dolorem maxime laudantium dicta!",
        transmission:"automatic"
    },
    {
        id:2,
        name:"mazerati",
        price:"1,000,000",
        brand:Logo,
        model:"saloon",
        image:car2,
        color:"white",
        cc:2000,
        fuel:"petrol",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste reiciendis, eos dolorem maxime laudantium dicta!",
        transmission:"automatic"
    },
    {
        id:3,
        name:"Nissan gtr",
        price:"3,000,000",
        brand:Logo,
        model:"saloon",
        image:car3,
        color:"white",
        cc:5000,
        fuel:"petrol",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste reiciendis, eos dolorem maxime laudantium dicta!",
        transmission:"automatic"
    },
    {
        id:4,
        name:"mercedes G wagon",
        price:"2,000,000",
        brand:Logo,
        model:"saloon",
        image:car4,
        color:"grey",
        cc:2000,
        fuel:"petrol",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste reiciendis, eos dolorem maxime laudantium dicta!",
        transmission:"automatic"
    },
    {
        id:5,
        name:"Bugatti Chiron",
        price:"10,000,000",
        brand:Logo,
        model:"saloon",
        image:car5,
        color:"silver",
        cc:7000,
        fuel:"petrol",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste reiciendis, eos dolorem maxime laudantium dicta!",
        transmission:"automatic"
    },
    {
        id:6,
        name:"mercedes benz C200",
        price:"3,000,000",
        brand:Logo,
        model:"saloon",
        image:car6,
        color:"white",
        cc:1500,
        fuel:"petrol",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste reiciendis, eos dolorem maxime laudantium dicta!",
        transmission:"automatic"
    },
    {
        id:7,
        name:"mercedes benz C180",
        price:"3,000,000",
        brand:Logo,
        model:"saloon",
        image:car7,
        color:"Blue",
        cc:2000,
        fuel:"petrol",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste reiciendis, eos dolorem maxime laudantium dicta!",
        transmission:"automatic"
    },
    {
        id:8,
        name:"AMG black series",
        price:"5,000,000",
        brand:Logo,
        model:"saloon",
        image:car8,
        color:"white",
        cc:4000,
        fuel:"petrol",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste reiciendis, eos dolorem maxime laudantium dicta!",
        transmission:"automatic"
    },
    {
        id:9,
        name:"Ferrari 458",
        price:"5,000,000",
        brand:Logo,
        model:"saloon",
        image:car9,
        color:"red",
        cc:2000,
        fuel:"petrol",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste reiciendis, eos dolorem maxime laudantium dicta!",
        transmission:"automatic"
    },
    {
        id:10,
        name:"mercedes benz s550",
        price:"4,500,000",
        brand:Logo,
        model:"saloon",
        image:car10,
        color:"black",
        cc:3000,
        fuel:"petrol",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste reiciendis, eos dolorem maxime laudantium dicta!",
        transmission:"automatic"
    }
]
