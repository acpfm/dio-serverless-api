"use strict";
const AWS = require("aws-sdk");

const fetchMovie = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {id} = event.pathParameters

    let movie;

    try {
        const result = await dynamodb.get({
            TableName: "MoviesTableNew",
            Key: {id}
        }).promise();

        movie = result.Item;

    } catch (error) {
        console.log(error)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(movie),
    };
};

module.exports = {
    handler: fetchMovie,
};
