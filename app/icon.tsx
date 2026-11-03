import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid rgb(107, 169, 249)",
        }}
      >
        <span
          style={{
            color: "rgb(107, 169, 249)",
            fontSize: 40,
            fontWeight: 900,
            letterSpacing: 1,
            fontFamily: "serif",
          }}
        >
          LS
        </span>
      </div>
    ),
    { ...size }
  );
}
