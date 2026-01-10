------------ cek http://localhost:8081/ ---------------

git pull origin main

-------------------------------------

# tambah .env

APP_NAME=Tubes
APP_ENV=local
APP_KEY=base64:CSy/c30TtqO0TotSrr3SAVPB5kqzUDakDsEDNSVddJI=
APP_DEBUG=true
APP_URL=http://localhost:8082

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file

DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=tubes_db        
DB_USERNAME=tubes_user      
DB_PASSWORD=tubes_password

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

CACHE_STORE=database

MEMCACHED_HOST=127.0.0.1

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=log
MAIL_SCHEME=null
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

VITE_APP_NAME="${APP_NAME}"

--------------------------------------

### Jalankan ###

docker compose up -d --build
docker exec -it tubes_backend php artisan migrate --force


UPDATE FITUR (GHRYSHVI)


# 🚀 Tubes IPA - Integrated Web Platform (Level 5 Architecture)

Project Tugas Besar Integrasi Platform Aplikasi (IPA) yang mengimplementasikan arsitektur Microservices menggunakan Docker, React, Laravel, dan PostgreSQL. Project ini telah mencapai standar **Level 5** dengan fitur Monitoring, Security, dan Disaster Recovery plan.

---

## 👥 The Team (Dream Team)

| Nama | Role | Tanggung Jawab Utama |
| :--- | :--- | :--- |
| **Hype AMD** | **DevSecOps & Backend Engineer** | Docker Infrastructure, Network Security, Monitoring Stack, Database Management. |
| **Alam** | **Frontend Engineer & UI** | React/Next.js Development, Admin Dashboard, User Interface Implementation. |
| **Farrel** | **QA & Release Manager** | Repository Owner, GitHub Actions (CI/CD), API Testing, Documentation & Architecture. |

---

## 🛠️ Tech Stack & Architecture

* **Frontend:** React.js / Next.js (Port `8081`)
* **Backend:** Laravel 11 API (Port `8082`)
* **Database:** PostgreSQL 15 (Isolated Network)
* **Containerization:** Docker & Docker Compose
* **Monitoring:** Prometheus, cAdvisor, Grafana (Port `3001`)
* **Security:** Rate Limiting, Private Network Isolation, Secret Management.

---

## ⚙️ Cara Install & Menjalankan (Setup Awal)

Ikuti langkah ini jika baru pertama kali clone repo di laptop baru:

1.  **Clone Repository:**
    ```bash
    git clone [https://github.com/username-farrel/nama-repo.git](https://github.com/username-farrel/nama-repo.git)
    cd nama-repo
    ```

2.  **Setup Environment Variables:**
    * Copy file `.env.example` menjadi `.env` di folder `backend-api`.
    * Minta file `.env` yang valid (berisi key database) ke **Hype AMD**.

3.  **Jalankan Docker:**
    ```powershell
    docker compose up -d
    ```
    *Tunggu hingga semua container (frontend, backend, db, monitoring) statusnya "Running".*

4.  **Setup Backend (Hanya sekali di awal):**
    ```powershell
    # Install dependencies & Generate Key
    docker compose run --rm --no-deps backend composer install --ignore-platform-reqs
    docker compose run --rm --no-deps backend php artisan key:generate
    
    # Migrasi Database
    docker exec -it tubes_backend php artisan migrate
    ```

---

## 📈 Monitoring & Disaster Recovery Cheatsheet (PENTING!)

Bagian ini adalah panduan teknis untuk **Demo** dan **Penanganan Masalah**.

### 1. Mengakses Monitoring Dashboard
Kita menggunakan Grafana untuk memantau kesehatan server (CPU, RAM, Traffic).

