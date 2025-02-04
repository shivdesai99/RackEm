import { Knex } from "knex";
import * as path from "path";
import * as dotenv from "dotenv";

// Ensure the correct .env file is loaded
dotenv.config();

const config: Record<string, Knex.Config> = {
    development: {
        client: "pg",
        connection: {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            ssl: false, // No SSL for local development
        },
        migrations: {
            directory: "./migrations",
            extension: "ts",
        },
        seeds: {
            directory: "./seeds",
        },
    },
    production: {
        client: "pg",
        connection: {
            connectionString: process.env.DATABASE_URL, // Single connection URL for production
            ssl: { rejectUnauthorized: false }, // Required for Render
        },
        migrations: {
            directory: path.resolve(__dirname, "./migrations"),
            extension: "js",
        },
        seeds: {
            directory: path.resolve(__dirname, "./seeds"),
        },
    },
};

// Ensure production config is defined
if (!config["production"]) {
    console.error("❌ Production config is missing!");
}

export default config;
