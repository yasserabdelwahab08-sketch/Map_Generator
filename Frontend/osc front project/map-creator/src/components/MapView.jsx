import React, { useMemo, useState } from "react";
import {
  MapPin,
  Navigation,
  Search,
  Layers,
  ArrowUp,
  ArrowDown,
  Footprints,
  Clock3,
  Route,
  Building2,
  ChevronRight,
  ChevronLeft,
  LocateFixed,
  LogOut,
  DoorOpen,
  Accessibility,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const floors = [
  {
    id: 1,
    nameEn: "Ground Floor",
    nameAr: "الدور الأرضي",
    short: "G",
  },
  {
    id: 2,
    nameEn: "First Floor",
    nameAr: "الدور الأول",
    short: "1",
  },
  {
    id: 3,
    nameEn: "Second Floor",
    nameAr: "الدور الثاني",
    short: "2",
  },
];

const locations = [
  {
    id: "entrance",
    nameEn: "Main Entrance",
    nameAr: "المدخل الرئيسي",
    floor: 1,
    x: 16,
    y: 76,
    type: "entrance",
  },
  {
    id: "reception",
    nameEn: "Reception",
    nameAr: "الاستقبال",
    floor: 1,
    x: 31,
    y: 57,
    type: "room",
  },
  {
    id: "stairs-g",
    nameEn: "Stairs",
    nameAr: "السلالم",
    floor: 1,
    x: 61,
    y: 59,
    type: "stairs",
  },
  {
    id: "hall-g",
    nameEn: "Main Hall",
    nameAr: "القاعة الرئيسية",
    floor: 1,
    x: 78,
    y: 35,
    type: "room",
  },
  {
    id: "lab-101",
    nameEn: "Lab 101",
    nameAr: "معمل 101",
    floor: 2,
    x: 24,
    y: 34,
    type: "room",
  },
  {
    id: "room-105",
    nameEn: "Room 105",
    nameAr: "قاعة 105",
    floor: 2,
    x: 46,
    y: 61,
    type: "room",
  },
  {
    id: "stairs-1",
    nameEn: "Stairs",
    nameAr: "السلالم",
    floor: 2,
    x: 69,
    y: 56,
    type: "stairs",
  },
  {
    id: "office-110",
    nameEn: "Office 110",
    nameAr: "مكتب 110",
    floor: 2,
    x: 83,
    y: 29,
    type: "room",
  },
  {
    id: "lecture-201",
    nameEn: "Lecture Hall",
    nameAr: "مدرج 201",
    floor: 3,
    x: 27,
    y: 32,
    type: "room",
  },
  {
    id: "library",
    nameEn: "Library",
    nameAr: "المكتبة",
    floor: 3,
    x: 53,
    y: 63,
    type: "room",
  },
  {
    id: "stairs-2",
    nameEn: "Stairs",
    nameAr: "السلالم",
    floor: 3,
    x: 73,
    y: 55,
    type: "stairs",
  },
];

function MapView({ user, onLogout, onNavigate }) {
  const { language, t } = useLanguage();

  const [activeFloor, setActiveFloor] = useState(1);
  const [startId, setStartId] = useState("entrance");
  const [destinationId, setDestinationId] =
    useState("hall-g");
  const [search, setSearch] = useState("");
  const [navigationStarted, setNavigationStarted] =
    useState(false);

  const currentStart = locations.find(
    (item) => item.id === startId
  );

  const currentDestination = locations.find(
    (item) => item.id === destinationId
  );

  const floorLocations = locations.filter(
    (location) => location.floor === activeFloor
  );

  // Search in both Arabic and English
  const filteredLocations = locations.filter((location) =>
    `${location.nameEn} ${location.nameAr}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Keep the variable because it existed in the original code.
  void filteredLocations;

  const getFloorName = (floor) => {
    if (!floor) return "";

    return language === "ar"
      ? floor.nameAr
      : floor.nameEn;
  };

  const getLocationName = (location) => {
    if (!location) return "";

    return language === "ar"
      ? location.nameAr
      : location.nameEn;
  };

  const routePoints = useMemo(() => {
    if (!currentStart || !currentDestination) {
      return [];
    }

    if (
      currentStart.floor === currentDestination.floor
    ) {
      return [
        {
          x: currentStart.x,
          y: currentStart.y,
        },
        {
          x:
            (currentStart.x +
              currentDestination.x) /
            2,
          y: currentStart.y,
        },
        {
          x:
            (currentStart.x +
              currentDestination.x) /
            2,
          y: currentDestination.y,
        },
        {
          x: currentDestination.x,
          y: currentDestination.y,
        },
      ];
    }

    return [
      {
        x: currentStart.x,
        y: currentStart.y,
      },
      {
        x: 61,
        y: 59,
      },
      {
        x: currentDestination.x,
        y: currentDestination.y,
      },
    ];
  }, [currentStart, currentDestination]);

  const routePath = routePoints
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

  const handleLocationSelect = (id) => {
    setDestinationId(id);

    const destination = locations.find(
      (item) => item.id === id
    );

    if (destination) {
      setActiveFloor(destination.floor);
    }
  };

  const nextFloor = () => {
    if (activeFloor < floors.length) {
      setActiveFloor(activeFloor + 1);
    }
  };

  const previousFloor = () => {
    if (activeFloor > 1) {
      setActiveFloor(activeFloor - 1);
    }
  };

  const getLocationIcon = (type) => {
    if (type === "stairs") {
      return <ArrowUp className="w-3.5 h-3.5" />;
    }

    if (type === "entrance") {
      return <DoorOpen className="w-3.5 h-3.5" />;
    }

    return <MapPin className="w-3.5 h-3.5" />;
  };

  const DirectionChevron =
    language === "ar"
      ? ChevronLeft
      : ChevronRight;
const shouldShowRoute =
  navigationStarted &&
  currentStart &&
  currentDestination &&
  currentStart.floor === currentDestination.floor &&
  activeFloor === currentDestination.floor;
  return (
    <div
      dir={language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden"
    >
      {/* Header */}
     <header className="shrink-0 bg-slate-950 border-b border-slate-800 px-3 sm:px-4 md:px-6 py-2">
  <div className="flex flex-wrap items-center justify-between gap-2">

    {/* Logo */}
    <div className="flex items-center gap-3 min-w-0">
      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
        <span className="text-emerald-400 text-lg">⌖</span>
      </div>

      <div className="min-w-0">
        <h1 className="text-sm md:text-base font-bold text-slate-100 truncate">
          {t("interactiveIndoorNavigation")}
        </h1>

        <p className="hidden sm:block text-[10px] text-slate-500">
          {t("navigationOnline")}
        </p>
      </div>
    </div>

    {/* Right Controls */}
    <div className="flex items-center gap-2 shrink-0">
      <LanguageSwitcher />

      <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800">
        <div className="w-2 h-2 rounded-full bg-emerald-400" />

        <span className="text-[10px] font-bold text-emerald-400">
          {t("navigationOnline")}
        </span>
      </div>

      <div className="hidden sm:block">
        <p className="text-xs font-bold text-slate-200">
          {user?.name || user?.email || "User"}
        </p>
      </div>

      <button
        type="button"
        onClick={onLogout}
        className="px-3 py-2 rounded-xl border border-slate-700 text-slate-400 text-xs font-bold hover:border-red-500/50 hover:text-red-400 transition"
      >
        {t("logout")}
      </button>
    </div>

    {/* Navigation */}
    <nav className="order-3 w-full sm:order-none sm:w-auto flex items-center justify-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1">
      <button
        type="button"
        className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-400"
        aria-current="page"
      >
        {t("mapView")}
      </button>

      <button
        type="button"
        onClick={() => onNavigate("creator")}
        className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition"
      >
        {t("mapCreator")}
      </button>
    </nav>

  </div>
</header>

      <main className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden">
        {/* Sidebar */}
        <aside className="w-full lg:w-[350px] lg:max-h-none shrink-0 bg-slate-900 border-l border-slate-800 flex flex-col overflow-y-auto order-2 lg:order-1">
          <div className="p-4 border-b border-slate-800">
            <div className="relative">
              <Search
                className={`absolute ${
                  language === "ar"
                    ? "right-3"
                    : "left-3"
                } top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500`}
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder={t("searchPlaceholder")}
                className={`w-full bg-slate-950 border border-slate-800 rounded-xl py-3 ${
                  language === "ar"
                    ? "pr-10 pl-4"
                    : "pl-10 pr-4"
                } text-xs outline-none focus:border-emerald-500 transition`}
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="p-4 border-b border-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <Navigation className="w-4 h-4 text-emerald-400" />

              <h2 className="text-sm font-bold">
                {t("startNavigation")}
              </h2>
            </div>

            <div className="space-y-3">
              {/* Starting Point */}
              <div>
                <label className="text-[10px] text-slate-500 block mb-1.5">
                  {t("startingPoint")}
                </label>

                <select
                  value={startId}
                  onChange={(e) =>
                    setStartId(e.target.value)
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-xs outline-none focus:border-emerald-500"
                >
                  {locations.map((location) => (
                    <option
                      key={location.id}
                      value={location.id}
                    >
                      {getLocationName(location)} —{" "}
                      {getFloorName(
                        floors[location.floor - 1]
                      )}
                    </option>
                  ))}
                </select>
              </div>

              {/* Destination */}
              <div>
                <label className="text-[10px] text-slate-500 block mb-1.5">
                  {t("destination")}
                </label>

                <select
                  value={destinationId}
                  onChange={(e) =>
                    handleLocationSelect(
                      e.target.value
                    )
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-xs outline-none focus:border-emerald-500"
                >
                  {locations.map((location) => (
                    <option
                      key={location.id}
                      value={location.id}
                    >
                      {getLocationName(location)} —{" "}
                      {getFloorName(
                        floors[location.floor - 1]
                      )}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() =>
                  setNavigationStarted(true)
                }
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-3 rounded-xl font-black text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
              >
                <Route className="w-4 h-4" />
                {t("startRoute")}
              </button>
            </div>
          </div>

          {/* Route info */}
          {navigationStarted && (
            <div className="p-4 border-b border-slate-800">
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-emerald-400 mb-4">
                  <Navigation className="w-4 h-4" />

                  <span className="text-xs font-bold">
                    {t("routeCalculated")}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-500 mb-1">
                      {t("from")}
                    </p>

                    <p className="text-xs font-bold truncate">
                      {getLocationName(currentStart)}
                    </p>
                  </div>

                  <DirectionChevron className="w-4 h-4 text-emerald-500 shrink-0" />

                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-500 mb-1">
                      {t("to")}
                    </p>

                    <p className="text-xs font-bold truncate">
                      {getLocationName(
                        currentDestination
                      )}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {/* Distance */}
                  <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <Footprints className="w-3.5 h-3.5" />

                      <span className="text-[9px]">
                        {t("distance")}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-slate-200">
                      {t("meters")}
                    </p>
                  </div>

                  {/* Time */}
                  <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <Clock3 className="w-3.5 h-3.5" />

                      <span className="text-[9px]">
                        {t("time")}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-slate-200">
                      {t("minutes")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Floors */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />

                <h2 className="text-sm font-bold">
                  {t("buildingFloors")}
                </h2>
              </div>

              <span className="text-[10px] text-slate-600">
                {floors.length} {t("floors")}
              </span>
            </div>

            <div className="space-y-2">
              {floors.map((floor) => (
                <button
                  key={floor.id}
                  onClick={() =>
                    setActiveFloor(floor.id)
                  }
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition ${
                    activeFloor === floor.id
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : "bg-slate-950/50 border-slate-800 text-slate-500 hover:border-slate-700"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black ${
                      activeFloor === floor.id
                        ? "bg-emerald-500 text-slate-950"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {floor.short}
                  </div>

                  <div className="text-right flex-1">
                    <p className="text-xs font-bold">
                      {getFloorName(floor)}
                    </p>

                    <p className="text-[9px] text-slate-600">
                      {t("floor")} {floor.id}
                    </p>
                  </div>

                  {activeFloor === floor.id && (
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Map */}
       <section className="flex-1 min-h-[420px] lg:min-h-0 relative bg-slate-950 order-1 lg:order-2 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
                backgroundSize: "35px 35px",
              }}
            />
          </div>

          {/* Map top controls */}
          <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between">
            <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-xl px-4 py-2.5 shadow-xl">
              <p className="text-[10px] text-slate-500 mb-0.5">
                {t("currentFloor")}
              </p>

              <p className="text-sm font-black text-white">
                {getFloorName(
                  floors[activeFloor - 1]
                )}
              </p>
            </div>

            <button
              className="w-10 h-10 bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-400 transition shadow-xl"
              title={t("currentLocation")}
            >
              <LocateFixed className="w-4 h-4" />
            </button>
          </div>

          {/* Floor controls */}
          <div className="absolute right-5 top-24 z-20 bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <button
              onClick={nextFloor}
              disabled={
                activeFloor === floors.length
              }
              className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-emerald-400 disabled:opacity-20 transition border-b border-slate-800"
            >
              <ArrowUp className="w-4 h-4" />
            </button>

            <button
              onClick={previousFloor}
              disabled={activeFloor === 1}
              className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-emerald-400 disabled:opacity-20 transition"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>

          {/* Fake floor plan */}
          <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-6 md:p-10 lg:p-16">
            <div className="relative w-full max-w-5xl aspect-[16/9] min-w-0 bg-slate-900/70 border-2 border-slate-700 rounded-[2rem] shadow-2xl overflow-hidden">
              <div className="absolute inset-5 md:inset-8 border-2 border-slate-700 rounded-2xl">
                <div className="absolute top-0 left-[25%] w-[30%] h-[35%] border-r-2 border-b-2 border-slate-700 flex items-center justify-center">
                  <span className="text-[10px] text-slate-600">
                    {t("room")}
                  </span>
                </div>

                <div className="absolute top-0 right-0 w-[25%] h-[35%] border-b-2 border-slate-700 flex items-center justify-center">
                  <span className="text-[10px] text-slate-600">
                    {t("office")}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 w-[35%] h-[35%] border-t-2 border-r-2 border-slate-700 flex items-center justify-center">
                  <span className="text-[10px] text-slate-600">
                    {t("hall")}
                  </span>
                </div>

                <div className="absolute bottom-0 right-[25%] w-[35%] h-[35%] border-t-2 border-l-2 border-slate-700 flex items-center justify-center">
                  <span className="text-[10px] text-slate-600">
                    {t("room")}
                  </span>
                </div>

                <div className="absolute top-[35%] left-0 right-0 h-[30%] border-y border-slate-800 bg-slate-950/30" />
              </div>

          {shouldShowRoute && 
  currentStart?.floor === currentDestination?.floor &&
  activeFloor === currentDestination?.floor && (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <polyline
        points={routePath}
        fill="none"
        stroke="rgba(16,185,129,0.18)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <polyline
        points={routePath}
        fill="none"
        stroke="#10b981"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="2 1"
      />
    </svg>
)}

              {floorLocations.map((location) => {
                const isStart =
                  location.id === startId;

                const isDestination =
                  location.id === destinationId;

                return (
                  <button
                    key={location.id}
                    onClick={() => {
                      if (isStart) {
                        setDestinationId(
                          location.id
                        );
                      } else {
                        setDestinationId(
                          location.id
                        );

                        setNavigationStarted(true);
                      }
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group z-10"
                    style={{
                      left: `${location.x}%`,
                      top: `${location.y}%`,
                    }}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center border-2 shadow-xl transition group-hover:scale-110 ${
                        isStart
                          ? "bg-cyan-500 border-white text-slate-950"
                          : isDestination
                          ? "bg-emerald-500 border-white text-slate-950 ring-4 ring-emerald-500/20"
                          : location.type ===
                            "stairs"
                          ? "bg-amber-500 border-slate-950 text-slate-950"
                          : "bg-slate-800 border-slate-600 text-emerald-400"
                      }`}
                    >
                      {isStart ? (
                        <LocateFixed className="w-4 h-4" />
                      ) : (
                        getLocationIcon(
                          location.type
                        )
                      )}
                    </div>

                    <div className="absolute top-11 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-950/95 border border-slate-800 rounded-lg px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition pointer-events-none shadow-xl">
                      <p className="text-[10px] font-bold text-slate-200">
                        {getLocationName(location)}
                      </p>
                    </div>
                  </button>
                );
              })}

              <div className="absolute bottom-5 left-6 text-[9px] font-mono text-slate-700">
                MAP_VIEW / FLOOR_{activeFloor}
              </div>
            </div>
          </div>

          {/* Bottom route panel */}
          {navigationStarted && (
            <div className="absolute bottom-5 left-5 right-5 md:left-auto md:right-5 md:w-[380px] z-20">
              <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Navigation className="w-5 h-5 text-emerald-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] text-slate-500">
                      {t("nextDestination")}
                    </p>

                    <p className="text-sm font-black truncate">
                      {getLocationName(
                        currentDestination
                      )}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setNavigationStarted(false)
                    }
                    className="text-xs text-slate-600 hover:text-slate-300"
                  >
                    {t("cancel")}
                  </button>
                </div>

                {currentStart?.floor !==
                  currentDestination?.floor && (
                  <div className="mt-3 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-center gap-3">
                    <ArrowUp className="w-4 h-4 text-amber-400" />

                    <div>
                      <p className="text-[10px] font-bold text-amber-400">
                        {t("changeFloor")}
                      </p>

                      <p className="text-[9px] text-slate-500">
                        {t("useStairs")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Accessibility */}
          <button
            className="absolute bottom-5 left-5 w-10 h-10 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 flex items-center justify-center text-slate-500 hover:text-cyan-400 transition z-20"
            title={t("accessibility")}
          >
            <Accessibility className="w-4 h-4" />
          </button>
        </section>
      </main>
    </div>
  );
}

export default MapView;