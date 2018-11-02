docker build -f ./docker/Demo/dockerfile -t webvnext .
docker run --rm -it -p 3200:3200 -p 5200:5200 webvnext