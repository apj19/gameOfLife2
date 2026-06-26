import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import { ChevronRightIcon } from "lucide-react";

import { Link } from "react-router-dom";

export default function Pattrenlist({
  onSelectClose,
}: {
  onSelectClose?: () => void;
}) {
  const patterns = [
    { name: "Average", path: "/average" },
    { name: "Glider", path: "/glider" },
    { name: "LWSS", path: "/lwss" },
    { name: "Toad", path: "/toad" },
    { name: "Beacon", path: "/beacon" },
    { name: "Achimsotherp", path: "/achimsotherp16" },
    { name: "Snacker", path: "/snacker2" },
    { name: "Almost Symmetric", path: "/almosymmetric" },
  ];

  return (
    <>
      {patterns.map((pattren) => (
        <Item
          key={pattren.name}
          className="w-full"
          variant="outline"
          render={
            <Link to={pattren.path} onClick={onSelectClose}>
              <ItemContent>
                <ItemTitle>{pattren.name}</ItemTitle>
                {/* <ItemDescription>
                The Gosper Glider Gun is a famous Conway’s Game of Life pattern
                that continuously produces gliders every 30 generations. It was
                the first finite configuration discovered that leads to infinite
                growth, proving the system’s potential for unbounded complexity.
              </ItemDescription> */}
              </ItemContent>
              <ItemActions>
                <ChevronRightIcon className="size-4" />
              </ItemActions>
            </Link>
          }
        />
      ))}
    </>
  );
}
