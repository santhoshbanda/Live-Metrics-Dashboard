# This is part of the technical assessment for a company. Built without using AI tools—just Google and Stack Overflow, old-school style.

# Live Metrics Dashboard

- Step 1: Git clone 
```
git clone https://github.com/santhoshbanda/Live-Metrics-Dashboard.git
```

- Step 2: Running application

## Running application in Docker
```
make deploy
```
Or
```
docker-compose -f docker-compose.yml up
```

### Backend
Application is running on http://localhost:3000
### Frontend
Application is running on http://localhost:8080

## Local Setup

### Prerequisites
- Node v22
- Yarn/NPM

### Frontend
```
cd ./frontend
yarn install
yarn dev
```
Frontend application will run on http://localhost:5173

### Backend
```
cd ./backend
yarn install
yarn start
```
Backend application will run on http://localhost:3000

- Step 3: Open frontend URL


# Tech Stack Used

## Frontend
- React 19
- Vite
- Chart.js
- MaterialUI 7 (mui)
- Redux (State Management)
- Axios (API Requests)
- SocketIO (Dashboard data)
- Server-Sent Events (SSE) stream for chart

## Frontend
- Node.js
- ExpressJS
- SocketIO
- Server-Sent Events (express-sse) streaming endpoint

## System architecture
```
         Frontend App                                         Backend App             
┌────────────────────────────┐                      ┌────────────────────────────────┐
│        ┌──────────┐        │                      │         ┌────────────┐         │
│        │Redux&Saga│◄───────┼───API─Requests───────┼─────────┤Services    │         │
│        └────┬─────┘┌───────┼───API─Requests───────┼─────────┼            ┼─┐       │
│             │      │       │                      │         └───────┬────┘ │       │
│             │      │       │                      │                 │      │       │
│             │      │       │                      │                 │      │       │
│             │      │       │                      │                 │      │       │
│             │      │       │                      │                 │      │       │
│             │      │       │                      │                 │      │       │
│             ▼      ▼       │                      │                 │      │       │
│         ┌──────────┐       │                      │           ┌─────▼─────┐│       │
│         │Dashboard │◄──────┼────WebSocket─Messages┼───────────┼  SocketIO ││       │
│         └────┬─────┘       │                      │           └───────────┘│       │
│         ┌────▼─────┐       │                      │           ┌───────────┐│       │
│         │ServiceView◄──────┼──────SSE─Events──────┼───────────┼   SSE     │▼       │
│         └──────────┘       │                      │           └───────────┘        │
└────────────────────────────┘                      └────────────────────────────────┘
ReactJS(Vite)                                       NodeJS(Express)         

```

# Performance optimisation decisions

## Frontend
- Used memoization (useMemo, useCallback) to optimise render cycles
- SSE (EventSource) is used only when the service view (analytic window) is open to reduce unnecessary network connections
- WebSocket connection is only active on the dashboard page. connection closed/open when analytics open/closed to prevent service metrics updating in the background

## Backend
- WebSocket metric messages are only sent when the client connects, and stop when the client disconnects
