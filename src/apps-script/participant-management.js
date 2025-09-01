/**
 * VIBECODERS MAU Challenge - 참가자 관리 Apps Script
 * Google Sheet 기반 참가자 승인 시스템
 */

// ===== 설정 =====
const SHEET_ID = '1JQKQZXxHtueC3yBCNBEmlmRWTlmDZpQHnuV5ZjOwSik';        // Google Sheet ID
const SHEET_NAME = 'Form Responses 1';        // 폼 응답 시트명
const EMAIL_COL_NAME = 'Email Address';       // 이메일 컬럼명
const APPROVE_COL_NAME = '승인';               // 승인 컬럼명 (P열에 추가)

/**
 * 메인 GET 요청 핸들러
 * 쿼리 파라미터 'type'에 따라 다른 기능 실행
 */
function doGet(e) {
  try {
    const type = e.parameter.type || 'count';
    
    switch (type) {
      case 'count':
        return getApprovedCount();
      case 'stats':
        return getStats();
      case 'list':
        return getApprovedList();
      default:
        return createResponse({ error: 'Invalid type parameter' }, 400);
    }
  } catch (error) {
    console.error('doGet Error:', error);
    return createResponse({ error: error.toString() }, 500);
  }
}

/**
 * 1. 승인된 참가자 수만 반환 (기본 기능)
 * GET /exec 또는 GET /exec?type=count
 */
function getApprovedCount() {
  const data = getSheetData();
  const approvedCount = countApproved(data);
  
  return createResponse({
    count: approvedCount,
    total_submissions: data.length - 1,
    unique_emails: getUniqueEmails(data).size,
    approved_count: approvedCount,
    updated_at: new Date().toISOString()
  });
}

/**
 * 2. 전체 통계 반환
 * GET /exec?type=stats
 */
function getStats() {
  const data = getSheetData();
  const uniqueEmails = getUniqueEmails(data);
  const approvedCount = countApproved(data);
  const totalSubmissions = data.length - 1;
  
  return createResponse({
    total: totalSubmissions,
    unique_emails: uniqueEmails.size,
    approved: approvedCount,
    pending: totalSubmissions - approvedCount,
    approved_ratio: totalSubmissions > 0 ? (approvedCount / totalSubmissions) : 0,
    updated_at: new Date().toISOString()
  });
}

/**
 * 3. 승인된 참가자 명단 반환
 * GET /exec?type=list
 */
function getApprovedList() {
  const data = getSheetData();
  const headers = data[0];
  const emailIdx = headers.indexOf(EMAIL_COL_NAME);
  const approveIdx = headers.indexOf(APPROVE_COL_NAME);
  
  if (approveIdx === -1) {
    return createResponse({ error: '승인 컬럼을 찾을 수 없습니다.' }, 400);
  }
  
  const approvedList = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const isApproved = row[approveIdx] === true || row[approveIdx] === 'TRUE' || row[approveIdx] === '승인';
    
    if (isApproved) {
      const participant = {};
      headers.forEach((header, idx) => {
        if (header && row[idx] !== undefined) {
          participant[header] = row[idx];
        }
      });
      approvedList.push(participant);
    }
  }
  
  return createResponse({
    count: approvedList.length,
    participants: approvedList,
    updated_at: new Date().toISOString()
  });
}

/**
 * POST 요청 핸들러 (향후 승인/거절 기능용)
 */
function doPost(e) {
  try {
    // 보안을 위해 관리자 인증 필요
    // const authKey = e.parameter.auth_key;
    // if (!validateAdminAuth(authKey)) {
    //   return createResponse({ error: 'Unauthorized' }, 401);
    // }
    
    return createResponse({ error: 'POST functionality not implemented yet' }, 501);
  } catch (error) {
    console.error('doPost Error:', error);
    return createResponse({ error: error.toString() }, 500);
  }
}

// ===== 유틸리티 함수들 =====

