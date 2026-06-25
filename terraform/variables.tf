variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "ap-south-2"
}

variable "app_name" {
  description = "Application name used for naming resources"
  type        = string
  default     = "profile-card-app"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "dynamo_table_name" {
  description = "DynamoDB table name"
  type        = string
  default     = "user-profiles"
}