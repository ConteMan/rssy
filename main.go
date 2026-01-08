package main

import (
	"embed"
	"flag"
	"fmt"
	"io/fs"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"rssy/internal/handler"
)

//go:embed web/dist/*
var staticFiles embed.FS

func main() {
	port := flag.Int("port", 8080, "server port")
	flag.Parse()

	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	h := handler.New()

	// API routes
	api := r.Group("/api")
	{
		api.GET("/parse", h.ParseFeed)
		api.GET("/config", h.GetConfig)
	}

	// Serve static files
	distFS, err := fs.Sub(staticFiles, "web/dist")
	if err != nil {
		log.Fatal("Failed to load static files:", err)
	}

	r.NoRoute(func(c *gin.Context) {
		c.FileFromFS(c.Request.URL.Path, http.FS(distFS))
	})

	addr := fmt.Sprintf(":%d", *port)
	log.Printf("Starting rssy server on http://localhost%s", addr)
	if err := r.Run(addr); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
