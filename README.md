![storyboard](https://github.com/user-attachments/assets/415b8d37-9886-4f92-8d14-212ecbea95fd)

# Storyboard Studio - [studio.yunusemre.dev](https://studio.yunusemre.dev/)

Live preview of the application: [studio.yunusemre.dev](https://studio.yunusemre.dev/)

## Prerequisites
Before installing the app, ensure that you have the following prerequisites installed on your system:

- Docker
- Docker Compose

## Installation

1. Clone the repository
   
   ```sh
   git clone https://github.com/YuunsGit/storyboard.git
   ```

2. Navigate to the project directory
   
   ```sh
   cd storyboard
   ```

3. Run the docker compose
   
   ```sh
   docker compose --env-file .env.local up --build -d
   ```

## Tech Stack:
- **<ins>SvelteKit</ins>** as meta-frontend framework
- **<ins>TypeScript</ins>** for typesafe development
- **<ins>PostgreSQL</ins>** for relational database
- **<ins>pg_graphql</ins>** for GraphQL support
- **<ins>Tailwind CSS</ins>** for utility CSS
- **<ins>GraphQL</ins>** for API queries and mutations
- **<ins>urql</ins>** as GraphQL client
