# SwissAI Optimize — Site Geliştirme Planı

Hedef: Tek ekranlık hero'yu, dört dilli (DE/EN/FR/IT), yayına hazır, tam kapsamlı bir şirket sitesine dönüştürmek.
Kitle: İsviçre'deki KOBİ'ler — süreçlerini yapay zeka ile optimize etmek isteyen işletmeler.

---

## Faz 1 — İçerik Bölümleri (sitenin gövdesi)

### 1.1 Hizmetler ("leistungen")
- 4 kart: Süreç Otomasyonu · Veri Analizi & Raporlama · KI-Chatbot & Müşteri Hizmetleri · KI Danışmanlığı & Eğitim
- Her kart: Higgsfield ile üretilecek ikon/görsel, kısa açıklama, "mehr erfahren →" linki
- Kaydırdıkça beliren (scroll-reveal) animasyonlar, hover'da kart yükselmesi
- Navbar'daki "leistungen" linki buraya kayacak (smooth scroll)

### 1.2 Nasıl Çalışıyoruz (3 adım)
- Analyse → Optimierung → Resultate
- Numaralı adımlar, aralarında çizgi/ok animasyonu
- Her adımda 1-2 cümle + küçük görsel

### 1.3 Rakamlar / Güven şeridi
- "%40 zaman tasarrufu · 50+ proje · 4 dilde destek · İsviçre'de barındırma" tarzı 4 sayaç
- Görünür olunca sayıların animasyonla artması

### 1.4 Referanslar / Yorumlar
- 3-5 müşteri yorumu, kayan (marquee) veya kart döngüsü
- Not: Gerçek müşteri yorumları gerekli — yoksa bu bölüm "beta" olarak beklesin

### 1.5 Hakkımızda
- İsviçre vurgusu: kalite, gizlilik (nDSG/DSGVO), yerel destek
- Higgsfield ile üretilecek ofis/ekip temalı görsel

### 1.6 SSS (FAQ)
- 5-6 soru, akordeon (açılır/kapanır) animasyonlu
- "KI projesi ne kadar sürer?", "Verilerim nerede saklanıyor?" vb.

### 1.7 İletişim + Footer
- Form: ad, e-posta, mesaj → Formspree/EmailJS ile gerçek gönderim (backend gerekmez)
- Alternatif: WhatsApp butonu + e-posta linki
- Footer: logo, dört dilde linkler, Impressum & Datenschutz sayfaları (İsviçre'de zorunlu)

---

## Faz 2 — Görsel Varlıklar (Higgsfield)

- [x] Hero videosu (göz kırpan android) — TAMAM
- [x] Logo 8K + şeffaf ikon — TAMAM
- [ ] 4 hizmet kartı görseli (aynı stil: açık gri zemin, krom + sarı aksan)
- [ ] Hakkımızda bölümü görseli (İsviçre/ofis teması)
- [ ] Sosyal medya paylaşım görseli (OG image, 1200×630)
- [ ] İkinci video (opsiyonel): sayfa ortasında geçiş bölümü için kısa loop

## Faz 3 — Çok Dillilik & İçerik Kalitesi

- i18n.ts'yi bölüm bazlı genişlet (services, steps, faq, footer...)
- Dil seçimini localStorage'a kaydet (sayfa yenilenince hatırlasın)
- URL ile dil: `?lang=fr` desteği (paylaşılabilir linkler)
- `<html lang>` etiketinin dille birlikte değişmesi
- Metinlerin ana dili Almanca; FR/IT çevirilerinin kontrolü

## Faz 4 — Teknik & Performans

- Hero videosunu indirip projeye alma + sıkıştırma (H.264, ~2-3 MB hedef)
  - Şu an Higgsfield CDN'inden geliyor; kendi hostingimizde olmalı
- `poster` görseli: video yüklenene kadar ilk kare görünsün
- Görselleri WebP'ye çevirme, `loading="lazy"`
- Lighthouse hedefi: Performance 90+, Accessibility 95+
- public/logo.png (4K, ~5 MB) → siteden çıkar, sadece küçük versiyonlar kalsın

## Faz 5 — SEO & Paylaşım

- Dört dilde meta title/description
- Open Graph + Twitter Card etiketleri (WhatsApp/LinkedIn önizlemesi)
- favicon seti (16/32/180/512 + apple-touch-icon)
- sitemap.xml + robots.txt
- Yapısal veri (JSON-LD: Organization, LocalBusiness)

## Faz 6 — Yayına Alma

- GitHub reposu oluştur (git init + ilk commit)
- Vercel'e deploy → `swissai-optimize.vercel.app`
- Kendi domaini bağlama (öneri: swissai-optimize.ch — Swissreg/Infomaniak'tan alınır)
- Deploy sonrası mobil + masaüstü gerçek cihaz testi

## Faz 7 — Sonrası (opsiyonel, ayrı iş)

- "Ask me anything" kutusunu gerçek yapay zekaya bağlama (Claude API, küçük bir backend gerekir)
- Google Analytics / Plausible ile ziyaretçi takibi
- Blog / Wissenszentrum bölümü (SEO için uzun vadeli en etkili yatırım)
- Randevu sistemi (Calendly gömme — kodsuz, 10 dakika)

---

## Önerilen Sıra ve Tahmini Süre

| Sıra | İş | Süre (yaklaşık) |
|------|-----|------|
| 1 | Faz 1.1 + 1.2 + 1.7 (hizmetler, süreç, iletişim+footer) | 1 oturum |
| 2 | Faz 2 görselleri (4 kart + hakkımızda + OG) | 30 dk (üretim beklemeli) |
| 3 | Faz 1.3 + 1.5 + 1.6 (rakamlar, hakkımızda, SSS) | 1 oturum |
| 4 | Faz 3 (i18n genişletme + dil hafızası) | kısa |
| 5 | Faz 4 + 5 (performans + SEO) | 1 oturum |
| 6 | Faz 6 (deploy + domain) | kısa; domain kaydı sana bağlı |

## Senden Gerekenler
- [ ] İletişim bilgileri: e-posta, telefon/WhatsApp, adres (Impressum için zorunlu)
- [ ] Hizmet listesi onayı (yukarıdaki 4 hizmet doğru mu, eklenecek/çıkarılacak var mı?)
- [ ] Varsa gerçek müşteri yorumları / referans logoları
- [ ] Domain tercihi (.ch mi .com mu)
- [ ] Fiyatlandırma bölümü istenip istenmediği
