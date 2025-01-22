# Nuxt3 Starter Kit

A starter kit for building modern web applications with Nuxt 3, SQLite, and role-based permissions.

## Features
- Nuxt 3 with PrimeVue integration
- Authentication and role-based access control
- SQLite database setup
- Tailwind CSS for styling

## Setup
Clone the repository and install dependencies:

```bash
# Clone the repository
git clone git@github.com:TurchenkoPavel/Nuxt3-Starter-Kit.git
cd Nuxt3-Starter-Kit

# Install dependencies
# npm
npm install

# yarn
yarn install
```
## Database Migration Commands

### 1. Run all pending migrations
To apply all pending migrations, use the following command:
- `npm run db:migrate`
- If you want to include seeds after running migrations, add the `--with-seeds` flag:
  - Example: `npm run db:migrate -- --with-seeds`

### 2. Reset all migrations
This command rolls back all applied migrations and resets the database to its initial state:
- `npm run db:reset`

### 3. Revert last migration
To revert the last applied migration, use this command:
- `npm run db:revert`
- Optionally, revert multiple migrations by specifying the number of steps with the `--step` flag:
  - Example: `npm run db:revert -- --step=2`

### 4. Create a new migration
Generate a new migration file by providing a name:
- `npm run db:create --name=<migration_name>`
- The generated file will include a timestamp and the provided name, e.g., `2025_01_22_create_users_table.js`.

### 5. Apply seeds
Run all seed files to populate the database with initial data:
- `npm run db:seeds`
- The command ensures no duplicate data is inserted by checking the existence of records before applying the seed logic.


