import React, { useRef, useState } from "react";
import Zoom from "react-medium-image-zoom";

import TitleCard from "./TitleCard";
import PortfolioCard from "./PortfolioCard";

const PortfolioCategories = {
  FULLSTACK: "Fullstack",
  FRONTEND: "Frontend",
  BACKEND: "Backend",
};

const IFrame = ({ src, alt }) => (
  <>
    <iframe
      src={`${src}#toolbar=0&navpanes=0&allowfullscreen=true&scrolling=yes`}
      className="min-h-[50vh] border-4 border-black cursor-help focus:cursor-default"
      title={alt}
    />
    <small>{alt}</small>
  </>
);

const ZoomImg = ({ src, alt, className = "" }) => (
  <>
    <Zoom>
      <img
        src={src}
        alt={alt}
        className={`w-full shadow rounded border-gray-400 ${className}`}
        loading="lazy"
        title={alt}
      />
    </Zoom>
    <small>{alt}</small>
  </>
);

const PortfolioAnchor = ({ href, text }) => (
  <a
    href={href}
    rel="noreferrer"
    target="_blank"
    className="underline cursor-pointer hover:text-blue-300 transition-all"
  >
    {text || href}
  </a>
);

const Code = ({ text }) => (
  <code className="bg-gray-200 text-[#333] m-1 p-1 text-base">{text}</code>
);

