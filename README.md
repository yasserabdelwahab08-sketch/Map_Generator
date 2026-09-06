# 🗺️ Interactive Map Navigation System

An interactive indoor navigation system designed to help users navigate complex buildings such as universities, colleges, hospitals, and other multi-floor facilities.

The system provides a **2D interactive map for each floor**, allowing users to select a starting point and a destination and receive a suggested route between them.

---

## 📌 Project Overview

The building is divided into multiple **floors/levels**, where each floor has its own 2D map.

Users can:

* Select a **starting point**.
* Select a **destination**.
* View the route between the two points.
* Move between different floors through designated navigation nodes.
* Continue navigation after moving to another floor.
* View the map corresponding to their current floor.

The navigation system is based on predefined **nodes/points** that represent important locations and connections inside the building.

---

## 🎯 Main Idea

The system represents the building as a collection of connected navigation points (**nodes**).

For example:

```text
Floor 1
 ┌───────────────────────────────┐
 │                               │
 │  ● Node A ─── ● Node B        │
 │                  │            │
 │                  ● Node C     │
 │                               │
 │                  │            │
 │             [Stairs/Elevator] │
 └─────────────────┬─────────────┘
                   │
                   ▼
Floor 2
 ┌───────────────────────────────┐
 │                               │
 │             ● Node D          │
 │                  │            │
 │             ● Node E ── ● End │
 │                               │
 └───────────────────────────────┘
```

Each node represents a specific location or navigation point, while connections between nodes represent possible paths.

---

## ✨ Features

### 📍 Start & Destination Selection

The user can select:

* **Start Point** — where the user currently is.
* **End Point** — where the user wants to go.

The system then calculates a route connecting the two points.

---

### 🗺️ Floor-Based Maps

Each floor has its own 2D map.

For example:

```text
Building
│
├── Floor 1
│   └── Floor 1 Map
│
├── Floor 2
│   └── Floor 2 Map
│
└── Floor 3
    └── Floor 3 Map
```

The displayed map changes depending on the floor where the user currently is.

---

### 🧭 Route Visualization

The calculated route is displayed directly on the 2D map.

The path between the start and destination can be highlighted using a **green line**, providing a navigation experience similar to the route visualization used in Google Maps.

Example:

```text
Start ● ────────●
                │
                │
                ●────────────● End
```

---

### 🏢 Multi-Floor Navigation

Users can navigate between floors using designated nodes such as:

* Stairs
* Elevators
* Other predefined vertical connections

When the route requires moving to another floor, the system provides a **Next** option to continue the navigation.

Example:

```text
Floor 1

Start
  ●
  │
  ●
  │
  ● Stairs
  │
  ↓
[Next]

        ↓

Floor 2

● Stairs
   │
   │
   ●
   │
   ● Destination
```

---

## 🧩 Navigation System

The navigation system is based on a **graph structure**.

### Nodes

Nodes represent important navigation points inside the building.

Examples:

* Rooms
* Entrances
* Corridors
* Stairs
* Elevators
* Intersections
* Other important locations

### Edges

Edges represent the possible movement between connected nodes.

For example:

```text
A ─── B ─── C
     │
     D
```

The system uses these connections to determine a suitable path between the selected start and destination points.

---

## 🏗️ System Concept

The overall navigation flow is:

```text
        User
          │
          ▼
   Select Start Point
          │
          ▼
   Select Destination
          │
          ▼
    Calculate Route
          │
          ▼
   Display 2D Floor Map
          │
          ▼
    Highlight Route
          │
          ▼
   Does route change floor?
       /           \
     No             Yes
     │               │
     ▼               ▼
 Destination    Show Floor
    reached      Transition
                     │
                     ▼
                  [Next]
                     │
                     ▼
             Display New Floor
                     │
                     ▼
              Continue Route
```


## 🔮 Future Improvements

Possible future features include:

* Real-time user positioning.
* GPS or indoor positioning integration.
* Search for rooms and locations.
* Voice navigation.
* Accessibility-friendly routes.
* Wheelchair-accessible paths.
* Estimated walking distance.
* Estimated walking time.
* Multiple route options.
* Dynamic map updates.
* Mobile application support.


---

## 📄 Documentation

Project documentation will cover:

* System requirements
* System architecture
* Database design
* Map and node structure
* Navigation algorithm
* API documentation
* Front-end design
* Testing
* Deployment

---

## 📌 Project Vision

The goal is to create a simple and intuitive indoor navigation experience that allows users to easily find their way through **multi-floor buildings using interactive 2D maps and graph-based navigation**.
