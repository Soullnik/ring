import { Page } from "@/components/Page";
import { Button, Card, Section, Text, Title } from "@telegram-apps/telegram-ui";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "3D Customization",
      description:
        "Create your perfect ring with our advanced 3D editor. Adjust every detail to match your vision.",
    },
    {
      title: "Web3 Integration",
      description:
        "Mint your design as an NFT and own your creation forever on the blockchain.",
    },
    {
      title: "Real Production",
      description:
        "Transform your digital design into reality with our network of professional jewelers.",
    },
  ];

  const roadmap = [
    {
      phase: "Phase 1 - Q2 2024",
      items: [
        "3D Editor Launch",
        "Basic Customization",
        "TON Wallet Integration",
      ],
    },
    {
      phase: "Phase 2 - Q3 2024",
      items: ["Advanced Materials", "NFT Minting", "Community Features"],
    },
    {
      phase: "Phase 3 - Q4 2024",
      items: ["Jeweler Marketplace", "Production Orders", "Mobile App"],
    },
  ];

  return (
    <Page>
      <div className={styles.page}>
        <div className={styles.heroSection}>
          <Text className={styles.heroText}>
            Create unique 3D rings and make your engagement special
          </Text>
          <Text className={styles.subText}>
            First Web3 platform for designing and ordering custom engagement
            rings
          </Text>
        </div>

        <div className={styles.featuresSection}>
          <Title className={styles.sectionTitle}>What We Offer</Title>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <Card key={index} className={styles.featureCard}>
                <Title level="3" className={styles.featureTitle}>
                  {feature.title}
                </Title>
                <Text className={styles.featureDescription}>
                  {feature.description}
                </Text>
              </Card>
            ))}
          </div>
        </div>

        <div className={styles.howItWorksSection}>
          <Title className={styles.sectionTitle}>How It Works</Title>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <Text>Design your ring in 3D</Text>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <Text>Mint as NFT</Text>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <Text>Order production</Text>
            </div>
          </div>
        </div>

        <div className={styles.roadmapSection}>
          <Title className={styles.sectionTitle}>Roadmap</Title>
          <div className={styles.roadmapGrid}>
            {roadmap.map((phase, index) => (
              <Card key={index} className={styles.roadmapCard}>
                <Title level="3" className={styles.phaseTitle}>
                  {phase.phase}
                </Title>
                <ul className={styles.roadmapList}>
                  {phase.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        <div className={styles.ctaSection}>
          <Card className={styles.ctaCard}>
            <Title level="2" className={styles.ctaTitle}>
              Ready to Create Your Dream Ring?
            </Title>
            <Text className={styles.ctaText}>
              Join the future of engagement ring design
            </Text>
            <Button
              size="l"
              onClick={() => navigate("/ring-editor")}
              className={styles.ctaButton}
            >
              Start Designing
            </Button>
          </Card>
        </div>
      </div>
    </Page>
  );
};
