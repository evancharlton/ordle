terraform {
  backend "gcs" {
    prefix = "ordle/terraform"
    bucket = "terraform-remote-backend-2180c2249d350f10"
  }
}
