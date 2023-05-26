"use strict";
const AWS = require("aws-sdk");

const fetchMovies = async (event) => {  
      const dynamodb = new AWS.DynamoDB.DocumentClient();
  
      let movies;
  
      try {
          const results = await dynamodb.scan({
              TableName: "MoviesTableNew"
          }).promise();
  
          movies = results.Items;
  
      } catch (error) {
          console.log(error)
      }
  
      return {
          statusCode: 200,
          body: JSON.stringify(movies),
      };
  };
  
  module.exports = {
      handler: fetchMovies,
  };