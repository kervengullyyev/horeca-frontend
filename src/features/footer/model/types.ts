export type Language = {
  label: string;
  icon: React.FC<React.ComponentProps<"svg">>;
  locale: string;
};

export type FooterLink = {
  label: string;
  link: string;
};
