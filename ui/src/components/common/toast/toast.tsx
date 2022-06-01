import { ToastType } from '@components/common/toast/defines/toast';
import useToast from '@components/common/toast/useToast';
import { assetToast } from '@public/assets/toast';
import classNames from 'classnames';

export interface ToastProps {
    isShow: boolean;
    message: string;
    type: ToastType;
    duration: number;
    id: number;
    index: number;
}

function Toast(props: ToastProps) {
    const { isShow, message, type } = props;
    const {
        values: { toastRef, width, height, bottom, initialBottom, iconPadding, backgroundColor },
    } = useToast(props);

    return (
        <>
            <div className={classNames('toast', !isShow && 'close')} ref={toastRef}>
                <div className={'icon'} />
                <div className={'message'}>{message}</div>
            </div>

            <style jsx>{`
                @keyframes rise {
                    0% {
                        opacity: 0;
                        /**bottom: ${initialBottom};**/
                    }
                }

                .toast {
                    position: absolute;
                    display: flex;
                    align-items: center;
                    width: ${width}px;
                    height: ${height}px;
                    right: -${width / 2}px;
                    bottom: ${bottom}px;
                    transition: opacity 0.2s ease, bottom 0.2s ease;
                    animation: rise 0.4s ease;
                    background-color: ${backgroundColor};
                    border-radius: 8px;
                }

                .toast.close {
                    opacity: 0;
                    bottom: ${bottom + 20}px;
                }

                .icon {
                    width: ${height}px;
                    height: ${height}px;
                    position: relative;
                    padding: ${iconPadding}px;
                }

                .icon:after {
                    content: '';
                    position: absolute;
                    background: url(${assetToast[type]});
                    background-size: contain;
                    width: ${height - iconPadding * 2}px;
                    height: ${height - iconPadding * 2}px;
                }

                .message {
                    padding: 0 10px;
                    color: white;
                    font-size: 18px;
                    width: ${width - height}px;
                }
            `}</style>
        </>
    );
}

export default Toast;
