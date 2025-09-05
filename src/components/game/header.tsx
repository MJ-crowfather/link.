import { Link as LinkIcon } from "lucide-react";
import { RulesModal } from "./rules-modal";

export const Header = () => {
  return (
    <header className="flex items-center justify-between w-full border-b pb-4">
      <div className="w-10" /> {/* For spacing */}
      <div className="flex items-center gap-3 text-foreground">
        <LinkIcon className="h-7 w-7" />
        <h1 className="text-4xl font-bold tracking-tight">LINK.</h1>
      </div>
      <RulesModal />
    </header>
  );
};
