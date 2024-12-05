import { Page } from "@/components/Page";
import { Section, TabsList, Title } from "@telegram-apps/telegram-ui";

export const MyRingsPage = () => {
  return (
    <Page>
      <Section>
        <Title>My Rings</Title>

        <TabsList>
          <TabsList.Item selected id="created">
            Created
          </TabsList.Item>
          <TabsList.Item id="nft">NFT Collection</TabsList.Item>
          <TabsList.Item id="engagement">Engagement</TabsList.Item>
        </TabsList>

        {/* Список колец будет здесь */}
      </Section>
    </Page>
  );
};
