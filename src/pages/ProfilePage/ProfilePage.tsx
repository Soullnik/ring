import { Page } from "@/components/Page";
import { Avatar, Section, List, Title } from "@telegram-apps/telegram-ui";

export const ProfilePage = () => {
  return (
    <Page>
      <Section>
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <Avatar size={96} />
          <Title style={{ marginTop: 10 }}>User Name</Title>
        </div>
        <List>
          <li>Wallet Address</li>
          <li>Created Rings: 0</li>
          <li>NFT Collection: 0</li>
        </List>
      </Section>
    </Page>
  );
};
