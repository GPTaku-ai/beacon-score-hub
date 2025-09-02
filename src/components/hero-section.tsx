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
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight md:leading-tight lg:leading-tight text-foreground">
              4주 만에 배포부터 유저 유입,<br />
              그리고 실제 서비스 운영까지!
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              배포, 유입, 운영까지 전 과정을 내 손으로 경험하는 실제 서비스 성장 챌린지
            </p>
            
            {/* 요약 정보 배지들 */}
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <div className="px-3 py-1 bg-foreground text-background rounded-full font-medium">
                신청 9/1–9/10
              </div>
              <div className="px-3 py-1 border border-border rounded-full">
                신규 서비스만
              </div>
              <div className="px-3 py-1 border border-border rounded-full">
                이수 시 3만원 페이백
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="w-48 py-3 text-base font-bold bg-foreground text-background hover:bg-foreground/90"
              onClick={handleSignUp}
            >
              챌린지 신청하기
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="w-48 py-3 text-base font-medium border-foreground text-foreground hover:bg-foreground hover:text-background"
              onClick={() => {
                const coreInfo = document.getElementById('core-info');
                coreInfo?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              자세히 보기
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="w-48 py-3 text-base font-medium border-foreground text-foreground hover:bg-foreground hover:text-background"
              onClick={handleOpenChat}
            >
              오픈채팅 바로가기
            </Button>
          </div>

          <div className="flex justify-center pt-4">
            <CountBadge showApproved />
          </div>
        </div>
      </div>
    </section>
  );
};