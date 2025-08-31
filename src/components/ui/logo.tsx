import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo = ({ className, showText = true }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Audio Wave Symbol inspired by the uploaded logo */}
      <div className="relative flex items-center justify-center">
        <svg
          width="32"
          height="24"
          viewBox="0 0 32 24"
          fill="none"
          className="text-foreground"
        >
          {/* Vertical bars forming an audio wave pattern */}
          <rect x="0" y="10" width="2" height="4" fill="currentColor" />
          <rect x="3" y="8" width="2" height="8" fill="currentColor" />
          <rect x="6" y="6" width="2" height="12" fill="currentColor" />
          <rect x="9" y="4" width="2" height="16" fill="currentColor" />
          <rect x="12" y="2" width="2" height="20" fill="currentColor" />
          <rect x="15" y="0" width="2" height="24" fill="currentColor" />
          <rect x="18" y="4" width="2" height="16" fill="currentColor" />
          <rect x="21" y="6" width="2" height="12" fill="currentColor" />
          <rect x="24" y="8" width="2" height="8" fill="currentColor" />
          <rect x="27" y="10" width="2" height="4" fill="currentColor" />
          <rect x="30" y="10" width="2" height="4" fill="currentColor" />
        </svg>
      </div>
      {showText && (
        <span className="text-xl font-bold tracking-tight">
          VIBE CODERS
        </span>
      )}
    </div>
  );
};