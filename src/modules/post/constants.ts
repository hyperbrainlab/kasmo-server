export enum Categories {
  JOB_LISTINGS = 'job_listings', // 구인구직
  USED_GOODS = 'used_goods', // 중고거래
  REAL_ESTATE = 'real_estate', // 부동산
  BUSINESS_DIRECTORY = 'business_directory', // 업소록
  PICKUP_MOVING = 'pickup_moving', // 픽업/이사
  CHAT = 'chat', // 속닥속닥
  QNA = 'qna', // 질문방
  MEETINGS = 'meetings', // 모임
  CURRENCY_EXCHANGE = 'currency_exchange', // 환전
  BUSINESS_MEETINGS = 'business_meetings', // 업소모임
}

export enum JobListingsSubCategories {
  EMPLOYER = 'employer', // 구인
  JOB_SEEKER = 'job_seeker', // 구직
}

export enum UsedGoodsSubCategories {
  SELL = 'sell', // 판매
  BUY = 'buy', // 구매
}

export enum RealEstateSubCategories {
  RENT = 'rent', // 렌트
  SALE = 'sale', // 매매/전매
}

export enum BusinessDirectorySubCategories {
  RELIGION = 'religion', // 종교
  MEDIA = 'media', // 언론기관
  HOSPITAL = 'hospital', // 병원
  RESTAURANT = 'restaurant', // 음식점
  GROCERY_STORE = 'grocery_store', // 식품점
  OPTICAL_STORE = 'optical_store', // 안경점
  BANK = 'bank', // 은행
  REAL_ESTATE = 'real_estate', // 부동산
  ACCOUNTING = 'accounting', // 회계
  TRAVEL_AGENCY = 'travel_agency', // 여행사
  INSURANCE = 'insurance', // 보험
  IMMIGRATION_STUDY_ABROAD = 'immigration_study_abroad', // 이민/유학
  CONSTRUCTION = 'construction', // 건축
  FLOWER_SHOP = 'flower_shop', // 꽃집
  LAWYER = 'lawyer', // 변호사
  BEAUTY = 'beauty', // 미용
  PHARMACY = 'pharmacy', // 약국
  PHOTOGRAPHY = 'photography', // 사진
  MORTGAGE = 'mortgage', // 모기지
  OTHER = 'other', // 기타
}

export enum PickupMovingSubCategories {
  PICKUP_DRIVE = 'pickup_drive', // 픽업/운전
  MOVING = 'moving', // 이사
}

export enum MeetingsSubCategories {
  TOGETHER = 'together', // 함께해요
  GO_TOGETHER = 'go_together', // 같이가요
}

export enum CurrencyExchangeSubCategories {
  CAD_TO_WON = 'cad_to_won', // CAD to Won
  WON_TO_CAD = 'won_to_cad', // Won to CAD
}

export enum BusinessMeetingsSubCategories {
  ADVERTISEMENT = 'advertisement', // 교민광고
  DISCOUNT_EVENT = 'discount_event', // 할인 이벤트
}

export enum SortBy {
  LATEST = 'latest', // 최신순
  POPULAR = 'popular', // 인기순
}

export enum SubCategories {
  // Job Listings
  EMPLOYER = 'employer', // 구인
  JOB_SEEKER = 'job_seeker', // 구직
  // Used Goods
  SELL = 'sell', // 판매
  BUY = 'buy', // 구매
  // Real Estate
  RENT = 'rent', // 렌트
  SALE = 'sale', // 매매/전매
  // Business Directory
  RELIGION = 'religion', // 종교
  MEDIA = 'media', // 언론기관
  HOSPITAL = 'hospital', // 병원
  RESTAURANT = 'restaurant', // 음식점
  GROCERY_STORE = 'grocery_store', // 식품점
  OPTICAL_STORE = 'optical_store', // 안경점
  BANK = 'bank', // 은행
  REAL_ESTATE = 'real_estate', // 부동산
  ACCOUNTING = 'accounting', // 회계
  TRAVEL_AGENCY = 'travel_agency', // 여행사
  INSURANCE = 'insurance', // 보험
  IMMIGRATION_STUDY_ABROAD = 'immigration_study_abroad', // 이민/유학
  CONSTRUCTION = 'construction', // 건축
  FLOWER_SHOP = 'flower_shop', // 꽃집
  LAWYER = 'lawyer', // 변호사
  BEAUTY = 'beauty', // 미용
  PHARMACY = 'pharmacy', // 약국
  PHOTOGRAPHY = 'photography', // 사진
  MORTGAGE = 'mortgage', // 모기지
  OTHER = 'other', // 기타
  // Pickup/Moving
  PICKUP_DRIVE = 'pickup_drive', // 픽업/운전
  MOVING = 'moving', // 이사
  // Meetings
  TOGETHER = 'together', // 함께해요
  GO_TOGETHER = 'go_together', // 같이가요
  // Currency Exchange
  CAD_TO_WON = 'cad_to_won', // CAD to Won
  WON_TO_CAD = 'won_to_cad', // Won to CAD
  // Business Meetings
  ADVERTISEMENT = 'advertisement', // 교민광고
  DISCOUNT_EVENT = 'discount_event', // 할인 이벤트
}
