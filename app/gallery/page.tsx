"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTranslation, type Language } from "@/lib/translations"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useSiteData } from "@/lib/data-context"
import Link from 'next/link'

export default function GalleryPage() {
  const [language, setLanguage] = useState<Language>("en")
  const { artworks } = useSiteData()

  useEffect(() => {
    // Get stored language preference or default to English
    const storedLang = localStorage.getItem("language") as Language
    if (storedLang && (storedLang === "en" || storedLang === "ar")) {
      setLanguage(storedLang)
    }
  }, [])

  // Distribute artworks into columns for masonry layout
  const distributeArtworksIntoColumns = (artworks: any[], columnCount = 3) => {
    const columns: any[][] = Array.from({ length: columnCount }, () => []);
    
    artworks.forEach((artwork, index) => {
      const columnIndex = index % columnCount;
      columns[columnIndex].push(artwork);
    });
    
    return columns;
  }

  const columns = distributeArtworksIntoColumns(artworks, 3);

  return (
    <div className="min-h-screen bg-[#f8f5f2]">
      <Header />
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh]">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <Image
          src="https://images.unsplash.com/photo-1565799515768-2dcfd834625c?q=80&w=2119&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=800&width=1920&text=Art Gallery"
          alt="Art Gallery"
          fill
          className="object-cover"
          priority
        />
        <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">{getTranslation("galleryTitle", language)}</h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-200">{getTranslation("gallerySubtitle", language)}</p>
        </div>
      </section>

      {/* Gallery Section - Masonry Layout */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[#3d4f39] mb-4">
              {language === "en" ? "Our Art Collection" : "مجموعتنا الفنية"}
            </h2>
            <div className="h-1 w-20 bg-[#d9bfa4] mx-auto mb-6"></div>
          </div>

          {/* Masonry Gallery Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {columns.map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-4">
                {column.map((artwork) => (
                  <div 
                    key={`gallery-artwork-${columnIndex}-${artwork.id}`} 
                    className="group relative overflow-hidden rounded-xl bg-[#f8f5f2] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
                  >
                    {/* Use random heights for masonry effect */}
                    <div className={`relative ${columnIndex % 2 === 0 ? 'aspect-[3/4]' : 'aspect-square'}`}>
                      <Image
                        src={artwork.image || `/placeholder.svg?height=600&width=800&text=${artwork.title}`}
                        alt={artwork.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className={`absolute bottom-0 left-0 w-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${language === "ar" ? "text-right" : "text-left"}`}>
                        <h3 className="font-semibold text-xl text-white">{artwork.title}</h3>
                        <p className="text-white/80 mt-1">{artwork.artist}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {artworks.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#3d4f39]/70 text-lg">
                {language === "en"
                  ? "No artworks found in the gallery."
                  : "لم يتم العثور على أعمال فنية في المعرض."}
              </p>
            </div>
          )}

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

      {/* Featured Artist Section */}
      <section className="py-16 bg-[#3d4f39]/5">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[#3d4f39] mb-4">
              {language === "en" ? "Featured Artist" : "الفنان المميز"}
            </h2>
            <div className="h-1 w-20 bg-[#d9bfa4] mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-square rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=800&width=800&text=Artist Portrait"
                  alt="Featured Artist"
                  width={800}
                  height={800}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-xl overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="/placeholder.svg?height=400&width=400&text=Artwork"
                  alt="Artist Artwork"
                  width={400}
                  height={400}
                  className="object-cover"
                />
              </div>
            </div>

            <div className={language === "ar" ? "text-right" : ""}>
              <h3 className="text-2xl font-bold text-[#3d4f39]">Elena Rodriguez</h3>
              <p className="text-[#d9bfa4] font-medium mt-1">
                {language === "en" ? "Contemporary Painter" : "رسامة معاصرة"}
              </p>

              <p className="mt-6 text-[#3d4f39]/80 leading-relaxed">
                {language === "en"
                  ? "Elena Rodriguez is a contemporary artist whose work explores the intersection of color, emotion, and memory. Drawing inspiration from both urban and natural landscapes, her paintings create immersive experiences that invite viewers to reflect on their own relationship with space and time."
                  : "إيلينا رودريغيز هي فنانة معاصرة يستكشف عملها تقاطع اللون والعاطفة والذاكرة. مستوحاة من المناظر الطبيعية الحضرية والطبيعية، تخلق لوحاتها تجارب غامرة تدعو المشاهدين للتفكير في علاقتهم الخاصة بالمكان والزمان."}
              </p>

              <p className="mt-4 text-[#3d4f39]/80 leading-relaxed">
                {language === "en"
                  ? 'Her current exhibition "Abstract Harmony" features a series of large-scale oil paintings that represent a new direction in her artistic practice, emphasizing bold brushwork and vibrant color palettes.'
                  : 'يضم معرضها الحالي "تناغم تجريدي" سلسلة من اللوحات الزيتية كبيرة الحجم التي تمثل اتجاهًا جديدًا في ممارستها الفنية، مع التركيز على ضربات الفرشاة الجريئة ولوحات الألوان النابضة بالحياة.'}
              </p>

              <Button className="mt-8 bg-[#3d4f39] hover:bg-[#3d4f39]/90 transition-transform hover:scale-110">
                {language === "en" ? "View Artist Profile" : "عرض ملف الفنان"}
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

