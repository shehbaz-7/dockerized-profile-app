# Profile Card Docker App

A containerized profile management app built with Node.js and MongoDB.
Displays user profile data with image and allows real-time updates.

## Architecture

Three services orchestrated with Docker Compose:
- **Node.js App** — served from AWS ECR private registry
- **MongoDB** — database with persistent volume storage
- **Mongo Express** — web-based MongoDB admin UI

## Prerequisites

- Docker and Docker Compose installed
- AWS CLI configured (to pull image from ECR)

## Setup

1. Clone the repo:
   git clone https://github.com/your-username/profile-card-docker-app.git
   cd profile-card-docker-app

2. Create .env file from example:
   cp .env.example .env
   Fill in your values in .env

3. Authenticate with AWS ECR:
   aws ecr get-login-password --region ap-south-2 | docker login --username AWS \
   --password-stdin your-account-id.dkr.ecr.ap-south-2.amazonaws.com

4. Run the app:
   docker compose up

## Access

- App: http://localhost:3000
- Mongo Express: http://localhost:8081

## Tech Stack

- Node.js
- MongoDB
- Docker + Docker Compose
- AWS ECR
