import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="ko">
      <body className="font-sans antialiased bg-[#ffffff] dark:bg-[#0a0a0a] text-[#171717] dark:text-[#fafafa]">
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
          <div className="text-center max-w-md">
            <h1 className="text-8xl font-bold mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-4">페이지를 찾을 수 없습니다</h2>
            <p className="text-[#525252] dark:text-[#a3a3a3] mb-8">
              요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            </p>
            <Link
              href="/ko"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#171717] dark:bg-[#fafafa] text-[#ffffff] dark:text-[#0a0a0a] font-medium transition-opacity hover:opacity-90"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
