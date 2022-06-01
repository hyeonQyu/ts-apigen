import { ReactNode } from 'react';

export interface MaskProps {
    children: ReactNode | ReactNode[];
    zIndex: number;
}

function Mask(props: MaskProps) {
    const { children, zIndex } = props;

    return (
        <>
            <div className={'mask-wrapper'}>
                <div className={'mask'} />
                {children}
            </div>

            <style jsx>{`
                .mask-wrapper {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    z-index: ${zIndex - 1};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .mask {
                    background-color: black;
                    opacity: 0.1;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                }
            `}</style>
        </>
    );
}

export default Mask;
