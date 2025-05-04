#!/bin/bash
# Script to create S3 buckets for Let's Talk app

# Set variables
REGION="af-south-1"
DOCUMENTS_BUCKET="letstalk-documents"

echo "Creating S3 buckets in $REGION..."

# Create Documents bucket
aws s3api create-bucket \
    --bucket $DOCUMENTS_BUCKET \
    --region $REGION \
    --create-bucket-configuration LocationConstraint=$REGION

# Set bucket policy to block public access
aws s3api put-public-access-block \
    --bucket $DOCUMENTS_BUCKET \
    --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

# Enable server-side encryption
aws s3api put-bucket-encryption \
    --bucket $DOCUMENTS_BUCKET \
    --server-side-encryption-configuration '{
        "Rules": [
            {
                "ApplyServerSideEncryptionByDefault": {
                    "SSEAlgorithm": "AES256"
                },
                "BucketKeyEnabled": true
            }
        ]
    }'

# Add bucket tags
aws s3api put-bucket-tagging \
    --bucket $DOCUMENTS_BUCKET \
    --tagging 'TagSet=[{Key=Environment,Value=Demo},{Key=Project,Value=LetsTalk}]'

echo "S3 buckets created successfully!"
