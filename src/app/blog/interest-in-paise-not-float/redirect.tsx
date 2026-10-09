"use client";
import { useEffect } from "react";

/**
 * The actual redirect, because the metadata cannot carry one.
 *
 * Next's `other` emits `<meta name="refresh">`, and a browser only acts on `http-equiv="refresh"` —
 * so the metadata route produces a tag that looks right and does nothing. The app router gives a
 * page no way to write an `http-equiv` into the head, so the redirect happens here instead.
 *
 * `replace`, not `assign`: the dead URL should not sit in the back button between the reader and
 * the page they wanted.
 */
export function RedirectTo({ href }: { href: string }) {
  useEffect(() => {
    window.location.replace(href);
  }, [href]);
  return null;
}
