export const TestimonialsSection = () => {
  const testimonials = [
    {
      text: "실제 유저 데이터로 성장 포인트 찾았어요!",
      name: "김개발",
      role: "웹 개발자"
    },
    {
      text: "4주 만에 MVP로 런칭! 자신감이 생겼어요.",
      name: "박창업",
      role: "앱 개발자"
    },
    {
      text: "유저 피드백을 통해 실제 서비스 방향을 잡았습니다.",
      name: "이서비스",
      role: "기획자"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-mc mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            참가자 후기
          </h2>
          <p className="text-muted-foreground">
            실제 챌린지 참가자들의 경험을 들어보세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted border-2 border-border flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-foreground"></div>
              </div>
              <blockquote className="text-lg font-medium text-foreground">
                "{testimonial.text}"
              </blockquote>
              <div className="text-sm text-muted-foreground">
                <div className="font-medium">{testimonial.name}</div>
                <div>{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};