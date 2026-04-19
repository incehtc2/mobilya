-- Örnek kategoriler
insert into categories (name, slug, image) values
  ('Oturma Odası', 'oturma-odasi', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'),
  ('Yatak Odası',  'yatak-odasi',  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800'),
  ('Yemek Odası',  'yemek-odasi',  'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800'),
  ('Çalışma Odası','calisma-odasi','https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800');

-- Örnek ürünler
insert into products (name, slug, description, price, category_id, images, stock, featured) values
  (
    'Milano Koltuk', 'milano-koltuk',
    'El yapımı İtalyan derisiyle kaplı, masif ceviz ayaklı premium koltuk. Zamansız tasarımı ve üstün konforu ile yaşam alanınıza şıklık katar.',
    45000,
    (select id from categories where slug = 'oturma-odasi'),
    ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800','https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'],
    12, true
  ),
  (
    'Venezia Yemek Masası', 'venezia-yemek-masasi',
    'Doğal mermer yüzeyli, paslanmaz çelik ayaklı 6 kişilik yemek masası. Her yemek, bir sanat deneyimine dönüşür.',
    68000,
    (select id from categories where slug = 'yemek-odasi'),
    ARRAY['https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800'],
    5, true
  ),
  (
    'Floransa Yatak Başlığı', 'floransa-yatak-basligi',
    'Boucle kumaş kaplı, LED aydınlatmalı yatak başlığı. Modern estetiği ile yatak odanıza sofistike bir dokunuş.',
    28000,
    (select id from categories where slug = 'yatak-odasi'),
    ARRAY['https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800'],
    8, false
  ),
  (
    'Roma Çalışma Masası', 'roma-calisma-masasi',
    'Masif meşe ahşabından üretilmiş, gizli kablo yönetimli çalışma masası. Verimliliği şıklıkla buluşturur.',
    35000,
    (select id from categories where slug = 'calisma-odasi'),
    ARRAY['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800'],
    6, true
  ),
  (
    'Atina Sehpa', 'atina-sehpa',
    'Düzensiz mermer yüzeyli, bronz renkli metal ayaklı sehpa. İki farklı yükseklikte, set olarak kullanılabilir.',
    18500,
    (select id from categories where slug = 'oturma-odasi'),
    ARRAY['https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=800'],
    15, false
  ),
  (
    'Napoli Kitaplık', 'napoli-kitaplik',
    'Doğal ahşap ve siyah metal kombinasyonlu, modüler kitaplık sistemi. İstediğiniz konfigürasyonda düzenlenebilir.',
    42000,
    (select id from categories where slug = 'calisma-odasi'),
    ARRAY['https://images.unsplash.com/photo-1594194996416-5afa76ccf0d2?w=800'],
    4, false
  );
