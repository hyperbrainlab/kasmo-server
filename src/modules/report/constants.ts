export enum ReportType {
  OFFENSIVE_LANGUAGE = 'OFFENSIVE_LANGUAGE', // 욕설, 비방, 차별, 혐오, 괴롭힘
  PROMOTION = 'PROMOTION', // 홍보, 영리 목적
  ILLEGAL_INFORMATION = 'ILLEGAL_INFORMATION', // 불법 정보
  PORNOGRAPHY = 'PORNOGRAPHY', // 음란, 청소년 유해
  PERSONAL_INFORMATION = 'PERSONAL_INFORMATION', // 개인 정보 노출, 유포, 거래
  SPAM = 'SPAM', // 도배, 스팸
  OTHER = 'OTHER', // 기타
}

export enum Status {
  PENDING = 'PENDING',
  PROCESSED = 'PROCESSED',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',
}
