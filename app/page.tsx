"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight, Calendar, Coffee, MapPin, Clock } from "lucide-react"
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { getTranslation, type Language } from "@/lib/translations"
import { useSiteData } from "@/lib/data-context"

interface Comment {
  id: number
  name: string
  date: string
  text: string
  avatar: string
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("ar")
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      name: "سارة جونسون",
      date: "قبل يومين",
      text: "أحببت المعرض الجديد! كانت قطع الألوان المائية رائعة حقاً.",
      avatar: "SJ",
    },
    {
      id: 2,
      name: "مايكل تشن",
      date: "قبل أسبوع",
      text: "القهوة والجو يجعلان هذا المكان المفضل لدي للعمل. المعارض الفنية الدوارة تحافظ على المكان جديداً وملهماً.",
      avatar: "MC",
    },
    {
      id: 3,
      name: "إيما ويلسون",
      date: "قبل أسبوعين",
      text: "حضرت ورشة العمل في صناعة الفخار الأسبوع الماضي. كان المدرس رائعاً وتعلمت الكثير!",
      avatar: "EW",
    },
  ])

  // Get site data from context
  const { events, artworks, openingHours } = useSiteData()

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

  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (comment.trim()) {
      setComments([
        {
          id: comments.length + 1,
          name: language === "en" ? "Guest User" : "زائر",
          date: language === "en" ? "Just now" : "الآن",
          text: comment,
          avatar: "GU",
        },
        ...comments,
      ])
      setComment("")
    }
  }

  return (
    <div className={`min-h-screen bg-[#f8f5f2] relative ${language === "ar" ? "text-right" : ""}`}>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative h-[85vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 z-10"></div>
        <Image src="/images/women-withart.jpg?height=1080&width=1920" alt="Art Space" fill className="object-cover" priority />
        <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center text-white">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl font-bold sm:text-6xl md:text-7xl tracking-tight">
              {language === "en" ? (
                <>
                  Art <span className="text-[#d9bfa4]">Space</span>
                </>
              ) : (
                <>
                  <span className="text-[#d9bfa4]">ارت</span> سبيس
                </>
              )}
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-gray-200 leading-relaxed">
              {getTranslation("heroSubtitle", language)}
            </p>
            <div className="mt-10 flex flex-wrap gap-5 justify-center">
              <Link href="/gallery" className="bg-[#3d4f39] text-white text-lg px-8 py-3 rounded-full transition-transform hover:scale-110">
                {language === "en" ? "Explore Gallery" : "استكشف المعرض"}
              </Link>
              <Link href="/cafe" className="bg-white text-[#3d4f39] text-lg px-8 py-3 rounded-full transition-transform hover:scale-110">
                {language === "en" ? "View Menu" : "عرض القائمة"}
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#f8f5f2] to-transparent"></div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-white">
        <div className="container">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-[#3d4f39] mb-4">{getTranslation("galleryTitle", language)}</h2>
            <div className="h-1 w-20 bg-[#d9bfa4] mx-auto mb-6"></div>
            <p className="text-lg text-[#3d4f39]/70">{getTranslation("gallerySubtitle", language)}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {artworks
              .filter(artwork => artwork.featured)
              .slice(0, 4)
              .map((artwork, index) => (
              <div
                key={`home-artwork-${artwork.id}-${index}`}
                className="group transition-transform duration-300 hover:scale-105"
              >
                <div className="aspect-square relative overflow-hidden mb-4">
                  <Image
                    src={artwork.image || `/placeholder.svg?height=600&width=600&text=Artwork ${artwork.id}`}
                    alt={artwork.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-lg text-[#3d4f39]">{artwork.title}</h3>
                  <p className="text-[#3d4f39]/70 mt-1">{artwork.artist}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link href="/gallery">
              <div className="inline-block relative transition-transform hover:scale-110">
                <div className="bg-[#3d4f39] text-white text-lg px-8 py-3 rounded-full">
                  {language === "en" ? "View All Artworks" : "عرض جميع الأعمال الفنية"}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-24 bg-[#3d4f39]/5">
        <div className="container">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-[#3d4f39] mb-4">{getTranslation("eventsTitle", language)}</h2>
            <div className="h-1 w-20 bg-[#d9bfa4] mx-auto mb-6"></div>
            <p className="text-lg text-[#3d4f39]/70">{getTranslation("eventsSubtitle", language)}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <div
                key={`home-event-${event.id}-${index}`}
                className="rounded-xl overflow-hidden bg-white shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]"
              >
                <div className="relative h-48">
                  <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                </div>
                <div className={`p-6 flex flex-col ${language === "ar" ? "text-right" : ""}`}>
                  <h3 className="text-xl font-semibold text-[#3d4f39] mb-3">{event.title}</h3>
                  <p className="text-[#3d4f39]/70 mb-4 line-clamp-2">{event.description}</p>
                  <div className={`mt-auto flex items-center gap-4 text-sm text-[#3d4f39]/60 ${language === "ar" ? "flex-row-reverse" : ""}`}>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link href="/events">
              <div className="inline-block relative transition-transform hover:scale-110">
                <div className="bg-[#3d4f39] text-white text-lg px-8 py-3 rounded-full">
                  {language === "en" ? "View All Events" : "عرض جميع الفعاليات"}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Cafe Section */}
      <section id="cafe" className="py-24 bg-[#d9bfa4]/10">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className={language === "ar" ? "order-last" : ""}>
              <h2 className="text-4xl font-bold text-[#3d4f39] mb-4">{getTranslation("cafeTitle", language)}</h2>
              <div className="h-1 w-20 bg-[#d9bfa4] mb-6"></div>
              <p className="text-lg text-[#3d4f39]/80 leading-relaxed">{getTranslation("cafeDescription", language)}</p>
              <div className="mt-8 space-y-8">
                <div className={`flex items-start ${language === "ar" ? "flex-row-reverse" : ""} gap-8`}>
                  <div className="w-14 h-14 rounded-full bg-[#3d4f39]/10 flex items-center justify-center flex-shrink-0">
                    <Coffee className="h-7 w-7 text-[#3d4f39]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-[#3d4f39] mb-2">
                      {getTranslation("specialtyCoffee", language)}
                    </h3>
                    <p className="text-[#3d4f39]/70 leading-relaxed">{getTranslation("specialtyCoffeeDesc", language)}</p>
                  </div>
                </div>
                <div className={`flex items-start ${language === "ar" ? "flex-row-reverse" : ""} gap-8`}>
                  <div className="w-14 h-14 rounded-full bg-[#3d4f39]/10 flex items-center justify-center flex-shrink-0">
                    <Coffee className="h-7 w-7 text-[#3d4f39]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-[#3d4f39] mb-2">
                      {getTranslation("artisanalPastries", language)}
                    </h3>
                    <p className="text-[#3d4f39]/70 leading-relaxed">{getTranslation("artisanalPastriesDesc", language)}</p>
                  </div>
                </div>
                <div className={`flex items-start ${language === "ar" ? "flex-row-reverse" : ""} gap-8`}>
                  <div className="w-14 h-14 rounded-full bg-[#3d4f39]/10 flex items-center justify-center flex-shrink-0">
                    <Coffee className="h-7 w-7 text-[#3d4f39]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-[#3d4f39] mb-2">
                      {getTranslation("lightLunch", language)}
                    </h3>
                    <p className="text-[#3d4f39]/70 leading-relaxed">{getTranslation("lightLunchDesc", language)}</p>
                  </div>
                </div>
              </div>
              <Link href="/cafe">
                <div className="inline-block relative mt-10 transition-transform hover:scale-110">
                  <div className="bg-[#3d4f39] text-white text-lg px-8 py-3 rounded-full">
                    {language === "en" ? "View Full Menu" : "عرض قائمة الطعام كاملة"}
                  </div>
                </div>
              </Link>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=1000&width=800&text=Café"
                  alt="Our Café"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-xl overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1560885521-4e61e9bc1631?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=400&width=400&text=Coffee"
                  alt="Coffee"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-36 h-36 rounded-xl overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=300&width=300&text=Pastry"
                  alt="Pastry"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2">
            <div className={language === "ar" ? "order-last" : ""}>
              <h2 className="text-4xl font-bold text-[#3d4f39] mb-4">{getTranslation("visitUs", language)}</h2>
              <div className="h-1 w-20 bg-[#d9bfa4] mb-6"></div>
              <p className="text-lg text-[#3d4f39]/80 leading-relaxed">{getTranslation("visitUsDesc", language)}</p>
              <div className="mt-8 space-y-8">
                <div className={`flex items-start gap-8 ${language === "ar" ? "flex-row-reverse" : ""}`}>
                  <div className="w-14 h-14 rounded-full bg-[#3d4f39]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-7 w-7 text-[#3d4f39]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-[#3d4f39] mb-2">{getTranslation("address", language)}</h3>
                    <p className="text-[#3d4f39]/70 leading-relaxed">
                      العباسية , شارع كيا سابقاً , مبنى ازياء بهاء
                      <br />
                      Basra, Iraq
                    </p>
                  </div>
                </div>
                <div className={`flex items-start gap-8 ${language === "ar" ? "flex-row-reverse" : ""}`}>
                  <div className="w-14 h-14 rounded-full bg-[#3d4f39]/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-7 w-7 text-[#3d4f39]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-[#3d4f39] mb-2">{getTranslation("hours", language)}</h3>
                    <p className="text-[#3d4f39]/70 leading-relaxed">
                      {getTranslation("weekdayHours", language)}
                      <br />
                      {getTranslation("weekendHours", language)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="inline-block relative mt-10 transition-transform hover:scale-110">
                {/* <div className="bg-[#3d4f39] text-white text-lg px-8 py-3 rounded-full">
                  {language === "en" ? "Get Directions" : "الحصول على الاتجاهات"}
                </div> */}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-[400px]">
              <Image
                src="/images/pepers-art.jpg?height=800&width=1200&text=Map"
                alt="Location Map"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-6 rounded-xl shadow-lg max-w-xs w-full">
                  <h3 className="font-semibold text-lg text-[#3d4f39]">
                    {language === "en" ? "Art Space" : "مساحة الفن"}
                  </h3>
                  <p className="mt-2 text-sm text-[#3d4f39]/70">
                    العباسية , شارع كيا سابقاً , مبنى ازياء بهاء
                    <br />
                    Basra, Iraq
                  </p>
                  <Button className="text-white mt-4 w-full bg-[#3d4f39] hover:bg-[#3d4f39]/90">
                    {language === "en" ? "View on Maps" : "عرض على الخرائط"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
