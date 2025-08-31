import { Card, CardContent } from "@/components/ui/card";
import { TIMELINE } from "@/lib/config";

export const TimelineSection = () => {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="max-w-mc mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            일정 안내
          </h2>
        </div>

        <div className="space-y-4">
          {TIMELINE.map((item, index) => (
            <Card key={index} className="border border-border bg-card">
              <CardContent className="flex flex-col md:flex-row md:items-center gap-4 p-6">
                <div className="md:w-32 flex-shrink-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    {item.date}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-card-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};