# Stark Core - Guía para Agentes de IA

## Tecnologías

- Backend: Laravel 11.x (PHP 8.3+)
- Frontend: React 18 + TypeScript
- Styling: Tailwind CSS
- Build: Vite
- DB: MySQL/PostgreSQL

## Comandos Principales

```bash
# Instalación
composer install && npm install

# Desarrollo
npm run start         # Inicia servidor Laravel + Vite
npm run dev           # Solo frontend (Vite)

# Producción
npm run build         # Compilación para producción

# Calidad de código
npm run lint          # ESLint para archivos JS/TS/TSX
npm run format:write  # Prettier para formatear código
npm run format:check  # Verificar formato sin cambiar

# Testing
php artisan test
npm run test
```

## Estructura del Proyecto

- `app/` - Backend Laravel (Controllers, Models, Repositories, Services)
  - `Http/` - Controllers, Middleware, Requests (validaciones)
  - `Models/` - Modelos Eloquent
  - `Repositories/` - Implementación del patrón Repository
  - `Services/` - Servicios para lógica de negocio compleja
- `resources/js/` - Frontend React (components, pages, hooks)
  - `contexts/` - Contextos de React (ver detalle abajo)
  - `i18n/` - Archivos de internacionalización
  - `router/` - Configuración de rutas
  - `styles/` - Estilos específicos
- `routes/` - API y rutas web
- `database/` - Migraciones y seeders

### Estructura de Contextos

Cada contexto sigue una estructura modular consistente:

```
contexts/[nombre-contexto]/
├── actions/     # Funciones para llamadas a API y operaciones asíncronas
├── components/  # Componentes React específicos del contexto
├── hooks/       # Custom hooks para lógica reutilizable
├── layouts/     # Componentes de layout para este contexto
├── libs/        # Utilidades, tipos y constantes
├── pages/       # Componentes de página completa
├── router/      # Configuración de rutas del contexto
└── stores/      # Estado global con Zustand
```

**Contextos principales:**

- `auth` - Autenticación y autorización
- `dashboard` - Panel principal
- `settings` - Configuración del sistema
- `user` - Gestión de usuarios
- `shared` - Componentes y utilidades compartidas

## Arquitectura Backend

### Flujo de Trabajo

El flujo de trabajo en el backend sigue un patrón claro:

1. **Route** - Define el endpoint y método HTTP (`routes/api.php`)
2. **Controller** - Recibe la petición y coordina el flujo (`app/Http/Controllers/`)
3. **Request Validation** - Valida los datos de entrada (`app/Http/Requests/`)
4. **Repository** - Maneja la lógica de acceso a datos (`app/Repositories/`)
5. **Controller** - Procesa el resultado y prepara la respuesta
6. **Response** - Devuelve una respuesta formateada usando métodos del Controller base

### Componentes Principales

#### Controllers

Los controladores extienden de `App\Http\Controllers\Controller` que proporciona métodos para respuestas estandarizadas:

- `respondWithItem` - Para un solo recurso
- `respondWithCollection` - Para colecciones
- `respondWithMessage` - Para mensajes de éxito
- `respondWithError` - Para errores

#### Request Validation

Clases dedicadas para validar peticiones que extienden de `FormRequest`:

- Definen reglas de validación con el método `rules()`
- Controlan autorización con el método `authorize()`

#### Repositories

Implementan el patrón Repository para abstraer la lógica de acceso a datos:

- Extienden de `BaseRepository` que implementa operaciones CRUD comunes
- Implementan la interfaz `EloquentRepositoryInterface`
- Permiten cambiar la fuente de datos sin modificar los controladores

#### Services

Encapsulan lógica de negocio compleja o integraciones con servicios externos:

- Independientes de los controladores y repositorios
- Ejemplo: `OneSignalService` para notificaciones push

## Estándares de Código

- PHP: PSR-12, Laravel Pint
- React: Componentes funcionales, TypeScript estricto
- Estilo: Tailwind (evitar CSS personalizado)
- API: Resource Classes para respuestas
- Linting: ESLint + Prettier con Husky pre-commit hooks

## Librerías Frontend Clave

- **Gestión de Estado**: Zustand
- **Enrutamiento**: React Router DOM
- **Peticiones API**: React Query
- **Internacionalización**: i18next
- **Utilidades**: clsx (para clases condicionales)
- **Editor de Contenido**: Editor.js

## Patrones Comunes

### API Response

```php
// Métodos disponibles en Controller base
$this->respondWithItem($item, 200, 'Recurso obtenido correctamente');
$this->respondWithCollection($collection);
$this->respondWithMessage('Operación exitosa');
$this->respondWithError('Error en la operación', 500);
```

### Componente React

```tsx
export const ComponentName: React.FC<ComponentNameProps> = ({ prop }) => {
  return <div className="rounded bg-white p-4">{prop}</div>
}
```

### Uso de i18n

```tsx
import { useTranslation } from 'react-i18next'

export const TranslatedComponent: React.FC = () => {
  const { t } = useTranslation()
  return <div>{t('key.to.translate')}</div>
}
```

### Gestión de Estado con Zustand

```tsx
import { create } from 'zustand'

const useStore = create(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
}))
```
