

provider "aws" {
  region = "us-east-1"  # Change to your desired AWS region
}

resource "aws_s3_bucket" "example_bucket" {
  bucket = "your-unique-bucket-name"  # Change to a unique bucket name

  acl    = "private"

  tags = {
    Name        = "ExampleBucket"
    Environment = "Development"
  }
}

