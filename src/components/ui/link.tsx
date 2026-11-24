import { Link as RouterLink, type LinkProps } from "react-router-dom";
import { forwardRef, type AnchorHTMLAttributes } from "react";

type NextLikeLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  Partial<Pick<LinkProps, "to" | "replace" | "state">> & {
    href?: string;
  };

/**
 * Compat shim: accepts next/link's `href` API while delegating to React Router.
 */
export const Link = forwardRef<HTMLAnchorElement, NextLikeLinkProps>(
  ({ href, to, replace, state, ...rest }, ref) => {
    const target = to ?? href ?? "/";
    if (typeof target === "string" && /^https?:\/\//.test(target)) {
      return (
        <a
          ref={ref}
          href={target}
          target="_blank"
          rel="noreferrer noopener"
          {...rest}
        />
      );
    }
    return <RouterLink ref={ref} to={target} replace={replace} state={state} {...rest} />;
  }
);
Link.displayName = "Link";

export default Link;