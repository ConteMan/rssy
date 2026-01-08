package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"rssy/internal/parser"
)

type Handler struct {
	parser *parser.Parser
}

func New() *Handler {
	return &Handler{
		parser: parser.New(),
	}
}

func (h *Handler) ParseFeed(c *gin.Context) {
	feedURL := c.Query("url")
	if feedURL == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "url parameter is required",
		})
		return
	}

	result, err := h.parser.Parse(feedURL)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, result)
}
