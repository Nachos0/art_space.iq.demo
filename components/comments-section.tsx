"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getTranslation, type Language } from "@/lib/translations"

interface Comment {
  id: number
  name: string
  date: string
  text: string
  avatar: string
}

export default function CommentsSection() {
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [comment, setComment] = useState("")
  const [language, setLanguage] = useState<Language>("en")
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      date: "2 days ago",
      text: "I loved the new exhibition! The watercolor pieces were absolutely breathtaking.",
      avatar: "SJ",
    },
    {
      id: 2,
      name: "Michael Chen",
      date: "1 week ago",
      text: "The coffee and atmosphere make this my favorite place to work. The rotating art installations keep the space fresh and inspiring.",
      avatar: "MC",
    },
    {
      id: 3,
      name: "Emma Wilson",
      date: "2 weeks ago",
      text: "Attended the pottery workshop last weekend. The instructor was amazing and I learned so much!",
      avatar: "EW",
    },
  ])

  useEffect(() => {
    // Get stored language preference or default to English
    const storedLang = localStorage.getItem("language") as Language
    if (storedLang && (storedLang === "en" || storedLang === "ar")) {
      setLanguage(storedLang)
    }
  }, [])

  const handleSubmitComment = (e: React.FormEvent) => {
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
    <>
      {/* Floating Comments Button */}
      <button
        onClick={() => setCommentsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#3d4f39] text-white shadow-lg flex items-center justify-center hover:bg-[#3d4f39]/90 transition-transform hover:scale-110"
      >
        <MessageSquare className="h-6 w-6" />
        <span className="sr-only">Open comments</span>
      </button>

      {/* Floating Comments Panel */}
      {commentsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div
            className={`relative w-full max-w-lg max-h-[80vh] bg-white rounded-xl shadow-2xl overflow-hidden ${language === "ar" ? "text-right" : "text-left"}`}
          >
            <div className="p-4 border-b flex items-center justify-between bg-[#3d4f39] text-white">
              <h3 className="font-semibold text-lg">{getTranslation("visitorComments", language)}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCommentsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <div className="p-4 max-h-[50vh] overflow-y-auto">
              {comments.map((comment) => (
                <div key={comment.id} className="mb-4 pb-4 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                  <div className={`flex items-start gap-3 ${language === "ar" ? "flex-row-reverse" : ""}`}>
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?text=${comment.avatar}`} />
                      <AvatarFallback>{comment.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className={`flex items-center gap-2 ${language === "ar" ? "flex-row-reverse" : ""}`}>
                        <h4 className="font-medium text-[#3d4f39]">{comment.name}</h4>
                        <span className="text-xs text-gray-500">{comment.date}</span>
                      </div>
                      <p className="mt-1 text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t bg-gray-50">
              <form onSubmit={handleSubmitComment}>
                <Textarea
                  placeholder={getTranslation("leaveComment", language)}
                  className="w-full resize-none border-[#d9bfa4]/30 focus:border-[#3d4f39] focus:ring-[#3d4f39]"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  dir={language === "ar" ? "rtl" : "ltr"}
                />
                <div className={`mt-3 flex ${language === "ar" ? "justify-start" : "justify-end"}`}>
                  <Button type="submit" className="bg-[#3d4f39] hover:bg-[#3d4f39]/90">
                    {getTranslation("postComment", language)}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
