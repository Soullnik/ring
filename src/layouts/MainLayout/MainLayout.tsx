import { ReactNode } from "react";
import { BottomNavigation } from "@/components/BottomNavigation/BottomNavigation";
import { FixedLayout } from "@telegram-apps/telegram-ui";
import { Header } from "@/components/Header/Header";
import styles from "./MainLayout.module.css";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className={styles.mainLayout}>
      <FixedLayout vertical="top" className={styles.header}>
        <Header />
      </FixedLayout>
      {children}
      <FixedLayout vertical="bottom" className={styles.bottomNavigation}>
        <BottomNavigation />
      </FixedLayout>
    </div>
  );
};
