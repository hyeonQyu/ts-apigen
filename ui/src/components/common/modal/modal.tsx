import Portal from '@components/common/portal/portal';
import { ReactNode } from 'react';
import Mask from '@components/common/mask/mask';
import { zIndex } from '@defines/zIndex';
import useModal from '@components/common/modal/useModal';
import classNames from 'classnames';

export interface ModalProps {
    width?: number;
    height?: number;
    children: ReactNode;
    isOpened?: boolean;
}

function Modal(props: ModalProps) {
    const { width, height, children, isOpened } = props;
    const {
        values: { appearAnimationDuration, disappearAnimationDuration, mounted },
    } = useModal(props);

    if (!mounted) {
        return <></>;
    }

    return (
        <>
            <Portal>
                <Mask zIndex={zIndex.mask}>
                    <div className={classNames('modal', !isOpened && 'close')}>{children}</div>
                </Mask>
            </Portal>

            <style jsx>{`
                @keyframes appears {
                    from {
                        opacity: 0;
                        margin-top: 50px;
                    }
                    to {
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
                    animation: appears ${appearAnimationDuration}s ease-in-out;
                    transition: ${disappearAnimationDuration}s;
                }

                .modal.close {
                    opacity: 0;
                    margin-top: 50px;
                }
            `}</style>
        </>
    );
}

export default Modal;
