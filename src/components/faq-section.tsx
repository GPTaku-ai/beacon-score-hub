import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    question: "제출물과 운영 방식은 어떻게 되나요?",
    answer: "1주차에 핵심 기능을 제출하고, 4주차에 이수 심사를 받습니다. 주간 사례글 작성이 의무사항입니다."
  },
  {
    question: "팀 참가가 가능한가요?",
    answer: "개인전이 원칙이지만, 2인 팀 참가 시 예외적으로 허용됩니다. 상금과 페이백은 팀당 1회만 지급됩니다."
  },
  {
    question: "MAU는 어떻게 측정하나요?",
    answer: "웹 서비스는 Google Analytics(GA4), 앱은 Firebase Analytics의 콘솔 MAU 대시보드 캡처를 통해 증빙합니다."
  },
  {
    question: "기존 프로젝트를 발전시켜도 되나요?",
    answer: "2025-08-31 이전에 공개 배포 이력이 없는 신규 서비스만 참여 가능합니다. 내부 PoC나 코드 재사용은 허용됩니다."
  }
];

export const FAQSection = () => {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            자주 묻는 질문
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg bg-card px-6">
              <AccordionTrigger className="text-left font-semibold text-card-foreground hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-6">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};