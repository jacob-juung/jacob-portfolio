import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Jacob - Venture Capitalist";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage: "radial-gradient(circle at 25% 25%, #1a1a1a 0%, transparent 50%), radial-gradient(circle at 75% 75%, #1a1a1a 0%, transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 120,
              height: 120,
              borderRadius: 24,
              backgroundColor: "#fafafa",
              marginBottom: 40,
            }}
          >
            <span
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: "#0a0a0a",
              }}
            >
              J
            </span>
          </div>
          <span
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#fafafa",
              marginBottom: 16,
            }}
          >
            Jacob
          </span>
          <span
            style={{
              fontSize: 32,
              color: "#a3a3a3",
              marginBottom: 24,
            }}
          >
            Venture Capitalist
          </span>
          <span
            style={{
              fontSize: 24,
              color: "#737373",
              textAlign: "center",
              maxWidth: 600,
            }}
          >
            Gaming × AI Investment
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
