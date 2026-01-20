# System Design: Tell + AMC-clone Integration

## 1. Requirements

### Functional requirements
- AMC app (AMC-clone) notifies Tell after a ticket purchase with theater/showtime/movie/auditorium details.
- Tell fetches screening metadata from AMC-clone (simulated TMS data) to validate and enrich the purchase payload.
- Tell retrieves the audio description track from Tell object storage.
- Tell caches the audio description on the user’s device before the movie begins when possible.
- If the movie has started, Tell streams the audio description in a format and bitrate appropriate for the device.
- Tell displays movie poster/title, theater name, auditorium number, and start times in the Tell app.

### Non-functional requirements
- Low-latency reads for screening lookups and audio retrieval.
- Accurate time synchronization between AMC-clone and Tell to align playback.
- High availability around peak showtimes.
- Secure handling of API access and media URLs.

### Out of scope
- Ticketing and seat selection.
- User accounts and personalization.
- Content creation or editing workflows for audio tracks.

## 2. Back-of-the-envelope estimations

### Daily active users and read/write mix
- 10k DAU, 5 read requests per user per day.
- ~50k reads/day, writes limited to AMC-clone theater ops (<<1k/day).
- Purchase notifications from AMC-clone to Tell: ~10k/day.

### Storage growth (1 year)
- Metadata: ~1 KB per screening, 1M screenings/year → ~1 GB.
- Audio tracks: 50 MB per movie, 1k movies/year → ~50 TB.
- Device cache: up to 100–300 MB per user (last 2–5 films) depending on policy.

### Network usage (RPS, bandwidth, peak)
- Peak 10x average: ~6 RPS for metadata and purchase callbacks.
- Audio streaming dominates: if 1k concurrent users at 128 kbps → ~16 MB/s.

## 3. API design and data representation

### Core entities and fields
- Movie: id, movie_id (external), title, poster_path, audio_description_path.
- Theater: id, place_id (external).
- Auditorium: id, location_id, number.
- Screening: id, movie_id, auditorium_id, previews_start, movie_start, credits_end.
- Purchase event: id, purchase_id, user_id (Tell), movie_id, theater_id, auditorium_number, showtime_id, purchased_at.

### External API surface
#### AMC-clone → Tell
- `POST /tell/purchase`
  - Body: purchase_id, movie_id, place_id, auditorium_number, showtime_id, purchased_at
  - Response: 202 Accepted, correlation_id

#### Tell → AMC-clone
- `GET /screening/details?movieId=&placeId=&auditoriumNumber=`
  - Response: title, poster_path, audio_description_path, previews_start, movie_start, credits_end

#### Tell media access
- `GET /media/audio/:movieId`
  - Authenticated, returns signed URL or streams directly with adaptive bitrate.

### Pagination, rate limits, auth
- Purchase endpoint has IP rate limits and signed API keys per AMC-clone environment.
- Screening lookup has low limits but can be cached at Tell and AMC-clone.
- Media endpoints require short-lived signed URLs or tokenized CDN URLs.

## 4. High-level design

### Services and components
- **AMC-clone app**: simulates AMC ticket purchases and posts purchase events to Tell.
- **AMC-clone backend**: Express API serving screening details from a MySQL TMS-like schema.
- **Tell backend**: ingestion service for purchases, screening lookups, and media access.
- **Tell mobile app**: caches audio and plays back in sync with showtime.
- **Data stores**:
  - MySQL for screening metadata in AMC-clone.
  - Tell metadata store for purchase events and playback state.
  - Object storage + CDN for audio descriptions.

### Request flows
1. **Purchase flow**
   - User purchases a ticket in AMC-clone.
   - AMC-clone posts purchase to Tell (`/tell/purchase`).
   - Tell validates payload, calls AMC-clone screening lookup for details.
   - Tell stores purchase + screening metadata.

2. **Pre-caching flow**
   - Tell app receives purchase details and showtime schedule.
   - If showtime is in the future, Tell fetches signed audio URL.
   - Tell downloads and caches audio on device, validating checksum.

3. **Playback flow**
   - At movie start time, Tell app starts audio playback.
   - If movie has started already, Tell requests streaming media optimized for device bandwidth.

### External integrations
- AMC-clone screening API.
- Tell object storage/CDN for audio.
- TMDB image CDN for posters.

## 5. Database design

### Primary schema
- `movies(id, movie_id, title, poster_path, audio_description_path)`
- `theaters(id, place_id)`
- `auditoriums(id, location_id, number)`
- `screenings(id, movie_id, auditorium_id, previews_start, movie_start, credits_end)`
- `purchases(id, purchase_id, user_id, movie_id, theater_id, auditorium_number, showtime_id, purchased_at)`

### Replication, sharding, backups
- Primary + read replica for availability.
- Daily backups with 30-day retention.
- Sharding unnecessary at current scale.

### Object storage
- Audio tracks in S3-compatible storage with CDN.
- Signed URLs with expiry for playback.

## 6. Detailed design choices

### Caching, CDN, queues
- CDN for audio and poster assets.
- Optional Redis cache for hot screening lookups and signed URL caching.
- No queues required for read-heavy flow, optional async for purchase ingest.

### Consistency trade-offs
- Eventual consistency acceptable for screening updates.
- Strong consistency for showtime changes within a theater (AMC-clone → Tell sync).

### Time synchronization
- Tell uses server-provided movie_start and device NTP correction.
- Playback starts with computed offset: `now - movie_start`.

### Security, privacy, auth
- API key or JWT for AMC-clone purchase endpoint.
- Signed media URLs for audio streams.
- No PII stored in AMC-clone; Tell stores minimal user identifiers.

### Failure handling and observability
- Tell app handles missing cache by switching to streaming.
- Server logs + structured error metrics.
- Health checks for DB connectivity and API uptime.

## 7. Open questions
- Should AMC-clone push auditorium changes to Tell in real-time (webhooks), or should Tell poll?
- Device cache eviction policy for multiple upcoming purchases.
- Whether audio streaming should be HLS/DASH for more adaptive playback.
