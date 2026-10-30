import type { Metadata } from "next"
import { RecruiterView } from "@/components/portfolio/recruiter-view"

export const metadata: Metadata = {
  title: "Madhu Tiwari | Professional Profile",
  description: "Professional profile, selected projects, experience and technical skills of Madhu Tiwari.",
}

export default function RecruiterPage() {
  return <RecruiterView />
}
