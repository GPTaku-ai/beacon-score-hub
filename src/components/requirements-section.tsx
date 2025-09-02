import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const RequirementsSection = () => {
  return (
    <section className="py-16 md:py-20" id="requirements-section">
      <div className="max-w-mc mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            배포 요건
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-card-foreground">
                웹 서비스
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-sm text-card-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1.5 text-xs">•</span>
                  <span>공개 URL 접근 가능</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1.5 text-xs">•</span>
                  <span>랜딩 페이지만으로는 불가</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1.5 text-xs">•</span>
                  <span>404/500 에러 상태 금지</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-card-foreground">
                앱 서비스
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-sm text-card-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1.5 text-xs">•</span>
                  <span>스토어 설치 가능</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1.5 text-xs">•</span>
                  <span>TestFlight/Play 오픈테스트 허용</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1.5 text-xs">•</span>
                  <span>APK/IPA 단독 배포 불가</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};