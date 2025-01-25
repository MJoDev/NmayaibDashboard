
# NMAYAIB DASHBOARD

Pedido personalizado de Fiverr, tiempo flexible.


## Autor

- [@MJoDev](https://github.com/MJoDev)


## Deployment

Primero ejecuta el comando dentro de `/frontend-dash`

```bash
  npm install
```

Para correr en modo de desarrollo ejecuta:

```bash
  npm run dev
```

Para generar el build y luego la producción:

```bash
  npm run build
  npm run start
```


## Documentación

La estrutucta de los archivos es la siguiente:

### **`public/`**: 
Carpeta que incluye archivos SVGs o públicos.

### **`src/`**
Directorio principal del proyecto que contiene el código fuente de la aplicación.

---

### **`app/`**
Carpeta que gestiona las páginas principales del proyecto siguiendo la estructura de rutas de Next.js.

- **`(sidebar)/`**: Subcarpeta que contiene páginas con un diseño que incluye una barra lateral.
  - **`notAdmin/`**: Páginas y componentes destinados a usuarios no administradores.
    - `/page.js`: Página del dashboard.
    - `extras/page.js`: Pagina de configuración `extra`.
  - **`admin/`**: Páginas y componentes dedicados al área de administración.
    - `layout.js`: Diseño base para las páginas de administración.
    - `page.js`: Página principal del área administrativa.
- **`login/`**: Página de inicio de sesión.
    - `page.js`: Contiene el formulario de inicio de sesión.
- **`register/`**: Página de registro de nuevos usuarios.
    - `page.js`: Contiene el formulario de registro.

---

### **`components/`**
Directorio que incluye todos los componentes reutilizables de la interfaz de usuario.

- **`ui/`**: Componentes estilizados y reutilizables.
  - `button.tsx`: Botón reutilizable.
  - `card.tsx`: Componente de tarjeta para mostrar información.
  - `charts.tsx`: Contiene configuraciones y lógica para gráficos interactivos.
  - `input.tsx`: Componente reutilizable para entradas de formulario.
  - `label.tsx`: Etiquetas utilizadas en formularios.
  - `table.tsx`: Tabla genérica para mostrar datos tabulares.
- `alerts-table.tsx`: Tabla diseñada para alertas específicas.
- `chart.tsx`: Componente para manejar gráficos individuales.
- `login-form.tsx`: Formulario reutilizable para el inicio de sesión.
- `metric-card.tsx`: Tarjeta diseñada para mostrar métricas clave.
- `pie-chart.tsx`: Componente especializado para gráficos de pastel.
- `register-form.tsx`: Formulario reutilizable para el registro de usuarios.
- `sidebar.tsx`: Barra lateral de navegación.

---

### **`lib/`**
Biblioteca de utilidades que contiene funciones auxiliares para el manejo de datos o lógica repetitiva.
- `utils.ts`: Funciones utilitarias compartidas en el proyecto.

---


### **LÓGICA A MODIFICAR**

- En el archivo `sidebar.tsx` existe un array navItems, Pasale las rutas que desees hacia tu API.
- La logica de Inicio de sesion y Registrarse se encuentra en los archivos `login-form.tsx` y `register-form.tsx`. Ahí deberas hacer los cambios respectivos para manejar la lógica de inicio de sesion con tu API.
- El dashboard principal se encuentra en `src/app/(sidebar)/(notAdmin)/page.js` Ahí deberas hacer la peticion de datos a tu servidor para manejar las diferentes gráficas y tablas.
- Al rededor de las páginas, tienes botones que vas a querer hacer que redireccionen a otras partes de tu API. Hice arrays donde puedes modificar el valor del href.

