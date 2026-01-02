import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '@/db/schema';

export const getDb = () => {
    if (!process.env.DATABASE_URL) {
        // This will prevent crash during build evaluation if URL is missing
        // or provide a clear error at runtime
        console.warn("DATABASE_URL is not defined");
        const sql = neon("postgres://dummy:dummy@localhost:5432/dummy");
        return drizzle(sql, { schema });
    }
    const sql = neon(process.env.DATABASE_URL!);
    return drizzle(sql, { schema });
};