const cards = [
  /* FULLSTACK */
  {
    title: "Primer ID",
    body: "An NIH-funded sequencing platform.",
    backgroundImage: "/primer-id.webp",
    category: PortfolioCategories.FULLSTACK,
    content: (
      <>
        <p>
          A free and open-source platform that allows researchers from all over
          the world to process Next Generation Sequencing data for drug
          resistance, sequence alignment, and outgrowth dating. This platform
          was created in conjunction with the pipelines found at
          <Code text="GitHub/ViralSeq/viral_seq" /> and{" "}
          <Code text="GitHub/veg/ogv-dating" />.
        </p>
        <p>
          This platform consists of two main infrastructure components, a web
          application for users to create a pipeline submission and a capable
          backend server for running the compute-intensive pipelines.
        </p>
        <ZoomImg
          alt="Primer ID infrastructure diagram."
          src="/tcs-flowchart.webp"
        />
        <p>
          Parameters are created in the web app and stored to a database.
          Sequence files are uploaded to a private GCP bucket using a resumable
          signed url. A cron job on the cluster server pings the app API
          checking for submissiosn that are ready to initialize into the
          workload manager queue (Slurm) to await an environment in which a
          proper amount of memory and processing power are available to run
          through the pipeline. Once submissions have been processed, results
          are stored in the bucket and a link is emailed to the user for viewing
          and downloading.
        </p>
        <ZoomImg
          alt="Step 1/5 of configuring each sequence primer."
          src="/primer-id-interface.webp"
        />
        <p>
          Complex parameters can be set to configure processing in the UI. I
          created a visually appealing way for users that have to go through
          this form up to 4 times or more per submission. In the research world,
          we very frequently use verification steps for users to check their
          work for precision at each step.
        </p>
        <p>
          A Docker setup process is available to replicate this workflow on
          one's own computer for replication studies and continued research.
        </p>
        <p>
          I used UNC's color palette throughout the theme and developed using
          Next.js + Tailwind CSS.
        </p>
        <p>
          <PortfolioAnchor href="https://primer-id.org" text="Website" />
        </p>
        <p>
          <PortfolioAnchor
            href="https://github.com/clarkmu/primer-id"
            text="Code Repository"
          />
        </p>
      </>
    ),
  },
  {
    title: "Phylodynamics",
    body: "Representing HIV statistics for North Carolina.",
    backgroundImage: "/phylo-background.webp",
    category: PortfolioCategories.FULLSTACK,
    content: (
      <>
        <p>
          This platform aids in the processesing of HIV sequences from all
          tested cases in North Carolina. Both new and existing cases are
          tracked, creating a phylogeny network. The platform automates many
          steps of a process that were previously done manually by personell,
          durastically reducing turnaround times for getting results to where
          they are needed.
        </p>
        <IFrame
          src="/phylo-specimen.pdf"
          alt="The input is a sample of a virus and this is the output we generate
          for every patient (no PHI in document)."
        />
        <p>
          Server processes watch for new data to process. After processing,
          viewable records are created of each specimen. These records are sent
          to the web application where they are accessible via a searchable data
          table. Personnel then mark each processed specimen as successful,
          failed, or sent for a repeat sampling. Successful data is forwarded to
          a RedMine database (managed by others) in the network to be recoupled
          to PHI.
        </p>
        <p>
          After the handoff of data, a team at the UNC School of Medicine pools
          and distributes findings. Findings include sharing outbreak hotspots
          with the Department of Health and Human Services so that they can ramp
          up public prevention as well as providing the CDC with official case
          numbers for the state.
        </p>
        <small>*Website is access protected and repo is private.</small>
      </>
    ),
  },
  {
    title: "Epitope Analysis Tool",
    body: "A grant proposal prototype.",
    backgroundImage: "/epitope-bg.webp",
    category: PortfolioCategories.FULLSTACK,
    content: (
      <>
        <p>
          I created this prototype application to visually assist someone's
          grant application. An epidemiologist wants to create an
          interdisciplinary analysis tool between immunologists and virologists.
        </p>
        <p>
          The whiteboard of the initial concept can be seen below. We have viral
          antibody information that is useful for epidemologists to visually
          compare. A page was needed to filter available patients and their
          sequences.
        </p>
        <ZoomImg
          src="/epitope-whiteboard.webp"
          alt="Whiteboarding the main components of the application UI."
        />
        <p>A solid structure was defined before development began:</p>
        <ZoomImg
          src="/epitopes-ERD.svg"
          alt="Clearly defining stored application data."
        />
        <p>
          At this early conceptual stage, many typical components of a web
          application can be foregone to balance cost and time for projects that
          may or may not get funded. Omitting a database and static hosting
          helped reduce cost and turnaround time for this prototype.
        </p>
        <ZoomImg
          src="/epitope-interface.webp"
          alt="The developed UI for this grant proposal to seek funding for continued research and development."
        />
        <p>
          <PortfolioAnchor
            href="https://viralseq.github.io/epitopes/"
            text="Website"
          />
        </p>
        <p>
          <PortfolioAnchor
            href="https://github.com/clarkmu/epitopes"
            text="Code Repository"
          />
        </p>
      </>
    ),
  },
  {
    title: "Cited Publications",
    body: "Research publications related to the projects above that I have co-authored.",
    backgroundColor: "rgb(110, 155, 160)",
    category: PortfolioCategories.FULLSTACK,
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
          <br />
          <PortfolioAnchor href="https://pubmed.ncbi.nlm.nih.gov/33796612/" />
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
          <br />
          <PortfolioAnchor href="https://pubmed.ncbi.nlm.nih.gov/32663847/" />
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
          <br />
          <PortfolioAnchor href="https://pubmed.ncbi.nlm.nih.gov/36326446/" />
        </li>
        <li>
          Shuntai Zhou, Nathan Long, Matt Moeser, Collin S Hill, Erika Samoff,
          Victoria Mobley, Simon Frost, Cara Bayer, Elizabeth Kelly, Annalea
          Greifinger, Scott Shone, William Glover, <b>Michael Clark</b>, Joseph
          Eron, Myron Cohen, Ronald Swanstrom, Ann M Dennis
          <br />
          <u>
            Use of Next Generation Sequencing in a State-Wide Strategy of HIV-1
            Surveillance: Impact of the SARS-CoV-2 Pandemic on HIV-1 Diagnosis
            and Transmission
          </u>{" "}
          J Infect Dis. 2023 Jun 7 DOI: 10.1093/infdis/jiad211
          <br />
          PMID: 37283544
          <br />
          <PortfolioAnchor href="https://pubmed.ncbi.nlm.nih.gov/37283544/" />
        </li>
      </ol>
    ),
  },
  /*  FRONTEND */
  {
    title: "Effects + Data Visualization",
    body: "Making a scene with graphical frameworks.",
    backgroundImage: "/gravity-effect.gif",
    category: PortfolioCategories.FRONTEND,
    content: (
      <>
        <p>
          Creating visual effects helps me retain my foundational math skills. I
          have created a few articles at{" "}
          <PortfolioAnchor
            href="https://observablehq.com/@clarkmu"
            text="Observable"
          />{" "}
          outlining some of the better visuals I have created, mostly items from
          my old Android Live Wallpaper.
        </p>
        <p>
          My latest example of data visualization is adding an output file to a
          sequencing pipeline where I use HTML + Google Charts to display the
          output in graphs and charts.
        </p>
        <IFrame
          src="https://storage.googleapis.com/tcs-dr-public/log.html"
          alt="Viral sequences displayed as drug restistance mutations and their
          recency."
        />
      </>
    ),
  },
  {
    title: "notesy.app",
    body: "A note taking app with a gorgeous interface using Next.js + Tailwind.",
    backgroundImage: "/notesy-background.webp",
    category: PortfolioCategories.FRONTEND,
    content: (
      <>
        <p>
          I set out on a mission to fine-tune my UI-design and Figma skills.
          Over just a few weeks I created a note taking app, borrowing the best
          ideas from current writing platform designs and features.
        </p>
        <ZoomImg
          alt="Using Figma to design an application before starting development."
          src="/notesy-figma.webp"
        />
        <p>
          I focused on a simple, easy-to-use interface. I created a marketing
          page which outlines the application and its features. The onboarding
          process is smooth and simple. I jam-packed the FAQ page with SEO-rich
          content.
        </p>
        <ZoomImg
          src="notesy-interface.webp"
          alt="Notesy interface consisting of collections, notes, and tags."
        />
        <div>
          Development consisted of many of the latest advanced features
          including:
          <ol className="ml-8 list-disc">
            <li>Lighthouse scores considered (performance at 100)</li>
            <li>Customized DraftJS saved to MongoDB to retain notes</li>
            <li>Websockets for shared editing</li>
            <li>React useReducer and custom hooks</li>
            <li>List virtualization</li>
            <li>NextAuth authentication</li>
            <li>Installable as a Progressive Web App</li>
          </ol>
        </div>
        <p></p>
        <p>
          App can be found at{" "}
          <PortfolioAnchor href="https://www.notesy.app/" text="notesy.app" />
        </p>
        <ZoomImg
          alt="The Notesy promo graphic used on app stores."
          src="/notesy-promo.webp"
        />
      </>
    ),
  },
  {
    title: "react-zoom-scroll-effect",
    body: "An NPM package to make scrolling more dynamic.",
    backgroundImage: "/with_linear_gradient.gif",
    category: PortfolioCategories.FRONTEND,
    content: (
      <>
        <p>
          I noticed this behavior out in the wild and found that there were no
          packages or css utilities that take advantage of scrolling. So I took
          3 days to make this really fun React component into an NPM package.
        </p>
        <p>
          There are a few variations, parameters, and uses for this visual
          feature so this was a prime candidate for StoryBook testing.
        </p>
        <p>
          I used Rollout to minify and package, as it appeared to be the
          tried-and-true option for NPM deployment.
        </p>
        <p>
          The package and documentation can be found{" "}
          <PortfolioAnchor
            href="https://www.npmjs.com/package/react-scroll-zoom-effect"
            text="here"
          />
          .
        </p>
      </>
    ),
  },
  {
    title: "Sheet Music Creator",
    body: "An interface for creating custom sheet music.",
    backgroundImage: "/music-app_bak.webp",
    category: PortfolioCategories.FRONTEND,
    content: (
      <>
        <p>
          A platform to create a custom format of sheet music intended for
          students with a focus on learning disabled students. I freelanced with
          a non-technical team that wanted to expand their efforts in creating
          this sheet music and sought to automate and digitize the process.
        </p>
        <ZoomImg src="pianotab-concept.webp" alt="The PianoTab Concept" />
        <p>
          The main technical requirement from the client was that it had to be
          installable on the workers laptops. Along with the other
          specifications of this project, it turned out to be a great fit for a
          Progressive Web App.
        </p>
        <video className="mini-video" controls>
          <source src="/music-app-video.mov" type="video/mp4" />
          <track src="" srcLang="en" kind="captions" label="unneccessary" />
          Your browser does not support the video tag.
        </video>
        <small>
          Main feature of application: a drag-and-drop interface for creating
          the custom sheet music.
        </small>
        <p>
          Development consisted of a React frontend with heavy usage of the NPM
          drag-and-drop package <Code text="react-dnd" /> to edit tabs. Tab
          objects stored in a MongoDB collection. Completed tabs were converted
          to PDF and saved to a storage bucket for user viewing.
        </p>
        <p>
          My background with music helped to hit the ground running with this
          team. In my adult years I attended two years at MuziekSchool
          Roeselare, a music school in Belgium for students of all ages, where I
          learned to converse about music in English, Dutch, and French.
        </p>
        <small>*Website is access protected and repo is private.</small>
      </>
    ),
  },
  // {
  //   title: "cannabis-calendar.com",
  //   body: "A crop management app that uses all the Next.js features.",
  //   backgroundImage: "/canna-app.webp",
  //   category: PortfolioCategories.FRONTEND,
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
  //         <PortfolioAnchor
  //           href="https://www.cannabis-calendar.com"
  //           text="here"
  //         />
  //         .
  //       </p>
  //     </>
  //   ),
  // },
  /* BACKEND */
  {
    title: "CaaS",
    body: "My Kubernetes environments.",
    backgroundColor: "#BF0A30",
    category: PortfolioCategories.BACKEND,
    content: (
      <>
        <p>
          Many of my projects are containerized and documented for easy research
          replication. This also makes it easier to manage deployment into a
          Kubernetes cluster. I usually start with a template as diagrammed
          below.
        </p>
        <ZoomImg
          src="/k8s.webp"
          alt="My K8s template when starting a new platform."
        />
        <p>
          I started using OpenShift in version 1 before there was a higher level
          developer view so I learned all of the administrator details related
          to building an image, deploying a pod, and registering readiness
          probes and health checks.
        </p>
        <p>
          And what kind of developer would I be if I didn't automate backups of
          all my databases to a storage volume.
        </p>
      </>
    ),
  },
  {
    title: "High Performance Computing",
    body: "Cluster server experience.",
    backgroundColor: "white",
    category: PortfolioCategories.BACKEND,
    content: (
      <>
        <p>
          Working with researchers means cutting edge ideas requiring intense
          computational power.
        </p>
        <p>
          In one process that I have automated, users can upload 20+ files per
          batch with each file being measured in gigabytes. Each file needs a
          list of memory-intensive string operations performed on it. Running
          these processes in sequence would further delay receiving results.
          After ensuring these computations are parallelable, I queue them up
          with a workload manager to execute.
        </p>
        <p>
          These operations would clog up a normal server depending on its
          performance capabilities. For less intense computations, this would be
          ideal for serverless nodes (AWS lambdas).
        </p>
        <p>
          Server usage requires crystal clear communication with IT department
          to retain security regarding permissions, installations, and data I/O.
        </p>
      </>
    ),
  },
  {
    title: "Cloud",
    body: "Using Google Cloud Platform and Amazon Web Services.",
    backgroundColor: "#002868",
    category: PortfolioCategories.BACKEND,
    content: (
      <>
        <p>
          Many of the latest web &amp; bioinformatics cloud tools would be
          applicable to my projects needs, though UNC has a comparable IT
          hardware infrastructure. Keeping a budget in mind, we prefer on-campus
          hardware until projects reach a certain threshold of computation and
          usage.
        </p>
        <p>
          My university is best integrated with Google Cloud Platform. I
          participated in a work event where the IT department went to Google's
          Chapel Hill headquarters to receive five days of training - we learned
          procedures like spinning up a compute engine and using signed URL's to
          read/write in a private bucket, tasks that I still frequently use.
        </p>
      </>
    ),
  },
];

