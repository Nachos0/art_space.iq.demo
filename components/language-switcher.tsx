"use client"

import { useState, useEffect } from "react"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Language = "en" | "ar"

interface LanguageSwitcherProps {
  onChange?: (lang: Language) => void
}

export default function LanguageSwitcher({ onChange }: LanguageSwitcherProps) {
  const [language, setLanguage] = useState<Language>("ar")

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
    // Always maintain RTL direction for Arabic layout
    document.documentElement.dir = "rtl"
  }, [])

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)

    // Always maintain RTL direction for Arabic layout
    document.documentElement.dir = "rtl"
    
    if (onChange) {
      onChange(lang)
    } else {
      // If no onChange handler is provided, reload the page
      window.location.reload()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-[#3d4f39] hover:text-[#3d4f39]/80">
          <Globe className="h-5 w-5" />
          <span className="sr-only">تبديل اللغة</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleLanguageChange("ar")}
          className={`flex items-center gap-2 ${language === "ar" ? "bg-[#3d4f39]/10" : ""}`}
        >
          <span className="font-arabic">العربية</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange("en")}
          className={`flex items-center gap-2 ${language === "en" ? "bg-[#3d4f39]/10" : ""}`}
        >
          <span>English</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
