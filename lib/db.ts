import mysql from 'mysql2/promise';
import { getCloudflareContext } from "@opennextjs/cloudflare";

// Variable to cache the pool so we don't reconnect every single request
let globalPool: mysql.Pool | undefined;

export async function getDb() {
    let config;

    // 1. Try to get Cloudflare Environment
    try {
        const ctx = await getCloudflareContext();
        const env = ctx.env as any; // Cast to any to avoid TS errors with custom bindings

        if (env.HYPERDRIVE) {
            // --- CLOUDFLARE MODE (Hyperdrive) ---
            console.log("🔌 Connecting via Hyperdrive...");
            config = {
                host: env.HYPERDRIVE.host,
                user: env.HYPERDRIVE.user,
                password: env.HYPERDRIVE.password,
                database: env.HYPERDRIVE.database,
                port: env.HYPERDRIVE.port,
                ssl: { rejectUnauthorized: false }, // REQUIRED for Hyperdrive
                waitForConnections: true,
                connectionLimit: 10,
            };
        }
    } catch (error) {
        // Ignore error: This means we are running locally (not on Cloudflare)
    }

    // 2. Fallback to Local Environment (Hostinger Direct)
    if (!config) {
        // --- LOCAL MODE ---
        console.log("💻 Connecting via Local .env...");
        config = {
            host: process.env.MYSQL_HOST || 'srv2054.hstgr.io',
            port: Number(process.env.MYSQL_PORT) || 3306,
            user: process.env.MYSQL_USER || '',
            password: process.env.MYSQL_PASSWORD || '',
            database: process.env.MYSQL_DATABASE || '',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        };
    }

    // 3. Create or reuse the pool
    // We reuse the pool if it already exists to prevent "Too Many Connections" errors
    if (!globalPool) {
        globalPool = mysql.createPool(config);
    }

    return globalPool;
}