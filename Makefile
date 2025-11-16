deploy:
	echo "Deploying application..."
	docker-compose -f docker-compose.yml up -d

run:
	echo "Running application..."
	docker-compose -f docker-compose.yml up
