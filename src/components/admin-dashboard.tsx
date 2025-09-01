import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CountBadge } from "@/components/count-badge";
import { ExternalLink, Copy, LogOut, RefreshCw, Edit, Save, X } from "lucide-react";
import { CONFIG } from "@/lib/config";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

interface AdminDashboardProps {
  onLogout: () => void;
}

const ADMIN_LINKS = [
  { key: "FORM_URL", title: "Google Form (신청 폼)", description: "참가자 신청서 관리" },
  { key: "SHEET_URL", title: "Google Sheet (응답 시트)", description: "신청서 응답 데이터" },
  { key: "OPEN_CHAT_URL", title: "Open Chat (오픈채팅)", description: "참가자 커뮤니티" },
  { key: "SCOREBOARD_URL", title: "Scoreboard (스코어보드)", description: "참가자 점수 현황" },
  { key: "COUNT_API_URL", title: "Count API (Apps Script)", description: "참가자 수 집계 API" }
];

export const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [countData, setCountData] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [editingUrl, setEditingUrl] = useState<string | null>(null);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [tempUrl, setTempUrl] = useState("");
  const { toast } = useToast();

  const loadUrls = () => {
    const savedUrls: Record<string, string> = {};
    ADMIN_LINKS.forEach(link => {
      const savedUrl = localStorage.getItem(`admin_url_${link.key}`);
      savedUrls[link.key] = savedUrl || CONFIG[link.key as keyof typeof CONFIG] as string;
    });
    setUrls(savedUrls);
  };

  const refreshCounts = async () => {
    setRefreshing(true);
    try {
      const countApiUrl = urls.COUNT_API_URL || CONFIG.COUNT_API_URL;
      const response = await fetch(countApiUrl, { cache: 'no-store' });
      const data = await response.json();
      setCountData(data);
    } catch (error) {
      console.warn("Count refresh failed:", error);
      setCountData(null);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadUrls();
  }, []);

  useEffect(() => {
    if (Object.keys(urls).length > 0) {
      refreshCounts();
    }
  }, [urls]);

  const openLink = (key: string) => {
    const url = urls[key];
    if (url) {
      window.open(url, '_blank', 'noopener');
    }
  };

  const copyLink = async (key: string) => {
    const url = urls[key];
    if (url) {
      try {
        await navigator.clipboard.writeText(url);
        toast({
          title: "링크 복사됨",
          description: "클립보드에 복사되었습니다.",
        });
      } catch (error) {
        toast({
          title: "복사 실패",
          description: "링크 복사에 실패했습니다.",
          variant: "destructive"
        });
      }
    }
  };

  const startEditUrl = (key: string) => {
    setEditingUrl(key);
    setTempUrl(urls[key] || "");
  };

  const saveUrl = (key: string) => {
    if (!tempUrl.trim()) {
      toast({
        title: "입력 오류",
        description: "URL을 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    try {
      new URL(tempUrl);
    } catch (error) {
      toast({
        title: "URL 형식 오류",
        description: "올바른 URL 형식을 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem(`admin_url_${key}`, tempUrl);
    setUrls(prev => ({ ...prev, [key]: tempUrl }));
    setEditingUrl(null);
    toast({
      title: "URL 저장됨",
      description: "URL이 성공적으로 저장되었습니다.",
    });
  };

  const cancelEdit = () => {
    setEditingUrl(null);
    setTempUrl("");
  };

  const resetUrl = (key: string) => {
    localStorage.removeItem(`admin_url_${key}`);
    const defaultUrl = CONFIG[key as keyof typeof CONFIG] as string;
    setUrls(prev => ({ ...prev, [key]: defaultUrl }));
    toast({
      title: "URL 초기화됨",
      description: "기본 URL로 복원되었습니다.",
    });
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return "-";
    return new Date(isoString).toLocaleString('ko-KR');
  };

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">운영 대시보드</h1>
            <p className="text-muted-foreground">링크 모음 및 참가자 수 확인 (읽기 전용)</p>
          </div>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            로그아웃
          </Button>
        </div>

        {/* Count Summary */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>참가자 현황</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshCounts}
              disabled={refreshing}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              새로고침
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <CountBadge showConfirmed showApproved data={countData ?? undefined} loadingOverride={refreshing} />
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">총 응답 수:</span>
                  <span className="ml-2 font-medium">
                    {countData?.total_submissions ?? "-"}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">고유 이메일:</span>
                  <span className="ml-2 font-medium">
                    {countData?.unique_emails ?? "-"}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">승인된 참가자:</span>
                  <span className="ml-2 font-medium text-primary">
                    {countData?.approved_count ?? "-"}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">업데이트:</span>
                  <span className="ml-2 font-medium">
                    {formatDate(countData?.updated_at)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ADMIN_LINKS.map((link, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{link.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{link.description}</p>
              </CardHeader>
              <CardContent>
                {editingUrl === link.key ? (
                  <div className="space-y-3">
                    <Input
                      value={tempUrl}
                      onChange={(e) => setTempUrl(e.target.value)}
                      placeholder="URL을 입력하세요"
                      className="text-sm"
                    />
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => saveUrl(link.key)}
                        size="sm"
                        className="flex-1"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        저장
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={cancelEdit}
                        size="sm"
                        className="flex-1"
                      >
                        <X className="w-4 h-4 mr-2" />
                        취소
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => resetUrl(link.key)}
                        size="sm"
                        title="기본값 복원"
                      >
                        초기화
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2 mb-3">
                      <Button 
                        onClick={() => openLink(link.key)}
                        className="flex-1"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        새 탭 열기
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => copyLink(link.key)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => startEditUrl(link.key)}
                        title="URL 수정"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground break-all">
                      {urls[link.key]}
                      {urls[link.key] !== CONFIG[link.key as keyof typeof CONFIG] && (
                        <span className="text-primary ml-1">(수정됨)</span>
                      )}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
