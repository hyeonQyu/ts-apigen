import { ToastType } from '@components/common/toast/defines/toast';
import useToast from '@components/common/toast/useToast';

export interface ToastProps {
    isShow: boolean;
    message: string;
    type: ToastType;
    index: number;
}

function Toast(props: ToastProps) {
    const { isShow, message, type, index } = props;
    const {
        values: { toastRef, width, height, bottom, initialBottom },
    } = useToast(props);

    return (
        <>
            <div className={'toast'} ref={toastRef}>
                <i className={'icon'} />
                <div className={'message'}>{message}</div>
            </div>

            <style jsx>{`
                @keyframes rise {
                    0% {
                        opacity: 0;
                        bottom: ${initialBottom};
                    }
                }

                .toast {
                    position: absolute;
                    background-color: yellow;
                    display: flex;
                    align-items: center;
                    width: ${width}px;
                    height: ${height}px;
                    right: -${width / 2}px;
                    bottom: ${index * (height + 14)}px;
                    transition: opacity 0.2s ease, bottom 0.2s ease;
                    animation: rise 0.4s ease;
                }

                .icon {
                    width: 10%;
                }

                .message {
                    padding: 0 10px;
                }
            `}</style>
        </>
    );
}

export default Toast;
