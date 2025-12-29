import { useState } from "react";
import { ChevronDown, MapPin, Check } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface RegionSelectorProps {
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}

const regionGroups = [
  {
    title: "동탄 1신도시",
    regions: [
      { id: "동탄1동", name: "동탄1동", description: "신리천 주변" },
      { id: "동탄2동", name: "동탄2동", description: "동탄중앙로" },
      { id: "동탄3동", name: "동탄3동", description: "동탄역 인근" },
    ],
  },
  {
    title: "동탄 2신도시",
    regions: [
      { id: "동탄4동", name: "동탄4동", description: "영천동" },
      { id: "동탄5동", name: "동탄5동", description: "청계동" },
      { id: "동탄6동", name: "동탄6동", description: "방교동" },
      { id: "동탄7동", name: "동탄7동", description: "산척동" },
      { id: "동탄8동", name: "동탄8동", description: "장지동" },
      { id: "동탄9동", name: "동탄9동", description: "오산동" },
    ],
  },
];

const RegionSelector = ({ selectedRegion, onRegionChange }: RegionSelectorProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (regionId: string) => {
    onRegionChange(regionId);
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-1 px-2 font-semibold text-foreground hover:bg-accent"
        >
          <MapPin className="w-4 h-4 text-primary" />
          <span>{selectedRegion}</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-card">
        <DrawerHeader className="border-b border-border">
          <DrawerTitle className="text-center">동탄 신도시 지역 선택</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 pb-8 max-h-[70vh] overflow-y-auto">
          {regionGroups.map((group) => (
            <div key={group.title} className="mb-6">
              <p className="text-sm font-semibold text-primary mb-3">
                {group.title}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {group.regions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => handleSelect(region.id)}
                    className={`
                      flex items-center justify-between p-4 rounded-xl border-2 transition-all
                      ${selectedRegion === region.id 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50 hover:bg-accent"
                      }
                    `}
                  >
                    <div className="text-left">
                      <p className="font-semibold text-foreground">{region.name}</p>
                      <p className="text-xs text-muted-foreground">{region.description}</p>
                    </div>
                    {selectedRegion === region.id && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default RegionSelector;
