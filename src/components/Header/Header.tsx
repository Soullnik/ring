import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import { Avatar, Cell, Navigation, Title } from "@telegram-apps/telegram-ui";
import styles from "./Header.module.css";
import { openLink } from "@telegram-apps/sdk-react";

export const Header = () => {
  const wallet = useTonWallet();

  if (!wallet) {
    return (
      <div className={styles.header}>
        <Title>Welcome to NFT Ring</Title>
        <TonConnectButton className={styles.tonConnectButton} />
      </div>
    );
  }

  return (
    <div className={styles.header}>
      <Title className={styles.title}>Welcome to TON-RING</Title>
      {"imageUrl" in wallet && (
        <>
          <Cell
            before={
              <Avatar
                src={wallet.imageUrl}
                alt="Provider logo"
                width={60}
                height={60}
                className={styles.tgAvatar}
              />
            }
            after={<Navigation>About wallet</Navigation>}
            subtitle={wallet.appName}
            onClick={(e) => {
              e.preventDefault();
              openLink(wallet.aboutUrl);
            }}
            className={styles.tgCell}
          >
            <Title level="3" className={styles.tgTitle}>
              {wallet.name}
            </Title>
          </Cell>
          <TonConnectButton className={styles.tonConnectButtonConnected} />
        </>
      )}
    </div>
  );
};
