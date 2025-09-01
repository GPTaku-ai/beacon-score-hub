import { useEffect, useState } from "react";
import { CONFIG } from "@/lib/config";

interface CountData {
  total_submissions: number;
  unique_emails: number;
  confirmed_count?: number;
  approved_count?: number;
  updated_at?: string;
}

interface CountBadgeProps {
  className?: string;
  showConfirmed?: boolean;
  showApproved?: boolean;
}

export const CountBadge = ({ className, showConfirmed = false, showApproved = false }: CountBadgeProps) => {
  const [countData, setCountData] = useState<CountData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch(CONFIG.COUNT_API_URL, { cache: 'no-store' });
        const data = await response.json();
        setCountData(data);
      } catch (error) {
        console.warn("Count fetch failed:", error);
        setCountData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  const applyCount = countData?.unique_emails ?? countData?.total_submissions ?? 0;
  const confirmCount = countData?.confirmed_count ?? 0;
  const approvedCount = countData?.approved_count ?? 0;

  return (
    <div className={`flex gap-3 flex-wrap ${className}`}>
      <div className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-full bg-background">
        <span className="text-sm text-muted-foreground">현재 참가 신청:</span>
        <strong className="text-foreground">
          {loading ? "-" : `${applyCount}명`}
        </strong>
      </div>
      
      {showApproved && (
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-full bg-primary/10">
          <span className="text-sm text-muted-foreground">승인된 참가자:</span>
          <strong className="text-primary">
            {loading ? "-" : approvedCount > 0 ? `${approvedCount}명` : "-"}
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