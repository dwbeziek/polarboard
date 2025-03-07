INSERT INTO admin_settings ( id, created_time, tenant_id, key, json_value )
VALUES ( gen_random_uuid(), extract(epoch from now()) * 1000, '13814000-1dd2-11b2-8080-808080808080', 'branding', '{
    "logoPath": "/assets/branding/images/logo_cryolytix_title_white.svg",
    "faviconPath": "/favicon.ico",
    "primaryColor": "#2e7d32",
    "accentColor": "#ffb300",
    "title": "Cryolytix",
    "footerText": "© 2025 Cryolytix",
    "loginText": "Welcome to Cryolytix IoT Platform"
}' );