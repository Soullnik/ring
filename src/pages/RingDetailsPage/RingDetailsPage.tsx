import { Page } from "@/components/Page";
import { Button, List, Section, Text, Title } from "@telegram-apps/telegram-ui";
import { useParams } from "react-router-dom";

export const RingDetailsPage = () => {
  const { id } = useParams();

  return (
    <Page>
      <Section>
        {/* 3D preview */}
        <div style={{ height: "40vh", background: "#f5f5f5" }}>3D Preview</div>

        <Title>Ring #{id}</Title>
        <Text>Created by: Owner</Text>

        <List title="Properties">{/* Свойства кольца */}</List>

        <List title="History">{/* История владения */}</List>

        <Button stretched size="l">
          Make Offer
        </Button>
      </Section>
    </Page>
  );
};
