output "ec2_public_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.app.public_ip
}

output "ecr_repository_url" {
  description = "ECR repository URL for Docker image"
  value       = aws_ecr_repository.app.repository_url
}

output "dynamodb_table_name" {
  description = "DynamoDB table name"
  value       = aws_dynamodb_table.users.name
}

output "app_url" {
  description = "URL to access your app"
  value       = "http://${aws_instance.app.public_ip}:3000"
}