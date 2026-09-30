import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "en" | "ar";

type Dictionary = Record<string, string>;

const en: Dictionary = {
  "brand.name": "Map Generator",
  "nav.browse": "Browse maps", "nav.create": "Create a map", "nav.login": "Log in", "nav.signup": "Sign up", "nav.logout": "Log out",
  "nav.language": "Language", "nav.switchAr": "العربية", "nav.switchEn": "English",
  "home.eyebrow": "INDOOR NAVIGATION", "home.title": "Find your way through every floor.", "home.subtitle": "Browse interactive building maps, choose a start and destination, and get a clear route across floors.", "home.explore": "Explore maps", "home.account": "Create an account", "home.library": "MAP LIBRARY", "home.available": "Available buildings", "home.map": "map", "home.maps": "maps", "home.floor": "floor", "home.floors": "floors", "home.point": "point", "home.points": "points", "home.noMaps": "No maps yet", "home.noMapsText": "Building maps will appear here once they are published.", "home.loadError": "Couldn't load maps.", "home.loading": "Loading maps…",
  "auth.creator": "MAP CREATOR", "auth.loginEyebrow": "WELCOME BACK", "auth.registerEyebrow": "GET STARTED", "auth.loginTitle": "Log in", "auth.registerTitle": "Create an account", "auth.loginSubtitle": "Access your map creator workspace.", "auth.registerSubtitle": "Set up your map creator workspace.", "auth.email": "Email", "auth.username": "Username", "auth.password": "Password", "auth.loginAction": "Log in", "auth.signupAction": "Sign up", "auth.logging": "Logging in…", "auth.creating": "Creating account…", "auth.noAccount": "No account yet?", "auth.haveAccount": "Already have an account?", "auth.createOne": "Create one", "auth.passwordHint": "At least 8 characters, with uppercase, lowercase, a number and a special character.", "auth.show": "Show password", "auth.hide": "Hide password", "auth.loginHero": "Turn floor plans into useful routes.", "auth.loginHeroText": "Sign in to create, connect, and publish interactive building maps.", "auth.registerHero": "Make indoor navigation easier to understand.", "auth.registerHeroText": "Create a workspace for publishing building maps and connected floor plans.", "auth.created": "Account created. Redirecting to log in…",
  "viewer.map": "Map library", "viewer.eyebrow": "BUILDING MAP", "viewer.instructions": "Choose two points to calculate the shortest walkable route.", "viewer.start": "Start point", "viewer.destination": "Destination", "viewer.chooseStart": "Choose a start", "viewer.chooseDestination": "Choose a destination", "viewer.find": "Find route", "viewer.finding": "Finding route…", "viewer.noPath": "There’s no walkable path between those two points.", "viewer.routeFound": "ROUTE FOUND", "viewer.distance": "nodes", "viewer.floors": "FLOORS", "viewer.routeHint": "Follow the highlighted line on each floor.", "viewer.floorSegment": "Floor segment", "viewer.overview": "Overview", "viewer.previous": "Previous", "viewer.next": "Next", "viewer.segment": "Segment", "viewer.loading": "Loading building…", "viewer.unnamed": "Hidden point", "viewer.chooseDifferent": "Choose two different points to find a route.",
  "creator.eyebrow": "MAP CREATOR", "creator.title": "Create a building map", "creator.subtitle": "Build the floor structure, place navigation points, then connect the route network.", "creator.ready": "ready", "creator.details": "Building details", "creator.detailsText": "Name the building so visitors can identify it.", "creator.buildingName": "Building name", "creator.buildingPlaceholder": "e.g. Engineering Building", "creator.floors": "Floor plans", "creator.floorsText": "Upload one image per floor, in the order you want them displayed.", "creator.upload": "Upload a floor plan", "creator.fileHint": "PNG, JPG or other image formats", "creator.removeFloor": "Remove floor", "creator.points": "Place navigation points", "creator.pointsText": "Click on the plan to place a point. Named points appear in the start and destination lists; leave the name empty to create a hidden point that is still part of the route.", "creator.placed": "placed", "creator.pointName": "Point name", "creator.optionalPoint": "Optional — e.g. Main entrance", "creator.addPoint": "Add point", "creator.cancel": "Cancel", "creator.unnamed": "Hidden point", "creator.remove": "Remove", "creator.connect": "Connect the route network", "creator.connectText": "Connect points with edges. Use cross-floor connections for stairs, lifts, or bridges.", "creator.from": "From", "creator.to": "To", "creator.weight": "Weight", "creator.choosePoint": "Choose a point", "creator.reverse": "Add reverse direction", "creator.addConnection": "Add connection", "creator.publish": "PUBLISH", "creator.readyTitle": "Ready to go?", "creator.publishText": "Your map will be published with the existing API contract and become available in the public map library.", "creator.checkName": "Building name", "creator.checkFloor": "Floor plan", "creator.checkPoints": "2+ points", "creator.checkRoute": "Route connection", "creator.publishAction": "Publish map", "creator.publishing": "Publishing…", "creator.loginTitle": "Sign in to create a map", "creator.loginText": "You need an account to upload floor plans and publish a building map.", "creator.or": "or", "creator.createAccount": "create an account", "creator.validation": "Add a name, at least one floor image, two nodes, and at least one edge.", "creator.canvasHint": "Click to place a navigation point",
  "common.floor": "Floor",
  "common.of": "of",
  "nav.primary": "Primary navigation",
  "nav.switchLang": "Switch to Arabic",
  "nav.switchToDark": "Switch to dark mode",
  "nav.switchToLight": "Switch to light mode",
  "nav.darkMode": "Dark mode",
  "nav.lightMode": "Light mode",
  "viewer.planner": "Route planner",
  "viewer.distanceLabel": "DISTANCE (PASSED NODES)",
  "viewer.nodeOne": "node",
  "viewer.nodeMany": "nodes",
  "viewer.delete": "Delete Building",
  "viewer.deleting": "Deleting…",
  "viewer.deleteConfirm": "Are you sure you want to delete this building?",
  "viewer.deleteFailed": "Failed to delete building",
  "viewer.directions": "Step-by-step directions",
  "steps.start": "Start from: {name}",
  "steps.startPoint": "the starting point",
  "steps.nextPoint": "the next point",
  "steps.destinationPoint": "the destination",
  "steps.elevator": "Take the elevator to the next floor",
  "steps.stairs": "Take the stairs to the next floor",
  "steps.right": "Go to {name}, then turn right",
  "steps.left": "Go to {name}, then turn left",
  "steps.straight": "Continue straight to {name}",
  "steps.finish": "Continue to your destination: {name}",
  "canvas.hint": "Drag a point to move it",
  "creator.undo": "Undo",
  "creator.redo": "Redo",
  "creator.clearDraft": "Clear draft",
  "creator.connectHint": "Click another point to connect",
  "creator.hiddenHint": "Leave empty for a hidden point",
  "creator.pointType": "Point type",
  "creator.typeNormal": "Normal",
  "creator.typeEntrance": "Entrance / Exit",
  "creator.typeElevator": "Elevator",
  "creator.typeStairs": "Stairs",
  "creator.editPoint": "Edit point",
  "creator.name": "Name",
  "creator.type": "Type",
  "creator.saveEdit": "Save changes",
  "creator.crossTitle": "Connect floors",
  "creator.crossText": "Link stairs and elevators between different floors.",
  "creator.fromPoint": "From point",
  "creator.toPoint": "To point",
  "creator.chooseOtherFloor": "Choose a point on another floor",
  "creator.addCrossLink": "Add floor connection",
  "creator.simTitle": "Path simulator",
  "creator.simText": "Test the shortest route before publishing to make sure every connection is complete.",
  "creator.simStart": "Route start",
  "creator.simEnd": "Route end",
  "creator.simChooseStart": "Choose a start point",
  "creator.simChooseEnd": "Choose a destination point",
  "creator.simRun": "Test route",
  "creator.simHide": "Hide route",
  "creator.simSteps": "Live preview directions:",
  "creator.simNoPath": "No path found between these points!"
};

