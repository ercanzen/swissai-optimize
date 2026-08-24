# SwissAI Optimize — Durum ve Yol Haritası

Son güncelleme: 2026-08-24. Bu dosya önceki bir taslak aşamasından kalma "yapılacaklar" listesiydi; site o zamandan beri büyük ölçüde tamamlandı. Aşağıda gerçek duruma göre güncel özet var.

## Tamamlanmış

- **İçerik bölümleri**: Hero, Hizmetler (AEO/GEO, Prozess-Automatisierung, KI-Assistent), 3 adımlı süreç, İstatistikler, Hakkımızda, Referanslar (şu an "Beispiel" etiketli örnek içerik), SSS, Fiyatlandırma, İletişim, Footer — hepsi `src/components/` altında, dört dilde (`src/i18n.ts`).
- **KI-Audit lead-gen aracı** (`src/pages/Audit.tsx` + `api/_lib/audit.ts`): Claude API ile 3 otomasyon önerisi + KI-görünürlük kontrolü üretiyor, Resend ile lead e-postası gönderiyor, Upstash Redis'e kaydediyor. Artık tam 4 dilli (form metinleri `i18n.ts`'ye bağlı, Claude'a yanıt dili talimatı geçiliyor).
- **Haftalık takip e-postaları** (`api/weekly-pulse.ts`, Vercel Cron ile haftada bir tetikleniyor) + abonelik iptali (`api/unsubscribe.ts`).
- **Yasal sayfalar**: Impressum, Datenschutz — gerçek işletme bilgileriyle dolu.
- **SEO**: Tam meta/OG/Twitter etiketleri, JSON-LD (ProfessionalService), sitemap.xml, robots.txt, favicon seti — `index.html`.
- **Teknik altyapı**: `npm install`/`build`/`dev` çalışıyor (proje `C:\dev\swissai-optimize`'a taşındı — eski Desktop yolundaki `&` karakteri Windows/npm ile çakışıyordu). `api/audit.ts` ve `api/contact.ts` girişleri doğruluyor; `/api/audit` Upstash Redis üzerinden IP bazlı rate limit (saatte 3 istek) ile korunuyor. `api/` klasörü artık ayrı bir `tsconfig.json` ile `npm run build`'a dahil tip kontrolünden geçiyor. Vitest ile temel birim testleri (`npm run test`) mevcut.

## Kalan işler

### İçerik / iş kararları (kod değil — sizden bekliyor)
- Gerçek müşteri yorumları geldiğinde `i18n.ts` → `testimonials.items` güncellenmeli, "Beispiel" rozeti kaldırılmalı.
- 4 hizmet kartı görseli + "Hakkımızda" bölümü görseli hâlâ eksik (Higgsfield ile üretilebilir).
- Fiyatlandırma (Audit CHF 690, Basis CHF 490/ay, Premium CHF 990/ay) onayı.

### Yayına alma (henüz yapılmadı)
- Git deposu yok, hiçbir yere deploy edilmedi.
- `.env` şablonu var ama gerçek anahtarlar (ANTHROPIC_API_KEY, RESEND_API_KEY, CRON_SECRET) girilmedi.
- `swissai-optimize.ch` domaininin sahiplik/DNS durumu netleştirilmeli; Resend'de gönderen adresi doğrulanmalı.
- Vercel projesi + Upstash Redis entegrasyonu + ortam değişkenleri kurulmalı.

### Opsiyonel / uzun vadeli
- Google Analytics / Plausible, blog/bilgi merkezi, gerçek Claude destekli arama kutusu, Calendly entegrasyonu.

Detaylı fazlı plan için bkz. proje geçmişindeki Claude Code oturumu (`.claude/plans/reflective-napping-pizza.md` benzeri) veya bu dosyanın git geçmişi.
