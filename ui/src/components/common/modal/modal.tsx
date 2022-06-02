import Portal from '@components/common/portal/portal';
import { ReactNode } from 'react';
import Mask from '@components/common/mask/mask';
import { zIndex } from '@defines/zIndex';

export interface ModalProps {
    width?: number;
    height?: number;
    children: ReactNode;
    isOpened?: boolean;
}

function Modal(props: ModalProps) {
    const { width, height, children, isOpened } = props;

    return (
        <>
            <Portal>
                {isOpened && (
                    <Mask zIndex={zIndex.mask}>
                        <div className={'modal'}>{children}</div>
                    </Mask>
                )}
            </Portal>

            <style jsx>{`
                @keyframes appear {
                    0% {
                        opacity: 0;
                        margin-top: 50px;
                    }
                    100% {
                        opacity: 1;
                        margin-top: 0;
                    }
                }

                .modal {
                    ${width ? `width: ${width}px;` : ''}
                    ${height ? `height: ${height}px;` : ''}
                    z-index: ${zIndex.mask};
                    background-color: white;
                    border-radius: 20px;
                    animation: appear 0.4 ease;
                }
            `}</style>
        </>
    );
}

export default Modal;
