import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { CONFIG } from "@/lib/config";

export const Header = () => {
  const handleSignUp = () => {
    window.open(CONFIG.FORM_URL, '_blank', 'noopener');
  };

  const handleOpenChat = () => {
    window.open(CONFIG.OPEN_CHAT_URL, '_blank', 'noopener');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-mc mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleOpenChat}
            className="hidden sm:inline-flex"
          >
            오픈채팅
          </Button>
          <Button 
            size="sm" 
            onClick={handleSignUp}
            className="font-semibold"
          >
            참가하기
          </Button>
        </div>
      </div>
    </header>
  );
};