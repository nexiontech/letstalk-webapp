#!/bin/bash
# AWS CloudShell script to set up DynamoDB tables in Cape Town region

# Set variables
REGION="af-south-1"

echo "Creating DynamoDB tables in $REGION..."

# Create Users table
echo "Creating Users table..."
aws dynamodb create-table \
  --region $REGION \
  --table-name letstalk-users \
  --attribute-definitions \
    AttributeName=idNumber,AttributeType=S \
    AttributeName=email,AttributeType=S \
  --key-schema AttributeName=idNumber,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --global-secondary-indexes \
    "[
      {
        \"IndexName\": \"EmailIndex\",
        \"KeySchema\": [{\"AttributeName\":\"email\",\"KeyType\":\"HASH\"}],
        \"Projection\": {\"ProjectionType\":\"ALL\"}
      }
    ]" \
  --tags Key=Environment,Value=Demo

# Create ServiceRequests table
echo "Creating ServiceRequests table..."
aws dynamodb create-table \
  --region $REGION \
  --table-name letstalk-service-requests \
  --attribute-definitions \
    AttributeName=requestId,AttributeType=S \
    AttributeName=idNumber,AttributeType=S \
    AttributeName=createdAt,AttributeType=S \
    AttributeName=status,AttributeType=S \
    AttributeName=serviceType,AttributeType=S \
  --key-schema AttributeName=requestId,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --global-secondary-indexes \
    "[
      {
        \"IndexName\": \"UserRequestsIndex\",
        \"KeySchema\": [
          {\"AttributeName\":\"idNumber\",\"KeyType\":\"HASH\"},
          {\"AttributeName\":\"createdAt\",\"KeyType\":\"RANGE\"}
        ],
        \"Projection\": {\"ProjectionType\":\"ALL\"}
      },
      {
        \"IndexName\": \"StatusIndex\",
        \"KeySchema\": [
          {\"AttributeName\":\"status\",\"KeyType\":\"HASH\"},
          {\"AttributeName\":\"createdAt\",\"KeyType\":\"RANGE\"}
        ],
        \"Projection\": {\"ProjectionType\":\"ALL\"}
      },
      {
        \"IndexName\": \"ServiceTypeIndex\",
        \"KeySchema\": [
          {\"AttributeName\":\"serviceType\",\"KeyType\":\"HASH\"},
          {\"AttributeName\":\"createdAt\",\"KeyType\":\"RANGE\"}
        ],
        \"Projection\": {\"ProjectionType\":\"ALL\"}
      }
    ]" \
  --tags Key=Environment,Value=Demo

# Create CommunityMessages table
echo "Creating CommunityMessages table..."
aws dynamodb create-table \
  --region $REGION \
  --table-name letstalk-community-messages \
  --attribute-definitions \
    AttributeName=messageId,AttributeType=S \
    AttributeName=communityId,AttributeType=S \
    AttributeName=createdAt,AttributeType=S \
    AttributeName=authorIdNumber,AttributeType=S \
  --key-schema AttributeName=messageId,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --global-secondary-indexes \
    "[
      {
        \"IndexName\": \"CommunityTimelineIndex\",
        \"KeySchema\": [
          {\"AttributeName\":\"communityId\",\"KeyType\":\"HASH\"},
          {\"AttributeName\":\"createdAt\",\"KeyType\":\"RANGE\"}
        ],
        \"Projection\": {\"ProjectionType\":\"ALL\"}
      },
      {
        \"IndexName\": \"UserMessagesIndex\",
        \"KeySchema\": [
          {\"AttributeName\":\"authorIdNumber\",\"KeyType\":\"HASH\"},
          {\"AttributeName\":\"createdAt\",\"KeyType\":\"RANGE\"}
        ],
        \"Projection\": {\"ProjectionType\":\"ALL\"}
      }
    ]" \
  --tags Key=Environment,Value=Demo

# Create Notifications table
echo "Creating Notifications table..."
aws dynamodb create-table \
  --region $REGION \
  --table-name letstalk-notifications \
  --attribute-definitions \
    AttributeName=notificationId,AttributeType=S \
    AttributeName=idNumber,AttributeType=S \
    AttributeName=createdAt,AttributeType=S \
    AttributeName=isRead,AttributeType=S \
  --key-schema AttributeName=notificationId,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --global-secondary-indexes \
    "[
      {
        \"IndexName\": \"UserNotificationsIndex\",
        \"KeySchema\": [
          {\"AttributeName\":\"idNumber\",\"KeyType\":\"HASH\"},
          {\"AttributeName\":\"createdAt\",\"KeyType\":\"RANGE\"}
        ],
        \"Projection\": {\"ProjectionType\":\"ALL\"}
      },
      {
        \"IndexName\": \"UnreadNotificationsIndex\",
        \"KeySchema\": [
          {\"AttributeName\":\"idNumber\",\"KeyType\":\"HASH\"},
          {\"AttributeName\":\"isRead\",\"KeyType\":\"RANGE\"}
        ],
        \"Projection\": {\"ProjectionType\":\"ALL\"}
      }
    ]" \
  --tags Key=Environment,Value=Demo

# Create Documents table
echo "Creating Documents table..."
aws dynamodb create-table \
  --region $REGION \
  --table-name letstalk-documents \
  --attribute-definitions \
    AttributeName=documentId,AttributeType=S \
    AttributeName=idNumber,AttributeType=S \
    AttributeName=documentType,AttributeType=S \
    AttributeName=uploadedAt,AttributeType=S \
  --key-schema AttributeName=documentId,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --global-secondary-indexes \
    "[
      {
        \"IndexName\": \"UserDocumentsIndex\",
        \"KeySchema\": [
          {\"AttributeName\":\"idNumber\",\"KeyType\":\"HASH\"},
          {\"AttributeName\":\"uploadedAt\",\"KeyType\":\"RANGE\"}
        ],
        \"Projection\": {\"ProjectionType\":\"ALL\"}
      },
      {
        \"IndexName\": \"DocumentTypeIndex\",
        \"KeySchema\": [
          {\"AttributeName\":\"documentType\",\"KeyType\":\"HASH\"},
          {\"AttributeName\":\"uploadedAt\",\"KeyType\":\"RANGE\"}
        ],
        \"Projection\": {\"ProjectionType\":\"ALL\"}
      }
    ]" \
  --tags Key=Environment,Value=Demo

echo "All DynamoDB tables created successfully!"
echo "Waiting for tables to become active..."

# Wait for tables to be created
aws dynamodb wait table-exists --table-name letstalk-users --region $REGION
aws dynamodb wait table-exists --table-name letstalk-service-requests --region $REGION
aws dynamodb wait table-exists --table-name letstalk-community-messages --region $REGION
aws dynamodb wait table-exists --table-name letstalk-notifications --region $REGION
aws dynamodb wait table-exists --table-name letstalk-documents --region $REGION

echo "All tables are now active and ready to use!"
echo "Table structure:"
echo "1. letstalk-users: Stores user profiles with ID Number as primary key"
echo "2. letstalk-service-requests: Tracks citizen service requests with indexes for querying by user, status, and type"
echo "3. letstalk-community-messages: Stores community forum messages with indexes for community timeline and user posts"
echo "4. letstalk-notifications: Manages user notifications with indexes for unread notifications"
echo "5. letstalk-documents: Stores metadata for user documents with type and user indexes"