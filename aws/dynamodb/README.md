# DynamoDB Tables for Let's Talk Citizen App

This directory contains scripts for setting up and managing DynamoDB tables for the Let's Talk citizen application.

## Table Structure

The database consists of five main tables:

1. **letstalk-users**
   - Primary key: `idNumber` (South African ID number)
   - GSI: `EmailIndex` for email-based lookups
   - Stores user profiles and authentication information

2. **letstalk-service-requests**
   - Primary key: `requestId`
   - GSIs:
     - `UserRequestsIndex` (idNumber, createdAt) - For retrieving a user's service requests
     - `StatusIndex` (status, createdAt) - For filtering requests by status
     - `ServiceTypeIndex` (serviceType, createdAt) - For filtering by service type
   - Tracks citizen service requests and their statuses

3. **letstalk-community-messages**
   - Primary key: `messageId`
   - GSIs:
     - `CommunityTimelineIndex` (communityId, createdAt) - For community message feeds
     - `UserMessagesIndex` (authorIdNumber, createdAt) - For user's message history
   - Stores community forum messages

4. **letstalk-notifications**
   - Primary key: `notificationId`
   - GSIs:
     - `UserNotificationsIndex` (idNumber, createdAt) - For user's notification feed
     - `UnreadNotificationsIndex` (idNumber, isRead) - For unread notifications
   - Manages user notifications

5. **letstalk-documents**
   - Primary key: `documentId`
   - GSIs:
     - `UserDocumentsIndex` (idNumber, uploadedAt) - For user's document history
     - `DocumentTypeIndex` (documentType, uploadedAt) - For filtering by document type
   - Stores metadata for user documents (actual files stored in S3)

## Scripts

- `create-tables.sh` - Creates all tables with appropriate indexes
- `delete-tables.sh` - Deletes all tables (use with caution)
- `seed-tables.sh` - Populates tables with sample data for testing

## Usage

To create all tables:

```bash
# Make script executable
chmod +x create-tables.sh

# Run script
./create-tables.sh
```

## Data Models

### User Item Example
```json
{
  "idNumber": "9001015000080",
  "email": "john.doe@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+27821234567",
  "address": {
    "street": "123 Main Road",
    "suburb": "Rondebosch",
    "city": "Cape Town",
    "postalCode": "7700"
  },
  "createdAt": "2025-05-04T11:30:00Z",
  "updatedAt": "2025-05-04T11:30:00Z"
}
```

### Service Request Item Example
```json
{
  "requestId": "SR-2025-05-04-001",
  "idNumber": "9001015000080",
  "title": "Water Leak on Main Road",
  "description": "There is a major water leak on Main Road near the intersection with Oak Avenue",
  "serviceType": "WATER",
  "status": "PENDING",
  "location": {
    "latitude": -33.9249,
    "longitude": 18.4241,
    "address": "Main Road, Rondebosch"
  },
  "attachments": ["https://letstalk-documents.s3.af-south-1.amazonaws.com/SR-2025-05-04-001/image1.jpg"],
  "createdAt": "2025-05-04T12:00:00Z",
  "updatedAt": "2025-05-04T12:00:00Z"
}
```

## Notes

- All tables use on-demand (PAY_PER_REQUEST) billing mode
- All GSIs use ALL projection type for simplicity in this demo
- Time-based attributes use ISO 8601 format strings
- All tables are tagged with Environment=Demo