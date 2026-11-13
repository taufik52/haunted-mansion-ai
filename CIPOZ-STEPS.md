# Langkah Cipoz — Kiroween 2026: Haunted Mansion AI

> Semua yang BISA dikerjakan agen sudah selesai (lihat "Yang sudah siap" di
> bawah). File ini hanya berisi langkah yang HARUS dilakukan Cipoz sendiri,
> karena butuh akun / identitas / tanda tangan Cipoz. Bahasa Indonesia, urut
> dari yang paling mendesak.

## Tenggat (sudah dikonversi ke WIB, terverifikasi)

| Batas | Waktu PT | Waktu WIB |
|---|---|---|
| Minta 4.000 kredit Kiro gratis | Selasa 1 Des 2026, 12:00 PT | **Rabu 2 Des 2026, 03:00 WIB** |
| Submit di Devpost | Jumat 4 Des 2026, 14:00 PT | **Sabtu 5 Des 2026, 05:00 WIB** |

Jangan tunggu tenggat: permintaan kredit direview ~48 jam kerja dan
first-come-first-served — ajukan secepatnya setelah login. Kredit yang sudah
di-redeem berlaku sampai 31 Des 2026.

## Yang sudah siap (dikerjakan agen, 12 Nov 2026; diverifikasi ulang 13 Nov 2026)

- `npm test` — **13/13 lolos** (dijalankan ulang 13 Nov, Node v24.22.1).
- Smoke E2E server lokal — `GET /` 200 (judul "Haunted Mansion AI"),
  `/healthz` `{"status":"ok"}`, path tak dikenal 404, JS/CSS 200
  (dijalankan ulang 13 Nov).
- **App LIVE:** https://haunted-mansion-ai.netlify.app — deploy statis gratis
  (folder `public/`), terverifikasi publik tanpa login (root 200, JS/CSS 200;
  dicek ulang 13 Nov). CDN Leaflet 1.9.4 (unpkg, JS+CSS 200) dan tile
  OpenStreetMap (200) juga terverifikasi hidup 13 Nov.
  Catatan: `/healthz` hanya ada di server lokal (`npm start`), bukan di host
  statis — app-nya sendiri 100% client-side jadi jalan penuh di Netlify.
