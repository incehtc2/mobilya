export const SITE_NAME = "ARCA";
export const SITE_TAGLINE = "Zamansız Tasarım, Kusursuz Zarafet";
export const SITE_DESCRIPTION =
  "El yapımı premium mobilyalar. Her parça, evinizi bir sanat galerisine dönüştürür.";

export const CATEGORIES = [
  {
    label: "Oturma Odası",
    slug: "oturma-odasi",
    image: "/images/mobilya/7.jpg",
    sub: ["Koltuklar", "Sehpalar", "TV Üniteleri", "Kitaplıklar"],
  },
  {
    label: "Yatak Odası",
    slug: "yatak-odasi",
    image: "/images/mobilya/6.jpg",
    sub: ["Yataklar", "Başlıklar", "Komodolar", "Şifonyer"],
  },
  {
    label: "Yemek Odası",
    slug: "yemek-odasi",
    image: "/images/mobilya/16.jpg",
    sub: ["Yemek Masaları", "Sandalyeler", "Büfeler", "Bar Takımları"],
  },
  {
    label: "Çalışma Odası",
    slug: "calisma-odasi",
    image: "/images/mobilya/13.jpg",
    sub: ["Çalışma Masaları", "Ofis Koltukları", "Kitaplıklar", "Dosya Dolabı"],
  },
  {
    label: "Bahçe & Balkon",
    slug: "bahce-balkon",
    image: "/images/bahce/14.jpg",
    sub: ["Bahçe Setleri", "Şezlonglar", "Salıncaklar", "Saksı Standları"],
  },
  {
    label: "Aydınlatma",
    slug: "aydinlatma",
    image: "/images/lamba/27.jpg",
    sub: ["Avizeler", "Ayak Lambaları", "Duvar Aplikleri", "Masa Lambaları"],
  },
];

export const NAV_LINKS = [
  { label: "Koleksiyonlar", href: "/koleksiyonlar", hasDropdown: true },
  { label: "Kampanyalar", href: "/kampanyalar", isCampaign: true },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

export const FOOTER_LINKS = {
  koleksiyonlar: CATEGORIES.map((c) => ({
    label: c.label,
    href: `/koleksiyonlar?kategori=${c.slug}`,
  })),
  kurumsal: [
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "İletişim", href: "/iletisim" },
    { label: "Gizlilik Politikası", href: "/gizlilik" },
    { label: "Kullanım Koşulları", href: "/kosullar" },
  ],
  musteri: [
    { label: "Hesabım", href: "/hesap" },
    { label: "Sipariş Takibi", href: "/hesap/siparisler" },
    { label: "İade & Değişim", href: "/iade" },
    { label: "Kargo Bilgisi", href: "/kargo" },
  ],
};

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "Facebook", href: "https://facebook.com" },
];

export const ORDER_STATUSES = {
  pending: { label: "Bekliyor", color: "bg-yellow-100 text-yellow-800" },
  paid: { label: "Ödendi", color: "bg-blue-100 text-blue-800" },
  processing: { label: "Hazırlanıyor", color: "bg-purple-100 text-purple-800" },
  shipped: { label: "Kargoda", color: "bg-indigo-100 text-indigo-800" },
  delivered: { label: "Teslim Edildi", color: "bg-green-100 text-green-800" },
  cancelled: { label: "İptal Edildi", color: "bg-red-100 text-red-800" },
};
