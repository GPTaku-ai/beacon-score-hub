export const CONFIG = {
  APP_TITLE: "MAU 챌린지",
  FORM_URL: "https://docs.google.com/forms/d/e/1FAIpQLScQLqkYliFjNEntFdABw4jKueuVM1DsJbjSHWt0aiHgtQNjsA/viewform",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/1JQKQZXxHtueC3yBCNBEmlmRWTlmDZpQHnuV5ZjOwSik/edit#gid=0",
  OPEN_CHAT_URL: "https://open.kakao.com/o/gLI237Oh",
  SCOREBOARD_URL: "https://docs.google.com/spreadsheets/d/placeholder_scoreboard/edit#gid=0",
  COUNT_API_URL: "https://script.google.com/macros/s/AKfycbxRNO7Ocf3q_opGsIVLgYU6Ca_e6kqBwDCygZfQH2Dej7A-IxPBVZ4QlHk6reZ4LZxy/exec",
  // SHA-256 hash of 'q1q2q3q4!'
  ADMIN_HASH: "847d26c1deadfff2204122942fea768ea5c1f78266b202c2dc7a0665ca6770e9",
  SESSION_HOURS: 12,
  // Apps Script API 엔드포인트들
  STATS_API_URL: "https://script.google.com/macros/s/placeholder/exec?type=stats",
  LIST_API_URL: "https://script.google.com/macros/s/placeholder/exec?type=list"
};

export const TIMELINE = [
  {
    date: "9/1 ~ 9/10",
    title: "신청 기간",
    desc: "챌린지 참가 신청 접수"
  },
  {
    date: "9/1 ~ 9/15",
    title: "서비스 및 핵심기능 수정 기간",
    desc: "서비스 아이디어 및 핵심 기능 최종 정리"
  },
  {
    date: "9/1 ~ 10/15",
    title: "MVP 개발 및 배포",
    desc: "최소 기능 제품 개발 완료 후 공개 배포"
  },
  {
    date: "10/15 ~ 10/31",
    title: "서비스 운영",
    desc: "실제 유저와 함께하는 서비스 운영 경험"
  },
  {
    date: "10/31",
    title: "챌린지 이수 본인평가 제출",
    desc: "챌린지 완주 및 최종 성과 제출"
  }
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