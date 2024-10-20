import React from "react";
import { hardhat } from "viem/chains";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

/**
 * Site footer
 */
export const Footer = () => {
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  return (
    <div className="min-h-0 pt-7 px-1 pb-11 lg:mb-0 bg-blue-500/50">
      <div>
        <div className="fixed flex justify-between items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none">
          {/* <div className="flex flex-col md:flex-row gap-2 pointer-events-auto">
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <img src="/path/to/twitter-logo.svg" alt="Twitter" className="h-6 w-6" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <img src="/path/to/github-logo.svg" alt="GitHub" className="h-6 w-6" />
            </a>
          </div> */}
          <SwitchTheme className={`pointer-events-auto ${isLocalNetwork ? "self-end md:self-auto" : ""}`} />
        </div>
      </div>
      <div className="w-full">
        {/* <ul className="menu menu-horizontal w-full">
          <div className="flex justify-center items-center gap-2 text-sm w-full">
            <div className="text-center">
              <a href="https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA" target="_blank" rel="noreferrer" className="link">
                Support
              </a>
            </div>
          </div>
        </ul> */}
      </div>
    </div>
  );
};
