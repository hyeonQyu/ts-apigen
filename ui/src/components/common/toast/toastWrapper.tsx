import Portal from '@components/common/portal/portal';
import { useRecoilValue } from 'recoil';
import Toast from '@components/common/toast/toast';
import { toastsState } from 'stores/store';

export interface ToastWrapperProps {}

function ToastWrapper(props: ToastWrapperProps) {
    const {} = props;
    const toasts = useRecoilValue(toastsState);

    if (toasts.length === 0) {
        return <></>;
    }

    return (
        <>
            <Portal>
                {toasts.map((toast, index) => (
                    <Toast key={toast.id} {...toast} index={index} />
                ))}
            </Portal>

            <style jsx global>{``}</style>
        </>
    );
}

export default ToastWrapper;
