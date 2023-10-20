import React from "react";
import TitleCard from "./TitleCard";

export default function About() {
  return (
    <div className="flex flex-col md:flex-row">
      <TitleCard title="About" bg="bg-primary" />
      <div className="flex-1 bg-bg min-h-screen">
        <div className="p-8 flex flex-col justify-center gap-8 h-full">
          <p>
            Highly skilled and versatile professional with proven expertise in
            designing, developing, and deploying robust pipelines and
            applications in collarboration with scientific staff and end-users.
          </p>
          <p>Designs UI and whiteboards ideas using Figma.</p>
          <p>
            Develops web applications using NextJS + Tailwind and Cypress for
            e2e testing.
          </p>
          <p>
            Deploys to Google Cloud Platform and OpenShift with continuous
            integration tools.
          </p>
          <p>
            Utilizes workload managers such as Slurm and Snakemake for the
            scaling of compute-intensive tasks.
          </p>
        </div>
      </div>
    </div>
  );
}
