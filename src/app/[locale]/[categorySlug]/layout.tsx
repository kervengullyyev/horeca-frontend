interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <section className="flex justify-center">{children}</section>;
}
