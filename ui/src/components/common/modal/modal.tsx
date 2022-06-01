import Portal from '@components/common/portal/portal';
import { ReactNode } from 'react';
import Mask from '@components/common/mask/mask';
import { zIndex } from '@defines/zIndex';

export interface ModalProps {
    width: number;
    height: number;
    children: ReactNode;
}

function Modal(props: ModalProps) {
    const { width, height, children } = props;

    return (
        <>
            <Portal>
                <Mask zIndex={zIndex.mask}>
                    <div className={'modal'}>{children}</div>
                </Mask>
            </Portal>

            <style jsx>{`
                .modal {
                    width: ${width}px;
                    height: ${height}px;
                    z-index: ${zIndex.mask};
                    background-color: white;
                    border-radius: 20px;
                }
            `}</style>
        </>
    );
}

export default Modal;
