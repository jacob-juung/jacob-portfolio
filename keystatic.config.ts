import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  singletons: {
    // ── Hero Section ──
    hero: singleton({
      label: "Hero Section",
      path: "src/content/hero",
      format: { data: "json" },
      schema: {
        eyebrow: fields.text({ label: "Eyebrow (상단 소제목)" }),
        name: fields.text({ label: "이름" }),
        title: fields.text({ label: "타이틀" }),
        tagline: fields.text({ label: "태그라인", multiline: true }),
        ctaContactLabel: fields.text({ label: "CTA 버튼 - 연락하기" }),
        ctaResumeLabel: fields.text({ label: "CTA 버튼 - 이력서" }),
      },
    }),
    // ── About Section ──
    about: singleton({
      label: "About (소개)",
      path: "src/content/about",
      format: { data: "json" },
      schema: {
        name: fields.text({ label: "이름" }),
        role: fields.text({ label: "역할" }),
        bio: fields.text({ label: "자기소개", multiline: true }),
        profileImage: fields.image({
          label: "프로필 사진",
          directory: "public/images",
          publicPath: "/images",
        }),
        stats: fields.array(
          fields.object({
            label: fields.text({ label: "라벨 (예: 년 경력)" }),
            value: fields.text({ label: "값 (예: 8+)" }),
          }),
          {
            label: "통계",
            itemLabel: (props) =>
              `${props.fields.value.value} ${props.fields.label.value}`,
          }
        ),
        skills: fields.array(
          fields.object({
            category: fields.text({ label: "카테고리명" }),
            items: fields.array(fields.text({ label: "스킬" }), {
              label: "스킬 목록",
              itemLabel: (props) => props.value || "스킬",
            }),
          }),
          {
            label: "스킬 그룹",
            itemLabel: (props) => props.fields.category.value || "카테고리",
          }
        ),
        journeyTitle: fields.text({ label: "여정 섹션 제목" }),
        journeyParagraphs: fields.array(
          fields.text({ label: "문단", multiline: true }),
          {
            label: "여정 내용 (문단별)",
            itemLabel: (props) =>
              props.value ? props.value.substring(0, 40) + "..." : "문단",
          }
        ),
        contactEmail: fields.text({ label: "이메일 주소" }),
        socialLinks: fields.array(
          fields.object({
            label: fields.text({ label: "이름 (예: LinkedIn)" }),
            url: fields.url({ label: "URL" }),
          }),
          {
            label: "소셜 링크",
            itemLabel: (props) => props.fields.label.value || "링크",
          }
        ),
      },
    }),
  },
  collections: {
    // ── Experience ──
    experiences: collection({
      label: "경력 (Experience)",
      slugField: "company",
      path: "src/content/experiences/*/",
      format: { data: "json" },
      schema: {
        company: fields.slug({ name: { label: "회사명" } }),
        role: fields.text({ label: "직책" }),
        periodStart: fields.text({ label: "시작일 (예: 2023.03)" }),
        periodEnd: fields.text({
          label: "종료일 (비워두면 '현재')",
          defaultValue: "",
        }),
        description: fields.text({ label: "설명", multiline: true }),
        skills: fields.array(fields.text({ label: "스킬" }), {
          label: "스킬 태그",
          itemLabel: (props) => props.value || "스킬",
        }),
        highlights: fields.array(fields.text({ label: "성과" }), {
          label: "주요 성과",
          itemLabel: (props) => props.value || "성과",
        }),
        sortOrder: fields.integer({
          label: "정렬 순서 (낮을수록 위에 표시)",
          defaultValue: 0,
        }),
      },
    }),
    // ── Projects ──
    projects: collection({
      label: "프로젝트 (Projects)",
      slugField: "title",
      path: "src/content/projects/*/",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "프로젝트명" } }),
        description: fields.text({ label: "설명", multiline: true }),
        category: fields.select({
          label: "카테고리",
          options: [
            { label: "투자 (Investment)", value: "investment" },
            { label: "프로덕트 (Product)", value: "product" },
            { label: "개발 (Development)", value: "development" },
            { label: "자문 (Advisory)", value: "advisory" },
          ],
          defaultValue: "investment",
        }),
        year: fields.text({ label: "연도" }),
        status: fields.select({
          label: "상태",
          options: [
            { label: "진행중 (Active)", value: "active" },
            { label: "엑싯 (Exited)", value: "exited" },
            { label: "완료 (Completed)", value: "completed" },
          ],
          defaultValue: "active",
        }),
        tags: fields.array(fields.text({ label: "태그" }), {
          label: "태그",
          itemLabel: (props) => props.value || "태그",
        }),
        link: fields.url({ label: "외부 링크 (선택)" }),
        image: fields.image({
          label: "프로젝트 이미지 (선택)",
          directory: "public/images/projects",
          publicPath: "/images/projects",
        }),
        highlights: fields.array(fields.text({ label: "성과" }), {
          label: "주요 성과",
          itemLabel: (props) => props.value || "성과",
        }),
        sortOrder: fields.integer({
          label: "정렬 순서 (낮을수록 위에 표시)",
          defaultValue: 0,
        }),
      },
    }),
    // ── Blog Posts ──
    posts: collection({
      label: "블로그 (Blog Posts)",
      slugField: "title",
      path: "src/content/posts/*/",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "제목" } }),
        description: fields.text({ label: "설명", multiline: true }),
        date: fields.date({ label: "날짜" }),
        tags: fields.array(fields.text({ label: "태그" }), {
          label: "태그",
          itemLabel: (props) => props.value || "태그",
        }),
        published: fields.checkbox({
          label: "공개 여부",
          defaultValue: true,
        }),
        content: fields.markdoc({
          label: "본문",
        }),
      },
    }),
  },
});
