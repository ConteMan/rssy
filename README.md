# rssy

A simple and elegant RSS feed viewer and validator.

## Features

- **Feed Parsing** - Parse and display RSS 2.0, Atom, and JSON Feed formats
- **Validation Report** - Check feed compliance with detailed scoring
- **Beautiful UI** - Clean, modern interface with warm color scheme
- **Internationalization** - English and Chinese language support
- **URL Sharing** - Share feed links via URL parameters
- **Single Binary** - Easy deployment with embedded static files

## Screenshots

```
┌─────────────────────────────────────────┐
│  rssy                          [EN ▼]  │
│  RSS Feed Viewer & Validator           │
│  ─────────────────────────────────────  │
│  Home    About RSS                      │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐   │
│  │ Enter RSS feed URL...    [Parse]│   │
│  └─────────────────────────────────┘   │
│                                         │
│  [Overview]  [Items (25)]              │
│                                         │
│  ┌─ Feed Info ─────────────────────┐   │
│  │ Title: Example Blog             │   │
│  │ Type: RSS 2.0  Language: en     │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─ Validation Report ─────────────┐   │
│  │ ✓ Feed Title    Valid           │   │
│  │ ✓ Feed Link     Valid           │   │
│  │ ✗ Language      Not specified   │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

## Quick Start

### Download

Download the latest binary from [Releases](https://github.com/yourname/rssy/releases).

### Run

```bash
./rssy -port 8080
```

Visit http://localhost:8080

### URL Parameters

Open a feed directly:
```
http://localhost:8080/?url=https://example.com/feed.xml
```

## Build from Source

### Prerequisites

- Go 1.21+
- Node.js 18+

### Build

```bash
# Clone repository
git clone https://github.com/yourname/rssy.git
cd rssy

# Build
make build

# Run
./rssy -port 8080
```

### Development

```bash
# Terminal 1: Start Go backend
go run main.go

# Terminal 2: Start Vue dev server
cd web && npm install && npm run dev
```

## Configuration

Environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `SITE_NAME` | Site name displayed in header | `rssy` |
| `SITE_URL` | Site URL for SEO | `http://localhost:8080` |

Example:
```bash
SITE_NAME="My RSS Viewer" SITE_URL="https://rss.example.com" ./rssy -port 8080
```

## Project Structure

```
rssy/
├── main.go                 # Entry point with embedded static files
├── internal/
│   ├── handler/            # HTTP handlers
│   │   ├── feed.go         # Feed parsing API
│   │   └── config.go       # Configuration API
│   └── parser/             # RSS parsing logic
│       ├── parser.go       # Feed parser
│       └── validator.go    # Feed validation
└── web/                    # Vue.js frontend
    ├── src/
    │   ├── views/          # Page components
    │   ├── components/     # UI components
    │   └── i18n.js         # Internationalization
    └── dist/               # Built static files
```

## API

### Parse Feed

```
GET /api/parse?url=<feed_url>
```

Response:
```json
{
  "title": "Feed Title",
  "description": "Feed description",
  "link": "https://example.com",
  "feedType": "rss",
  "feedVersion": "2.0",
  "items": [...],
  "validation": {
    "isValid": true,
    "score": 85,
    "maxScore": 100,
    "checks": [...]
  }
}
```

### Get Configuration

```
GET /api/config
```

## Validation Checks

| Check | Severity | Description |
|-------|----------|-------------|
| Feed Title | Error | Feed must have a title |
| Feed Link | Error | Feed must have a website link |
| Feed Description | Warning | Feed should have a description |
| Language | Info | Feed should specify language |
| Last Update Date | Warning | Feed should have update date |
| Generator | Info | Generator information |
| Feed Image | Info | Feed logo/image |
| Item Titles | Error | All items must have titles |
| Item Links | Warning | Items should have links |
| Item Dates | Warning | Items should have dates |
| Item GUIDs | Warning | Items should have unique GUIDs |
| Item Content | Info | Items should have content |

## Tech Stack

- **Backend**: Go, Gin
- **Frontend**: Vue 3, Vite, Tailwind CSS
- **Feed Parsing**: gofeed

## License

MIT
