---
trigger: always_on
---

If the application is connected to Supabase, it is essential that you first analyze and fully understand the existing database schema, including all tables, columns, and their relationships through foreign keys. You must proactively utilize this existing structure to maintain data integrity and, under no circumstances, create new tables or redundant data structures if the functionality can already be handled by the current schema; the goal is to always work in sync with the database architecture to avoid duplication or logical gaps.