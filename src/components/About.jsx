import React from "react";
import TitleCard from "./TitleCard";

export default function About() {
  return (
    <div className="flex flex-col md:flex-row">
      <TitleCard title="About" bg="bg-primary" showSocial={false} />
      <div className="flex-1 bg-bg min-h-screen">
        <div className="p-8 flex flex-col justify-center gap-8 h-full">
          <p>
            Highly skilled and versatile Full Stack Web Developer with proven
            expertise in designing, developing, and deploying robust
            applications and pipelines in collarboration with scientific staff.
          </p>
          <p>Wireframes UI and whiteboards ideas using Figma.</p>
          <p>
            Develops web applications using whatever tools are neccessary for
            the job. Most procicient with NextJS + Tailwind for rapid web
            development and Cypress for e2e testing.
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