const ar: Dictionary = {
  "brand.name": "مولّد الخرائط",
  "nav.browse": "تصفّح الخرائط", "nav.create": "إنشاء خريطة", "nav.login": "تسجيل الدخول", "nav.signup": "إنشاء حساب", "nav.logout": "تسجيل الخروج",
  "nav.language": "اللغة", "nav.switchAr": "العربية", "nav.switchEn": "English",
  "home.eyebrow": "الملاحة داخل المباني", "home.title": "اعثر على طريقك في كل طابق.", "home.subtitle": "تصفّح خرائط المباني التفاعلية، اختر نقطة البداية والوجهة، واحصل على مسار واضح عبر الطوابق.", "home.explore": "استكشف الخرائط", "home.account": "أنشئ حسابًا", "home.library": "مكتبة الخرائط", "home.available": "المباني المتاحة", "home.map": "خريطة", "home.maps": "خرائط", "home.floor": "طابق", "home.floors": "طوابق", "home.point": "نقطة", "home.points": "نقاط", "home.noMaps": "لا توجد خرائط بعد", "home.noMapsText": "ستظهر خرائط المباني هنا بعد نشرها.", "home.loadError": "تعذّر تحميل الخرائط.", "home.loading": "جارٍ تحميل الخرائط…",
  "auth.creator": "منشئ الخرائط", "auth.loginEyebrow": "مرحبًا بعودتك", "auth.registerEyebrow": "ابدأ الآن", "auth.loginTitle": "تسجيل الدخول", "auth.registerTitle": "إنشاء حساب", "auth.loginSubtitle": "ادخل إلى مساحة عمل إنشاء الخرائط.", "auth.registerSubtitle": "أنشئ مساحة عملك لإنشاء الخرائط.", "auth.email": "البريد الإلكتروني", "auth.username": "اسم المستخدم", "auth.password": "كلمة المرور", "auth.loginAction": "تسجيل الدخول", "auth.signupAction": "إنشاء حساب", "auth.logging": "جارٍ تسجيل الدخول…", "auth.creating": "جارٍ إنشاء الحساب…", "auth.noAccount": "ليس لديك حساب؟", "auth.haveAccount": "لديك حساب بالفعل؟", "auth.createOne": "أنشئ حسابًا", "auth.passwordHint": "8 أحرف على الأقل، مع حرف كبير وصغير ورقم ورمز خاص.", "auth.show": "إظهار كلمة المرور", "auth.hide": "إخفاء كلمة المرور", "auth.loginHero": "حوّل مخططات الطوابق إلى مسارات مفيدة.", "auth.loginHeroText": "سجّل الدخول لإنشاء خرائط المباني وربطها ونشرها بشكل تفاعلي.", "auth.registerHero": "اجعل الملاحة داخل المباني أسهل وأكثر وضوحًا.", "auth.registerHeroText": "أنشئ مساحة عمل لنشر خرائط المباني ومخططات الطوابق المترابطة.", "auth.created": "تم إنشاء الحساب. جارٍ تحويلك لتسجيل الدخول…",
  "viewer.map": "مكتبة الخرائط", "viewer.eyebrow": "خريطة المبنى", "viewer.instructions": "اختر نقطتين لحساب أقصر مسار قابل للمشي.", "viewer.start": "نقطة البداية", "viewer.destination": "الوجهة", "viewer.chooseStart": "اختر نقطة البداية", "viewer.chooseDestination": "اختر الوجهة", "viewer.find": "اعثر على المسار", "viewer.finding": "جارٍ البحث عن المسار…", "viewer.noPath": "لا يوجد مسار قابل للمشي بين النقطتين.", "viewer.routeFound": "تم العثور على المسار", "viewer.distance": "نقطة", "viewer.floors": "الطوابق", "viewer.routeHint": "اتبع الخط المميز في كل طابق.", "viewer.floorSegment": "جزء الطابق", "viewer.overview": "نظرة عامة", "viewer.previous": "السابق", "viewer.next": "التالي", "viewer.segment": "الجزء", "viewer.loading": "جارٍ تحميل المبنى…", "viewer.unnamed": "نقطة مخفية", "viewer.chooseDifferent": "اختر نقطتين مختلفتين للعثور على المسار.",
  "creator.eyebrow": "منشئ الخرائط", "creator.title": "إنشاء خريطة مبنى", "creator.subtitle": "أنشئ هيكل الطوابق، ضع نقاط الملاحة، ثم اربط شبكة المسارات.", "creator.ready": "جاهز", "creator.details": "بيانات المبنى", "creator.detailsText": "سمِّ المبنى حتى يتمكن الزوار من التعرّف عليه.", "creator.buildingName": "اسم المبنى", "creator.buildingPlaceholder": "مثال: مبنى الهندسة", "creator.floors": "مخططات الطوابق", "creator.floorsText": "ارفع صورة لكل طابق بالترتيب الذي تريد عرضه به.", "creator.upload": "رفع مخطط طابق", "creator.fileHint": "PNG أو JPG أو أي صورة أخرى", "creator.removeFloor": "حذف الطابق", "creator.points": "وضع نقاط الملاحة", "creator.pointsText": "اضغط على المخطط لوضع نقطة. تظهر النقاط المسمّاة في قوائم البداية والوجهة؛ اترك الاسم فارغًا لإنشاء نقطة مخفية تبقى جزءًا من المسار.", "creator.placed": "تم وضعها", "creator.pointName": "اسم النقطة", "creator.optionalPoint": "اختياري — مثال: المدخل الرئيسي", "creator.addPoint": "إضافة نقطة", "creator.cancel": "إلغاء", "creator.unnamed": "نقطة مخفية", "creator.remove": "حذف", "creator.connect": "ربط شبكة المسارات", "creator.connectText": "اربط النقاط بالحواف. استخدم الروابط بين الطوابق للسلالم أو المصاعد أو الجسور.", "creator.from": "من", "creator.to": "إلى", "creator.weight": "الوزن", "creator.choosePoint": "اختر نقطة", "creator.reverse": "إضافة الاتجاه العكسي", "creator.addConnection": "إضافة اتصال", "creator.publish": "نشر", "creator.readyTitle": "هل أنت جاهز؟", "creator.publishText": "سيتم نشر خريطتك باستخدام نفس عقد الـ API الحالية وستظهر في مكتبة الخرائط العامة.", "creator.checkName": "اسم المبنى", "creator.checkFloor": "مخطط الطابق", "creator.checkPoints": "نقطتان أو أكثر", "creator.checkRoute": "اتصال بالمسار", "creator.publishAction": "نشر الخريطة", "creator.publishing": "جارٍ النشر…", "creator.loginTitle": "سجّل الدخول لإنشاء خريطة", "creator.loginText": "تحتاج إلى حساب لرفع مخططات الطوابق ونشر خريطة المبنى.", "creator.or": "أو", "creator.createAccount": "أنشئ حسابًا", "creator.validation": "أضف اسمًا، وصورة طابق واحدة على الأقل، ونقطتين، واتصالًا واحدًا على الأقل.", "creator.canvasHint": "اضغط لوضع نقطة ملاحة",
  "common.floor": "الطابق",
  "common.of": "من",
  "nav.primary": "التنقل الرئيسي",
  "nav.switchLang": "التبديل إلى الإنجليزية",
  "nav.switchToDark": "التبديل إلى الوضع الداكن",
  "nav.switchToLight": "التبديل إلى الوضع الفاتح",
  "nav.darkMode": "الوضع الداكن",
  "nav.lightMode": "الوضع الفاتح",
  "viewer.planner": "مخطط المسار",
  "viewer.distanceLabel": "المسافة (النقاط التي ستمر بها)",
  "viewer.nodeOne": "نقطة",
  "viewer.nodeMany": "نقاط",
  "viewer.delete": "حذف المبنى",
  "viewer.deleting": "جارٍ الحذف…",
  "viewer.deleteConfirm": "هل أنت متأكد من حذف هذا المبنى بالكامل؟",
  "viewer.deleteFailed": "تعذّر حذف المبنى",
  "viewer.directions": "إرشادات الملاحة خطوة بخطوة",
  "steps.start": "ابدأ من: {name}",
  "steps.startPoint": "نقطة البداية",
  "steps.nextPoint": "النقطة التالية",
  "steps.destinationPoint": "الوجهة",
  "steps.elevator": "استخدم المصعد للانتقال إلى الطابق التالي",
  "steps.stairs": "استخدم السلم للانتقال إلى الطابق التالي",
  "steps.right": "اذهب إلى {name} ثم اتجه يمينًا",
  "steps.left": "اذهب إلى {name} ثم اتجه يسارًا",
  "steps.straight": "واصل السير للأمام نحو {name}",
  "steps.finish": "واصل السير للوصول إلى وجهتك: {name}",
  "canvas.hint": "اسحب النقطة لتحريكها",
  "creator.undo": "تراجع",
  "creator.redo": "إعادة",
  "creator.clearDraft": "مسح المسودة",
  "creator.connectHint": "اضغط على نقطة أخرى لتوصيلها",
  "creator.hiddenHint": "اتركه فارغًا لنقطة مخفية",
  "creator.pointType": "نوع النقطة",
  "creator.typeNormal": "عادية",
  "creator.typeEntrance": "مدخل / مخرج",
  "creator.typeElevator": "مصعد",
  "creator.typeStairs": "سلم",
  "creator.editPoint": "تعديل بيانات النقطة",
  "creator.name": "الاسم",
  "creator.type": "النوع",
  "creator.saveEdit": "حفظ التعديل",
  "creator.crossTitle": "التوصيل بين الطوابق",
  "creator.crossText": "اربط السلالم والمصاعد بين الطوابق المختلفة.",
  "creator.fromPoint": "من نقطة",
  "creator.toPoint": "إلى نقطة",
  "creator.chooseOtherFloor": "اختر نقطة في طابق آخر",
  "creator.addCrossLink": "إضافة وصلة بين الطوابق",
  "creator.simTitle": "محاكي المسارات",
  "creator.simText": "اختبر أقصر مسار قبل النشر للتأكد من اكتمال كل التوصيلات.",
  "creator.simStart": "بداية المسار",
  "creator.simEnd": "نهاية المسار",
  "creator.simChooseStart": "اختر نقطة البداية",
  "creator.simChooseEnd": "اختر نقطة الوجهة",
  "creator.simRun": "اختبار المسار",
  "creator.simHide": "إخفاء المسار",
  "creator.simSteps": "إرشادات المعاينة المباشرة:",
  "creator.simNoPath": "لا يوجد مسار واصل بين هاتين النقطتين!"
};

const dictionaries = { en, ar };

export type TFunction = (key: string, params?: Record<string, string | number>) => string;

interface I18nContextValue { lang: Language; setLang: (lang: Language) => void; t: TFunction; }
const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => (localStorage.getItem("map-generator-language") as Language) || "en");
  const setLang = (next: Language) => setLangState(next);
  useEffect(() => {
    localStorage.setItem("map-generator-language", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  const value = useMemo(() => ({
    lang,
    setLang,
    t: ((key, params) => {
      const text = dictionaries[lang][key] || dictionaries.en[key] || key;
      return params ? text.replace(/\{(\w+)\}/g, (_, k) => (k in params ? String(params[k]) : `{${k}}`)) : text;
    }) as TFunction,
  }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
