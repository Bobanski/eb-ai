#!/bin/bash

# Create the public/images directory in the frontend if it doesn't exist
mkdir -p smoothie-ui/public/images

# Copy all images from data/MenuImages to the frontend public directory
cp data/MenuImages/* smoothie-ui/public/images/

echo "Images successfully copied to smoothie-ui/public/images/"
echo "Make sure to update your frontend code to use the correct image paths in production."