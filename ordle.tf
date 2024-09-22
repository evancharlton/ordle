terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4"
    }
  }
}

variable "cloudflare_api_token" {
  default = ""
}

locals {
  zones = {
    "ordle-app.no" = "639b49d65fe403a6d1bdc89b416f7619"
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "cloudflare_record" "a_records" {
  for_each = {
    for val in setproduct(
      toset(["ordle-app.no"]),
      [
        "185.199.111.153",
        "185.199.110.153",
        "185.199.109.153",
        "185.199.108.153"
      ]
      ) : "${val[0]}-${val[1]}" => {
      domain = val[0]
      ip     = val[1]
    }
  }
  zone_id = local.zones[each.value.domain]
  content = each.value.ip
  name    = each.value.domain
  proxied = true
  ttl     = 1
  type    = "A"
}

resource "cloudflare_record" "aaaa_records" {
  for_each = {
    for val in setproduct(
      toset(["ordle-app.no"]),
      [
        "2606:50c0:8003::153",
        "2606:50c0:8002::153",
        "2606:50c0:8001::153",
        "2606:50c0:8000::153"
      ]
      ) : "${val[0]}-${val[1]}" => {
      domain = val[0]
      ip     = val[1]
    }
  }
  zone_id = local.zones[each.value.domain]
  content = each.value.ip
  name    = each.value.domain
  proxied = true
  ttl     = 1
  type    = "AAAA"
}

resource "cloudflare_record" "txt_records_no" {
  for_each = {
    # Tell recipients that this domain will never send email
    "_dmarc"                               = "v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s;",
    "*._domainkey"                         = "v=DKIM1; p=",
    "ordle-app.no"                         = "v=spf1 -all",
    "_github-pages-challenge-evancharlton" = "085db663e91db52924a0d7719dbf11",
  }
  zone_id = local.zones["ordle-app.no"]
  name    = each.key
  content = each.value
  proxied = false
  ttl     = 1
  type    = "TXT"
}

resource "cloudflare_record" "cname_no" {
  for_each = {
    "www" = "ordle-app.no"
  }
  zone_id = local.zones["ordle-app.no"]
  name    = each.key
  content = each.value
  proxied = true
  ttl     = 1
  type    = "CNAME"
}

# NOTE: There's a bug in Cloudflare somewhere with this. If you run into
# problems, try this:
#  tofu state rm cloudflare_zone_settings_override.ssl_settings
#
# https://github.com/cloudflare/terraform-provider-cloudflare/issues/1297
resource "cloudflare_zone_settings_override" "ssl_settings" {
  zone_id = local.zones["ordle-app.no"]

  settings {
    automatic_https_rewrites = "on"
    ssl                      = "strict"
  }
}