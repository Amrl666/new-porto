import { cookies } from "next/headers";
import { client } from "@/sanity/lib/client";
import {
  getExperienceInformation,
  getAllTechnologies,
  getUserInfo,
  getHomeProjects,
} from "@/sanity/lib/queries";

import IntroOverlay from "@/components/shared/intro-overlay";
import Masthead from "@/components/shared/masthead";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import FrontPage from "@/components/home/front-page";
import Evidence from "@/components/home/evidence";
import LabReport from "@/components/home/lab-report";
import CareerLedger from "@/components/home/career-ledger";
import Letters from "@/components/home/letters";

// Dynamic rendering: always serve a single, consistent HTML + RSC
// snapshot (no ISR cache), so a stale cached page can never mismatch
// the fresh client tree during hydration. Also makes Sanity edits
// appear instantly instead of after the old 60s revalidation.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [userInfo, experience, projects, technologies] = await Promise.all([
    client.fetch(getUserInfo).catch(() => null),
    client.fetch(getExperienceInformation).catch(() => []),
    client.fetch(getHomeProjects).catch(() => []),
    client.fetch(getAllTechnologies).catch(() => []),
  ]);

  // The intro plays once per browser session, exactly like the reference
  // (roberttran.com.au): `IntroOverlay` sets a session cookie when the
  // intro finishes or is skipped, so a refresh never replays it. It's
  // read server-side so returning visitors get no intro markup at all
  // (no flash) and the page's reveal animations start immediately.
  const cookieStore = await cookies();
  const introSeen = cookieStore.get("rt_intro_seen")?.value === "1";

  return (
    <>
      {!introSeen && <IntroOverlay />}
      <Masthead />
      <Navbar />

      <main>
        <FrontPage userInfo={userInfo ?? null} />
        <hr className="border-0 border-t-4 border-ink" />
        <Evidence projects={projects ?? []} />
        <LabReport technologies={technologies ?? []} />
        <CareerLedger experience={experience ?? []} />
        <Letters />
      </main>

      <Footer />
    </>
  );
}
