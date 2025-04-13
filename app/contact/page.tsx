"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Mail, MapPin, Phone, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getTranslation, type Language } from "@/lib/translations"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function ContactPage() {
  const [language, setLanguage] = useState<Language>("en")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  useEffect(() => {
    // Get stored language preference or default to English
    const storedLang = localStorage.getItem("language") as Language
    if (storedLang && (storedLang === "en" || storedLang === "ar")) {
      setLanguage(storedLang)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle form submission here
    console.log("Form submitted:", formData)
    alert(language === "en" ? "Message sent! We'll get back to you soon." : "تم إرسال الرسالة! سنرد عليك قريبًا.")
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  return (
    <div className="min-h-screen bg-[#f8f5f2]">
      <Header />
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh]">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <Image
          src="https://images.unsplash.com/photo-1545989253-02cc26577f88?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=800&width=1920&text=Contact Us"
          alt="Contact Us"
          fill
          className="object-cover"
          priority
        />
        <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">{getTranslation("contact", language)}</h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-200">
            {language === "en"
              ? "We'd love to hear from you. Reach out with any questions, feedback, or inquiries."
              : "نود أن نسمع منك. تواصل معنا لأي أسئلة أو ملاحظات أو استفسارات."}
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`bg-[#f8f5f2] p-8 rounded-xl ${language === "ar" ? "text-right" : ""}`}>
              <div className={`flex items-center gap-8 ${language === "ar" ? "flex-row-reverse" : ""}`}>
                <div className="w-14 h-14 bg-[#3d4f39]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-7 w-7 text-[#3d4f39]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#3d4f39] mb-2">{getTranslation("address", language)}</h3>
                  <p className="text-[#3d4f39]/70 leading-relaxed">
                    العباسية , شارع كيا سابقاً , مبنى ازياء بهاء
                    <br />
                    Basra, Iraq
                  </p>
                </div>
              </div>
            </div>

            <div className={`bg-[#f8f5f2] p-8 rounded-xl ${language === "ar" ? "text-right" : ""}`}>
              <div className={`flex items-center gap-8 ${language === "ar" ? "flex-row-reverse" : ""}`}>
                <div className="w-14 h-14 bg-[#3d4f39]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="h-7 w-7 text-[#3d4f39]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#3d4f39] mb-2">{language === "en" ? "Phone" : "الهاتف"}</h3>
                  <p className="text-[#3d4f39]/70 leading-relaxed">
                    {language === "en" ? "Monday - Friday: 8am - 8pm" : "الاثنين - الجمعة: ٨ ص - ٨ م"}
                    <br />
                    {language === "en" ? "Saturday - Sunday: 9am - 6pm" : "السبت - الأحد: ٩ ص - ٦ م"}
                  </p>
                </div>
              </div>
            </div>

            <div className={`bg-[#f8f5f2] p-8 rounded-xl ${language === "ar" ? "text-right" : ""}`}>
              <div className={`flex items-center gap-8 ${language === "ar" ? "flex-row-reverse" : ""}`}>
                <div className="w-14 h-14 bg-[#3d4f39]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-7 w-7 text-[#3d4f39]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#3d4f39] mb-2">
                    {language === "en" ? "Email" : "البريد الإلكتروني"}
                  </h3>
                  <p className="text-[#3d4f39]/70 leading-relaxed">
                    info@artspace.com
                    <br />
                    events@artspace.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map and Contact Form Section */}
      <section className="py-16 bg-[#3d4f39]/5">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="rounded-xl overflow-hidden shadow-lg h-[500px] relative">
              <Image
                src="/placeholder.svg?height=1000&width=1000&text=Map"
                alt="Location Map"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-6 rounded-xl shadow-lg max-w-xs w-full">
                  <h3 className="font-semibold text-lg text-[#3d4f39]">Art Space</h3>
                  <p className="mt-2 text-sm text-[#3d4f39]/70">
                    العباسية , شارع كيا سابقاً , مبنى ازياء بهاء
                    <br />
                    Basra, Iraq
                  </p>
                  <Button className="text-white mt-4 w-full bg-[#3d4f39] hover:bg-[#3d4f39]/90">
                    {language === "en" ? "Get Directions" : "الحصول على الاتجاهات"}
                  </Button>
                </div>
              </div>
            </div>

            <div className={language === "ar" ? "text-right" : ""}>
              <h2 className="text-3xl font-bold text-[#3d4f39] mb-4">
                {language === "en" ? "Send Us a Message" : "أرسل لنا رسالة"}
              </h2>
              <div className="h-1 w-20 bg-[#d9bfa4] mb-6"></div>
              <p className="text-[#3d4f39]/70 mb-6">
                {language === "en"
                  ? "Have a question or comment? Fill out the form below and we'll get back to you as soon as possible."
                  : "هل لديك سؤال أو تعليق؟ املأ النموذج أدناه وسنرد عليك في أقرب وقت ممكن."}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#3d4f39] mb-1">
                    {language === "en" ? "Name" : "الاسم"}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border-[#d9bfa4]/30 focus:border-[#3d4f39] focus:ring-[#3d4f39]"
                    dir={language === "ar" ? "rtl" : "ltr"}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#3d4f39] mb-1">
                    {language === "en" ? "Email" : "البريد الإلكتروني"}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-[#d9bfa4]/30 focus:border-[#3d4f39] focus:ring-[#3d4f39]"
                    dir={language === "ar" ? "rtl" : "ltr"}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#3d4f39] mb-1">
                    {language === "en" ? "Subject" : "الموضوع"}
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full border-[#d9bfa4]/30 focus:border-[#3d4f39] focus:ring-[#3d4f39]"
                    dir={language === "ar" ? "rtl" : "ltr"}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#3d4f39] mb-1">
                    {language === "en" ? "Message" : "الرسالة"}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full border-[#d9bfa4]/30 focus:border-[#3d4f39] focus:ring-[#3d4f39]"
                    dir={language === "ar" ? "rtl" : "ltr"}
                  />
                </div>

                <Button type="submit" className="text-white bg-[#3d4f39] hover:bg-[#3d4f39]/90 text-lg px-8 py-6">
                  {language === "en" ? "Send Message" : "إرسال الرسالة"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Hours and Visit Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={language === "ar" ? "order-last text-right" : ""}>
              <h2 className="text-3xl font-bold text-[#3d4f39] mb-4">{getTranslation("visitUs", language)}</h2>
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
                    <Clock className="h-7 w-7 text-[#3d4f39]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-[#3d4f39] mb-2">{getTranslation("hours", language)}</h3>
                    <p className="text-[#3d4f39]/70 leading-relaxed">
                      {language === "en" ? "Monday - Friday: 8am - 8pm" : "الاثنين - الجمعة: ٨ ص - ٨ م"}
                      <br />
                      {language === "en" ? "Saturday - Sunday: 9am - 6pm" : "السبت - الأحد: ٩ ص - ٦ م"}
                    </p>
                  </div>
                </div>
              </div>

              <Button className="mt-10 bg-[#3d4f39] hover:bg-[#3d4f39]/90 text-lg px-8 py-6 rounded-full">
                {getTranslation("getDirections", language)}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=500&width=500&text=Gallery"
                  alt="Gallery"
                  width={500}
                  height={500}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=500&width=500&text=Café"
                  alt="Café"
                  width={500}
                  height={500}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=500&width=500&text=Workshop"
                  alt="Workshop"
                  width={500}
                  height={500}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=500&width=500&text=Event"
                  alt="Event"
                  width={500}
                  height={500}
                  className="object-cover h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
