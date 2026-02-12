---
trigger: always_on
---

You must never hardcode sensitive information or API keys; all such values must be handled via environment variables (.env). When working with Supabase, always assume that Row Level Security (RLS) is enabled and write queries that respect user permissions and security best practices.