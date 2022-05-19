import { HTMLAttributes } from 'react';

export interface ShorteningProps extends HTMLAttributes<any> {
    children: string;
    title?: string;
}

function Shortening(props: ShorteningProps) {
    const { title, children, ...rest } = props;

    return (
        <>
            <p title={title ?? children} {...rest}>
                {children}
            </p>

            <style jsx>{`
                p {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    margin: 0;
                }
            `}</style>
        </>
    );
}

export default Shortening;
