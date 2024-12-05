import { Page } from "@/components/Page";
import { Button, Section, Input } from "@telegram-apps/telegram-ui";

export const EngagementPage = () => {
  return (
    <Page>
      <Section header="Engagement Ceremony">
        <Input placeholder="Partner's TON wallet address" />

        <Section header="Select Ring">
          {/* Список доступных NFT колец */}
        </Section>

        <Button stretched size="l">
          Send Engagement Ring
        </Button>
      </Section>
    </Page>
  );
};
