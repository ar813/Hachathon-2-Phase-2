// Migration script to run the database migration
// Run this with: node db/run-migration.js

import { Pool } from 'pg';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runMigration() {
    const connectionString = process.env.NEON_CONNECTION_STRING;

    if (!connectionString) {
        console.error('❌ NEON_CONNECTION_STRING not found in environment variables');
        process.exit(1);
    }

    const pool = new Pool({
        connectionString,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        console.log('🔄 Connecting to database...');
        await pool.query('SELECT 1');
        console.log('✅ Connected to database');

        console.log('🔄 Running migration...');
        const migrationSQL = readFileSync(
            join(__dirname, 'schema.sql'),
            'utf-8'
        );

        await pool.query(migrationSQL);
        console.log('✅ Migration completed successfully!');

        // Verify tables
        const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

        console.log('\n📋 Tables in database:');
        result.rows.forEach(row => {
            console.log(`  - ${row.table_name}`);
        });

    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

runMigration();
