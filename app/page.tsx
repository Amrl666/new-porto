import { client } from "@/sanity/lib/client";
import {
  getExperienceInformation,
  getAllTechnologies,
  getUserInfo,
  getHomeProjects,
} from "@/sanity/lib/queries";

import Masthead from "@/components/shared/masthead";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import FrontPage from "@/components/home/front-page";
import Evidence from "@/components/home/evidence";
import LabReport from "@/components/home/lab-report";
import CareerLedger from "@/components/home/career-ledger";
import Letters from "@/components/home/letters";

export const revalidate = 60;

export default async function Home() {
  const [userInfo, experience, projects, technologies] = await Promise.all([
    client.fetch(getUserInfo).catch(() => null),
    client.fetch(getExperienceInformation).catch(() => []),
    client.fetch(getHomeProjects).catch(() => []),
    client.fetch(getAllTechnologies).catch(() => []),
  ]);

  return (
    <>
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
