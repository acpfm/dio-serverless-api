"use strict";

const {v4} = require("uuid");
const AWS = require("aws-sdk")

const insertMovie = async (event) => {
    const {movie} = JSON.parse(event.body);
    const createdAt = new Date().toISOString();
    const id = v4();

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const newMovie = {
        id,
        movie,
        createdAt,
        movieStatus: false
    };

    await dynamodb.put({
        TableName: "MoviesTableNew",
        Item: newMovie
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify(newMovie),
    };
};

module.exports = {
    handler:insertMovie
}