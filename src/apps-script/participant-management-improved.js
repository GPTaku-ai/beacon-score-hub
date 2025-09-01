/**
 * VIBECODERS MAU Challenge - 참가자 관리 Apps Script (개선 버전)
 * Google Sheet 기반 참가자 승인 시스템
 */

// ===== 설정 =====
const SHEET_ID = '1JQKQZXxHtueC3yBCNBEmlmRWTlmDZpQHnuV5ZjOwSik';
const SHEET_NAME = 'Form Responses 1';  // 영문 시트명
const EMAIL_COL_NAME = 'Email Address';
const APPROVE_COL_NAME = '승인';

// 추가 컬럼 정의 (실제 양식 컬럼명과 일치)
const COLUMNS = {
  TIMESTAMP: 'Timestamp',
  EMAIL: 'Email Address',
  PHONE: '연락처(숫자만, 하이픈 없이)',
  NICKNAME: '카카오 오픈채팅 닉네임',
  SERVICE_NAME: '서비스명(예정 명칭)',
  SERVICE_DESC: '서비스 한 줄 설명(50자 이내)',
  CORE_FEATURES: '구현할 핵심 기능 (2~3개 권장, 줄바꿈 / 각 항목 넘버링 필수)',
  SERVICE_TYPE: '서비스 유형',
  DEPOSITOR: '입금자명(실명 또는 대리 입금자명)',
  DEPOSIT_URL: '입금 확인증 URL',
  NEW_SERVICE_CHECK: '신규 서비스 기준 확인',
  OPERATION_POLICY: '운영정책 동의',
  REFUND_POLICY: '환불/정산 동의',
  FRAUD_PREVENTION: '부정 입력 방지 동의',
  PRIVACY_POLICY: '개인정보 수집·이용 동의',
  APPROVAL: '승인'  // P열 (16번째 열)
};

// 캐시 설정 (성능 개선)
const CACHE_DURATION = 60; // 60초 캐시

/**
 * 메인 GET 요청 핸들러
 */
function doGet(e) {
  try {
    const type = e.parameter.type || 'count';
    const useCache = e.parameter.cache !== 'false';
    
    // 캐시 확인
    if (useCache) {
      const cached = getCachedResponse(type);
      if (cached) return cached;
    }
    
    let response;
    switch (type) {
      case 'count':
        response = getApprovedCount();
        break;
      case 'stats':
        response = getStats();
        break;
      case 'list':
        response = getApprovedList();
        break;
      case 'summary':
        response = getDetailedSummary();
        break;
      default:
        return createResponse({ error: 'Invalid type parameter' }, 400);
    }
    
    // 캐시 저장
    if (useCache) {
      setCachedResponse(type, response);
    }
    
    return response;
  } catch (error) {
    console.error('doGet Error:', error);
    return createResponse({ 
      error: error.toString(),
      message: '데이터를 가져오는 중 오류가 발생했습니다.'
    }, 500);
  }
}

/**
 * 1. 승인된 참가자 수만 반환 (기본 기능)
 */
function getApprovedCount() {
  const data = getSheetData();
  if (!data || data.length < 2) {
    return createResponse({
      count: 0,
      total_submissions: 0,
      unique_emails: 0,
      approved_count: 0,
      updated_at: new Date().toISOString()
    });
  }
  
  const stats = calculateStats(data);
  
  return createResponse({
    count: stats.approved,
    total_submissions: stats.total,
    unique_emails: stats.uniqueEmails,
    approved_count: stats.approved,
    pending_count: stats.pending,
    updated_at: new Date().toISOString()
  });
}

/**
 * 2. 전체 통계 반환
 */
function getStats() {
  const data = getSheetData();
  if (!data || data.length < 2) {
    return createResponse({
      total: 0,
      unique_emails: 0,
      approved: 0,
      pending: 0,
      approved_ratio: 0,
      updated_at: new Date().toISOString()
    });
  }
  
  const stats = calculateStats(data);
  
  return createResponse({
    total: stats.total,
    unique_emails: stats.uniqueEmails,
    approved: stats.approved,
    pending: stats.pending,
    approved_ratio: stats.approvedRatio,
    duplicates: stats.duplicates,
    service_types: stats.serviceTypes,
    updated_at: new Date().toISOString()
  });
}

/**
 * 3. 승인된 참가자 명단 반환
 */
