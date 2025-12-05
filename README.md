# Barça Pedia — Client

## [See the App!](https://barca-pedia.vercel.app/)

![App Logo](your-image-logo-path-or-name)

## Description

Barça Pedia es una aplicación donde los usuarios pueden explorar información detallada de jugadores del FC Barcelona, dejar comentarios y navegar entre posiciones. Los administradores pueden crear, editar y eliminar jugadores.

#### [Client Repo here](www.your-client-repo-url-here.com)  
#### [Server Repo here](www.your-server-repo-url-here.com)

## Technologies & Libraries used

React, JavaScript, HTML, CSS, Axios, React Router, React Context, Cloudinary, Vite

## Backlog Functionalities

- Favoritos para jugadores  
- Sistema de likes en comentarios  
- Filtros avanzados  
- Perfiles de usuario personalizados  
- Animaciones y UI más elaborada  

# Client Structure

## User Stories

- **404** – Como usuario quiero ver una página 404 bonita cuando la ruta no existe.  
- **500** – Como usuario quiero ver una página de error si algo falla en el servidor.  
- **Home** – Como usuario quiero acceder al Home para entender de qué trata la app.  
- **Signup** – Como usuario quiero registrarme para poder escribir comentarios.  
- **Login** – Como usuario quiero iniciar sesión para poder acceder a funcionalidades privadas.  
- **Logout** – Como usuario quiero desconectarme para proteger mi cuenta.  
- **Players list** – Como usuario quiero ver todos los jugadores disponibles.  
- **Player details** – Como usuario quiero ver detalles completos de un jugador.  
- **Comments** – Como usuario quiero comentar jugadores.  
- **Add Player** – Como admin quiero crear jugadores nuevos.  
- **Edit Player** – Como admin quiero editar jugadores existentes.  
- **Delete Player** – Como admin quiero borrar jugadores.  
- **Positions list** – Como usuario quiero ver las posiciones de los jugadores.  

## React Router Routes (React App)

| Path                      | Page            | Components              | Permissions              | Behavior |
| ------------------------- | ----------------| ------------------------| -------------------------| ---------|
| `/`                       | Home            | Navbar, Footer          | public                   | Página inicial |
| `/signup`                 | Signup          | SignupForm              | anon only `<IsAnon>`     | Registro, redirige al Home |
| `/login`                  | Login           | LoginForm               | anon only `<IsAnon>`     | Login, guarda token y role |
| `/players`                | Players         | PlayerCard              | public                   | Lista de jugadores |
| `/players/:id`            | PlayerAbout     | EditPlayerForm, CommentSection | public            | Página de detalles |
| `/players/new`            | AddPlayer       | AddPlayerForm           | admin only               | Crear jugador |
| `/positions`              | Positions       | PositionCard            | public                   | Lista de posiciones |
| `/error`                  | ErrorPage       |                         | public                   | Error genérico |
| `*`                       | NotFound        |                         | public                   | Página 404 |

## Other Components

- Navbar  
- PlayerCard  
- EditPlayerForm  
- AddPlayerForm  
- CommentSection  
- PositionCard  

## Services

### Auth Service
- `auth.signup(data)`
- `auth.login(data)`
- `auth.verify()`

### Players Service
- `players.getAll()`
- `players.getOne(id)`
- `players.create(data)`
- `players.update(id, data)`
- `players.delete(id)`

### Positions Service
- `positions.getAll()`
- `positions.getOne(id)`

### Comments Service
- `comments.getComments(playerId)`
- `comments.createComment(playerId, text)`
- `comments.deleteComment(commentId)`

### Upload Service
- `uploadImage(formData)` → Cloudinary

## Context

- **auth.context** – Maneja sesión, token y role.

## Links

### Collaborators

[Anton](www.github-url.com)  
[Mateo](www.github-url.com)

### Project

[Repository Link Client](www.your-client-repo-url-here.com)  
[Repository Link Server](www.your-server-repo-url-here.com)  
[Deploy Link](www.your-deploy-url-here.com)

### Trello

[Link to your trello board](www.your-trello-url-here.com)

### Slides

[Slides Link](www.your-slides-url-here.com)
