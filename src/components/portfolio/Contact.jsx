import React from "react";

import TitleCard from "./TitleCard";
import SocialIcons from "./SocialIcons";
import Button from "./Button";

export default function Contact() {
  return (
    <div className="flex flex-col md:flex-row">
      <TitleCard title="Contact" bg="bg-primary" showSocial={false} />
      <div className="flex-1 bg-bg">
        <div className="flex flex-col h-screen">
          <div className="flex-1 p-8 flex flex-col gap-8 m-8">
            <p className="font-bold">
              I am always seeking new opportunities to leverage these skills and
              contribute to cutting-edge projects that require thinking outside
              of the box.
            </p>
            <p>Please feel free to reach out at any of the links provided,</p>
            <p>
              Yours professionally,
              <br />
              Michael Clark
            </p>
            <div className="flex justify-center mt-8">
              <a href="/resume.pdf" download="Resume clarkmu.com.pdf">
                <Button>Download Resume</Button>
              </a>
            </div>
          </div>
          <div className="flex-0 mb-8 flex items-center justify-center">
            <SocialIcons noPadding={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
