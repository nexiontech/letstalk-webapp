#!/bin/bash
# AWS CloudShell script to seed DynamoDB tables with sample data

# Set variables
REGION="af-south-1"

echo "Seeding DynamoDB tables in $REGION with sample data..."

# Seed Users table
echo "Seeding Users table..."
aws dynamodb put-item \
  --region $REGION \
  --table-name letstalk-users \
  --item '{
    "idNumber": {"S": "9001015000080"},
    "email": {"S": "john.doe@example.com"},
    "firstName": {"S": "John"},
    "lastName": {"S": "Doe"},
    "phoneNumber": {"S": "+27821234567"},
    "address": {"M": {
      "street": {"S": "123 Main Road"},
      "suburb": {"S": "Rondebosch"},
      "city": {"S": "Cape Town"},
      "postalCode": {"S": "7700"}
    }},
    "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
    "updatedAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"}
  }'

aws dynamodb put-item \
  --region $REGION \
  --table-name letstalk-users \
  --item '{
    "idNumber": {"S": "8502025000081"},
    "email": {"S": "sarah.smith@example.com"},
    "firstName": {"S": "Sarah"},
    "lastName": {"S": "Smith"},
    "phoneNumber": {"S": "+27829876543"},
    "address": {"M": {
      "street": {"S": "45 Oak Avenue"},
      "suburb": {"S": "Claremont"},
      "city": {"S": "Cape Town"},
      "postalCode": {"S": "7708"}
    }},
    "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
    "updatedAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"}
  }'

# Seed ServiceRequests table
echo "Seeding ServiceRequests table..."
aws dynamodb put-item \
  --region $REGION \
  --table-name letstalk-service-requests \
  --item '{
    "requestId": {"S": "SR-'$(date +"%Y-%m-%d")-001'"},
    "idNumber": {"S": "9001015000080"},
    "title": {"S": "Water Leak on Main Road"},
    "description": {"S": "There is a major water leak on Main Road near the intersection with Oak Avenue"},
    "serviceType": {"S": "WATER"},
    "status": {"S": "PENDING"},
    "location": {"M": {
      "latitude": {"N": "-33.9249"},
      "longitude": {"N": "18.4241"},
      "address": {"S": "Main Road, Rondebosch"}
    }},
    "attachments": {"L": [
      {"S": "https://letstalk-documents.s3.af-south-1.amazonaws.com/SR-'$(date +"%Y-%m-%d")-001'/image1.jpg"}
    ]},
    "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
    "updatedAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"}
  }'

aws dynamodb put-item \
  --region $REGION \
  --table-name letstalk-service-requests \
  --item '{
    "requestId": {"S": "SR-'$(date +"%Y-%m-%d")-002'"},
    "idNumber": {"S": "8502025000081"},
    "title": {"S": "Street Light Out"},
    "description": {"S": "Street light not working on Oak Avenue for the past week"},
    "serviceType": {"S": "ELECTRICITY"},
    "status": {"S": "IN_PROGRESS"},
    "location": {"M": {
      "latitude": {"N": "-33.9865"},
      "longitude": {"N": "18.4571"},
      "address": {"S": "45 Oak Avenue, Claremont"}
    }},
    "attachments": {"L": []},
    "createdAt": {"S": "'$(date -u --date="yesterday" +"%Y-%m-%dT%H:%M:%SZ")'"},
    "updatedAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"}
  }'

# Seed CommunityMessages table
echo "Seeding CommunityMessages table..."
aws dynamodb put-item \
  --region $REGION \
  --table-name letstalk-community-messages \
  --item '{
    "messageId": {"S": "MSG-'$(date +"%Y%m%d%H%M%S")-$(shuf -i 1000-9999 -n 1)'"},
    "communityId": {"S": "COM-RONDEBOSCH"},
    "authorIdNumber": {"S": "9001015000080"},
    "authorName": {"S": "John Doe"},
    "content": {"S": "Has anyone else noticed the water pressure issues in Rondebosch this week?"},
    "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"}
  }'

