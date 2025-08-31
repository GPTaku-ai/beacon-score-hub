import { Button } from "@/components/ui/button";
import { CountBadge } from "@/components/count-badge";
import { CONFIG } from "@/lib/config";

export const HeroSection = () => {
  const handleSignUp = () => {
    window.open(CONFIG.FORM_URL, '_blank', 'noopener');
  };

  const handleOpenChat = () => {
    window.open(CONFIG.OPEN_CHAT_URL, '_blank', 'noopener');
  };

  return (
    <section className="relative py-20 md:py-28 bg-mc-gradient">
      <div className="max-w-mc mx-auto px-6">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              4주 만에 배포하고,<br />
              유저로 증명하자
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              신청 9/1–9/10 · 신규 서비스만 참여 · 이수 시 3만원 페이백
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="px-8 py-3 text-base font-semibold"
              onClick={handleSignUp}
            >
              참가하기
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              className="px-8 py-3 text-base font-semibold"
              onClick={handleOpenChat}
            >
              오픈채팅 바로가기
            </Button>
          </div>

          <div className="flex justify-center pt-4">
            <CountBadge />
          </div>
        </div>
      </div>
    </section>
  );
};