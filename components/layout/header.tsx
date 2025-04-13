"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import LanguageSwitcher from "@/components/language-switcher"
import { getTranslation, type Language } from "@/lib/translations"

export default function Header() {
  const [language, setLanguage] = useState<Language>("ar")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // Get stored language preference or default to Arabic
    const storedLang = localStorage.getItem("language") as Language
    if (storedLang && (storedLang === "en" || storedLang === "ar")) {
      setLanguage(storedLang)
    } else {
      // If no stored preference, set to Arabic
      setLanguage("ar")
      localStorage.setItem("language", "ar")
    }
    // Always use RTL direction regardless of language
    document.documentElement.dir = "rtl"
  }, [])

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
    // Always keep RTL direction for Arabic layout
    document.documentElement.dir = "rtl"
    // Reload the page to apply changes fully
    window.location.reload()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#d9bfa4]/20 bg-[#f8f5f2]/95 backdrop-blur-sm">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/images/art-space-logo.jpg" alt="Café Logo" width={40} height={40} className="rounded-full" />
          {language === "ar" ? (
            <span className="text-2xl font-bold text-[#3d4f39] tracking-tight font-arabic">ارت سبيس</span>
          ) : (
            <span className="text-2xl font-bold text-[#3d4f39] tracking-tight">Art Space</span>
          )}
        </div>

        <nav className={`hidden md:flex items-center gap-8 ${language === "ar" ? "flex-row-reverse" : ""}`}>
          <Link href="/" className="text-[#3d4f39] hover:text-[#3d4f39]/80 font-medium">
            {getTranslation("home", language)}
          </Link>
          <Link href="/gallery" className="text-[#3d4f39] hover:text-[#3d4f39]/80 font-medium">
            {getTranslation("gallery", language)}
          </Link>
          <Link href="/events" className="text-[#3d4f39] hover:text-[#3d4f39]/80 font-medium">
            {getTranslation("events", language)}
          </Link>
          <Link href="/cafe" className="text-[#3d4f39] hover:text-[#3d4f39]/80 font-medium">
            {getTranslation("cafe", language)}
          </Link>
          <Link href="/contact" className="text-[#3d4f39] hover:text-[#3d4f39]/80 font-medium">
            {getTranslation("contact", language)}
          </Link>
          <LanguageSwitcher onChange={handleLanguageChange} />
        </nav>

        <div className={`flex items-center md:hidden ${language === "ar" ? "flex-row-reverse" : ""}`}>
          <LanguageSwitcher onChange={handleLanguageChange} />
          <Button
            variant="outline"
            size="icon"
            className={`border-[#3d4f39] text-[#3d4f39] ${language === "ar" ? "mr-2" : "ml-2"}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">{language === "ar" ? "تبديل القائمة" : "Toggle menu"}</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#d9bfa4]/20">
          <nav className={`container py-4 flex flex-col space-y-4 ${language === "ar" ? "text-right" : ""}`}>
            <Link
              href="/"
              className="text-[#3d4f39] hover:text-[#3d4f39]/80 font-medium px-4 py-2 hover:bg-[#3d4f39]/5 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              {getTranslation("home", language)}
            </Link>
            <Link
              href="/gallery"
              className="text-[#3d4f39] hover:text-[#3d4f39]/80 font-medium px-4 py-2 hover:bg-[#3d4f39]/5 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              {getTranslation("gallery", language)}
            </Link>
            <Link
              href="/events"
              className="text-[#3d4f39] hover:text-[#3d4f39]/80 font-medium px-4 py-2 hover:bg-[#3d4f39]/5 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              {getTranslation("events", language)}
            </Link>
            <Link
              href="/cafe"
              className="text-[#3d4f39] hover:text-[#3d4f39]/80 font-medium px-4 py-2 hover:bg-[#3d4f39]/5 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              {getTranslation("cafe", language)}
            </Link>
            <Link
              href="/contact"
              className="text-[#3d4f39] hover:text-[#3d4f39]/80 font-medium px-4 py-2 hover:bg-[#3d4f39]/5 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              {getTranslation("contact", language)}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
