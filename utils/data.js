import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
          name: 'Jane',
          email: 'user@example.com',
          password: bcrypt.hashSync('123456'),
          isAdmin: false,
        },
      ],
    products:[
        {
            name: 'Кольцо с камнем',
            slug:'ring-with-stone',
            category:'rings',
            image:'/images/ring1.jpg',
            price: 5000,
            salePrice:4000,
            countInStock:20,
            description:"необыкновенное кольцо со сверкающим каммнем"
        },
        {
            name: 'Ожерелье',
            slug:'necklace-1',
            category:'necklaces',
            image:'/images/necklace.jpg',
            price: 4000,
            salePrice:3000,
            countInStock:20,
            description:"Очень крутое ожирелье, которое вы просто обязаны купить"
        },
        {
            name: 'Подвеска кролик',
            slug:'pendants-1',
            category:'pendats',
            image:'/images/pendant.jpg',
            price: 3500,
            salePrice:3000,
            countInStock:20,
            description:"Очень крутая подвеска лучший подарок "
        },
        {
            name: 'Серьги',
            slug:'earings',
            category:'earings',
            image:'/images/earing.jpg',
            price: 4500,
            salePrice:4000,
            countInStock:20,
            description:"Очень красивые серьги"
        },
        {
            name: 'Красивый браслет',
            slug:'b12345',
            category:'earings',
            image:'/images/braclet.jpg',
            price: 4500,
            salePrice:4000,
            countInStock:20,
            description:"Серебрянный браслет очень хорошего качества"
        },

    ]
}

export default data