function getApprovedList() {
  const data = getSheetData();
  if (!data || data.length < 2) {
    return createResponse({
      count: 0,
      participants: [],
      updated_at: new Date().toISOString()
    });
  }
  
  const headers = data[0];
  const approveIdx = headers.indexOf(COLUMNS.APPROVAL);
  
  if (approveIdx === -1) {
    return createResponse({ 
      error: '승인 컬럼을 찾을 수 없습니다.',
      message: 'P열에 "승인" 컬럼을 추가해주세요.'
    }, 400);
  }
  
  const approvedList = [];
  const emailIdx = headers.indexOf(COLUMNS.EMAIL);
  const nicknameIdx = headers.indexOf(COLUMNS.NICKNAME);
  const serviceNameIdx = headers.indexOf(COLUMNS.SERVICE_NAME);
  const serviceTypeIdx = headers.indexOf(COLUMNS.SERVICE_TYPE);
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (isApproved(row[approveIdx])) {
      approvedList.push({
        email: row[emailIdx] || '',
        nickname: row[nicknameIdx] || '',
        service_name: row[serviceNameIdx] || '',
        service_type: row[serviceTypeIdx] || '',
        approved_at: row[approveIdx] // 승인 값 또는 날짜
      });
    }
  }
  
  return createResponse({
    count: approvedList.length,
    participants: approvedList,
    updated_at: new Date().toISOString()
  });
}

/**
 * 4. 상세 요약 정보 (새 기능)
 */
function getDetailedSummary() {
  const data = getSheetData();
  if (!data || data.length < 2) {
    return createResponse({
      summary: {
        total: 0,
        approved: 0,
        pending: 0,
        service_types: {},
        recent_submissions: []
      },
      updated_at: new Date().toISOString()
    });
  }
  
  const stats = calculateStats(data);
  const recentSubmissions = getRecentSubmissions(data, 5);
  
  return createResponse({
    summary: {
      total: stats.total,
      approved: stats.approved,
      pending: stats.pending,
      unique_emails: stats.uniqueEmails,
      duplicates: stats.duplicates,
      approval_rate: `${(stats.approvedRatio * 100).toFixed(1)}%`,
      service_types: stats.serviceTypes,
      recent_submissions: recentSubmissions
    },
    updated_at: new Date().toISOString()
  });
}

// ===== 유틸리티 함수들 =====

/**
 * Google Sheet 데이터 가져오기 (에러 처리 강화)
 */
function getSheetData() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) {
      console.error('시트를 찾을 수 없습니다:', SHEET_NAME);
      return null;
    }
    
    const data = sheet.getDataRange().getValues();
    return data;
  } catch (error) {
    console.error('getSheetData Error:', error);
    throw new Error('스프레드시트 데이터를 읽을 수 없습니다.');
  }
}

/**
 * 통계 계산 (중복 제거, 서비스 유형 분석 등)
 */
function calculateStats(data) {
  const headers = data[0];
  const emailIdx = headers.indexOf(COLUMNS.EMAIL);
  const approveIdx = headers.indexOf(COLUMNS.APPROVAL);
  const serviceTypeIdx = headers.indexOf(COLUMNS.SERVICE_TYPE);
  
  const emailMap = new Map(); // 이메일별 제출 횟수
  const serviceTypes = {};
  let approvedCount = 0;
  let totalCount = data.length - 1;
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    
    // 이메일 중복 체크
    const email = String(row[emailIdx] || '').trim().toLowerCase();
    if (email) {
      emailMap.set(email, (emailMap.get(email) || 0) + 1);
    }
    
    // 승인 체크
    if (isApproved(row[approveIdx])) {
      approvedCount++;
    }
    
    // 서비스 유형 집계
    const serviceType = row[serviceTypeIdx] || '미분류';
    serviceTypes[serviceType] = (serviceTypes[serviceType] || 0) + 1;
  }
  
  const uniqueEmails = emailMap.size;
  const duplicates = Array.from(emailMap.values()).filter(count => count > 1).length;
  
  return {
    total: totalCount,
    approved: approvedCount,
    pending: totalCount - approvedCount,
    uniqueEmails: uniqueEmails,
    duplicates: duplicates,
    approvedRatio: totalCount > 0 ? (approvedCount / totalCount) : 0,
    serviceTypes: serviceTypes
  };
}

/**
 * 최근 제출 목록 가져오기
 */
function getRecentSubmissions(data, limit = 5) {
  const headers = data[0];
  const timestampIdx = headers.indexOf(COLUMNS.TIMESTAMP);
  const emailIdx = headers.indexOf(COLUMNS.EMAIL);
  const serviceNameIdx = headers.indexOf(COLUMNS.SERVICE_NAME);
  const approveIdx = headers.indexOf(COLUMNS.APPROVAL);
  
  const submissions = [];
  
  // 최근 데이터부터 (역순)
  for (let i = Math.min(data.length - 1, data.length); i > Math.max(0, data.length - limit - 1); i--) {
    if (i < 1) break;
    const row = data[i];
    
    submissions.push({
      timestamp: row[timestampIdx] || '',
      email: row[emailIdx] || '',
      service_name: row[serviceNameIdx] || '',
      status: isApproved(row[approveIdx]) ? '승인' : '대기중'
    });
  }
  
  return submissions;
}