aws dynamodb put-item \
  --region $REGION \
  --table-name letstalk-community-messages \
  --item '{
    "messageId": {"S": "MSG-'$(date +"%Y%m%d%H%M%S")-$(shuf -i 1000-9999 -n 1)'"},
    "communityId": {"S": "COM-CLAREMONT"},
    "authorIdNumber": {"S": "8502025000081"},
    "authorName": {"S": "Sarah Smith"},
    "content": {"S": "The new recycling program in Claremont is working really well!"},
    "createdAt": {"S": "'$(date -u --date="2 hours ago" +"%Y-%m-%dT%H:%M:%SZ")'"}
  }'

# Seed Notifications table
echo "Seeding Notifications table..."
aws dynamodb put-item \
  --region $REGION \
  --table-name letstalk-notifications \
  --item '{
    "notificationId": {"S": "NOTIF-'$(date +"%Y%m%d%H%M%S")-$(shuf -i 1000-9999 -n 1)'"},
    "idNumber": {"S": "9001015000080"},
    "title": {"S": "Service Request Update"},
    "message": {"S": "Your water leak report (SR-'$(date +"%Y-%m-%d")-001') has been received and is being reviewed."},
    "type": {"S": "SERVICE_REQUEST"},
    "referenceId": {"S": "SR-'$(date +"%Y-%m-%d")-001'"},
    "isRead": {"S": "false"},
    "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"}
  }'

aws dynamodb put-item \
  --region $REGION \
  --table-name letstalk-notifications \
  --item '{
    "notificationId": {"S": "NOTIF-'$(date +"%Y%m%d%H%M%S")-$(shuf -i 1000-9999 -n 1)'"},
    "idNumber": {"S": "8502025000081"},
    "title": {"S": "Service Request Update"},
    "message": {"S": "Your street light report (SR-'$(date +"%Y-%m-%d")-002') status has been updated to IN_PROGRESS."},
    "type": {"S": "SERVICE_REQUEST"},
    "referenceId": {"S": "SR-'$(date +"%Y-%m-%d")-002'"},
    "isRead": {"S": "true"},
    "createdAt": {"S": "'$(date -u --date="1 hour ago" +"%Y-%m-%dT%H:%M:%SZ")'"}
  }'

# Seed Documents table
echo "Seeding Documents table..."
aws dynamodb put-item \
  --region $REGION \
  --table-name letstalk-documents \
  --item '{
    "documentId": {"S": "DOC-'$(date +"%Y%m%d%H%M%S")-$(shuf -i 1000-9999 -n 1)'"},
    "idNumber": {"S": "9001015000080"},
    "documentType": {"S": "ID_COPY"},
    "fileName": {"S": "id_document.pdf"},
    "fileSize": {"N": "1245678"},
    "mimeType": {"S": "application/pdf"},
    "s3Key": {"S": "documents/9001015000080/id_document.pdf"},
    "uploadedAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"}
  }'

aws dynamodb put-item \
  --region $REGION \
  --table-name letstalk-documents \
  --item '{
    "documentId": {"S": "DOC-'$(date +"%Y%m%d%H%M%S")-$(shuf -i 1000-9999 -n 1)'"},
    "idNumber": {"S": "8502025000081"},
    "documentType": {"S": "PROOF_OF_RESIDENCE"},
    "fileName": {"S": "utility_bill.pdf"},
    "fileSize": {"N": "987654"},
    "mimeType": {"S": "application/pdf"},
    "s3Key": {"S": "documents/8502025000081/utility_bill.pdf"},
    "uploadedAt": {"S": "'$(date -u --date="2 days ago" +"%Y-%m-%dT%H:%M:%SZ")'"}
  }'

echo "All DynamoDB tables have been seeded with sample data!"