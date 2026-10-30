import { ImageResponse } from "next/og"

export const size = { width: 512, height: 512 }
export const contentType = "image/png"

const profileImage = "https://raw.githubusercontent.com/MadhuTiwari-345/MadhuTiwari-345/main/girl-coder.png"

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 112,
        overflow: "hidden",
        background: "#21142f",
        border: "10px solid #ff8a70",
      }}>
        <img src={profileImage} width="492" height="492" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    ),
    { ...size },
  )
}
