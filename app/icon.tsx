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
          borderRadius: 112,
          background: "linear-gradient(145deg, #21142f 0%, #3b1d46 58%, #171329 100%)",
          color: "#fff4ed",
          fontFamily: "Arial, sans-serif",
          fontSize: 214,
          fontWeight: 800,
          letterSpacing: -18,
        }}
      >
        MT
      </div>
    ),
    { ...size },
  )
}
