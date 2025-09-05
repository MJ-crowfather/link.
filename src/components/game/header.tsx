import { Link as LinkIcon } from "lucide-react";
import { RulesModal } from "./rules-modal";

export const Header = () => {
  return (
    <header className="flex items-center justify-between w-full">
      <div className="w-10" /> {/* For spacing */}
      <div className="flex items-center gap-2 text-primary-foreground">
        <LinkIcon className="h-8 w-8 text-primary" />
        <h1 className="text-5xl font-bold tracking-tighter">Link</h1>
      </div>
      <RulesModal />
    </header>
  );
};