/**
 * 승인 여부 확인 (다양한 형식 지원)
 */
function isApproved(value) {
  if (!value) return false;
  
  const strValue = String(value).trim().toUpperCase();
  return (
    value === true || 
    strValue === 'TRUE' || 
    strValue === '승인' || 
    strValue === 'O' ||
    strValue === 'YES' ||
    strValue === 'Y' ||
    strValue === '1'
  );
}

/**
 * 캐시 관련 함수들
 */
function getCachedResponse(type) {
  try {
    const cache = CacheService.getScriptCache();
    const cached = cache.get(`response_${type}`);
    if (cached) {
      return ContentService
        .createTextOutput(cached)
        .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    console.warn('Cache read failed:', error);
  }
  return null;
}

function setCachedResponse(type, response) {
  try {
    const cache = CacheService.getScriptCache();
    cache.put(`response_${type}`, response.getContent(), CACHE_DURATION);
  } catch (error) {
    console.warn('Cache write failed:', error);
  }
}

/**
 * JSON 응답 생성 (CORS 헤더 포함)
 */
function createResponse(data, status = 200) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ===== 설치/관리 함수들 =====

/**
 * 승인 컬럼 자동 추가 (P열)
 */
function setupApprovalColumn() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    if (headers.indexOf(APPROVE_COL_NAME) === -1) {
      // P열 (16번째 열)에 승인 컬럼 추가
      const targetCol = 16;
      sheet.getRange(1, targetCol).setValue(APPROVE_COL_NAME);
      
      // 체크박스 형식으로 설정
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        const range = sheet.getRange(2, targetCol, lastRow - 1, 1);
        range.insertCheckboxes();
      }
      
      console.log(`'${APPROVE_COL_NAME}' 컬럼이 P열에 추가되었습니다.`);
      return true;
    } else {
      console.log(`'${APPROVE_COL_NAME}' 컬럼이 이미 존재합니다.`);
      return false;
    }
  } catch (error) {
    console.error('setupApprovalColumn Error:', error);
    return false;
  }
}

/**
 * 대량 승인 처리 (관리용)
 */
function approveByEmails(emailList) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    const emailIdx = headers.indexOf(COLUMNS.EMAIL);
    const approveIdx = headers.indexOf(COLUMNS.APPROVAL);
    
    if (emailIdx === -1 || approveIdx === -1) {
      console.error('필수 컬럼을 찾을 수 없습니다.');
      return false;
    }
    
    let approvedCount = 0;
    const emailSet = new Set(emailList.map(e => e.toLowerCase()));
    
    for (let i = 1; i < data.length; i++) {
      const email = String(data[i][emailIdx] || '').trim().toLowerCase();
      if (emailSet.has(email)) {
        sheet.getRange(i + 1, approveIdx + 1).setValue('승인');
        approvedCount++;
      }
    }
    
    console.log(`${approvedCount}개의 항목이 승인되었습니다.`);
    return approvedCount;
  } catch (error) {
    console.error('approveByEmails Error:', error);
    return 0;
  }
}

/**
 * 현재 설정 및 데이터 상태 확인
 */
function checkStatus() {
  try {
    console.log('=== MAU Challenge 참가자 관리 시스템 ===');
    console.log('Sheet ID:', SHEET_ID);
    console.log('Sheet Name:', SHEET_NAME);
    
    const data = getSheetData();
    if (!data) {
      console.error('데이터를 가져올 수 없습니다.');
      return;
    }
    
    const stats = calculateStats(data);
    console.log('\n=== 현재 상태 ===');
    console.log('총 제출:', stats.total);
    console.log('승인됨:', stats.approved);
    console.log('대기중:', stats.pending);
    console.log('고유 이메일:', stats.uniqueEmails);
    console.log('중복 제출:', stats.duplicates);
    console.log('승인율:', (stats.approvedRatio * 100).toFixed(1) + '%');
    
    console.log('\n=== 서비스 유형별 분포 ===');
    Object.entries(stats.serviceTypes).forEach(([type, count]) => {
      console.log(`${type}: ${count}건`);
    });
    
    return stats;
  } catch (error) {
    console.error('checkStatus Error:', error);
  }
}

/**
 * 테스트용 함수 - Apps Script 에디터에서 직접 실행
 */
function testDoGet() {
  // 가상의 이벤트 객체 생성
  const e = {
    parameter: {
      type: 'count'
    }
  };
  
  const result = doGet(e);
  const content = JSON.parse(result.getContent());
  
  console.log('=== API 테스트 결과 ===');
  console.log('응답:', content);
  console.log('승인된 참가자:', content.approved_count || content.count);
  console.log('총 제출:', content.total_submissions);
  console.log('고유 이메일:', content.unique_emails);
  
  return content;
}