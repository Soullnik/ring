import { useRef, useState } from "react";
import { Button, Modal, Section, Input } from "@telegram-apps/telegram-ui";
import { RingViewer } from "@/components/RingViewer/RingViewer";
import { RingCustomizer } from "@/components/RingCustomizer/RingCustomizer";
import { Page } from "@/components/Page";
import { PinataSDK } from "pinata-web3";
import { useTonWallet } from "@tonconnect/ui-react";

const pinata = new PinataSDK({
  pinataJwt:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxN2Q2NzdkZi0zMDY0LTQwZWQtOWNhMC0wYjRlY2NmNzI2ZDUiLCJlbWFpbCI6InNvdWxsbmlrOTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImJlOWQ1MjhmNGI5NTA1YWM3NGQzIiwic2NvcGVkS2V5U2VjcmV0IjoiNzM5NTI1MjgwNDg4ZDA1YjdiMDRhZmYxZjQwNDJiMjZlNzkzNDM5YzBhMzFhYjQ2YmUzYjcwYTE0NzFiNWMwMyIsImV4cCI6MTc2NDkzMTU0OH0.PAUBMVjrQnXLK1pUnYiiMGUKGTQFZCgEy6WHh83OnTk",
  pinataGateway: "blush-defeated-canidae-441",
});

export const RingEditorPage = () => {
  const wallet = useTonWallet();
  const [ringConfig, setRingConfig] = useState({
    material: "gold",
    gemstone: "diamond",
    pattern: "none",
    width: 5,
    type: "round",
  });
  const [isMintModalOpen, setIsMintModalOpen] = useState(false);
  const [fianceeAddress, setFianceeAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);

  const handleMintNFT = async (fianceeAddress: string) => {
    try {
      const videoBlob = await captureRingAnimation();
      const videoFile = new File([videoBlob], "ring-animation.webm", {
        type: "video/webm",
      });
      const videoResult = await pinata.upload.file(videoFile);
      const videoUrl = `https://blush-defeated-canidae-441.mypinata.cloud/ipfs/${videoResult.IpfsHash}`;
      const metadata = {
        name: "Wedding Ring NFT",
        description: "A unique wedding ring NFT",
        image: videoUrl,
        attributes: {
          material: ringConfig.material,
          gemstone: ringConfig.gemstone,
          pattern: ringConfig.pattern,
          width: ringConfig.width,
          type: ringConfig.type,
          // Добавляем связь между кольцами
          pairId: Date.now(), // уникальный идентификатор пары
        },
      };
      console.log(videoUrl);
      // 3. Минтим два NFT с одинаковым pairId
      // Здесь должен быть ваш код для взаимодействия со смарт-контрактом
      // await contract.mintPairNFT(userAddress, fianceeAddress, metadata);

      console.log("NFTs minted successfully!");
    } catch (error) {
      console.error("Error minting NFTs:", error);
      throw error;
    }
  };

  const captureRingAnimation = async (): Promise<Blob> => {
    if (!viewerRef.current) {
      throw new Error("Viewer reference is not set");
    }

    const canvas = viewerRef.current.querySelector("canvas");
    if (!canvas) {
      throw new Error("Canvas not found");
    }

    const stream = canvas.captureStream(30); // 30 FPS
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "video/webm; codecs=vp9",
    });

    const chunks: BlobPart[] = [];
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    // Record for 3 seconds
    mediaRecorder.start();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    mediaRecorder.stop();

    return new Promise((resolve) => {
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        resolve(blob);
      };
    });
  };

  const handleMint = async () => {
    try {
      setIsLoading(true);
      await handleMintNFT(fianceeAddress);
      setIsMintModalOpen(false);
    } catch (error) {
      console.error("Minting error:", error);
      // Здесь можно добавить обработку ошибок
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Page>
      <Section>
        <div ref={viewerRef}>
          <RingViewer ringConfig={ringConfig} onChange={setRingConfig} />
        </div>
        <Modal
          trigger={
            <Button stretched size="l">
              Customize Ring
            </Button>
          }
        >
          <RingCustomizer config={ringConfig} onChange={setRingConfig} />
        </Modal>
        <Modal
          open={isMintModalOpen}
          onOpenChange={setIsMintModalOpen}
          trigger={
            <Button stretched size="l" disabled={!wallet}>
              Mint NFT Ring
            </Button>
          }
        >
          <Section header="Mint Wedding Rings NFTs">
            <Input
              placeholder="Enter your fiancé's wallet address"
              value={fianceeAddress}
              onChange={(e) => setFianceeAddress(e.target.value)}
            />
            <Button
              stretched
              size="l"
              loading={isLoading}
              onClick={handleMint}
              disabled={!fianceeAddress}
            >
              Mint NFTs
            </Button>
          </Section>
        </Modal>
      </Section>
    </Page>
  );
};
