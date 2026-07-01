ALTER TABLE systems ADD COLUMN IF NOT EXISTS disk_total_gb integer DEFAULT 0;
ALTER TABLE systems ADD COLUMN IF NOT EXISTS disk_used_gb integer DEFAULT 0;
