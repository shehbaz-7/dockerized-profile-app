var express = require('express');
var path = require('path');
var fs = require('fs');
// Import the AWS SDK for DynamoDB
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize the DynamoDB Client (automatically uses the EC2 Instance IAM Profile credentials)
const awsRegion = process.env.AWS_REGION || "ap-south-2";
const tableName = process.env.DYNAMO_TABLE || "user-profiles";

const client = new DynamoDBClient({ region: awsRegion });
const docClient = DynamoDBDocumentClient.from(client);

// Main Page Route
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Get Profile Route (Migrated to DynamoDB)
app.get('/get-profile', async function (req, res) {
    try {
        const command = new GetCommand({
            TableName: tableName,
            Key: { userId: "1" } // DynamoDB matches strings, matching our key schema
        });

        const response = await docClient.send(command);
        res.send(response.Item || {});
    } catch (err) {
        console.error("Error fetching profile from DynamoDB:", err.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// Update Profile Route (Migrated to DynamoDB)
app.post('/update-profile', async function (req, res) {
    var userObj = req.body;
    try {
        userObj['userId'] = "1"; // Force primary key attribute
        
        const command = new PutCommand({
            TableName: tableName,
            Item: userObj
        });

        await docClient.send(command);
        
        console.log('Successfully updated or inserted into DynamoDB table yooooo goku !');
        res.send(userObj);
    } catch (err) {
        console.error("Error updating profile in DynamoDB:", err.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

app.get('/profile-picture', function (req, res) {
    try {
        var img = fs.readFileSync(path.join(__dirname, 'profile-1.jpg'));
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(img, 'binary');
    } catch (e) {
        console.error("Image read error:", e.message);
        res.status(404).send("Image not found");
    }
});

app.listen(3000, function () {
    console.log("app listening on port 3000!");
});