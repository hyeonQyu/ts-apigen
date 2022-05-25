import { ReactNode } from 'react';

export interface LabelContainerProps {
    message: string;
    isShowMessage: boolean;
    children: ReactNode[];
}

function LabelContainer(props: LabelContainerProps) {
    const { isShowMessage, message, children } = props;

    return (
        <>
            {isShowMessage && <p className={'message'}>{message}</p>}
            <div className={'container'}>{children}</div>

            <style jsx>{`
                .message {
                    line-height: 1.5;
                }

                .container {
                    display: flex;
                    flex-wrap: wrap;
                }
            `}</style>
        </>
    );
}

export default LabelContainer;
