import React from "react";
import { Languages } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      type="button"
      aria-label="Change language"
      title="Change language"
      className="shrink-0 flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold shadow-lg hover:border-emerald-500 hover:text-emerald-400 transition whitespace-nowrap"
    >
      <Languages className="w-4 h-4" />

      <span>
        {language === "ar" ? "English" : "العربية"}
      </span>
    </button>
  );
}

export default LanguageSwitcher;