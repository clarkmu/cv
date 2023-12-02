import React from "react";
import Zoom from "react-medium-image-zoom";

import TitleCard from "./TitleCard";
import PortfolioCard from "./PortfolioCard";

const ZoomImg = ({ src, alt, className = "" }) => (
  <Zoom>
    <img src={src} alt={alt} className={`w-full ${className}`} loading="lazy" />
  </Zoom>
);

const cards = [
  {
    title: "Primer ID",
    body: "An NIH-funded sequencing platform.",
    backgroundImage: "/primer-id.webp",
    content: (
      <>
        <p>
          A free and open platform that allows researchers from all over the
          world to process Next Generation Sequencing data. This application was
          created in conjunction with the GitHub/ViralSeq/viral_seq pipelines.
        </p>
        <p>
          I managed this platform from start to finish. Designed using UNC's
          color palette. Developed using Next.js + Tailwind CSS. Deployed to
          Google App Engine. Processing happens on the on-campus cluster server.
        </p>
        <ZoomImg alt="Primer ID Interface" src="/primer-id-interface.webp" />
        <p>
          Complex parameters can be set to configure processing in the UI. Users
          then upload files which can be multiple gigabytes in size using a
          resumable upload to a protected GCP bucket.
        </p>
        <ZoomImg
          alt="Flowchart for Primer-ID project"
          src="/phylo-flowchart.webp"
        />
        <p>
          Files and parameters are then collected by a cron job on the on-campus
          cluster server and inserted into a workload manager queue (Slurm) to
          await an environment in which a proper amount of memory and processing
          power are available.
        </p>
        <p>
          A Docker setup process is available to replicate this workflow on
          one's computer to develop and update these procedures.
        </p>
        <p>
          <a
            href="https://primer-id.org"
            className="underline cursor-pointer"
            target="_BLANK"
            rel="noreferrer"
          >
            Website
          </a>
        </p>
        <p>
          <a
            href="https://github.com/clarkmu/primer-id"
            className="underline cursor-pointer"
            target="_BLANK"
            rel="noreferrer"
          >
            Code Repository
          </a>
        </p>
      </>
    ),
  },
  {
    title: "Epitope Analysis Tool",
    body: "A grant proposal prototype.",
    backgroundImage: "/epitope-bg.webp",
    content: (
      <>
        <p>
          I created this prototype application to visually assist a grant
          application. An epidemiologist wants to create an interdisciplinary
          tool between immunologists and virologists.
        </p>
        <p>
          The initial phase can be seen below. We have viral antibody
          information that is useful for epidemologists to visually compare. A
          page was needed to filter available patients and their sequences.
        </p>
        <ZoomImg src="/epitope-whiteboard.webp" alt="Epitopes Whiteboard" />
        <p>
          A solid understanding of the data structure was laid out before
          development began.
        </p>
        <ZoomImg src="/epitopes-ERD.svg" alt="Epitopic App ERD" />
        <p>
          At this early conceptual stage, many typical components of a web
          application can be foregone to balance cost and time for projects that
          may or may not get funded. Omitting a database and static hosting
          helped reduce cost and turnaround time for this prototype.
        </p>
        <ZoomImg src="/epitope-interface.webp" alt="Epitopes Interface" />
        <p>
          <a
            href="https://viralseq.github.io/epitopes/"
            className="underline cursor-pointer"
            target="_BLANK"
            rel="noreferrer"
          >
            Website
          </a>
        </p>
        <p>
          <a
            href="https://github.com/clarkmu/epitopes"
            className="underline cursor-pointer"
            target="_BLANK"
            rel="noreferrer"
          >
            Code Repository
          </a>
        </p>
      </>
    ),
  },
  {
    title: "Outgrowth Virus Dating",
    body: "Collaborative work to continue research.",
    backgroundImage: "/ogv-bg.webp",
    content: (
      <>
        <p>
          This useful pipeline (GitHub/veg/ogv-dating) sat stagnant and hard to
          use for researchers. Details were missing such as specific library
          versions and unnoted I/O details. I pooled together all of the CLI
          requirements into an easy to use interface.
        </p>
        <ZoomImg alt="OGV Whiteboard" src="/ogv-whiteboard.webp" />
        <p>
          This worklow was integrated into Primer ID processing on the on-campus
          cluster server for its intensive computational requirements.
        </p>
        <p>
          Collaboration with the creator was neccesarry to fine-tune the
          requirements we had for this pipeline. Team effort spanned across 3
          universities on a range of &plusmn;8 timezones.
        </p>
        <p>
          <a
            href="https://primer-id.org/ogv"
            className="underline cursor-pointer"
            target="_BLANK"
            rel="noreferrer"
          >
            Website
          </a>
        </p>
        <p>
          <a
            href="https://github.com/clarkmu/ogv-dating"
            className="underline cursor-pointer"
            target="_BLANK"
            rel="noreferrer"
          >
            Code Repository*
          </a>
        </p>
        <p className="!text-sm">
          *This process has since been merged into the Primer-ID platform
        </p>
      </>
    ),
  },
  {
    title: "notesy.app",
    body: "A note taking app with a gorgeous interface using Next.js + Tailwind",
    backgroundImage: "/notesy-background.webp",
    content: (
      <>
        <p>
          I set out on a mission to fine-tune my UI-design and Figma skills.
          Over a few weeks I created a note taking app, borrowing heavily from
          current platform designs and features.
        </p>
        <ZoomImg alt="Notesy Figma Design" src="/notesy-figma.webp" />
        <p>
          I focused on a simple, easy-to-use interface. A dropdown menu is a
          great way to offer lots of functionality but keep the page clean and
          simple.
        </p>
        <div>
          Additional points of development includes:
          <ol className="ml-4 list-disc">
            <li>DraftJS saved to MongoDB to retain notes</li>
            <li>Websockets for shared editing</li>
            <li>React useContext and custom hooks</li>
            <li>List virtualization</li>
            <li>Deployed to GCP App Engine</li>
          </ol>
        </div>
        <p></p>
        <p>
          App can be found at{" "}
          <a
            href="https://www.notesy.app/"
            target="_BLANK"
            rel="noreferrer"
            className="underline cursor-pointer"
          >
            notesy.app
          </a>
        </p>
        <div>
          <ZoomImg
            alt="Promo Graphic"
            className="notesy-promo"
            src="/notesy-promo.jpg"
          />
        </div>
      </>
    ),
  },
  {
    title: "Visual Effects",
    body: "Making a scene with Three.js",
    backgroundImage: "/gravity-effect.gif",
    content: (
      <>
        <p>
          I enjoy creating visual effects to retain my foundational math skills.
        </p>
        <p>
          The intro effect of this page is modeled after a phylogenetic tree
          being animated on an HTML canvas. I wanted the tree to be centered
          around my name in the middle of the page, so I used polar coordinates
          to work outward and layer more branches. The mostly finished version
          of this can be found at{" "}
          <a
            href="https://codesandbox.io/s/clever-christian-w2pwtc?file=/src/App.tsx"
            className="underline cursor-pointer"
            target="_BLANK"
            rel="noreferrer"
          >
            this code sand box
          </a>
        </p>
        <p>
          This 2D "gravity" simulation is a remnant from an Android Live
          Wallpaper I created many years ago. I translated it from Java to
          Javascript and used the D3 data visualization library. View the code
          for this background gravity effect on{" "}
          <a
            href="https://codesandbox.io/s/three-js-2d-gravity-effect-96cu7?file=/src/App.js"
            className="underline cursor-pointer"
            target="_BLANK"
            rel="noreferrer"
          >
            code sandbox
          </a>
          . I created an article about it over at{" "}
          <a
            href="https://observablehq.com/@clarkmu/2d-gravity"
            className="underline cursor-pointer"
            target="_BLANK"
            rel="noreferrer"
          >
            Observable
          </a>{" "}
          along with a few other items from the live wallpaper.
        </p>
      </>
    ),
  },
  {
    title: "react-zoom-scroll-effect",
    body: "An NPM package to make scrolling more dynamic.",
    backgroundImage: "/zoom-scroll-background.webp",
    content: (
      <>
        <p>
          I noticed this behavior out in the wild and found that there were no
          packages or css utilities that take advantage of scrolling. So I took
          3 days to make this really fun React component into an NPM package.
        </p>
        <p>
          There are a few variations, parameters, and uses for this package so
          this was a prime candidate for StoryBook testing.
        </p>
        <p>
          I used Rollout to minify and package, as is common with NPM package
          development.
        </p>
        <p>
          The package and documentation can be found{" "}
          <a
            href="https://www.npmjs.com/package/react-scroll-zoom-effect"
            target="_BLANK"
            rel="noreferrer"
          >
            here
          </a>
          .
        </p>
      </>
    ),
  },
  // {
  //   title: "Sheet Music Creator",
  //   body: "An interface for creating custom sheet music.",
  //   backgroundImage: "music-background",
  //   content: (
  //     <>
  //       <p>
  //         I collaborated with a team that creates a custom format of sheet music
  //         intended for beginner students. They wanted to expand their efforts in
  //         creating this sheet music and sought to automate and digitize the
  //         process.
  //       </p>
  //       <p>
  //         The only technical requirement from the client was that it had to be
  //         installable on his workers laptops. Along with the other
  //         specifications of this project, it turned out to be a great fit for a
  //         Progressive Web App.
  //       </p>
  //       <video className="mini-video" controls>
  //         <source src={musicVideo} type="video/mp4" />
  //         Your browser does not support the video tag.
  //       </video>
  //       <small>
  //         Main feature of application: a drag-and-drop interface for creating
  //         the custom sheet music
  //       </small>
  //       <p>
  //         My background with music helped to hit the ground running with this
  //         team. I attended two years at MuziekSchool Roeselare, a music school
  //         in Belgium for students of all ages, and ages ago I could converse
  //         about music in English, Dutch, and French.
  //       </p>
  //       <p>
  //         This application is not public, given the proprietary nature of this
  //         format of sheet music.
  //       </p>
  //     </>
  //   ),
  // },
  // {
  //   title: "cannabis-calendar.com",
  //   body: "A crop management SPA with static sharing pages.",
  //   backgroundImage: "canna-background",
  //   content: (
  //     <>
  //       <p>
  //         This is a personal project that taught me a lot in areas of
  //         development in which I would not normally be involved such as
  //         marketing and graphic design.
  //       </p>
  //       <p>
  //         I created promotional images for app store listings. I created the
  //         logo using Procreate.
  //       </p>
  //       <p>
  //         Google Analytics was used to view engagement and help direct continued
  //         development on the platform.
  //       </p>
  //       <p>
  //         App can be found{" "}
  //         <a
  //           href="https://www.cannabis-calendar.com"
  //           target="_BLANK"
  //           rel="noreferrer"
  //         >
  //           here
  //         </a>
  //         .
  //       </p>
  //     </>
  //   ),
  // },
  {
    title: "Cited Publications",
    body: "Research publications related to the projects above that I have co-authored.",
    backgroundColor: "rgb(110, 155, 160)",
    content: (
      <ol className="ml-4 text-base gap-4 flex flex-col">
        <li>
          Zhou S, Hill CS, <b>Clark MU</b>, Sheahan TP, Baric R, Swanstrom R.
          <br />
          <u>
            Primer ID Next-Generation Sequencing for the Analysis of a Broad
            Spectrum Antiviral Induced Transition Mutations and Errors Rates in
            a Coronavirus Genome.
          </u>{" "}
          Bio Protoc. 2021 Mar 5;11(5):e3938. doi: 10.21769/BioProtoc.3938.
          eCollection 2021 Mar 5.
          <br />
          PMID: 33796612
        </li>
        <li>
          Zhou S, Sizemore S, Moeser M, Zimmerman S, Samoff E, Mobley V, Frost
          S, Cressman A, <b>Clark M</b>, Skelly T, Kelkar H, Veluvolu U, Jones
          C, Eron J, Cohen M, Nelson JAE, Swanstrom R, Dennis AM.
          <br />
          <u>
            Near Real-Time Identification of Recent Human Immunodeficiency Virus
            Transmissions, Transmitted Drug Resistance Mutations, and
            Transmission Networks by Multiplexed Primer ID-Next-Generation
            Sequencing in North Carolina.
          </u>{" "}
          J Infect Dis. 2021 Mar 3;223(5):876-884. doi: 10.1093/infdis/jiaa417.
          <br />
          PMID: 32663847
        </li>
        <li>
          Shuntai Zhou, Collin S. Hill, Ean Spielvogel, <b>Michael U. Clark</b>,
          Michael G. Hudgens, Ronald Swanstrom
          <br />
          <u>
            Unique Molecular Identifiers and Multiplexing Amplicons Maximize the
            Utility of Deep Sequencing To Critically Assess Population Diversity
            in RNA Viruses.
          </u>{" "}
          ACS Infectious Diseases Article ASAP. DOI: 10.1021/acsinfecdis.2c00319
          <br />
          PMID: 36326446
        </li>
      </ol>
    ),
  },
];

export default function Portfolio() {
  return (
    <div className="flex flex-col md:flex-row">
      <TitleCard title="Portfolio" bg="bg-secondary" />
      <div className="flex-1">
        {cards.map(({ title, content, ...portfolio }, i) => (
          <PortfolioCard
            key={title}
            title={title}
            {...portfolio}
            isLastCard={i === cards.length - 1}
          >
            {content}
          </PortfolioCard>
        ))}
      </div>
    </div>
  );
}
