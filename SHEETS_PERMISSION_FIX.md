# Google Sheets 권한 문제 해결 가이드

## 문제: "You do not have permission to access the requested document"

이 오류는 Apps Script가 Google Sheets에 접근할 권한이 없을 때 발생합니다.

## 해결 방법

### 방법 1: Google Sheets 공유 설정 확인

1. **Google Sheets 열기**
   - https://docs.google.com/spreadsheets/d/1JQKQZXxHtueC3yBCNBEmlmRWTlmDZpQHnuV5ZjOwSik/edit 접속

2. **공유 설정 확인**
   - 우측 상단 "공유" 버튼 클릭
   - 다음 중 하나 선택:
     - "링크가 있는 모든 사용자에게 보기 권한" (최소)
     - "링크가 있는 모든 사용자에게 편집 권한" (승인 기능 사용 시)

### 방법 2: Apps Script 프로젝트 연결 (권장)

1. **Google Sheets에서 Apps Script 열기**
   - Google Sheets 열기
   - 메뉴: 확장 프로그램 → Apps Script
   - 새 창에서 Apps Script 에디터 열림

2. **코드 복사**
   - 기존 코드 삭제
   - `participant-management-improved.js` 내용 복사/붙여넣기

3. **저장 및 실행**
   - Ctrl+S 또는 저장 버튼 클릭
   - `checkStatus` 함수 실행

### 방법 3: 권한 재승인

1. **Apps Script 에디터에서**
   - 함수 선택: `checkStatus`
   - 실행 버튼 클릭

2. **권한 요청 화면**
   - "권한 검토" 클릭
   - Google 계정 선택
   - "고급" → "[프로젝트명](안전하지 않음)" 클릭
   - "허용" 클릭

### 방법 4: Sheet ID 직접 확인

1. **현재 Sheet URL 확인**
   ```
   https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
   ```
   - URL에서 SHEET_ID 부분 복사

2. **코드에서 SHEET_ID 확인**
   ```javascript
   const SHEET_ID = '1JQKQZXxHtueC3yBCNBEmlmRWTlmDZpQHnuV5ZjOwSik';
   ```
   - 두 ID가 일치하는지 확인

## 추가 확인 사항

### Apps Script 프로젝트 소유자 확인
- Apps Script 프로젝트와 Google Sheets의 소유자가 같아야 함
- 다른 계정으로 로그인했다면 올바른 계정으로 전환

### 조직 정책 확인
- G Suite/Workspace 조직의 경우 관리자 정책 확인
- 외부 공유가 제한되어 있을 수 있음

## 테스트 방법

Apps Script 에디터에서 다음 코드 실행:

```javascript
function testAccess() {
  try {
    const sheet = SpreadsheetApp.openById('1JQKQZXxHtueC3yBCNBEmlmRWTlmDZpQHnuV5ZjOwSik');
    console.log('Sheet Name:', sheet.getName());
    console.log('Access OK!');
  } catch (error) {
    console.error('Access Error:', error);
  }
}
```

## 완전 해결 방법 (새 프로젝트)

1. **Google Sheets에서 시작**
   - Sheets 문서 열기
   - 확장 프로그램 → Apps Script
   - 코드 붙여넣기
   - 저장 및 배포

이 방법이 가장 확실합니다. Sheets와 Apps Script가 자동으로 연결됩니다.

## 배포 후 URL 업데이트

1. **새 웹 앱 URL 받기**
   - 배포 → 새 배포
   - 웹 앱 선택
   - 배포 후 URL 복사

2. **관리자 페이지에서 업데이트**
   - Count API URL 수정
   - 새 URL 입력
   - 저장