- **Repo lokal SIAP PUSH:** `git init` + commit awal sudah dibuat 13 Nov
  (`6bc5b41`, branch `main`, pesan "Haunted Mansion AI — Kiroween 2026
  (Frankenstein)"). Semua file ter-commit, `.kiro/` ikut ter-track dan
  TIDAK di-ignore (aturan Kiroween). Cipoz tinggal buat repo kosong di
  GitHub + `git remote add origin` + `git push` (lihat Langkah 4 yang
  sudah dipersingkat di bawah). Belum ada remote — tidak ada yang ter-push
  ke mana pun.
- `.kiro/` lengkap dan konsisten: steering (`product.md`, `tech.md`,
  `structure.md`), specs (`requirements.md`, `design.md`, `tasks.md` —
  2 kalimat yang kedaluwarsa di `design.md` sudah diperbaiki), hooks
  (`hooks.json`, run-tests-on-save). `.gitignore` TIDAK mengabaikan `.kiro/`
  (aturan Kiroween: repo yang mengabaikan `/.kiro` didiskualifikasi).
- `README.md`, `SUBMISSION.md` (draf Devpost, sudah terisi URL live),
  `docs/DEMO-SCRIPT.md` (naskah video < 3 menit), `LICENSE` MIT — semuanya
  sudah dicek akurat terhadap app saat ini (6 rooms, 10 houses, 4 setting ×
  4 monster × 4 twist, 5 chapter, 3 ending, seed default 13).
- Kiro CLI 3.2.1 terpasang di `~/.local/bin/kiro-cli`, terverifikasi
  (`kiro-cli --version` → 3.2.1). Status: **belum login** — login adalah
  langkah 1 di bawah.

Tidak ada uang yang dikeluarkan, tidak ada KYC/login yang dilakukan agen,
tidak ada repo yang dibuat, tidak ada yang di-submit.

## Langkah 1 — Login Kiro CLI (5 menit)

Di terminal VM (atau laptop Cipoz sendiri):

```bash
~/.local/bin/kiro-cli login
```

Login lewat browser dengan akun Cipoz sendiri (GitHub / Google / AWS Builder
ID). Lalu verifikasi:

```bash
~/.local/bin/kiro-cli whoami
```

Harus menampilkan akun Cipoz (bukan lagi "Not logged in").

## Langkah 2 — Minta 4.000 kredit Kiro gratis (SEGERA, sebelum 2 Des 03:00 WIB)

1. Buka https://kiroween.devpost.com/ dan pastikan Cipoz sudah terdaftar
   (Register) di hackathon Kiroween 2026.
2. Buka tab **Resources** di halaman yang sama
   (https://kiroween.devpost.com/resources) dan isi formulir permintaan kredit.
3. Isi dengan data Cipoz: nama lengkap, email Devpost, URL profil Devpost, dan
   kategori **Frankenstein** (wajib diisi — tanpa kategori, permintaan bisa
   ditolak).
4. **Verifikasi ID** akan diminta — hanya Cipoz yang bisa melakukannya.
5. Tunggu kode kredit (review ~48 jam kerja). Setelah kode diterima, redeem
   sebelum 4 Des 2026. Kredit tidak ada nilai uang dan tidak bisa diuangkan.

## Langkah 3 — Jalankan satu sesi agen Kiro di dalam repo (15–30 menit)

Setelah login + kredit aktif:

```bash
cd ~/workspace/kiroween
~/.local/bin/kiro-cli
```

Di dalam sesi Kiro, minta agen untuk:

1. Membaca dan mereview spec di `.kiro/specs/haunted-mansion-ai/` terhadap
   kode yang ada.
2. Menjalankan `npm test` dan memperbaiki apa pun yang gagal.
3. (Opsional) Memoles app bila ada waktu — tapi JANGAN ubah perilaku
   deterministik story generator tanpa mengupdate test.

Setelah sesi selesai, kabari agen (Muse) agar `KIRO-USAGE.md` diupdate dengan
transkrip/ringkasan sesi tersebut — ini bukti pemakaian Kiro yang jujur untuk
juri. Bila ada perubahan kode dari sesi Kiro, agen akan menjalankan ulang
`npm test` + redeploy ke Netlify.

## Langkah 4 — Buat repo GitHub publik + push (5 menit — commit lokal sudah siap)

Hanya Cipoz yang bisa membuat repo di akunnya. Di https://github.com/new:

- Repository name: `haunted-mansion-ai`
- Visibility: **Public**
- Jangan centang "Add a README" / .gitignore / license (semuanya sudah ada di
  folder lokal, dan commit awal sudah dibuat agen 13 Nov).

Lalu di terminal (repo lokal sudah `git init` + commit `6bc5b41`, branch `main`):

```bash
cd ~/workspace/kiroween
git remote add origin https://github.com/taufik52/haunted-mansion-ai.git
git push -u origin main
```

> Ganti `taufik52` dengan username GitHub Cipoz bila berbeda. Pastikan folder
> `.kiro/` ikut ter-push (cek di halaman repo GitHub) dan `LICENSE` MIT
> terdeteksi di sidebar About.

Setelah repo jadi, **kabari agen dengan URL repo-nya**. Agen akan:
memasukkan URL repo ke footer `public/index.html` (saat ini masih placeholder)
dan ke `SUBMISSION.md`, lalu redeploy Netlify.

## Langkah 5 — Rekam video demo < 3 menit + upload ke YouTube (30–60 menit)

Ikuti naskah persis di `docs/DEMO-SCRIPT.md` (durasi target ~2:30):

| Waktu | Isi |
|---|---|
| 0:00–0:15 | Homepage, tema spooky |
| 0:15–1:00 | Tab Story: pilih Mansion / Ghost / Mirror Twin, seed 13, Generate, klik 2 pilihan, tunjukkan ending |
| 1:00–1:30 | Tab Mansion: klik Library, collect item, tunjukkan inventory + badge |
| 1:30–2:05 | Tab Map: marker, popup, filter 4+, Best route |
| 2:05–2:25 | Terminal: `npm test` (13 lolos), `npm start`, `curl /healthz` |
| 2:25–2:30 | Penutup |

Upload sebagai **Public** (bukan Unlisted) ke YouTube, lalu isi link-nya ke
`SUBMISSION.md` (atau kabari agen untuk mengisikannya).

## Langkah 6 — Submit di Devpost (sebelum Sabtu 5 Des 2026, 05:00 WIB)

1. Buka https://kiroween.devpost.com/ → **Submit** / **Enter a submission**.
2. Kategori: **Frankenstein**.
3. Isi form dari `SUBMISSION.md` (judul, tagline, deskripsi, cara pakai Kiro,
   "Built with").
4. Link yang dimasukkan:
   - Public GitHub repo: URL dari Langkah 4.
   - Live app URL: https://haunted-mansion-ai.netlify.app (sudah jadi).
   - Demo video: link YouTube dari Langkah 5.
5. Submit, lalu simpan screenshot halaman konfirmasi sebagai bukti.

## Checklist akhir

- [ ] Langkah 1: `kiro-cli login` + `whoami` menampilkan akun Cipoz
- [ ] Langkah 2: 4.000 kredit diminta (sebelum 2 Des 03:00 WIB) + kode di-redeem
- [ ] Langkah 3: sesi agen Kiro jalan di repo + `KIRO-USAGE.md` diupdate
- [ ] Langkah 4: repo GitHub publik, `.kiro/` ter-push, LICENSE MIT terdeteksi
      (commit lokal `6bc5b41` sudah siap — tinggal buat repo kosong + push)
- [ ] Langkah 5: video YouTube < 3 menit, Public
- [ ] Langkah 6: submit Devpost sebelum 5 Des 05:00 WIB (kategori Frankenstein)

## Link penting

- Hackathon: https://kiroween.devpost.com/
- Rules resmi: https://kiroween.devpost.com/rules
- Form kredit: https://kiroween.devpost.com/resources (tab Resources)
- App live: https://haunted-mansion-ai.netlify.app
- Kiro: https://kiro.dev
