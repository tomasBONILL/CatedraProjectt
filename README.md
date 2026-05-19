# Proyecto de Cátedra: Gestor de Hábitos

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Badge">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript Badge">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite Badge">
  <img src="https://img.shields.io/badge/LocalStorage-4BA3E3?style=for-the-badge&logo=google-chrome&logoColor=white" alt="LocalStorage Badge">
</p>

---

## Descripción del Proyecto

El **Gestor de Hábitos** es una aplicación web interactiva desarrollada como proyecto de cátedra. El sistema permite a los usuarios registrar, monitorear y mantener el control de sus rutinas o actividades diarias de manera eficiente. 

Este desarrollo representa una evolución técnica, migrando la lógica estructurada de manejo de estados hacia una interfaz de usuario fluida, reactiva y moderna construida sobre **React**.

---

## 🚀 Características Principales

*   **Añadir Hábitos Personalizados:** Formulario dinámico para registrar nuevas actividades con facilidad.
*   **Control de Cumplimiento:** Interfaz intuitiva para marcar tareas completadas y actualizar el progreso en tiempo real.
*   **Persistencia Local:** Integración con `LocalStorage` para salvaguardar los hábitos y progresos del usuario, evitando la pérdida de información al recargar o cerrar el navegador.
*   **Diseño Limpio y Adaptable:** Interfaz moderna, minimalista y completamente responsiva para una visualización correcta en dispositivos móviles, tabletas y computadoras.

---

## 🛠️ Tecnologías y Herramientas

*   **React:** Biblioteca principal basada en componentes para la interfaz de usuario.
*   **JavaScript (ES6+):** Manejo de estados, arreglos y lógica de persistencia.
*   **HTML5 & CSS3:** Estructura semántica y maquetación estética personalizada.
*   **Vite:** Entorno de desarrollo rápido y empaquetador del proyecto.

---

## 📂 Estructura del Código Fuente

La arquitectura de la carpeta `src/` está organizada de manera modular para garantizar el orden y la escalabilidad del proyecto:

```text
src/
├── components/        # Componentes reutilizables (Formularios, Listas, Tarjetas de hábitos)
├── hooks/             # Custom hooks para el aislamiento de la lógica de negocio
├── App.jsx            # Componente raíz que centraliza el estado global de la aplicación
├── index.css          # Estilos globales y variables de diseño estético
└── main.jsx           # Punto de entrada oficial de la aplicación en el DOM