* **URL Grafana:** [http://localhost:3001](http://localhost:3001)
* **Username:** `admin`
* **Password:** `123qwe`
* **Setup Data Source (Jika kosong):**
    1.  Add Data Source -> Pilih **Prometheus**.
    2.  URL: `http://tubes_prometheus:9090`
    3.  Save & Test.
    4.  Import Dashboard ID: `14282`.

---

### 2. Simulasi Backup & Restore (Disaster Recovery)

Gunakan perintah ini saat demo untuk menunjukkan bahwa data kita aman dari serangan/human error.

#### A. Membuat Backup Database (Manual)
Secara default backup berjalan otomatis, tapi bisa dipicu manual:
```powershell
sh backup.sh
# File backup akan muncul di folder /backups

Tentu, ini adalah draft README.md lengkap yang menggabungkan Deskripsi Project, Tim, Instalasi, Fitur Level 5, dan Cheatsheet Operasional (Backup/Restore/Monitoring).

Kamu bisa langsung copy-paste kode di bawah ini ke file README.md di repository GitHub kalian.

Markdown

# 🚀 Tubes IPA - Integrated Web Platform (Level 5 Architecture)

Project Tugas Besar Integrasi Platform Aplikasi (IPA) yang mengimplementasikan arsitektur Microservices menggunakan Docker, React, Laravel, dan PostgreSQL. Project ini telah mencapai standar **Level 5** dengan fitur Monitoring, Security, dan Disaster Recovery plan.

---

## 👥 The Team (Dream Team)

| Nama | Role | Tanggung Jawab Utama |
| :--- | :--- | :--- |
| **Hype AMD** | **DevSecOps & Backend Engineer** | Docker Infrastructure, Network Security, Monitoring Stack, Database Management. |
| **Alam** | **Frontend Engineer & UI** | React/Next.js Development, Admin Dashboard, User Interface Implementation. |
| **Farrel** | **QA & Release Manager** | Repository Owner, GitHub Actions (CI/CD), API Testing, Documentation & Architecture. |

---

## 🛠️ Tech Stack & Architecture

* **Frontend:** React.js / Next.js (Port `8081`)
* **Backend:** Laravel 11 API (Port `8082`)
* **Database:** PostgreSQL 15 (Isolated Network)
* **Containerization:** Docker & Docker Compose
* **Monitoring:** Prometheus, cAdvisor, Grafana (Port `3001`)
* **Security:** Rate Limiting, Private Network Isolation, Secret Management.

---

## ⚙️ Cara Install & Menjalankan (Setup Awal)

Ikuti langkah ini jika baru pertama kali clone repo di laptop baru:

1.  **Clone Repository:**
    ```bash
    git clone [https://github.com/username-farrel/nama-repo.git](https://github.com/username-farrel/nama-repo.git)
    cd nama-repo
    ```

2.  **Setup Environment Variables:**
    * Copy file `.env.example` menjadi `.env` di folder `backend-api`.
    * Minta file `.env` yang valid (berisi key database) ke **Hype AMD**.

3.  **Jalankan Docker:**
    ```powershell
    docker compose up -d
    ```
    *Tunggu hingga semua container (frontend, backend, db, monitoring) statusnya "Running".*

4.  **Setup Backend (Hanya sekali di awal):**
    ```powershell
    # Install dependencies & Generate Key
    docker compose run --rm --no-deps backend composer install --ignore-platform-reqs
    docker compose run --rm --no-deps backend php artisan key:generate
    
    # Migrasi Database
    docker exec -it tubes_backend php artisan migrate
    ```

---

## 📈 Monitoring & Disaster Recovery Cheatsheet (PENTING!)

Bagian ini adalah panduan teknis untuk **Demo** dan **Penanganan Masalah**.

### 1. Mengakses Monitoring Dashboard
Kita menggunakan Grafana untuk memantau kesehatan server (CPU, RAM, Traffic).

* **URL Grafana:** [http://localhost:3001](http://localhost:3001)
* **Username:** `admin`
* **Password:** `admin`
* **Setup Data Source (Jika kosong):**
    1.  Add Data Source -> Pilih **Prometheus**.
    2.  URL: `http://tubes_prometheus:9090`
    3.  Save & Test.
    4.  Import Dashboard ID: `14282`.

---

### 2. Simulasi Backup & Restore (Disaster Recovery)

Gunakan perintah ini saat demo untuk menunjukkan bahwa data kita aman dari serangan/human error.

#### A. Membuat Backup Database (Manual)
Secara default backup berjalan otomatis, tapi bisa dipicu manual:
```powershell
sh backup.sh
# File backup akan muncul di folder /backups

B. Simulasi Kiamat (Menghapus Data) 💥
Gunakan perintah ini untuk menghapus data kontak secara paksa:

PowerShell

docker exec -it tubes_db psql -U tubes_user -d tubes_ipa -c "DELETE FROM contacts;"

C. Melakukan Restore (Penyelamatan) 🚑
Gunakan script restore untuk mengembalikan data dari file .sql di folder backups.

Via PowerShell (Opsi Manual - Paling Stabil):

PowerShell

# Ganti 'nama_file.sql' dengan file backup terbaru kamu
Get-Content .\backups\db_backup_xxxx.sql | docker exec -i tubes_db psql -U tubes_user -d tubes_db



Security Implementation (Level 5)
Kami menerapkan beberapa layer keamanan:

Network Isolation: Database tidak mengekspos port ke host laptop (Port 5432 ditutup dari luar), hanya bisa diakses oleh Backend via internal network tubes_net.

Rate Limiting: API Endpoint dilindungi middleware throttle:60,1 (Max 60 request/menit) anti-spam.

Secret Management: Credential sensitif disimpan di .env dan tidak dipush ke GitHub.

✅ Jobdesk Checklist (Final Sprint)
Hype AMD (Backend/DevOps):

[x] Docker Infrastructure Setup

[x] Monitoring (Grafana/Prometheus)

[x] Backup & Restore Script

[x] Audit .gitignore (Security)

Alam (Frontend):

[x] React Setup & Integration

[x] Contact Form UI

[ ] Admin Dashboard Page (Menampilkan data tabel)

[ ] Error Handling UI (Tampilan 404/500)

Farrel (QA/Release):

[x] Repo Management

[ ] Full Architecture Diagram (Draw.io)

[ ] GitHub Actions (CI/CD Pipeline)

[ ] Security & Incident Response Docs
