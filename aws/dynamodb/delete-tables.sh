#!/bin/bash
# AWS CloudShell script to delete DynamoDB tables

# Set variables
REGION="af-south-1"

echo "WARNING: This script will delete all Let's Talk DynamoDB tables in $REGION."
echo "This action cannot be undone and all data will be lost."
read -p "Are you sure you want to continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Operation cancelled."
    exit 1
fi

# Delete tables
echo "Deleting DynamoDB tables in $REGION..."

echo "Deleting Users table..."
aws dynamodb delete-table --table-name letstalk-users --region $REGION

echo "Deleting ServiceRequests table..."
aws dynamodb delete-table --table-name letstalk-service-requests --region $REGION

echo "Deleting CommunityMessages table..."
aws dynamodb delete-table --table-name letstalk-community-messages --region $REGION

echo "Deleting Notifications table..."
aws dynamodb delete-table --table-name letstalk-notifications --region $REGION

echo "Deleting Documents table..."
aws dynamodb delete-table --table-name letstalk-documents --region $REGION

echo "All DynamoDB tables deletion initiated."
echo "Waiting for tables to be deleted..."

# Wait for tables to be deleted
aws dynamodb wait table-not-exists --table-name letstalk-users --region $REGION
aws dynamodb wait table-not-exists --table-name letstalk-service-requests --region $REGION
aws dynamodb wait table-not-exists --table-name letstalk-community-messages --region $REGION
aws dynamodb wait table-not-exists --table-name letstalk-notifications --region $REGION
aws dynamodb wait table-not-exists --table-name letstalk-documents --region $REGION

echo "All tables have been successfully deleted."