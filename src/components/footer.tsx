import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { CONFIG } from "@/lib/config";

export const Footer = () => {
  const handleOpenChat = () => {
    window.open(CONFIG.OPEN_CHAT_URL, '_blank', 'noopener');
  };

  return (
    <footer className="border-t border-border bg-muted/30 py-12">
      <div className="max-w-mc mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Logo />
            <p className="text-sm text-muted-foreground text-center md:text-left">
              4주 만에 실제 유저와 함께, 내 서비스 성장과 운영 경험까지.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-3 text-base font-medium border-foreground text-foreground hover:bg-foreground hover:text-background"
              onClick={handleOpenChat}
            >
              오픈채팅 참여하기
            </Button>
            <p className="text-xs text-muted-foreground text-center md:text-right">
              개인정보는 챌린지 운영 목적으로만 사용되며,<br />
              종료 후 안전하게 폐기됩니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};