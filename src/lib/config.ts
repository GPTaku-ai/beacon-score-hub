export const CONFIG = {
  APP_TITLE: "MAU 챌린지",
  FORM_URL: "https://docs.google.com/forms/d/e/1FAIpQLSf_placeholder/viewform",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/placeholder/edit#gid=0",
  OPEN_CHAT_URL: "https://open.kakao.com/o/gLI237Oh",
  SCOREBOARD_URL: "https://docs.google.com/spreadsheets/d/placeholder_scoreboard/edit#gid=0",
  COUNT_API_URL: "https://script.google.com/macros/s/placeholder/exec",
  // SHA-256 hash of 'q1q2q3q4!'
  ADMIN_HASH: "847d26c1deadfff2204122942fea768ea5c1f78266b202c2dc7a0665ca6770e9",
  SESSION_HOURS: 12
};

export const TIMELINE = [
  { date: "9/1-9/10", title: "신청 기간", desc: "Google Form을 통한 참가 신청" },
  { date: "9/11", title: "1주차 OT", desc: "핵심 기능 제출 안내" },
  { date: "9/11-9/18", title: "1주차", desc: "핵심 기능 개발 및 제출" },
  { date: "9/19-10/2", title: "2-3주차", desc: "MVP 개발 및 개선" },
  { date: "10/3-10/31", title: "4주차", desc: "공개 배포 및 이수 심사" }
];

export const CORE_CARDS = [
  {
    title: "참가 자격",
    content: "공지일(2025-08-31 KST) 이전 공개 배포 이력 없는 신규 서비스만 참여 가능",
    note: "내부 PoC/코드 재사용 가능 · 대외 배포 이력 있으면 불가"
  },
  {
    title: "이수 기준 · 페이백",
    content: [
      "공개 배포 (웹 URL 또는 스토어/공개 테스트 설치 가능)",
      "1주차 제출 핵심 기능 전부 동작"
    ],
    note: "이수 시 3만원 페이백(참가비 5만원 중)"
  },
  {
    title: "상금 분배",
    content: [
      "상금풀 = 참가자 수 × 2만원",
      "1등 50% / 2등 30% / 3등 20%"
    ]
  },
  {
    title: "MAU 측정 기준",
    content: [
      "웹: Google Analytics(GA4)",
      "앱: Firebase Analytics (콘솔 MAU 대시보드 캡처/공유)"
    ],
    note: "MAU 정의·증빙 방식은 제출 폼에 명확히 기입"
  }
];