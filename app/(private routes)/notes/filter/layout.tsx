import css from "./layout.module.css";

interface LayoutSideBarProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function LayoutSideBar({
  children,
  sidebar,
}: LayoutSideBarProps) {
  return (
    <>
      <section className={css.container}>
        <aside className={css.sidebar}>{sidebar}</aside>
        <div className={css.notesWrapper}>{children}</div>
      </section>
    </>
  );
}
