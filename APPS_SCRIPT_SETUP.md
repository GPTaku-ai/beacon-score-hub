# Google Apps Script 설정 가이드

## 1. Google Apps Script 프로젝트 생성

1. **Google Drive 접속**
   - https://drive.google.com 접속
   - 새로 만들기 → 더보기 → Google Apps Script

2. **또는 직접 접속**
   - https://script.google.com 접속
   - 새 프로젝트 생성

## 2. 코드 설정

1. **기본 코드 삭제**
   - 기본으로 있는 `function myFunction()` 삭제

2. **코드 복사**
   - `participant-management-improved.js` 파일의 전체 내용을 복사
   - Apps Script 에디터에 붙여넣기

3. **프로젝트 이름 설정**
   - 상단 "제목 없는 프로젝트" 클릭
   - "MAU Challenge 참가자 관리" 등으로 변경

## 3. 초기 설정 실행

1. **승인 컬럼 추가 (최초 1회)**
   ```javascript
   // 함수 선택 드롭다운에서 'setupApprovalColumn' 선택
   // 실행 버튼 클릭
   ```
   - P열에 '승인' 컬럼이 자동 추가됨
   - 체크박스 형식으로 설정됨

2. **현재 상태 확인**
   ```javascript
   // 함수 선택 드롭다운에서 'checkStatus' 선택
   // 실행 버튼 클릭
   ```
   - 실행 로그에서 현재 데이터 상태 확인

## 4. 웹 앱으로 배포

1. **배포 메뉴 접속**
   - 상단 메뉴: 배포 → 새 배포

2. **배포 설정**
   - 유형: 웹 앱
   - 설명: "MAU Challenge API v1.0"
   - 실행: "나"
   - 액세스 권한: "모든 사용자" (Anyone)

3. **배포 완료**
   - "배포" 버튼 클릭
   - 승인 프로세스 진행 (최초 1회)
   - 웹 앱 URL 복사

## 5. 권한 승인 (최초 1회)

1. **승인 요청 화면**
   - "검토 필요" 클릭
   - 고급 → 안전하지 않은 페이지로 이동
   - 권한 허용

2. **필요한 권한**
   - Google Sheets 읽기/쓰기
   - 외부 서비스 연결

## 6. API URL 설정

1. **생성된 URL 형식**
   ```
   https://script.google.com/macros/s/[SCRIPT_ID]/exec
   ```

2. **프로젝트에 적용**
   - 관리자 페이지에서 URL 수정
   - Count API URL에 위 URL 입력
   - 저장

## 7. API 사용법

### 기본 엔드포인트
```bash
# 승인된 참가자 수 (기본)
GET https://script.google.com/macros/s/[SCRIPT_ID]/exec

# 전체 통계
GET https://script.google.com/macros/s/[SCRIPT_ID]/exec?type=stats

# 승인된 참가자 목록
GET https://script.google.com/macros/s/[SCRIPT_ID]/exec?type=list

# 상세 요약 (새 기능)
GET https://script.google.com/macros/s/[SCRIPT_ID]/exec?type=summary

# 캐시 무시
GET https://script.google.com/macros/s/[SCRIPT_ID]/exec?type=count&cache=false
```

### 응답 예시
```json
{
  "count": 42,
  "total_submissions": 50,
  "unique_emails": 48,
  "approved_count": 42,
  "pending_count": 8,
  "updated_at": "2025-01-01T12:00:00.000Z"
}
```

## 8. 관리 기능

### 대량 승인 (Apps Script 에디터에서 실행)
```javascript
// 이메일 목록으로 승인
approveByEmails([
  'user1@example.com',
  'user2@example.com'
]);
```

## 9. 문제 해결

### "시트를 찾을 수 없습니다" 오류
- SHEET_NAME이 정확한지 확인 ('Form Responses 1')
- 시트 이름에 공백이 있는지 확인

### "승인 컬럼을 찾을 수 없습니다" 오류
- setupApprovalColumn() 함수 실행
- P열에 '승인' 컬럼 확인

### CORS 오류
- 배포 설정에서 "모든 사용자" 선택 확인
- URL이 /exec로 끝나는지 확인

## 10. 업데이트 방법

1. **코드 수정**
   - Apps Script 에디터에서 코드 수정

2. **새 버전 배포**
   - 배포 → 배포 관리
   - 수정 → 새 버전
   - 버전 설명 입력
   - 배포

3. **URL은 동일하게 유지됨**
   - 기존 URL 그대로 사용 가능

## 주의사항

- Sheet ID가 올바른지 확인
- 승인 컬럼은 P열(16번째 열)에 위치
- 캐시는 60초 동안 유지 (성능 향상)
- 대량 데이터 처리 시 타임아웃 주의 (6분 제한)