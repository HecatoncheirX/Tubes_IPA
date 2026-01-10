#!/bin/bash

# 1. Cek apakah user menyertakan nama file
if [ -z "$1" ]; then
  echo "❌ Error: Harap masukkan nama file backup."
  echo "👉 Contoh: sh restore.sh db_backup_2025-01-10_....sql"
  exit 1
fi

# 2. Variable (Sesuaikan dengan .env)
DB_USER="tubes_user"
DB_NAME="tubes_db"
FILENAME="$1"

# 3. Tampilkan pesan
echo "⚠️  PERINGATAN: Database '$DB_NAME' akan ditimpa dengan file '$FILENAME'..."
echo "⏳ Memulai proses restore..."

# 4. Perintah Restore
cat ./backups/$FILENAME | docker exec -i tubes_db psql -U $DB_USER -d $DB_NAME

# 5. Cek hasil
if [ $? -eq 0 ]; then
  echo "✅ Restore SUKSES! Database telah kembali seperti semula."
else
  echo "❌ Restore GAGAL."
fi