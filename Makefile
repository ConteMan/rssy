.PHONY: dev build clean

# Development
dev:
	@echo "Starting development servers..."
	@cd web && npm install && npm run dev &
	@go run main.go

# Build production binary
build: build-web build-go

build-web:
	@echo "Building frontend..."
	@cd web && npm install && npm run build

build-go:
	@echo "Building Go binary..."
	@go build -o rssy .

# Clean build artifacts
clean:
	@rm -rf rssy web/dist web/node_modules
