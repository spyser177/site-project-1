import type { SVGProps } from "react";

export type IconName =
  | "molecule"
  | "calendar"
  | "shield"
  | "pulse"
  | "check"
  | "list"
  | "chart"
  | "chat"
  | "clipboard"
  | "help"
  | "clock"
  | "pill"
  | "flask"
  | "heart"
  | "mail"
  | "phone"
  | "telegram"
  | "whatsapp"
  | "mapPin"
  | "star"
  | "quote"
  | "arrowRight"
  | "menu"
  | "close";

const paths: Record<IconName, React.ReactNode> = {
  molecule: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="12" cy="14" r="2.5" />
      <circle cx="6" cy="19" r="2.5" />
      <path d="M8.2 7.4 10 12M15.8 7.4 14 12M9.8 15.6 7.5 17.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4M7.5 13h2M11 13h2M14.5 13h2M7.5 16.5h2M11 16.5h2" />
    </>
  ),
  shield: (
    <path d="M12 3.5 19.5 6.5v5.5c0 4.5-3.2 7.2-7.5 8.5-4.3-1.3-7.5-4-7.5-8.5V6.5L12 3.5ZM9.3 12l2 2 3.6-4" />
  ),
  pulse: <path d="M3 12h3.5l2-4.5 3 9 2.5-6.5 1.5 3H21" />,
  check: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12.3 11 14.8l4.5-5.6" />
    </>
  ),
  list: (
    <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />
  ),
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  chat: (
    <path d="M4 5h16v10.5H9l-4 3.5v-3.5H4V5Z" />
  ),
  clipboard: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M8.5 10h7M8.5 13.5h7M8.5 17h4" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.7 9.5a2.3 2.3 0 1 1 3.6 1.9c-.9.6-1.3 1.1-1.3 2.1M12 17h.01" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  pill: (
    <path d="M7.5 16.5 16.5 7.5a4 4 0 1 1 5.66 5.66L13.16 22.16A4 4 0 0 1 7.5 16.5ZM10 10l4 4" />
  ),
  flask: (
    <path d="M9 3h6M10 3v6.5L5.5 18a2 2 0 0 0 1.8 2.9h9.4a2 2 0 0 0 1.8-2.9L14 9.5V3M8 16h8" />
  ),
  heart: (
    <path d="M12 20.2s-7.5-4.4-9.5-9.4C1.2 7.4 3.4 4 6.8 4c2 0 3.6 1.1 5.2 3 1.6-1.9 3.2-3 5.2-3 3.4 0 5.6 3.4 4.3 6.8-2 5-9.5 9.4-9.5 9.4Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 6.5 8 6 8-6" />
    </>
  ),
  phone: (
    <path d="M6.5 3.5 9 4.7c.5.24.7.85.5 1.4l-1 2.4a1 1 0 0 0 .2 1.05l5.75 5.75c.3.3.7.4 1.05.2l2.4-1a1.1 1.1 0 0 1 1.4.5l1.2 2.5c.25.5.1 1.1-.35 1.4l-1.75 1.2c-.6.4-1.35.5-2 .3-4.3-1.3-9.15-6.15-10.45-10.45-.2-.65-.1-1.4.3-2l1.2-1.75c.3-.45.9-.6 1.4-.35Z" />
  ),
  telegram: (
    <path d="m4 12 16-7-3 15-6-4.5-3 3v-4.5L18 7 6.5 13.5 4 12Z" />
  ),
  whatsapp: (
    <>
      <path d="M4 20l1.3-4.1A8 8 0 1 1 8.6 19L4 20Z" />
      <path d="M9.5 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.6.8-1.1l-.5-1.2c-.15-.35-.55-.5-.9-.35l-.6.25a3.8 3.8 0 0 1-2.4-2.4l.25-.6c.15-.35 0-.75-.35-.9l-1.2-.5c-.5-.2-1.1.2-1.1.8Z" />
    </>
  ),
  mapPin: (
    <>
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </>
  ),
  star: (
    <path d="m12 3.5 2.6 5.4 5.9.7-4.3 4.1 1.1 5.9L12 16.7l-5.3 2.9 1.1-5.9-4.3-4.1 5.9-.7L12 3.5Z" />
  ),
  quote: (
    <path d="M7 8.5C5 9.5 4 11 4 13c0 2 1.3 3.3 3 3.3S10 15 10 13.3c0-1.5-1-2.6-2.4-2.8.3-1 1-1.7 2-2.2L7 8.5Zm10 0c-2 1-3 2.5-3 4.5 0 2 1.3 3.3 3 3.3s3-1.3 3-3c0-1.5-1-2.6-2.4-2.8.3-1 1-1.7 2-2.2L17 8.5Z" />
  ),
  arrowRight: <path d="M4 12h16M14 6l6 6-6 6" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

/** Единый набор кастомных line-иконок (без фото людей, схематичный стиль) */
export function Icon({ name, className = "w-6 h-6", ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
