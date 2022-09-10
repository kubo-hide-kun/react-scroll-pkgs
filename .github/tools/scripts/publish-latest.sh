#!/bin/bash -eux

project=$1

echo "Publishing ${project}"

npm run build ${project}
npm publish -w ${project} --access public

echo "Done"