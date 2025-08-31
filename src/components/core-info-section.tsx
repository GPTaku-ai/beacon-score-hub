import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CORE_CARDS } from "@/lib/config";

export const CoreInfoSection = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-mc mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            핵심 정보
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_CARDS.map((card, index) => (
            <Card key={index} className="border border-border bg-card hover:shadow-mc-subtle transition-all duration-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-card-foreground">
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Array.isArray(card.content) ? (
                  <ul className="space-y-2 text-sm text-card-foreground">
                    {card.content.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1.5 text-xs">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-card-foreground leading-relaxed">
                    {card.content}
                  </p>
                )}
                {card.note && (
                  <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
                    {card.note}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            * 부정 카운팅(중복 user_id·인위 이벤트·봇 등) 적발 시 집계 제외/실격
          </p>
        </div>
      </div>
    </section>
  );
};