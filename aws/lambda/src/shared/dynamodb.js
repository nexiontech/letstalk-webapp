/**
 * Shared DynamoDB utilities for Lambda functions
 */
const AWS = require('aws-sdk');

// Initialize DynamoDB client
const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.REGION || 'af-south-1'
});

/**
 * Get an item from DynamoDB
 * @param {string} tableName - The DynamoDB table name
 * @param {Object} key - The key of the item to get
 * @returns {Promise<Object>} - The item from DynamoDB
 */
const getItem = async (tableName, key) => {
  const params = {
    TableName: tableName,
    Key: key
  };
  
  const result = await dynamoDB.get(params).promise();
  return result.Item;
};

/**
 * Put an item in DynamoDB
 * @param {string} tableName - The DynamoDB table name
 * @param {Object} item - The item to put
 * @returns {Promise<Object>} - The result from DynamoDB
 */
const putItem = async (tableName, item) => {
  const params = {
    TableName: tableName,
    Item: item
  };
  
  return dynamoDB.put(params).promise();
};

/**
 * Update an item in DynamoDB
 * @param {string} tableName - The DynamoDB table name
 * @param {Object} key - The key of the item to update
 * @param {Object} updates - The updates to apply
 * @returns {Promise<Object>} - The result from DynamoDB
 */
const updateItem = async (tableName, key, updates) => {
  // Build update expression and attribute values
  let updateExpression = 'SET ';
  const expressionAttributeValues = {};
  const expressionAttributeNames = {};
  
  Object.entries(updates).forEach(([field, value], index) => {
    const prefix = index === 0 ? '' : ', ';
    const attributeName = `#${field}`;
    const attributeValue = `:${field}`;
    
    updateExpression += `${prefix}${attributeName} = ${attributeValue}`;
    expressionAttributeValues[attributeValue] = value;
    expressionAttributeNames[attributeName] = field;
  });
  
  const params = {
    TableName: tableName,
    Key: key,
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ExpressionAttributeNames: expressionAttributeNames,
    ReturnValues: 'ALL_NEW'
  };
  
  const result = await dynamoDB.update(params).promise();
  return result.Attributes;
};

/**
 * Delete an item from DynamoDB
 * @param {string} tableName - The DynamoDB table name
 * @param {Object} key - The key of the item to delete
 * @returns {Promise<Object>} - The result from DynamoDB
 */
const deleteItem = async (tableName, key) => {
  const params = {
    TableName: tableName,
    Key: key,
    ReturnValues: 'ALL_OLD'
  };
  
  const result = await dynamoDB.delete(params).promise();
  return result.Attributes;
};

/**
 * Query items from DynamoDB
 * @param {string} tableName - The DynamoDB table name
 * @param {string} keyConditionExpression - The key condition expression
 * @param {Object} expressionAttributeValues - The expression attribute values
 * @param {Object} expressionAttributeNames - The expression attribute names
 * @param {string} indexName - Optional index name
 * @returns {Promise<Array>} - The items from DynamoDB
 */
const queryItems = async (tableName, keyConditionExpression, expressionAttributeValues, expressionAttributeNames, indexName = null) => {
  const params = {
    TableName: tableName,
    KeyConditionExpression: keyConditionExpression,
    ExpressionAttributeValues: expressionAttributeValues
  };
  
  if (expressionAttributeNames) {
    params.ExpressionAttributeNames = expressionAttributeNames;
  }
  
  if (indexName) {
    params.IndexName = indexName;
  }
  
  const result = await dynamoDB.query(params).promise();
  return result.Items;
};

/**
 * Scan items from DynamoDB
 * @param {string} tableName - The DynamoDB table name
 * @param {string} filterExpression - Optional filter expression
 * @param {Object} expressionAttributeValues - Optional expression attribute values
 * @param {Object} expressionAttributeNames - Optional expression attribute names
 * @returns {Promise<Array>} - The items from DynamoDB
 */
const scanItems = async (tableName, filterExpression = null, expressionAttributeValues = null, expressionAttributeNames = null) => {
  const params = {
    TableName: tableName
  };
  
  if (filterExpression) {
    params.FilterExpression = filterExpression;
  }
  
  if (expressionAttributeValues) {
    params.ExpressionAttributeValues = expressionAttributeValues;
  }
  
  if (expressionAttributeNames) {
    params.ExpressionAttributeNames = expressionAttributeNames;
  }
  
  const result = await dynamoDB.scan(params).promise();
  return result.Items;
};

module.exports = {
  getItem,
  putItem,
  updateItem,
  deleteItem,
  queryItems,
  scanItems
};
