# 📚 Proyecto Resumenes

Este proyecto está compuesto por dos partes principales:

* `resumenesBack`: Backend desarrollado con Spring Boot.
* `resumenesFront`: Frontend desarrollado con Vite + React.

---

## ⚙️ Requisitos

* Java 17+
* Node.js 18+
* Docker & Docker Compose
* Conexión a Internet *(la base de datos está alojada en Railway)*

---

## 🚀 Modos de uso

### 🧪 Modo 1: Pruebas locales SIN Docker

1. **Backend**:

   * Asegúrate de tener el archivo `.env` dentro de `resumenesBack/` con toda la configuración sensible.
   * Puedes lanzar Spring Boot desde el IDE (Play) o desde consola:

     ```bash
     cd resumenesBack
     ./mvnw spring-boot:run
     ```

2. **Frontend**:

   * En `src/utils/api.ts`, descomenta la línea para desarrollo local:

     ```ts
     const API_URL = 'http://localhost:8080'; // para pruebas locales
     ```
   * Instala dependencias y ejecuta:

     ```bash
     cd resumenesFront
     npm install
     npm run dev
     ```

3. Accede desde: [http://localhost:5173](http://localhost:5173)

---

### 🐳 Modo 2: Pruebas completas con Docker Compose

1. En la raíz del proyecto, ejecuta:

   ```bash
   docker-compose up --build
   ```

2. Asegúrate de que el backend tiene acceso a internet para conectarse a la base de datos en Railway.

3. Accede desde: [http://localhost](http://localhost)

4. En `resumenesFront/src/utils/api.ts`, asegúrate de usar:

   ```ts
   const API_URL = '/api'; // para producción y entorno docker
   ```

---

## 🔐 Variables sensibles

El backend lee automáticamente desde un archivo `.env`:

📄 `resumenesBack/.env`

Contiene:

```env
PORT=8080
DB_URL=jdbc:mysql://...
DB_USERNAME=...
DB_PASSWORD=...
JWT_SECRET=...
STRIPE_SECRET_KEY=...
```


---

## 📁 Estructura general

```
resumenes/
├── resumenesBack/        # Backend Spring Boot
│   └── .env              # Variables sensibles
├── resumenesFront/       # Frontend React + Vite
│   └── src/utils/api.ts  # URL base de la API
├── docker-compose.yml    # Orquestación de servicios
└── README.md             # Documentación del proyecto
```

---


## ✅ Notas finales

* El entorno local permite iterar rápidamente durante el desarrollo.
* Docker Compose facilita la validación del sistema completo de forma integrada.
* La conexión a internet es imprescindible debido a la base de datos externa en Railway.

---
