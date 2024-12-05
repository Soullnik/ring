import { Page } from "@/components/Page";
import { Search } from "@/components/Search/Search";
import { Section, TabsList } from "@telegram-apps/telegram-ui";

export const GalleryPage = () => {
  return (
    <Page>
      <Section>
        <Search />

        <TabsList>
          <TabsList.Item selected id="trending">
            Trending
          </TabsList.Item>
          <TabsList.Item id="latest">Latest</TabsList.Item>
          <TabsList.Item id="popular">Popular</TabsList.Item>
        </TabsList>

        {/* Галерея колец */}
      </Section>
    </Page>
  );
};
