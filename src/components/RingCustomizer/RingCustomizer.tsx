import { RingConfig } from "@/types/ring";
import { List, Section, Select, Slider } from "@telegram-apps/telegram-ui";

interface RingCustomizerProps {
  config: RingConfig;
  onChange: (config: RingConfig) => void;
}

export const RingCustomizer = ({ config, onChange }: RingCustomizerProps) => {
  return (
    <List>
      <Select
        header="Material"
        value={config.material}
        onChange={(e) => onChange({ ...config, material: e.target.value })}
      >
        <option value="gold">Gold</option>
        <option value="silver">Silver</option>
        <option value="platinum">Platinum</option>
      </Select>

      <Select
        header="Gemstone"
        value={config.gemstone}
        onChange={(e) => onChange({ ...config, gemstone: e.target.value })}
      >
        <option value="diamond">Diamond</option>
        <option value="ruby">Ruby</option>
        <option value="sapphire">Sapphire</option>
        <option value="emerald">Emerald</option>
      </Select>

      <Select
        header="Inlay"
        value={config.pattern}
        onChange={(e) => onChange({ ...config, pattern: e.target.value })}
      >
        <option value="none">None</option>
        <option value="floral">Floral</option>
        <option value="geometric">Geometric</option>
        <option value="waves">Waves</option>
        <option value="abstract">Abstract</option>
      </Select>

      <Select
        header="Ring Type"
        value={config.type}
        onChange={(e) => onChange({ ...config, type: e.target.value })}
      >
        <option value="round">Round</option>
        <option value="flat">Flat</option>
      </Select>

      <Section header="Ring Width">
        <Slider
          min={1}
          max={10}
          value={config.width}
          onChange={(value) => onChange({ ...config, width: value })}
        />
      </Section>
    </List>
  );
};
