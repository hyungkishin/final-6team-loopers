export type Slide =
  | {
      kind: "cover";
      id: string;
      eyebrow: string;
      title: string;
      subtitle: string;
      tagline: string;
    }
  | {
      kind: "photo";
      id: string;
      image: ImgRef;
      caption: string;
      drip?: string;
      rotate?: number;
      sticker?: string;
      swapImage?: ImgRef;
      swapAfterMs?: number;
    }
  | {
      kind: "week";
      id: string;
      week: number;
      theme: string;
      title: string;
      summary: string;
      keywords: string[];
      takeaway: string;
      color: "pink" | "lime" | "sun" | "sky";
    }
  | {
      kind: "grid";
      id: string;
      title: string;
      subtitle?: string;
      items: { label: string; value: string; hint?: string }[];
    }
  | {
      kind: "members";
      id: string;
      title: string;
      subtitle: string;
      people: { name: string; role: string; image: ImgRef; blurb: string; rotate?: number }[];
    }
  | {
      kind: "banner";
      id: string;
      image: ImgRef;
      title: string;
      body: string;
    }
  | {
      kind: "quote";
      id: string;
      quote: string;
      cite: string;
      swapImage?: ImgRef;
      swapAfterMs?: number;
    }
  | {
      kind: "outro";
      id: string;
      title: string;
      body: string;
      signature: string;
    }
  | {
      kind: "chosen";
      id: string;
      title: string;
      subtitle?: string;
      heroes: { name: string; image: ImgRef; label?: string; accent: "gold" | "sky" | "pink" | "lime" }[];
    };

export type ImgRef = { src: string; w: number; h: number };

const I = {
  start: { src: "/images/오프라인 스터디를 처음가던날.png", w: 1179, h: 2556 },
  debate: { src: "/images/어김없이 토론의 날.jpeg", w: 786, h: 780 },
  zep: { src: "/images/모두가 모였 젭에서.jpeg", w: 442, h: 524 },
  cupbap: { src: "/images/다같이 오프라인 모임에서 컵밥.jpeg", w: 1080, h: 1440 },
  cupbapTaste: { src: "/images/컵밥 맛있더라.jpeg", w: 1080, h: 1440 },
  offlineDebate: { src: "/images/오프라인에서 다같이 열띤 토론.jpeg", w: 5712, h: 4284 },
  friendship: { src: "/images/우정 일방통행.jpeg", w: 160, h: 208 },
  assemble: { src: "/images/다 어디갔어 내밑으로 다모여.jpeg", w: 590, h: 718 },
  writing: { src: "/images/글쓰기가 얼마나 어려웠었냐면.png", w: 1548, h: 578 },
  missedHw: { src: "/images/과제 나도 안했는데 너도안했니.png", w: 500, h: 278 },
  seouckho: { src: "/images/류석호.jpeg", w: 1290, h: 2796 },
  jungho: { src: "/images/6팀의 얼굴천재 정호.png", w: 1290, h: 2796 },
  minju: { src: "/images/김민주.jpeg", w: 4032, h: 3024 },
  jihyung: { src: "/images/김지형.png", w: 1290, h: 2796 },
  sunghoon: { src: "/images/김성훈.jpeg", w: 1344, h: 88 },
  hyungki: { src: "/images/신형기.png", w: 1344, h: 88 },
  junsuck: { src: "/images/이준석.jpeg", w: 2344, h: 2288 },
  daegyum: { src: "/images/이대겸.jpeg", w: 1344, h: 88 },
  발표1: { src: "/images/발표 - 성훈님.png", w: 1344, h: 88 },
  anger: { src: "/images/엔젤 주선님 - 킹받을때.png", w: 1290, h: 2796 },
  holiday: { src: "/images/연휴에도 열심히 우리를 붙잡아 주던 엔젤.png", w: 1320, h: 1118 },
  healing: { src: "/images/멘토님의 힐링 페이퍼.png", w: 1290, h: 2796 },
  midNetwork: { src: "/images/중간 네트워크.jpeg", w: 1024, h: 1536 },
  listenToMe: { src: "/images/내말좀들어보라니까.jpeg", w: 1440, h: 1080 },
  wrapup: { src: "/images/마무리.jpeg", w: 4032, h: 3024 },
  writingFail: { src: "/images/글을 결국못씀.jpeg", w: 1548, h: 578 }, // TODO: 실제 이미지 넣고 크기 맞추기
  happiness: { src: "/images/행복하시길....png", w: 1672, h: 941 },
  ren: { src: "/images/렌.png", w: 1996, h: 1264 },
  ellen: { src: "/images/엘런.png", w: 1422, h: 1202 },
  devin: { src: "/images/데빈.png", w: 1368, h: 1336 },
  kev: { src: "/images/케브.png", w: 1428, h: 1210 },
  junghoTalk: { src: "/images/정호 발표.jpeg", w: 2340, h: 1348 },
  muchGrown: { src: "/images/많이 컸구나.png", w: 1484, h: 992 },
} satisfies Record<string, ImgRef>;

