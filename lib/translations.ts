type TranslationKey =
  | "home"
  | "gallery"
  | "events"
  | "cafe"
  | "contact"
  | "heroTitle"
  | "heroSubtitle"
  | "exploreGallery"
  | "viewMenu"
  | "galleryTitle"
  | "gallerySubtitle"
  | "viewAllArtworks"
  | "eventsTitle"
  | "eventsSubtitle"
  | "viewAllEvents"
  | "cafeTitle"
  | "cafeDescription"
  | "specialtyCoffee"
  | "specialtyCoffeeDesc"
  | "artisanalPastries"
  | "artisanalPastriesDesc"
  | "lightLunch"
  | "lightLunchDesc"
  | "viewFullMenu"
  | "visitUs"
  | "visitUsDesc"
  | "address"
  | "hours"
  | "weekdayHours"
  | "weekendHours"
  | "getDirections"
  | "newsletter"
  | "newsletterDesc"
  | "subscribe"
  | "privacyNotice"
  | "copyright"
  | "visitorComments"
  | "leaveComment"
  | "postComment"

type Translations = {
  [key in TranslationKey]: {
    en: string
    ar: string
  }
}

export const translations: Translations = {
  home: {
    en: "Home",
    ar: "الرئيسية",
  },
  gallery: {
    en: "Gallery",
    ar: "المعرض",
  },
  events: {
    en: "Events",
    ar: "الفعاليات",
  },
  cafe: {
    en: "Café",
    ar: "المقهى",
  },
  contact: {
    en: "Contact",
    ar: "اتصل بنا",
  },
  heroTitle: {
    en: "Art Space",
    ar: "مساحة الفن",
  },
  heroSubtitle: {
    en: "A creative sanctuary where art, coffee, and community converge to inspire and delight.",
    ar: "ملاذ إبداعي حيث يلتقي الفن والقهوة والمجتمع للإلهام والبهجة.",
  },
  exploreGallery: {
    en: "Explore Gallery",
    ar: "استكشف المعرض",
  },
  viewMenu: {
    en: "View Menu",
    ar: "عرض القائمة",
  },
  galleryTitle: {
    en: "Art Gallery",
    ar: "معرض الفن",
  },
  gallerySubtitle: {
    en: "Discover our curated collection of local and international artists, featuring rotating exhibitions that showcase diverse styles and mediums.",
    ar: "اكتشف مجموعتنا المنسقة من الفنانين المحليين والدوليين، مع معارض متناوبة تعرض أساليب ووسائط متنوعة.",
  },
  viewAllArtworks: {
    en: "View All Artworks",
    ar: "عرض جميع الأعمال الفنية",
  },
  eventsTitle: {
    en: "Our Events",
    ar: "فعالياتنا",
  },
  eventsSubtitle: {
    en: "Join us for exhibitions, workshops, artist talks, and community gatherings that celebrate creativity in all its forms.",
    ar: "انضم إلينا للمعارض وورش العمل ومحادثات الفنانين والتجمعات المجتمعية التي تحتفل بالإبداع بجميع أشكاله.",
  },
  viewAllEvents: {
    en: "View All Events",
    ar: "عرض جميع الفعاليات",
  },
  cafeTitle: {
    en: "Our Café",
    ar: "مقهانا",
  },
  cafeDescription: {
    en: "Enjoy specialty coffee and homemade pastries in our cozy café while surrounded by inspiring artwork. We source our beans from local roasters and offer a variety of brewing methods to satisfy every coffee enthusiast.",
    ar: "استمتع بالقهوة المتخصصة والمعجنات المنزلية في مقهانا المريح بينما تحيط بك الأعمال الفنية الملهمة. نحصل على حبوبنا من المحمصات المحلية ونقدم مجموعة متنوعة من طرق التحضير لإرضاء كل عشاق القهوة.",
  },
  specialtyCoffee: {
    en: "Specialty Coffee",
    ar: "قهوة متخصصة",
  },
  specialtyCoffeeDesc: {
    en: "Expertly crafted espresso drinks, pour-overs, and cold brews made with locally roasted beans.",
    ar: "مشروبات إسبريسو محترفة، وقهوة مصبوبة، ومشروبات باردة مصنوعة من حبوب محمصة محلياً.",
  },
  artisanalPastries: {
    en: "Artisanal Pastries",
    ar: "معجنات حرفية",
  },
  artisanalPastriesDesc: {
    en: "Freshly baked goods made in-house daily using traditional recipes and organic ingredients.",
    ar: "مخبوزات طازجة يتم تحضيرها يومياً باستخدام وصفات تقليدية ومكونات عضوية.",
  },
  lightLunch: {
    en: "Light Lunch Options",
    ar: "خيارات غداء خفيفة",
  },
  lightLunchDesc: {
    en: "Seasonal sandwiches and salads with locally sourced ingredients that change with the seasons.",
    ar: "سندويشات موسمية وسلطات بمكونات محلية تتغير مع الفصول.",
  },
  viewFullMenu: {
    en: "View Full Menu",
    ar: "عرض القائمة الكاملة",
  },
  visitUs: {
    en: "Visit Us",
    ar: "زورونا",
  },
  visitUsDesc: {
    en: "We're located in the heart of the arts district. Come experience our unique blend of art and coffee in a space designed to inspire creativity and connection.",
    ar: "نحن نقع في قلب حي الفنون. تعال لتجربة مزيجنا الفريد من الفن والقهوة في مساحة مصممة لإلهام الإبداع والتواصل.",
  },
  address: {
    en: "Address",
    ar: "العنوان",
  },
  hours: {
    en: "Hours",
    ar: "ساعات العمل",
  },
  weekdayHours: {
    en: "Monday - Friday: 8am - 8pm",
    ar: "الاثنين - الجمعة: ٨ ص - ٨ م",
  },
  weekendHours: {
    en: "Saturday - Sunday: 9am - 6pm",
    ar: "السبت - الأحد: ٩ ص - ٦ م",
  },
  getDirections: {
    en: "Get Directions",
    ar: "الحصول على الاتجاهات",
  },
  newsletter: {
    en: "Newsletter",
    ar: "النشرة الإخبارية",
  },
  newsletterDesc: {
    en: "Subscribe to our newsletter for updates on exhibitions, events, and special offers.",
    ar: "اشترك في نشرتنا الإخبارية للحصول على تحديثات حول المعارض والفعاليات والعروض الخاصة.",
  },
  subscribe: {
    en: "Subscribe",
    ar: "اشترك",
  },
  privacyNotice: {
    en: "We respect your privacy. Unsubscribe at any time.",
    ar: "نحن نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت.",
  },
  copyright: {
    en: "© 2025 Mustafa .J All rights reserved.",
    ar: "© ٢٠٢٥ Mustafa .J جميع الحقوق محفوظة.",
  },
  visitorComments: {
    en: "Visitor Comments",
    ar: "تعليقات الزوار",
  },
  leaveComment: {
    en: "Leave a comment...",
    ar: "اترك تعليقاً...",
  },
  postComment: {
    en: "Post Comment",
    ar: "نشر التعليق",
  },
}

export type Language = "en" | "ar"

export function getTranslation(key: TranslationKey, language: Language): string {
  return translations[key][language]
}
