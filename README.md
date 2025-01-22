# telegram_dali

**Version:** 1.0.0

A Telegram CRM bot designed for task management between admins and clients.

## Features

- Admin management with Telegram chat integration.
- Client registration and task assignment.
- Task tracking with notifications for creation and updates.
- Seamless database integration using Sequelize and PostgreSQL.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/justcoda-dev/telegram-dali.git
   cd telegram-dali
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following variables:

   ```env
   BOT_TOKEN=<your_telegram_bot_token>
   SERVER_PORT=<your_db_server_port>
   DATABASE=<your_db_name>
   DB_USER=<your_db_username>
   DB_PASSWORD=<your_db_password>
   DB_HOST=<your_db_host>
   DB_PORT=<your_db_host_port>
   ```

4. Start the application:
   ```bash
   npm run start
   ```

## Data Models

### Admin

- **telegram_chat_id**: Unique Telegram chat ID (BIGINT).
- **is_active**: Indicates if the admin account is active (BOOLEAN, default: `true`).

### Client

- **name**: Name of the client (STRING, required).
- **telegram_chat_id**: Unique Telegram chat ID (BIGINT).
- **is_active**: Indicates if the client account is active (BOOLEAN, default: `true`).

### Task

- **task_text**: Description of the task (TEXT).
- **is_completed**: Indicates if the task is completed (BOOLEAN, default: `false`).
- **is_active**: Indicates if the task is active (BOOLEAN, default: `false`).
- **task_response**: Admin's response to the task (TEXT).

## Relationships

- **Admin**:
  - Has many Clients.
  - Has many Tasks.
- **Client**:
  - Has many Tasks.

## Task Hooks

### After Create

- Sends a notification to the admin with task details after a task is created.

### After Update

- Sends notifications to the client based on task updates:
  - Task accepted.
  - Task completed with admin's comment.

## Dependencies

- [@sequelize/postgres](https://www.npmjs.com/package/@sequelize/postgres)
- [axios](https://www.npmjs.com/package/axios)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [telegraf](https://www.npmjs.com/package/telegraf)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/justcoda-dev/telegram-dali/issues).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
