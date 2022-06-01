import Portal from '@components/common/portal/portal';
import { useRecoilValue } from 'recoil';
import Toast from '@components/common/toast/toast';
import { zIndex } from '@defines/zIndex';
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
                <div className={'toast-wrapper'}>
                    <div className={'toasts'}>
                        {toasts.map((toast, index) => (
                            <Toast key={toast.id} {...toast} index={index} />
                        ))}
                    </div>
                </div>
            </Portal>

            <style jsx global>{`
                .toast-wrapper {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: end;
                    z-index: ${zIndex.toast};
                }

                .toasts {
                    margin-bottom: 160px;
                    position: relative;
                }
            `}</style>
        </>
    );
}

export default ToastWrapper;
