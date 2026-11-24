\getenv app_password DB_PASSWORD

SELECT 'CREATE ROLE origen_app LOGIN'
WHERE NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'origen_app')
\gexec

ALTER ROLE origen_app WITH LOGIN PASSWORD :'app_password';

GRANT CONNECT ON DATABASE origen TO origen_app;
GRANT USAGE ON SCHEMA public TO origen_app;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO origen_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO origen_app;
