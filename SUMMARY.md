# 🧾 Resumen del MVP – Mini CRM

## 🎯 Objetivo General
Desarrollar un Mini CRM simple, accesible y funcional orientado a freelancers, emprendedores, consultores y vendedores independientes, para que puedan gestionar sus contactos, hacer seguimiento de interacciones y organizar tareas de forma eficiente, sin la complejidad de herramientas corporativas.

## 👥 Público Objetivo
- **Freelancers**: diseñadores, desarrolladores, marketers, etc.
- **Emprendedores individuales o microempresas**: que aún no usan un CRM.
- **Consultores, coaches, profesores particulares**: que manejan alumnos o clientes.
- **Vendedores informales**: revendedores de productos, negocios por Instagram o WhatsApp.

## 🔧 Tecnologías del Stack
- **Frontend**: HTML, CSS, JavaScript (Vanilla), Tailwind CSS
- **Backend**: Node.js, Express
- **Base de datos**: MongoDB (usando Mongoose)

## 🧱 Funcionalidades del MVP

### 1. Autenticación
- Registro y login con email y contraseña
- Panel privado por usuario (solo ve sus propios datos)

### 2. Gestión de Contactos
- Crear, editar, eliminar y listar contactos
- Datos: nombre, email, teléfono, empresa, notas, etiquetas (tags)

### 3. Dashboard (Vista General)
- Contactos recientes
- Tareas próximas a vencer
- Panel limpio, responsivo y funcional

### 4. Historial de Interacciones
- Añadir llamadas, reuniones o emails a cada contacto
- Ver interacciones en la ficha de cada cliente
- Campos: tipo, fecha, descripción

### 5. Tareas y Recordatorios
- Crear tareas asociadas a contactos
- Marcar tareas como completadas
- Visualizar próximas tareas en dashboard

### 6. Búsqueda y Filtros
- Buscar por nombre, email
- Filtrar por tags, estado de tareas, etc.

### 7. Estética y Usabilidad
- Modo oscuro
- UI moderna, responsiva y minimalista con Tailwind
- UX intuitiva, sin complicaciones

### 8. Deploy y Demo
- Deploy backend (Railway o Render)
- Deploy frontend (Vercel)
- Cuenta demo con datos de ejemplo
- README técnico documentado
- Video de demo funcional del flujo completo

## 💡 Potencial Comercial y Futuras Expansiones
Este MVP está diseñado para ser comercializable a futuro mediante:

- **Planes gratuitos** con límite de contactos o tareas
- **Funciones premium**: exportación CSV, automatización de emails, integración con WhatsApp o Google Calendar
- **Suscripciones mensuales** o lifetime
- **Licencia para agencias** que quieran brindar CRM a sus clientes

---

## 📋 Estado Actual del Proyecto

### ✅ Completado
- [x] Frontend básico con HTML, CSS y JavaScript
- [x] Interfaz de usuario con Tailwind CSS
- [x] Sistema de autenticación básico (demo)
- [x] Gestión de contactos (CRUD)
- [x] Gestión de tareas (CRUD)
- [x] Dashboard funcional
- [x] Modo oscuro completo
- [x] Interfaz responsiva
- [x] Sistema de modales para formularios
- [x] Búsqueda y filtros básicos
- [x] Historial de interacciones por contacto

### 🚧 En Desarrollo
- [ ] Backend con Node.js y Express
- [ ] Base de datos MongoDB
- [ ] Autenticación real con JWT
- [ ] API RESTful completa
- [ ] Deploy en producción

### 📝 Pendiente
- [ ] Registro de usuarios
- [ ] Exportación de datos
- [ ] Integración con servicios externos
- [ ] Documentación técnica completa
- [ ] Tests automatizados
- [ ] Optimización de rendimiento

---

*Última actualización: Diciembre 2024* 