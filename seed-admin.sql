-- Seed admin user
INSERT INTO admin_users (email, role, created_at)
VALUES ('admin@atlas-ai.au', 'admin', NOW())
ON CONFLICT (email) DO NOTHING;