export const slides: Slide[] = [
  {
    kind: "cover",
    id: "cover",
    eyebrow: "Loopers BE L2 · Round 10",
    title: "10주, 우리 뭐했지?",
    subtitle: "6팀 회고발표",
    tagline: "테스트로 시작해서 배치로 끝났다. 10주 생각보다 길었음.",
  },
  {
    kind: "photo",
    id: "first-day",
    image: I.start,
    caption: "오프라인 스터디 처음 가던 날",
    drip: "단톡방에서만 알던 사람들을 그날 처음 실물로 봤다.",
    rotate: -2,
    sticker: "D-70",
  },
  {
    kind: "members",
    id: "team-1",
    title: "6팀이 누구냐면, (1/3)",
    subtitle: "그래도 끝까지 남은 사람들",
    people: [
        {
        name: "박정호",
        role: "6팀 비쥬얼 담당",
        image: I.jungho,
        blurb: "늘 새로워, 짜릿해, 매력적이야",
        rotate: -3,
      },
       {
        name: "신형기",
        role: "균형을 담당",
        image: I.hyungki,
        blurb: "연기파 개발자 - 개발도 연기일지도 ?",
        rotate: -1,
      },
       {
        name: "이준석",
        role: "돌다리도 두들기는 신중함 담당",
        image: I.junsuck,
        blurb: "케리건 - '카메라 각도 중요'",
        rotate: 2,
      },
    ],
  },
  {
    kind: "members",
    id: "team-2",
    title: "6팀이 누구냐면, (2/3)",
    subtitle: "그래도 끝까지 남은 사람들",
    people: [
      {
        name: "김민주",
        role: "조용하지만, 본질을 꿰뚫는 담당",
        image: I.minju,
        blurb: "자신만의 페이스로, 조화를 담당 - '전력질주' 중",
        rotate: 2,
      },
      {
        name: "김지형",
        role: "'가스라이팅' 담당",
        image: I.jihyung,
        blurb: "7연속 RT 그리고, 논리적으로 이해가 안가면 - 어디한번 반박해봐",
        rotate: -1,
      },
      {
        name: "김성훈",
        role: "황금막내 담당",
        image: I.sunghoon,
        blurb: "절찬리 구직중 + 발표왕",
        rotate: 2,
      },
     
    ],
  },
  {
    kind: "members",
    id: "team-3",
    title: "6팀이 누구냐면, (3/3)",
    subtitle: "그래도 끝까지 남은 사람들",
    people: [
     {
        name: "류석호",
        role: "답없는 토론을 할때면, 이놈 담당",
        image: I.seouckho,
        blurb: "'민초는 치약이 아닙니다'",
        rotate: -2,
      },
      {
        name: "이대겸",
        role: "새벽반 담당",
        image: I.daegyum,
        blurb: "가끔, 토큰이슈로 조기퇴근",
        rotate: -3,
      },
    ],
  },
  {
    kind: "grid",
    id: "journey",
    title: "10주 동안 뚫은 것들",
    subtitle: "이 중 절반은 조금더 '여러 시나리오'를 두고 사색하며 다시 풀고싶다.",
    items: [
      { label: "W1", value: "TDD", hint: "빨간불부터" },
      { label: "W2", value: "Software Design", hint: "좋은 구조란 뭘까" },
      { label: "W3", value: "Domain Modeling", hint: "이름 붙이기의 연속" },
      { label: "W4", value: "Transactional Op.", hint: "락·격리·멱등" },
      { label: "W5", value: "Read Optimization", hint: "읽기도 비싸다" },
      { label: "W6", value: "Failure-Ready", hint: "잘 터지는 연습" },
      { label: "W7", value: "Kafka", hint: "느슨하게 연결" },
      { label: "W8", value: "Queue", hint: "줄 세우기도 기능" },
      { label: "W9", value: "Ranking", hint: "언제의 순위냐" },
      { label: "W10", value: "Batch & MV", hint: "쌓고 집계하고" },
    ],
  },
  {
    kind: "week",
    id: "w1",
    week: 1,
    theme: "TDD",
    title: "테스트부터 짜라길래 짜봤다",
    summary: "기능 만들기 전에 실패하는 테스트부터 짰다. 빨간불 → 초록불 → 리팩터.",
    keywords: ["단위 vs 통합", "Mock/Stub/Fake", "Red-Green-Refactor", "테스트 가능한 구조"],
    takeaway: "테스트가 어려우면, 코드가 이상한 거였다.",
    color: "pink",
  },
  {
    kind: "photo",
    id: "zep",
    image: I.zep,
    caption: "젭에서 만나요",
    drip: "'제 소리 들리시나요' 가 이 스터디의 주제곡이었다.",
    rotate: -1.5,
    sticker: "ONLINE",
  },
  {
    kind: "week",
    id: "w2",
    week: 2,
    theme: "Software Design",
    title: "클래스 이름 하나에도 철학이 있다니",
    summary: "SOLID 외우는 게 아니었다. 바꾸기 무서울 때 꺼내 쓰는 부적이었다.",
    keywords: ["SRP", "의존 방향", "계층 분리", "응집도"],
    takeaway: "다음 사람이 덜 놀라면, 그게 좋은 코드다.",
    color: "sun",
  },
  {
    kind: "photo",
    id: "writing",
    image: I.writing,
    swapImage: I.writingFail,
    swapAfterMs: 5000,
    caption: "글쓰기가 얼마나 어려웠냐면요.",
    drip: "누가 글을 너무 잘 써서, 글쓰기 과제가 제일 부담스러웠다.",
    rotate: -1,
    sticker: "TL;DR ㅎㅎ",
  },
  {
    kind: "week",
    id: "w3",
    week: 3,
    theme: "Domain Modeling",
    title: "도메인이 말을 하게 만들어라",
    summary: "Order, Coupon, Like. 이름 붙이는 순간 규칙도 따라 붙는다.",
    keywords: ["Aggregate", "Invariant", "Value Object", "보편 언어"],
    takeaway: "엔티티가 스스로 못 지키는 규칙은 버그다.",
    color: "lime",
  },
  {
    kind: "week",
    id: "w4",
    week: 4,
    theme: "Transactional Operation",
    title: "@Transactional 뒤에 뭐가 있었냐면",
    summary: "재고 차감, 동시 주문, 결제 실패. 락과 멱등키를 이번에야 진지하게 만났다.",
    keywords: ["Isolation Level", "낙관/비관 락", "분산 락", "멱등 키"],
    takeaway: "동시성은 보통 터지고 나서 배운다. 이번엔 운 좋게 먼저 배웠다.",
    color: "sky",
  },
  {
    kind: "photo",
    id: "holiday-angel",
    image: I.holiday,
    caption: "연휴에도 우릴 붙잡아 준 엔젤",
    drip: "쉬는 날에도 버스터콜을 진행하셨다. 언제 쉬시는지는 끝까지 몰랐다.",
    rotate: -2,
    sticker: "연휴 X",
  },
  {
    kind: "photo",
    id: "debate-day",
    image: I.debate,
    caption: "어김없이, 토론의 날",
    drip: "멘토링 전과 후, '이해 되나요?' 에서 '정답에 가까운 방향'으로 토론했다.",
    rotate: 1.5,
    sticker: "토론",
  },
  {
    kind: "week",
    id: "w5",
    week: 5,
    theme: "Practical Read Optimization",
    title: "읽는 게 제일 비싸다, 진심으로",
    summary: "인덱스, 커버링, 캐시 키, 무효화. '빠르다' 한 단어가 이렇게 복잡할 줄이야.",
    keywords: ["Index 설계", "N+1", "캐시 전략", "Cache Invalidation"],
    takeaway: "캐시가 어려운 건 저장이 아니라 무효화.",
    color: "sun",
  },
  {
    kind: "photo",
    id: "offline-debate",
    image: I.offlineDebate,
    caption: "오프라인에서 다같이 열띤 토론",
    drip: "모르면 모른다고 하고, 아는 건 아는 만큼 서로가 채워줬다.",
    rotate: 1,
    sticker: "토론이 제일 맛있어.",
  },
  {
    kind: "week",
    id: "w6",
    week: 6,
    theme: "Failure-Ready",
    title: "안 터지는 서비스는 없더라",
    summary: "Timeout, Retry, Circuit Breaker, Fallback. 실패를 1급 시민으로 대접하기.",
    keywords: ["Timeout/Retry", "Circuit Breaker", "Bulkhead", "Graceful Degradation"],
    takeaway: "외부는 언젠가 실패한다. 내 쪽 문제처럼 다뤄야 한다.",
    color: "pink",
  },
  {
    kind: "photo",
    id: "mid-network",
    image: I.midNetwork,
    caption: "중간 네트워크",
    drip: "6주차 끝나고, 잠깐 숨 고르며 서로의 진도를 확인했다.",
    rotate: -1.5,
    sticker: "NETWORK",
  },
  {
    kind: "photo",
    id: "listen-to-me",
    image: I.listenToMe,
    caption: "내 말 좀 들어달라니까…",
    drip: "네트워크 한답시고 모였는데, 각자 할 말만 쏟아내는 중. 듣는 사람 없음.",
    rotate: 2.4,
    sticker: "제발",
  },
  {
    kind: "week",
    id: "w7",
    week: 7,
    theme: "Kafka & Events",
    title: "Hello Event, Welcome Kafka",
    summary: "강한 결합을 이벤트로 풀고, 재처리 가능한 구조로 넘어갔다.",
    keywords: ["Outbox", "Partition Key", "Consumer Group", "재처리"],
    takeaway: "느슨하게 연결해두면, 한쪽이 터져도 옆은 살아 있다.",
    color: "lime",
  },
  {
    kind: "photo",
    id: "jungho-talk",
    image: I.junghoTalk,
    caption: "정호님의 발표",
    drip: "7주차 끝, 정호님의 짜릿한 '가상 쓰레드' 지식을 공유주셨다. 발표 준비하시느라 고생 많으셨다.",
    rotate: 1.2,
    sticker: "★★★★★",
  },
  {
    kind: "photo",
    id: "mentor-healing",
    image: I.healing,
    caption: "멘토님들의 힐링 페이퍼",
    drip: "지적받을 줄 알고 들어갔다가, 위로받고 나왔다.",
    rotate: 2,
    sticker: "감사",
  },
  {
    kind: "photo",
    id: "homework",
    image: I.missedHw,
    caption: "아직 과제 못한 사람 ?",
    drip: "힐링 받고, 쉬는건 좋은데 페이스 조절 실패로 어느덧 목요일 밤이 되곤 했다.",
    rotate: 2,
    sticker: "연대 게으름",
  },
  {
    kind: "week",
    id: "w8",
    week: 8,
    theme: "Queueing",
    title: "줄 세우기도 엄연히 기능",
    summary: "대기열은 기능이 아니라 시스템이 숨 쉬는 구멍이었다.",
    keywords: ["Backpressure", "Token Bucket", "Redis Queue", "대기 UX"],
    takeaway: "'기다려 주세요' 도 설계의 일부다.",
    color: "sky",
  },
  {
    kind: "week",
    id: "w9",
    week: 9,
    theme: "Ranking",
    title: "실시간 랭킹, 말은 쉽지",
    summary: "Redis ZSet, 정합성, 갱신 주기. 랭킹은 '언제의 순위냐'부터 정해야 했다.",
    keywords: ["Sorted Set", "Tie-Breaker", "Near-Realtime", "만료"],
    takeaway: "실시간이라는 단어를 너무 쉽게 쓰고 있었다.",
    color: "pink",
  },
  {
    kind: "banner",
    id: "sunghoon",
    image: I.발표1,
    title: "발표 — 성훈님",
    body: "직접 운영하며 배운 걸 나눠 주셨다. 발표 준비하느라 고생 많으셨다.",
  },
  {
    kind: "week",
    id: "w10",
    week: 10,
    theme: "Batch · MV",
    title: "Collect, Stack, Zip",
    summary: "Spring Batch로 쌓고, MV로 집계하고, 랭킹 API에 연결했다.",
    keywords: ["Chunk Processing", "Materialized View", "주간/월간", "재처리"],
    takeaway: "대량은 한 번에 말고, 쪼개서.",
    color: "sun",
  },
  {
    kind: "photo",
    id: "cupbap",
    image: I.cupbap,
    swapImage: I.cupbapTaste,
    swapAfterMs: 5000,
    caption: "오프라인 모임 = 컵밥",
    drip: "메뉴 정하는 데 걸린 시간이 설계 회의보다 길었다. 근데 맛있더라.",
    rotate: 1.5,
    sticker: "CUPBAP ★★★★★",
  },
  {
    kind: "photo",
    id: "assemble",
    image: I.assemble,
    caption: "가끔씩 모두가 한마음 'ㅌㅌ'",
    drip: "'@everyone 님들?' 이제 추억이 되어버린 말. 다 어디갔어 내 밑으로 다 모여.",
    rotate: -2.5,
    sticker: "다 D 졌어",
  },
  {
    kind: "photo",
    id: "friendship",
    image: I.friendship,
    caption: "ㅋㅋ 가끔 애정은 '일방통행'",
    drip: "그래도 결국은 친해졌다.",
    rotate: 3,
    sticker: "'양방향'은 도저히 안되겠니",
  },
  {
    kind: "quote",
    id: "lesson",
    quote: "우리는 모두 루퍼스로 뛰어들은 선택받은 ㅇㅇ들이었다.",
    cite: "10주차 - 모두의 온도감",
    swapImage: I.muchGrown,
    swapAfterMs: 0,
  },
  {
    kind: "chosen",
    id: "chosen-ones",
    title: "ㅇㅇ들을 진화 시켜준 멘토님들",
    subtitle: "each of us, summoned",
    heroes: [
      { name: "렌", image: I.ren, label: "Ren", accent: "pink" },
      { name: "엘런", image: I.ellen, label: "Ellen", accent: "sky" },
      { name: "데빈", image: I.devin, label: "Devin", accent: "lime" },
      { name: "케브", image: I.kev, label: "Kev", accent: "gold" },
    ],
  },
  {
    kind: "outro",
    id: "thanks",
    title: "10주, 함께해서 고마웠습니다.",
    body: "1~7 팀분들 과 함께 많이 배웠고, 오프라인에서 술도 마시고, 가끔 막막한 과제도 있었지만. 그래도 여기까지 왔네요, '다음 스터디' 열어서 또 봬요 :) .",
    signature: "— 6팀 일동 드림",
  },
  {
    kind: "photo",
    id: "wrapup",
    image: I.wrapup,
    caption: "10주, 고생 많았어요.",
    drip: "마지막 날, 우리가 남긴 장면 하나. 고생한 얼굴들, 웃고 있는 얼굴들.",
    rotate: 1.5,
    sticker: "FIN",
  },
  {
    kind: "photo",
    id: "farewell",
    image: I.happiness,
    caption: "각자의 자리에서, 행복하시길.",
    drip: "오늘의 우리가 내일의 우리에게 보내는 인사. 또 만나요, 어느 라운드에서든.",
    rotate: -1,
    sticker: "♥ see you",
  },
];
