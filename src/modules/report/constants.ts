export enum ReportType {
  OFFENSIVE_LANGUAGE = 'offensive_language', // 욕설, 비방, 차별, 혐오, 괴롭힘
  PROMOTION = 'promotion', // 홍보, 영리 목적
  ILLEGAL_INFORMATION = 'illegal_information', // 불법 정보
  PORNOGRAPHY = 'pornography', // 음란, 청소년 유해
  PERSONAL_INFORMATION = 'personal_information', // 개인 정보 노출, 유포, 거래
  SPAM = 'spam', // 도배, 스팸
  OTHER = 'other', // 기타
}

export enum Status {
  PENDING = 'pending',
  PROCESSED = 'processed',
  REJECTED = 'rejected',
  APPROVED = 'approved',
}
