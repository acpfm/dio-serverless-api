"use strict";

const AWS = require("aws-sdk")

const updateMovie = async (event) => {

  const {movieStatus} = JSON.parse(event.body);
  const {id} = event.pathParameters

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  await dynamodb.update({
    TableName: "MoviesTableNew",
    Key: {id},
    UpdateExpression: 'set movieStatus = :movieStatus',
    ExpressionAttributeValues: {
      ':movieStatus': movieStatus
    },
    ReturnValues: "ALL_NEW"
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(
      { msg: 'Movie updated'}
    ),
  };
};


module.exports = {
    handler:updateMovie
}