import React, { useState } from "react";

import {
  Map,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

function Login({ onLogin }) {
  const { language, t } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(t("requiredLogin"));
      return;
    }

    setLoading(true);

    // Demo login
    setTimeout(() => {
      const user = {
        email,
        name: email.split("@")[0] || "Explorer",
      };

      if (remember) {
        localStorage.setItem(
          "mapgen_user",
          JSON.stringify(user)
        );
      }

      setLoading(false);

      if (onLogin) {
        onLogin(user);
      }
    }, 700);
  };

  const DirectionIcon =
    language === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div
  dir={language === "ar" ? "rtl" : "ltr"}
 className="min-h-screen bg-slate-950 text-white flex flex-col items-center p-3 sm:p-4 md:p-6 relative overflow-x-hidden"
>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="absolute inset-0 opacity-[0.035]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
              backgroundSize: "45px 45px",
            }}
          />
        </div>
      </div>
{/* Top bar */}
<div className="relative z-20 w-full max-w-5xl mx-auto flex justify-end mb-2">
  <LanguageSwitcher />
</div>
      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 bg-slate-900/80 border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-xl">

        {/* Branding */}
        <div className="hidden lg:flex relative p-12 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-cyan-500/5 flex-col justify-between border-l border-slate-800">

          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                <Map className="w-6 h-6 text-emerald-400" />
              </div>

              <div>
                <h1 className="font-black text-xl tracking-tight">
                  Map
                  <span className="text-emerald-400">
                    Generator
                  </span>
                </h1>

                <p className="text-xs text-slate-500">
                  {t("indoorNavigationSystem")}
                </p>
              </div>
            </div>

            <div className="max-w-md">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold mb-4">
                <Sparkles className="w-4 h-4" />
                {t("smartIndoorNavigation")}
              </div>

              <h2 className="text-4xl font-black leading-tight mb-5">
                {t("navigateEvery")}
                <span className="text-emerald-400">
                  {" "}
                  {t("floor")}
                </span>

                <br />

                {t("findEvery")}
                <span className="text-cyan-400">
                  {" "}
                  {t("place")}
                </span>
              </h2>

              <p className="text-slate-400 leading-7">
                {t("loginDescription")}
              </p>
            </div>
          </div>

          {/* Mini map illustration */}
          <div className="relative mt-12 h-64 rounded-3xl bg-slate-950/70 border border-slate-800 overflow-hidden p-6">

            <div className="absolute inset-0 opacity-30">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
            </div>

            <div className="relative h-full">
              <div className="absolute top-5 right-8 w-32 h-20 border-2 border-slate-600 rounded-xl" />

              <div className="absolute top-28 right-8 w-20 h-16 border-2 border-slate-600 rounded-xl" />

              <div className="absolute bottom-5 left-12 w-44 h-14 border-2 border-slate-600 rounded-xl" />

              <div className="absolute top-[42px] right-[75px] w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.8)]" />

              <div className="absolute top-[90px] right-[80px] w-32 h-1 bg-emerald-400 rotate-45 origin-right shadow-[0_0_12px_rgba(52,211,153,0.5)]" />

              <div className="absolute bottom-[30px] left-[75px] w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)]" />

              <div className="absolute top-3 left-3 text-[10px] text-slate-600 font-mono">
                FLOOR_01 / ROUTE_ACTIVE
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 mt-6">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />

            {t("designedFor")}
          </div>
        </div>

        {/* Login */}
        <div className="p-7 sm:p-10 lg:p-12 flex flex-col justify-center">

          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/15 flex items-center justify-center">
              <Map className="w-5 h-5 text-emerald-400" />
            </div>

            <div>
              <h1 className="font-black text-lg">
                Map
                <span className="text-emerald-400">
                  Generator
                </span>
              </h1>

              <p className="text-[10px] text-slate-500">
                {t("indoorNavigation")}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-emerald-400 text-sm font-semibold mb-2">
              {t("welcomeBack")}
            </p>

            <h2 className="text-3xl font-black mb-3">
              {t("signInToYourMap")}
            </h2>

            <p className="text-slate-500 text-sm">
              {t("accessYourMaps")}
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">
                {t("email")}
              </label>

              <div className="relative">
                <Mail
                  className={`absolute ${
                    language === "ar"
                      ? "right-4"
                      : "left-4"
                  } top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500`}
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder={t("emailPlaceholder")}
                  className={`w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 ${
                    language === "ar"
                      ? "pr-11 pl-4"
                      : "pl-11 pr-4"
                  } text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">
                {t("password")}
              </label>

              <div className="relative">
                <Lock
                  className={`absolute ${
                    language === "ar"
                      ? "right-4"
                      : "left-4"
                  } top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500`}
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="••••••••"
                  className={`w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 ${
                    language === "ar"
                      ? "pr-11 pl-12"
                      : "pl-11 pr-12"
                  } text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className={`absolute ${
                    language === "ar"
                      ? "left-4"
                      : "right-4"
                  } top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300`}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember */}
            <div className="flex items-center justify-between">

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) =>
                    setRemember(e.target.checked)
                  }
                  className="accent-emerald-500"
                />

                <span className="text-xs text-slate-500">
                  {t("rememberMe")}
                </span>
              </label>

              <button
                type="button"
                className="text-xs text-emerald-400 hover:text-emerald-300"
              >
                {t("forgotPassword")}
              </button>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-xs">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full group bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 font-black py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
              ) : (
                <>
                  {t("signIn")}

                  <DirectionIcon
                    className={`w-4 h-4 transition-transform ${
                      language === "ar"
                        ? "group-hover:-translate-x-1"
                        : "group-hover:translate-x-1"
                    }`}
                  />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-slate-900 px-4 text-xs text-slate-600">
                MAP GENERATOR
              </span>
            </div>
          </div>

          <p className="text-center text-xs text-slate-600">
            {t("indoorNavigationMadeSimple")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;