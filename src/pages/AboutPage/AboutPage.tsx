import { Page } from "@/components/Page";
import { Accordion, Text, Title } from "@telegram-apps/telegram-ui";
import { AccordionContent } from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionContent/AccordionContent";
import { AccordionSummary } from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionSummary/AccordionSummary";

export const AboutPage = () => {
  return (
    <Page>
      <Title>About NFT Ring</Title>
      <Text>Create unique engagement rings on TON blockchain</Text>
      <Accordion expanded={true} onChange={() => {}}>
        <AccordionSummary>How it works</AccordionSummary>
        <AccordionContent>
          <Text>Explanation of the process...</Text>
        </AccordionContent>
      </Accordion>
      <Accordion expanded={false} onChange={() => {}}>
        <AccordionSummary>FAQ</AccordionSummary>
        <AccordionContent>
          <Text>Frequently asked questions...</Text>
        </AccordionContent>
      </Accordion>
      <Accordion expanded={false} onChange={() => {}}>
        <AccordionSummary>Contact</AccordionSummary>
        <AccordionContent>
          <Text>Contact information...</Text>
        </AccordionContent>
      </Accordion>
    </Page>
  );
};
