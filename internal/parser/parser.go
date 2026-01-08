package parser

import (
	"context"
	"fmt"
	"net/http"
	"net/url"
	"time"

	"github.com/mmcdole/gofeed"
)

type FeedItem struct {
	Title       string   `json:"title"`
	Link        string   `json:"link"`
	Description string   `json:"description"`
	Content     string   `json:"content"`
	Author      string   `json:"author"`
	PubDate     string   `json:"pubDate"`
	PubDateRaw  string   `json:"pubDateRaw"`
	GUID        string   `json:"guid"`
	Categories  []string `json:"categories"`
	Enclosures  []Enclosure `json:"enclosures,omitempty"`
}

type Enclosure struct {
	URL    string `json:"url"`
	Type   string `json:"type"`
	Length string `json:"length"`
}

type FeedImage struct {
	URL   string `json:"url"`
	Title string `json:"title"`
}

type FeedResult struct {
	// Basic info
	Title       string `json:"title"`
	Description string `json:"description"`
	Link        string `json:"link"`
	FeedLink    string `json:"feedLink"`
	Language    string `json:"language"`
	Copyright   string `json:"copyright"`
	Generator   string `json:"generator"`
	LastUpdated string `json:"lastUpdated"`

	// Image
	Image *FeedImage `json:"image,omitempty"`

	// Feed type info
	FeedType    string `json:"feedType"`
	FeedVersion string `json:"feedVersion"`

	// Items
	Items      []FeedItem `json:"items"`
	ItemCount  int        `json:"itemCount"`

	// Validation
	Validation *ValidationResult `json:"validation"`
}

type ValidationResult struct {
	IsValid    bool              `json:"isValid"`
	Score      int               `json:"score"`
	MaxScore   int               `json:"maxScore"`
	Checks     []ValidationCheck `json:"checks"`
}

type ValidationCheck struct {
	Name     string `json:"name"`
	Passed   bool   `json:"passed"`
	Message  string `json:"message"`
	Severity string `json:"severity"` // "error", "warning", "info"
}

type Parser struct {
	client *http.Client
}

func New() *Parser {
	return &Parser{
		client: &http.Client{
			Timeout: 30 * time.Second,
		},
	}
}

func (p *Parser) Parse(feedURL string) (*FeedResult, error) {
	// Validate URL
	if _, err := url.ParseRequestURI(feedURL); err != nil {
		return nil, fmt.Errorf("invalid URL: %w", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	fp := gofeed.NewParser()
	fp.Client = p.client
	fp.UserAgent = "rssy/1.0 (RSS Feed Viewer)"

	feed, err := fp.ParseURLWithContext(feedURL, ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to parse feed: %w", err)
	}

	result := &FeedResult{
		Title:       feed.Title,
		Description: feed.Description,
		Link:        feed.Link,
		FeedLink:    feed.FeedLink,
		Language:    feed.Language,
		Copyright:   feed.Copyright,
		Generator:   feed.Generator,
		FeedType:    feed.FeedType,
		FeedVersion: feed.FeedVersion,
		ItemCount:   len(feed.Items),
	}

	if feed.UpdatedParsed != nil {
		result.LastUpdated = feed.UpdatedParsed.Format(time.RFC3339)
	} else if feed.PublishedParsed != nil {
		result.LastUpdated = feed.PublishedParsed.Format(time.RFC3339)
	}

	if feed.Image != nil {
		result.Image = &FeedImage{
			URL:   feed.Image.URL,
			Title: feed.Image.Title,
		}
	}

	// Parse items
	for _, item := range feed.Items {
		fi := FeedItem{
			Title:       item.Title,
			Link:        item.Link,
			Description: item.Description,
			Content:     item.Content,
			GUID:        item.GUID,
			Categories:  item.Categories,
		}

		if item.Author != nil {
			fi.Author = item.Author.Name
			if item.Author.Email != "" && fi.Author != "" {
				fi.Author += " <" + item.Author.Email + ">"
			} else if item.Author.Email != "" {
				fi.Author = item.Author.Email
			}
		}

		if item.PublishedParsed != nil {
			fi.PubDate = item.PublishedParsed.Format(time.RFC3339)
		}
		fi.PubDateRaw = item.Published

		for _, enc := range item.Enclosures {
			fi.Enclosures = append(fi.Enclosures, Enclosure{
				URL:    enc.URL,
				Type:   enc.Type,
				Length: enc.Length,
			})
		}

		result.Items = append(result.Items, fi)
	}

	// Run validation
	result.Validation = p.validate(feed)

	return result, nil
}
