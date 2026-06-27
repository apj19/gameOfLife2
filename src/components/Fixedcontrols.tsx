import { Slider } from "@/components/ui/slider";
import { useCellStore } from "@/store/cellStore";

// export function SliderDemo() {
//   return (
//     <Slider
//       defaultValue={[75]}
//       max={100}
//       step={1}
//       className="mx-auto w-full max-w-xs"
//     />
//   )
// }

import { IconBrandSpeedtest, IconNumber } from "@tabler/icons-react";

export default function Fixedcontrols() {
  const { setSpeed, generation } = useCellStore();
  return (
    <>
      <section className="fixed bottom-30 right-10 z-50  hidden md:block w-40 h-30 rounded-lg ">
        <div className="h-full w-full backdrop-blur-sm flex flex-col items-start gap-4 justify-center p-4 ">
          <div className="w-full flex items-center gap-6 text-md font-semibold">
            <IconBrandSpeedtest size={24} className=" shrink-0" />

            <Slider
              defaultValue={[2]}
              max={5}
              min={1}
              step={1}
              className=" w-full "
              onValueCommitted={(e) => {
                const value = Array.isArray(e) ? e[0] : e;
                setSpeed(value);
              }}
            />
          </div>

          <div className="flex items-center gap-6 text-md font-semibold">
            {/* <BadgeCheck size={24} data-icon="inline-start" /> */}
            <IconNumber size={28} data-icon="inline-start" />
            <p>{generation}</p>
          </div>
        </div>
      </section>
    </>
  );
}
