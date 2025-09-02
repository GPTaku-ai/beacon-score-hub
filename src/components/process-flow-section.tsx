export const ProcessFlowSection = () => {
  const steps = [
    {
      number: "01",
      title: "챌린지 신청",
      description: "Google Form으로 참가 신청 및 참가비 입금",
      icon: "📝"
    },
    {
      number: "02", 
      title: "서비스 배포",
      description: "4주간 핵심 기능 개발 및 공개 배포",
      icon: "🚀"
    },
    {
      number: "03",
      title: "유저 지표 인증", 
      description: "MAU 데이터로 실제 사용자 확보 증명",
      icon: "📊"
    },
    {
      number: "04",
      title: "피드백/보상",
      description: "결과 발표, 상금 지급 및 성장 피드백",
      icon: "🏆"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="max-w-mc mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            진행 플로우
          </h2>
          <p className="text-muted-foreground">
            4단계로 완성하는 실전 서비스 성장 과정
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 mx-auto rounded-full border-2 border-foreground bg-background flex items-center justify-center text-2xl">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-foreground text-background text-sm font-bold flex items-center justify-center">
                  {step.number}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-8 h-0.5 bg-border transform -translate-x-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};