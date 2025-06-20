# Mini CRM

Un CRM simple y funcional diseñado para freelancers, emprendedores, consultores y vendedores independientes. Permite gestionar contactos, hacer seguimiento de interacciones y organizar tareas de forma eficiente.

## Características

- **Gestión de Contactos**: Agregar, editar y eliminar contactos con información completa
- **Gestión de Tareas**: Crear tareas con prioridades, fechas de vencimiento y asociación a contactos
- **Seguimiento de Interacciones**: Registrar llamadas, emails, reuniones y mensajes
- **Dashboard con Estadísticas**: Vista general de contactos y tareas
- **Búsqueda y Filtros**: Encontrar rápidamente la información que necesitas
- **Interfaz Responsiva**: Funciona perfectamente en desktop y móvil
- **Almacenamiento Local**: Los datos se guardan en el navegador

## Tecnologías Utilizadas

- HTML5
- CSS3 (Tailwind CSS)
- JavaScript (ES6+)
- jQuery
- Font Awesome (iconos)

## Instalación

1. **Clona o descarga el proyecto**
   ```bash
   git clone <url-del-repositorio>
   cd MinCRM
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Compila los estilos de Tailwind CSS**
   ```bash
   npm run build
   ```

4. **Abre el archivo `index.html` en tu navegador**
   
   O si prefieres usar un servidor local:
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js (si tienes http-server instalado)
   npx http-server
   ```

## Uso

### Gestión de Contactos
- Haz clic en "Nuevo Contacto" para agregar un contacto
- Completa la información: nombre, email, teléfono, empresa, tipo y notas
- Usa los filtros para buscar contactos por tipo
- Edita o elimina contactos existentes

### Gestión de Tareas
- Haz clic en "Nueva Tarea" para crear una tarea
- Asigna título, descripción, contacto relacionado, fecha de vencimiento y prioridad
- Marca las tareas como completadas haciendo clic en el círculo
- Filtra tareas por estado (pendientes, en progreso, completadas)

### Seguimiento de Interacciones
- Haz clic en "Nueva Interacción" para registrar una interacción
- Selecciona el contacto y el tipo de interacción
- Agrega notas sobre la conversación o reunión
- Las interacciones se muestran ordenadas por fecha

### Dashboard
- Ve estadísticas en tiempo real de tus contactos y tareas
- Monitorea tareas vencidas y pendientes
- Accede rápidamente a las funciones principales

## Estructura del Proyecto

```
MinCRM/
├── index.html              # Página principal
├── package.json            # Configuración del proyecto
├── tailwind.config.js      # Configuración de Tailwind CSS
├── src/
│   ├── input.css          # Estilos de entrada para Tailwind
│   └── app.js             # Lógica principal de la aplicación
├── dist/
│   └── output.css         # Estilos compilados (generado)
└── README.md              # Este archivo
```

## Personalización

### Colores
Puedes personalizar los colores editando el archivo `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Tus colores personalizados
  },
  secondary: {
    // Tus colores personalizados
  }
}
```

### Funcionalidades
El archivo `src/app.js` contiene toda la lógica de la aplicación. Puedes:
- Agregar nuevos campos a los contactos
- Modificar los tipos de tareas
- Cambiar los tipos de interacciones
- Agregar nuevas funcionalidades

## Almacenamiento de Datos

Los datos se almacenan localmente en el navegador usando `localStorage`. Esto significa que:
- Los datos persisten entre sesiones
- No se envían a ningún servidor
- Los datos son privados y seguros
- Se pueden perder si limpias los datos del navegador

## Compatibilidad

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Soporte

Si tienes alguna pregunta o problema, puedes:
- Abrir un issue en el repositorio
- Contactar al desarrollador

---

¡Esperamos que Mini CRM te ayude a gestionar mejor tus contactos y tareas! 