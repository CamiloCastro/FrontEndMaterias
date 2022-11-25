import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "Login",
    link: "/pages/seguridad/login",
    icon: "log-in-outline",
    home: true
  },
  {
    title: "Departamentos",
    link: "/pages/departamento/listar",
    icon: "home-outline",
  },
  {
    title: "Estudiantes",
    link: "/pages/estudiantes/listar",
    icon: "people-outline"
  },
  {
    title: "Materias",
    link: "/pages/materia/listar",
    icon: "briefcase-outline"
  },
  {
    title: "Inscripcion",
    link: "/pages/inscripcion/listar",
    icon: "clipboard-outline"
  },
  {
    title: "Logout",
    link: "/pages/seguridad/logout",
    icon: "log-out-outline"
  },  
];
