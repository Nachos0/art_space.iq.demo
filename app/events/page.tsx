"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Calendar, Clock, MapPin, Search, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getTranslation, type Language } from "@/lib/translations"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useSiteData } from "@/lib/data-context"

export default function EventsPage() {
  const [language, setLanguage] = useState<Language>("en")
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { events } = useSiteData()

  // Add type property to events if it doesn't exist
  const eventsWithType = events.map(event => ({
    ...event,
    type: event.hasOwnProperty('type') ? event.type : 'exhibition', // Default type
    featured: event.hasOwnProperty('featured') ? event.featured : false // Default not featured
  }))

  useEffect(() => {
    // Get stored language preference or default to English
    const storedLang = localStorage.getItem("language") as Language
    if (storedLang && (storedLang === "en" || storedLang === "ar")) {
      setLanguage(storedLang)
    }
  }, [])

  // Filter events based on type and search query
  const filteredEvents = eventsWithType
    .filter((event) => filter === "all" || event.type === filter)
    .filter(
      (event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  // Get featured events
  const featuredEvents = eventsWithType.filter((event) => event.featured)

  return (
    <div className="min-h-screen bg-[#f8f5f2]">
      <Header />
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh]">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <Image
          src="https://images.unsplash.com/photo-1459908676235-d5f02a50184b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=800&width=1920&text=Events"
          alt="Events"
          fill
          className="object-cover"
          priority
        />
        <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">{getTranslation("eventsTitle", language)}</h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-200">{getTranslation("eventsSubtitle", language)}</p>
        </div>
      </section>

      {/* Featured Events Section */}
      {featuredEvents.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-[#3d4f39] mb-4">
                {language === "en" ? "Featured Events" : "الفعاليات المميزة"}
              </h2>
              <div className="h-1 w-20 bg-[#d9bfa4] mx-auto mb-6"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredEvents.map((event) => (
                <div key={event.id} className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                  <div className="relative h-64 md:h-80">
                    <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div
                      className={`flex items-center gap-2 text-[#d9bfa4] mb-2 ${language === "ar" ? "flex-row-reverse" : ""}`}
                    >
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                    <p className="text-white/80 line-clamp-2 mb-4">{event.description}</p>
                    <Button className="bg-[#3d4f39] hover:bg-[#3d4f39]/90 transition-transform hover:scale-110">
                      {language === "en" ? "Learn More" : "معرفة المزيد"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Events Listing Section */}
      <section className="py-16 bg-[#3d4f39]/5">
        <div className="container">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#3d4f39] mb-4">
              {language === "en" ? "Upcoming Events" : "الفعاليات القادمة"}
            </h2>
            <div className="h-1 w-20 bg-[#d9bfa4] mb-8"></div>

            <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
              <Tabs defaultValue="all" className="w-full md:w-auto">
                <TabsList className={`bg-white p-1 ${language === "ar" ? "flex-row-reverse" : ""}`}>
                  <TabsTrigger
                    value="all"
                    onClick={() => setFilter("all")}
                    className="data-[state=active]:bg-[#3d4f39] data-[state=active]:text-white transition-transform hover:scale-105"
                  >
                    {language === "en" ? "All" : "الكل"}
                  </TabsTrigger>
                  <TabsTrigger
                    value="exhibition"
                    onClick={() => setFilter("exhibition")}
                    className="data-[state=active]:bg-[#3d4f39] data-[state=active]:text-white transition-transform hover:scale-105"
                  >
                    {language === "en" ? "Exhibitions" : "معارض"}
                  </TabsTrigger>
                  <TabsTrigger
                    value="workshop"
                    onClick={() => setFilter("workshop")}
                    className="data-[state=active]:bg-[#3d4f39] data-[state=active]:text-white transition-transform hover:scale-105"
                  >
                    {language === "en" ? "Workshops" : "ورش عمل"}
                  </TabsTrigger>
                  <TabsTrigger
                    value="talk"
                    onClick={() => setFilter("talk")}
                    className="data-[state=active]:bg-[#3d4f39] data-[state=active]:text-white transition-transform hover:scale-105"
                  >
                    {language === "en" ? "Talks" : "محادثات"}
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#3d4f39]/60" />
                <Input
                  type="search"
                  placeholder={language === "en" ? "Search events..." : "البحث عن فعاليات..."}
                  className="pl-10 border-[#d9bfa4]/30 focus:border-[#3d4f39] focus:ring-[#3d4f39] w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <div key={event.id} className="rounded-xl overflow-hidden bg-white shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]">
                  <div className="relative h-48">
                    <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#3d4f39] mb-3">{event.title}</h3>
                    <p className="text-[#3d4f39]/80">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-16">
                <p className="text-[#3d4f39]/70 text-lg">
                  {language === "en"
                    ? "No events found matching your criteria."
                    : "لم يتم العثور على فعاليات تطابق معاييرك."}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
