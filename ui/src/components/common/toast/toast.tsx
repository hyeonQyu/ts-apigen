import { ToastType } from '@components/common/toast/defines/toast';

export interface ToastProps {
    isShow: boolean;
    message: string;
    type: ToastType;
}

function Toast(props: ToastProps) {
    const { isShow, message, type } = props;

    return (
        <>
            <div className={'toast'}>
                <i className={'icon'} />
                <div className={'message'}>{message}</div>
                <button className={'close'} type={'button'} />
            </div>

            <style jsx>{`
                .toast {
                }
            `}</style>
        </>
    );
}

export default Toast;
