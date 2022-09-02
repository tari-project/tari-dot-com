#!/usr/bin/env bash
bundle exec jekyll clean
bundle exec jekyll build

#force="--force"
force=""

region=${AWS_REGION:-us-east-1}

s3deploy -bucket ${S3_BUCKET} -region ${region}  -public-access -source _site -distribution-id ${CDN_ID} ${force}