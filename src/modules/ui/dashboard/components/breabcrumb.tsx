"use client";

import React from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

import { HomeIcon } from "@/components/icons";

export const Breadcrumb = () => {
  const pathname = usePathname();

  const paths: string[] = pathname
    .split("/")
    .filter((path) => path && path.toLowerCase() !== "overviews") || [];

  const isMainPage = pathname === "/overviews";

  return (
    <div className="flex items-center text-sm h-full gap-2">
      {!isMainPage && (
        <Button 
          asChild
          size="sm"
          variant="ghost"
          className="font-normal"
        >
          <Link href="/overviews">
            <HomeIcon className="size-4 text-primary" />
            Home
          </Link>
        </Button>
      )}
      {paths.length > 0 && <span className="mx-0.5 text-secondary">/</span>}
      {paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join("/")}`;
        
        return (
          <React.Fragment key={index}>
            <Button 
              asChild
              size="sm"
              variant="ghost"
              className="font-normal capitalize"
              >
              <Link href={href}>{path}</Link>
            </Button>
            {paths.length !== index + 1 && <span className="mx-0.5 text-secondary">/</span>}
          </React.Fragment>
        );
      })}
    </div>
  );
}