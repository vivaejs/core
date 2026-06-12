import type { Plugin } from "../index";

export function serve(options?: {
  directory?: string;
  autoEncoding?: boolean;
  runtime?: "node" | "serverless" | "deno" | "bun";
  headers?: {
    [fileExtension: string]: {
      [header: string]: string;
    };
  };
}): Plugin;

export function logging(): Plugin;
