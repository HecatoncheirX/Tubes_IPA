#!/bin/bash

# 1. Tentukan nama file
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
FILENAME="db_backup_$TIMESTAMP.sql"

# 2. Tampilkan pesan
echo "🚀 Memulai proses backup database..."

# 3. Perintah inti: Masuk ke container db, lalu 'dump' isinya ke folder backups
docker exec -t tubes_db pg_dump -U tubes_user -d tubes_db > ./backups/$FILENAME

# 4. Cek hasil
if [ $? -eq 0 ]; then
  echo "✅ Backup SUKSES! File tersimpan di: backups/$FILENAME"
else
  echo "❌ Backup GAGAL! Cek koneksi container."
fi