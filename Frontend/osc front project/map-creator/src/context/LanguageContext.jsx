import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const LanguageContext = createContext(null);

const translations = {
  en: {
    // General
    english: "English",
    arabic: "العربية",

    // Login
    indoorNavigationSystem: "Indoor Navigation System",
    mapView: "Map View",
    mapCreator: "Map Creator",
    smartIndoorNavigation: "Smart Indoor Navigation",
    navigateEvery: "Navigate every",
    floor: "floor.",
    findEvery: "Find every",
    place: "place.",
    loginDescription:
      "Create, explore and navigate indoor maps with an easy-to-use interactive navigation system.",
    designedFor:
      "Designed for universities, hospitals & complex buildings",

    indoorNavigation: "Indoor Navigation",
    welcomeBack: "Welcome back 👋",
    signInToYourMap: "Sign in to your map",
    accessYourMaps:
      "Access your maps and continue your navigation journey.",

    email: "Email",
    password: "Password",
    emailPlaceholder: "example@email.com",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    signIn: "Sign in",

    requiredLogin: "Please enter your email and password.",

    indoorNavigationMadeSimple: "Indoor navigation made simple.",

    // Map View
    interactiveIndoorNavigation: "Interactive Indoor Navigation",
    navigationOnline: "Navigation Online",
    logout: "Log out",

    searchPlaceholder: "Search for a hall, office, lab...",

    startNavigation: "Start Navigation",
    startingPoint: "Starting Point",
    destination: "Destination",
    startRoute: "Start Route",

    routeCalculated: "Route calculated",
    from: "From",
    to: "To",

    distance: "Distance",
    time: "Time",
    meters: "120 meters",
    minutes: "2 minutes",

    buildingFloors: "Building Floors",
    floors: "Floors",

    currentFloor: "CURRENT FLOOR",
    currentLocation: "My current location",

    nextDestination: "NEXT DESTINATION",
    cancel: "Cancel",

    changeFloor: "Change Floor",
    useStairs:
      "Use the stairs then continue to the next floor",

    accessibility: "Accessibility",

    room: "ROOM",
    office: "OFFICE",
    hall: "HALL",

    // Map Creator
    newBuilding: "New Building",
    buildingCollegeName: "Building / College Name",

    previewExportJson: "Preview / Export JSON",

    selectMove: "Select / Move",
    addNode: "Add Node",
    createPath: "Create Path",

    pathSecondPoint:
      "Select the second point to connect to:",

    noMapYet: "No map added yet",

    addFloorDescription:
      "Create a new floor and upload its map image to start placing points and paths.",

    addFloorAndMap: "Add Floor & Map",

    selectedNodeDetails: "Selected Node Details",

    nodeLocationName: "Node / Location Name:",
    xCoordinate: "X Coordinate:",
    yCoordinate: "Y Coordinate:",

    connectedPaths: "Connected Paths:",
    noConnectedPaths:
      "No connected paths for this point yet.",

    weight: "Weight",

    deleteNode: "Delete Node",

    selectNodeHint:
      "Select a point on the map to view and edit its properties.",

    addFloorTitle: "Add Floor & New Map",

    floorName: "Floor Name:",
    floorNamePlaceholder:
      "e.g. First Floor, Ground Floor...",

    mapImage: "Map Image:",

    cancelAction: "Cancel",
    addFloor: "Add Floor",

    mapDataJsonSchema: "Map Data (JSON Schema)",

    copyJson: "Copy JSON",
    jsonCopied: "JSON copied successfully!",
    close: "Close",

    deleteFloorConfirm:
      "Are you sure you want to delete this floor and all points recorded on it?",

    deleteFloorTitle: "Delete Floor",

    node: "Node",
    points: "points",

    preview: "Preview",
  },

  ar: {
    // General
    english: "English",
    arabic: "العربية",

    // Login
    indoorNavigationSystem: "نظام الملاحة الداخلية",
    mapView: "عرض الخريطة",
    mapCreator: "منشئ الخريطة",
    smartIndoorNavigation: "الملاحة الداخلية الذكية",
    navigateEvery: "تنقّل بين كل",
    floor: "الأدوار.",
    findEvery: "اعثر على كل",
    place: "مكان.",
    loginDescription:
      "أنشئ واستكشف وتنقّل عبر الخرائط الداخلية باستخدام نظام ملاحة تفاعلي سهل الاستخدام.",
    designedFor:
      "مصمم للجامعات والمستشفيات والمباني المعقدة",

    indoorNavigation: "الملاحة الداخلية",
    welcomeBack: "مرحبًا بعودتك 👋",
    signInToYourMap: "سجّل الدخول إلى خريطتك",
    accessYourMaps:
      "الوصول إلى خرائطك ومتابعة رحلة التنقل.",

    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    emailPlaceholder: "example@email.com",
    rememberMe: "تذكرني",
    forgotPassword: "نسيت كلمة المرور؟",
    signIn: "تسجيل الدخول",

    requiredLogin:
      "من فضلك أدخل البريد الإلكتروني وكلمة المرور.",

    indoorNavigationMadeSimple:
      "الملاحة الداخلية أصبحت أسهل.",

    // Map View
    interactiveIndoorNavigation:
      "الملاحة الداخلية التفاعلية",

    navigationOnline: "الملاحة متصلة",
    logout: "تسجيل الخروج",

    searchPlaceholder:
      "ابحث عن قاعة، مكتب، معمل...",

    startNavigation: "ابدأ التنقل",
    startingPoint: "نقطة البداية",
    destination: "الوجهة",
    startRoute: "ابدأ المسار",

    routeCalculated: "تم حساب المسار",
    from: "من",
    to: "إلى",

    distance: "المسافة",
    time: "الوقت",
    meters: "120 متر",
    minutes: "2 دقيقة",

    buildingFloors: "أدوار المبنى",
    floors: "أدوار",

    currentFloor: "الدور الحالي",
    currentLocation: "موقعي الحالي",

    nextDestination: "الوجهة التالية",
    cancel: "إلغاء",

    changeFloor: "تغيير الدور",
    useStairs:
      "استخدم السلالم ثم انتقل للدور التالي",

    accessibility: "إمكانية الوصول",

    room: "قاعة",
    office: "مكتب",
    hall: "قاعة",

    // Map Creator
    newBuilding: "مبنى جديد",
    buildingCollegeName: "اسم المبنى / الكلية",

    previewExportJson: "معاينة / تصدير JSON",

    selectMove: "تحديد / تحريك",
    addNode: "إضافة نقطة",
    createPath: "توصيل مسار",

    pathSecondPoint:
      "حدد النقطة الثانية للتوصيل بـ:",

    noMapYet: "لا توجد خريطة مضافة بعد",

    addFloorDescription:
      "قم بإنشاء دور جديد ورفع صورة الخريطة الخاصة به للبدء في تحديد النقاط والمسارات.",

    addFloorAndMap: "إضافة دور وخريطة جديدة",

    selectedNodeDetails:
      "بيانات النقطة المختارة",

    nodeLocationName:
      "اسم النقطة / المكان:",

    xCoordinate: "الإحداثي X:",
    yCoordinate: "الإحداثي Y:",

    connectedPaths: "المسارات المتصلة بها:",

    noConnectedPaths:
      "لا توجد مسارات متصلة لهذه النقطة بعد.",

    weight: "الوزن",

    deleteNode: "حذف النقطة",

    selectNodeHint:
      "اختر نقطة من الخريطة لمعاينة وتعديل خصائصها.",

    addFloorTitle:
      "إضافة دور وخريطة جديدة",

    floorName: "اسم الدور:",

    floorNamePlaceholder:
      "مثال: الدور الأول، الدور الأرضي...",

    mapImage: "صورة الخريطة:",

    cancelAction: "إلغاء",
    addFloor: "إضافة الدور",

    mapDataJsonSchema:
      "بيانات الخريطة (JSON Schema)",

    copyJson: "نسخ الـ JSON",

    jsonCopied:
      "تم نسخ الـ JSON بنجاح!",

    close: "إغلاق",

    deleteFloorConfirm:
      "هل أنت متأكد من رغبتك في حذف هذا الدور وكل النقاط المسجلة فيه؟",

    deleteFloorTitle: "حذف الدور",

    node: "نقطة",
    points: "نقطة",

    preview: "معاينة",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem("mapgen_language") || "ar";
    } catch {
      return "ar";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("mapgen_language", language);
    } catch {
      // Ignore localStorage errors
    }

    document.documentElement.lang = language;
    document.documentElement.dir =
      language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((currentLanguage) =>
      currentLanguage === "ar" ? "en" : "ar"
    );
  };

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}