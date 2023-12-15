import React from "react";
import TitleCard from "./TitleCard";

const Me = () => (
  <img
    src="/me.webp"
    className="w-[200px] h-[200px] lg:w-[150px] lg:h-[150px] rounded-full"
    alt="Me."
    title="That's me!"
  />
);

export default function About() {
  return (
    <div className="flex flex-col md:flex-row">
      <TitleCard title="About" bg="bg-primary" showSocial={false} extra={Me} />
      <div className="flex-1 bg-bg min-h-screen">
        <div className="p-8 flex flex-col justify-center gap-8 h-full">
          <p>
            Highly skilled and versatile Full Stack Web Developer with proven
            expertise in designing, developing, and deploying robust
            applications and processes in collaboration with non-technical
            personnel.
          </p>
          <p>Wireframes, UI, and whiteboards ideas using Figma.</p>
          <p>
            Develops web applications with up-to-date frameworks and
            technologies. Most frequently uses NextJS + Tailwind for rapid web
            development.
          </p>
          <p>
            Deploys applications to Google Cloud Platform and
            OpenShift/Kubernetes.
          </p>
          <p>
            Integrates workload managers such as Slurm and Snakemake for
            compute-intensive tasks.
          </p>
        </div>
      </div>
    </div>
  );
}
