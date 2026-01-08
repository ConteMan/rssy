package handler

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

type Config struct {
	SiteName string `json:"siteName"`
	SiteURL  string `json:"siteUrl"`
}

func (h *Handler) GetConfig(c *gin.Context) {
	config := Config{
		SiteName: getEnv("SITE_NAME", "rssy"),
		SiteURL:  getEnv("SITE_URL", "http://localhost:8080"),
	}
	c.JSON(http.StatusOK, config)
}

func getEnv(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}
