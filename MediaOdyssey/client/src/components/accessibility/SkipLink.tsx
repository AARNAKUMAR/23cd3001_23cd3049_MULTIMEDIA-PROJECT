interface SkipLinkProps {
    href: string;
    children: React.ReactNode;
}

export default function SkipLink({ href, children }: SkipLinkProps) {
    return (
        <a
            href={href}
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-bright-cyan focus:text-white focus:rounded-md focus:font-semibold"
        >
            {children}
        </a>
    );
}
