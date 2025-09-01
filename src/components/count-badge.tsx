import { useEffect, useState } from "react";
import { CONFIG } from "@/lib/config";

export interface CountData {
  count?: number;  // 메인 카운트 (승인된 수)
  total_submissions?: number;
  unique_emails?: number;
  confirmed_count?: number;
  approved_count?: number;
  pending_count?: number;
  updated_at?: string;
}

interface CountBadgeProps {
  className?: string;
  showConfirmed?: boolean;
  showApproved?: boolean;
  data?: CountData;            // 외부에서 주입된 데이터 (있으면 fetch 생략)
  loadingOverride?: boolean;   // 외부 로딩 상태 제어
}

export const CountBadge = ({ className, showConfirmed = false, showApproved = false, data, loadingOverride }: CountBadgeProps) => {
  const [countData, setCountData] = useState<CountData | null>(null);
  const [loading, setLoading] = useState(true);

  // 외부에서 data가 주어지면 그대로 사용, 없으면 자체 fetch
  useEffect(() => {
    if (data) {
      setCountData(data);
      setLoading(false);
      return;
    }

    let cancelled = false;
    const fetchCount = async () => {
      try {
        const overriddenUrl = localStorage.getItem("admin_url_COUNT_API_URL");
        const countApiUrl = overriddenUrl || CONFIG.COUNT_API_URL;
        const response = await fetch(countApiUrl, { 
          cache: 'no-store',
          mode: 'cors'
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const json = await response.json();
        if (!cancelled) setCountData(json);
      } catch (error) {
        console.warn("Count fetch failed:", error);
        if (!cancelled) {
          // CORS 오류 시 기본값 설정
          setCountData({ total_submissions: 0, unique_emails: 0, approved_count: 0, count: 0 });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchCount();
    return () => { cancelled = true; };
  }, [data]);

  const effectiveData = data ?? countData;
  const effectiveLoading = loadingOverride ?? loading;

  // 현재 참가 신청: 총 제출 수 (total_submissions)
  const applyCount = effectiveData?.total_submissions ?? 0;
  // 승인된 참가자: approved_count 또는 count
  const approvedCount = effectiveData?.approved_count ?? effectiveData?.count ?? 0;
  // 입금 확정: confirmed_count (현재 미사용)
  const confirmCount = effectiveData?.confirmed_count ?? 0;

  return (
    <div className={`flex gap-3 flex-wrap ${className}`}>
      <div className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-full bg-background">
        <span className="text-sm text-muted-foreground">현재 참가 신청:</span>
        <strong className="text-foreground">
          {effectiveLoading ? "-" : `${applyCount}명`}
        </strong>
      </div>
      
      {showApproved && (
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-full bg-primary/10">
          <span className="text-sm text-muted-foreground">승인된 참가자:</span>
          <strong className="text-primary">
            {effectiveLoading ? "-" : `${approvedCount}명`}
          </strong>
        </div>
      )}
      
      {showConfirmed && (
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-full bg-background">
          <span className="text-sm text-muted-foreground">입금 확정:</span>
          <strong className="text-foreground">
            {loading ? "-" : confirmCount > 0 ? `${confirmCount}명` : "-"}
          </strong>
        </div>
      )}
    </div>
  );
};
