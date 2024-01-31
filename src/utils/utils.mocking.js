import {faker} from '@faker-js/faker'

export const generateProduct = () => {
    return{
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        category: faker.commerce.department(),
        code: faker.string.alphanumeric({length:10}),
        stock: faker.string.numeric(),
        statusP:faker.datatype.boolean({probability: 1}),
        thumbnail: faker.image.url()
    }
}