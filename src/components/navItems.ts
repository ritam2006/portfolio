import type { Component } from "vue";

import Experience from "./Experience.vue";
import Skills from "./Skills.vue";
import Projects from "./Projects.vue";
import Contact from "./Contact.vue";

interface NavItem {
  label: string;
  link: string;
  component: Component;
}

const navItems: NavItem[] = [
  {
    label: "Experience",
    link: "experience",
    component: Experience
  },
  {
    label: "Skills",
    link: "skills",
    component: Skills
  },
  {
    label: "Projects",
    link: "projects",
    component: Projects
  },
  {
    label: "Contact Me",
    link: "contact",
    component: Contact
  }
];

export default navItems;