export default function Portfolio({ location }) {
  const [category, setCategory] = useState(() => {
    let p = false;

    try {
      const url = new URL(location.href);
      const p = url.searchParams.get("portfolio");
    } catch (e) {
      console.log("Failed to get location");
    }

    return p &&
      Object.keys(PortfolioCategories)
        .map((k, v) => k)
        .includes(p)
      ? PortfolioCategories[p]
      : PortfolioCategories.FULLSTACK;
  });

  const containerRef = useRef(null);

  const handleCategoryChange = (c) => {
    setCategory(c);
    containerRef.current.scrollIntoView({ behavior: "smooth" });

    // save category to url, use url for default category State
    // thisurl.com/?category=Frontend
  };

  const Buttons = () => (
    <div className="flex gap-2">
      {Object.keys(PortfolioCategories).map((t, i) => {
        const tt = PortfolioCategories[t];
        const isActive = tt === category;

        return (
          <div
            key={`portfolio_category_${i}`}
            onClick={() => handleCategoryChange(tt)}
            onKeyDown={() => handleCategoryChange(tt)}
            className={
              "text-lg font-bold px-2 rounded hover:shadow-lg hover:shadow-bg cursor-pointer transition-all " +
              (isActive ? "bg-bg opacity-1" : "bg-primary opacity-75")
            }
            role="button"
            tabIndex={i + 1}
          >
            {tt}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row" ref={containerRef}>
      <TitleCard
        title="Portfolio"
        bg="bg-secondary"
        extra={Buttons}
        showSocial={false}
      />
      <div className="flex-1">
        {cards.map(({ title, content, ...portfolio }, i) => (
          <PortfolioCard
            key={title}
            title={title}
            {...portfolio}
            isLastCard={
              i === cards.filter((c) => c.category === category).length - 1
            }
            isActive={portfolio.category === category}
          >
            {content}
          </PortfolioCard>
        ))}
      </div>
    </div>
  );
}