/**
 * Google Sheet 데이터 가져오기
 */
function getSheetData() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  if (data.length < 2) {
    return [[]]; // 헤더만 있거나 데이터 없음
  }
  
  return data;
}

/**
 * 고유 이메일 집합 반환
 */
function getUniqueEmails(data) {
  const headers = data[0];
  const emailIdx = headers.indexOf(EMAIL_COL_NAME);
  const emails = new Set();
  
  if (emailIdx === -1) return emails;
  
  for (let i = 1; i < data.length; i++) {
    const email = String(data[i][emailIdx] || '').trim().toLowerCase();
    if (email) emails.add(email);
  }
  
  return emails;
}

/**
 * 승인된 참가자 수 카운트
 */
function countApproved(data) {
  const headers = data[0];
  const approveIdx = headers.indexOf(APPROVE_COL_NAME);
  
  if (approveIdx === -1) {
    console.warn('승인 컬럼을 찾을 수 없습니다. 컬럼명을 확인하세요:', APPROVE_COL_NAME);
    return 0;
  }
  
  let approvedCount = 0;
  
  for (let i = 1; i < data.length; i++) {
    const value = data[i][approveIdx];
    // TRUE, "TRUE", "승인" 등을 승인으로 처리
    if (value === true || value === 'TRUE' || value === '승인') {
      approvedCount++;
    }
  }
  
  return approvedCount;
}

/**
 * JSON 응답 생성 (CORS 헤더 포함)
 */
function createResponse(data, status = 200) {
  const output = ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  return output;
}

/**
 * 관리자 인증 (향후 구현용)
 */
function validateAdminAuth(authKey) {
  // 구현 예시:
  // const validKeys = PropertiesService.getScriptProperties().getProperty('ADMIN_KEYS');
  // return validKeys && validKeys.split(',').includes(authKey);
  return false; // 현재는 비활성화
}

// ===== 설치/설정 도우미 =====

/**
 * 시트에 승인 컬럼 추가 (한 번만 실행)
 * Apps Script 에디터에서 수동 실행
 */
function setupApprovalColumn() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    if (headers.indexOf(APPROVE_COL_NAME) === -1) {
      const nextCol = sheet.getLastColumn() + 1;
      sheet.getRange(1, nextCol).setValue(APPROVE_COL_NAME);
      console.log(`'${APPROVE_COL_NAME}' 컬럼이 ${nextCol}번째 열에 추가되었습니다.`);
    } else {
      console.log(`'${APPROVE_COL_NAME}' 컬럼이 이미 존재합니다.`);
    }
  } catch (error) {
    console.error('setupApprovalColumn Error:', error);
  }
}

/**
 * 현재 설정 확인 (디버깅용)
 * Apps Script 에디터에서 수동 실행
 */
function checkConfiguration() {
  try {
    console.log('=== 현재 설정 ===');
    console.log('SHEET_ID:', SHEET_ID);
    console.log('SHEET_NAME:', SHEET_NAME);
    console.log('EMAIL_COL_NAME:', EMAIL_COL_NAME);
    console.log('APPROVE_COL_NAME:', APPROVE_COL_NAME);
    
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    console.log('=== 시트 헤더 ===');
    headers.forEach((header, index) => {
      console.log(`${index + 1}: ${header}`);
    });
    
    const emailIdx = headers.indexOf(EMAIL_COL_NAME);
    const approveIdx = headers.indexOf(APPROVE_COL_NAME);
    
    console.log('=== 컬럼 인덱스 ===');
    console.log('이메일 컬럼 위치:', emailIdx + 1, emailIdx === -1 ? '(찾을 수 없음)' : '');
    console.log('승인 컬럼 위치:', approveIdx + 1, approveIdx === -1 ? '(찾을 수 없음)' : '');
    
  } catch (error) {
    console.error('checkConfiguration Error:', error);
  }
}