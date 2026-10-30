import { ImageResponse } from "next/og"

export const size = {
  width: 512,
  height: 512,
}

export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #21142f 0%, #3b1d46 55%, #171329 100%)",
          borderRadius: 112,
        }}
      >
        <svg width="390" height="390" viewBox="0 0 64 64">
          <defs>
            <linearGradient id="fur" x1="8" y1="8" x2="56" y2="58" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#ffd5c2" />
              <stop offset="0.52" stopColor="#ff9c9f" />
              <stop offset="1" stopColor="#d58cff" />
            </linearGradient>
          </defs>
          <path
            d="M11 27 L14 7 L29 17 Q32 15 35 17 L50 7 L53 28 Q59 35 56 45 Q52 59 32 59 Q12 59 8 45 Q5 35 11 27Z"
            fill="url(#fur)"
          />
          <path d="M18 35 Q22 31 26 35" fill="none" stroke="#38213e" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M38 35 Q42 31 46 35" fill="none" stroke="#38213e" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M29 42 Q32 45 35 42 Q32 49 29 42Z" fill="#38213e" />
          <path d="M32 47 Q29 51 25 48 M32 47 Q35 51 39 48" fill="none" stroke="#38213e" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M15 42 L7 40 M15 46 L8 48 M49 42 L57 40 M49 46 L56 48" fill="none" stroke="#38213e" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          <path d="M17 14 L25 20 M47 14 L39 20" stroke="#fff0eb" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
        </svg>
      </div>
    ),
    { ...size },
  )
}
