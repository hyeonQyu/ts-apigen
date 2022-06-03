import { ToastType } from '@components/common/toast/defines/toast';
import useToast from '@components/common/toast/useToast';
import { assetToast } from '@public/assets/toast';
import classNames from 'classnames';
import { zIndex } from '@defines/zIndex';

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
        values: { toastRef, width, height, left, bottom, iconPadding, backgroundColor },
    } = useToast(props);

    return (
        <>
            <div className={classNames('toast', !isShow && 'close')} ref={toastRef}>
                <div className={'icon'} />
                <div className={'message'}>{message}</div>
            </div>

            <style jsx>{`
                @keyframes appear {
                    0% {
                        opacity: 0;
                    }
                }

                .toast {
                    position: absolute;
                    left: ${left}px;
                    display: flex;
                    align-items: center;
                    width: ${width}px;
                    height: ${height}px;
                    bottom: ${bottom}px;
                    transition: opacity 0.2s ease, bottom 0.2s ease;
                    animation: appear 0.4s ease;
                    background-color: ${backgroundColor};
                    border-radius: ${height}px;
                    z-index: ${zIndex.toast};
                    padding: 0 10px;
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
                    line-height: 1.3;
                    word-break: keep-all;
                }
            `}</style>
        </>
    );
}

export default Toast;
