FROM node

# Create the application directory
RUN mkdir -p /home/node-app

# Set the working directory context
WORKDIR /home/node-app

# Copy package files first to install dependencies
COPY ./app/package*.json ./

# Install the dependencies inside the isolated Docker container
RUN npm install

# Copy the rest of your application code
COPY ./app .

# Start the application
CMD ["node", "server.js"]