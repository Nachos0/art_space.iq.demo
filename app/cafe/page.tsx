"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { getTranslation, type Language } from "@/lib/translations"
import { useSiteData } from "@/lib/data-context"

export default function CafePage() {
  const [language, setLanguage] = useState<Language>("en")
  const { cafeItems } = useSiteData()
  const [activeCategory, setActiveCategory] = useState("all")

  useEffect(() => {
    // Get stored language preference or default to English
    const storedLang = localStorage.getItem("language") as Language
    if (storedLang && (storedLang === "en" || storedLang === "ar")) {
      setLanguage(storedLang)
    }
  }, [])

  // Get unique categories
  const categories = Array.from(new Set(cafeItems.map(item => item.category)));

  // Helper function to display category nicely
  const displayCategory = (category: string) => {
    if (language === "en") {
      // Capitalize first letter for English
      return category.charAt(0).toUpperCase() + category.slice(1);
    } else {
      // Arabic translation
      switch(category) {
        case "drink": return "مشروبات";
        case "food": return "طعام";
        case "dessert": return "حلويات";
        default: return category;
      }
    }
  };

  // Filter items based on selected category
  const filteredItems = activeCategory === "all" 
    ? cafeItems 
    : cafeItems.filter(item => item.category === activeCategory);

  // Organize cafe items by category for display
  const itemsByCategory = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof cafeItems>);

  return (
    <div className="min-h-screen bg-[#f8f5f2]">
      <Header />
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh]">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <Image
          src="https://plus.unsplash.com/premium_photo-1663932464937-e677ddfc1d55?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=800&width=1920&text=Café"
          alt="Café"
          fill
          className="object-cover"
          priority
        />
        <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">{getTranslation("cafeTitle", language)}</h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-200">{getTranslation("cafeDescription", language)}</p>
        </div>
      </section>

      {/* Café Ambiance Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className={language === "ar" ? "text-right" : ""}>
              <h2 className="text-3xl font-bold text-[#3d4f39] mb-6">
                {language === "en" ? "A Cozy Space to Relax and Create" : "مساحة مريحة للاسترخاء والإبداع"}
              </h2>
              <p className="text-lg text-[#3d4f39]/80 mb-4">
                {language === "en"
                  ? "Our café provides the perfect ambiance for artists, writers, and creative minds to work, socialize, or simply enjoy a great cup of coffee while surrounded by inspiring artwork."
                  : "يوفر مقهانا الأجواء المثالية للفنانين والكتاب والعقول المبدعة للعمل والتواصل الاجتماعي أو ببساطة الاستمتاع بفنجان رائع من القهوة محاطًا بأعمال فنية ملهمة."}
              </p>
              <p className="text-lg text-[#3d4f39]/80 mb-6">
                {language === "en"
                  ? "We host regular events including poetry readings, book clubs, and small acoustic performances. Check our events page for upcoming gatherings."
                  : "نستضيف فعاليات منتظمة بما في ذلك قراءات الشعر ونوادي الكتب والعروض الصوتية الصغيرة. تحقق من صفحة الأحداث الخاصة بنا للتجمعات القادمة."}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="/placeholder.svg?height=400&width=400&text=Café 1"
                alt="Café Interior"
                width={400}
                height={400}
                className="rounded-lg object-cover h-full"
              />
              <Image
                src="/placeholder.svg?height=400&width=400&text=Café 2"
                alt="Café Seating"
                width={400}
                height={400}
                className="rounded-lg object-cover h-full"
              />
              <Image
                src="/placeholder.svg?height=400&width=400&text=Café 3"
                alt="Coffee Art"
                width={400}
                height={400}
                className="rounded-lg object-cover h-full"
              />
              <Image
                src="/placeholder.svg?height=400&width=400&text=Café 4"
                alt="Pastries"
                width={400}
                height={400}
                className="rounded-lg object-cover h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16 bg-[#3d4f39]/5">
        <div className="container">
          <div className={`mb-16 text-center max-w-2xl mx-auto ${language === "ar" ? "text-right" : ""}`}>
            <h2 className="text-4xl font-bold text-[#3d4f39] mb-4">
              {language === "en" ? "Our Menu" : "قائمتنا"}
            </h2>
            <div className={`h-1 w-16 bg-[#d9bfa4] mb-6 ${language === "ar" ? "mr-0" : "mx-auto"}`}></div>
            <p className="text-lg text-[#3d4f39]/70">
              {language === "en"
                ? "We source the finest ingredients and prepare everything with care and attention to detail."
                : "نحن نحصل على أفضل المكونات ونعد كل شيء بعناية واهتمام بالتفاصيل."}
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-10">
            <Tabs defaultValue="all" className="w-full">
              <div className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 ${language === "ar" ? "flex-row-reverse" : ""}`}>
                <TabsList className={`bg-white p-1 ${language === "ar" ? "flex-row-reverse" : ""}`}>
                  <TabsTrigger
                    value="all"
                    onClick={() => setActiveCategory("all")}
                    className="data-[state=active]:bg-[#3d4f39] data-[state=active]:text-white"
                  >
                    {language === "en" ? "All" : "الكل"}
                  </TabsTrigger>
                  
                  {categories.map(category => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      onClick={() => setActiveCategory(category)}
                      className="data-[state=active]:bg-[#3d4f39] data-[state=active]:text-white"
                    >
                      {displayCategory(category)}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <div className={`flex items-center gap-2 ${language === "ar" ? "flex-row-reverse" : ""}`}>
                  <Filter className="h-5 w-5 text-[#3d4f39]" />
                  <span className="text-[#3d4f39] font-medium">{language === "en" ? "Filter" : "تصفية"}</span>
                </div>
              </div>
            </Tabs>
          </div>

          {/* Menu Categories */}
          <div className="grid gap-12">
            {Object.entries(itemsByCategory).map(([category, items]) => (
              <div key={category}>
                <h3 className={`text-2xl font-semibold text-[#3d4f39] mb-6 border-b pb-2 ${language === "ar" ? "text-right" : ""}`}>
                  {displayCategory(category)}
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {items.map((item) => (
                    <div key={item.id} className={`flex gap-4 ${language === "ar" ? "flex-row-reverse text-right" : ""} min-h-[120px]`}>
                      <div className="w-16 h-16 bg-[#d9bfa4]/10 rounded-lg flex items-center justify-center text-[#d9bfa4] shrink-0">
                        <span className="text-xl font-bold">{item.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className={`flex justify-between items-start mb-2 ${language === "ar" ? "flex-row-reverse" : ""}`}>
                          <h4 className="font-medium text-lg text-[#3d4f39] leading-tight">{item.name}</h4>
                          <Badge variant="outline" className="bg-[#d9bfa4] text-white border-0 whitespace-nowrap mr-2">
                            {item.price}
                          </Badge>
                        </div>
                        <p className={`text-[#3d4f39]/70 line-clamp-2 ${language === "ar" ? "text-right" : ""}`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {Object.keys(itemsByCategory).length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#3d4f39]/70 text-lg">
                {language === "en"
                  ? "No items found in this category."
                  : "لم يتم العثور على عناصر في هذه الفئة."}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
