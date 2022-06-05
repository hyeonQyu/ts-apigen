import Portal from '@components/common/portal/portal';
import LoadingPortal from '@components/common/loading/loadingPortal';
import ToastWrapper from '@components/common/toast/toastWrapper';

export interface CommonInPortalProps {}

function CommonInPortal(props: CommonInPortalProps) {
    const {} = props;

    return (
        <>
            <Portal>
                <LoadingPortal />
                <ToastWrapper />
            </Portal>

            <style jsx>{``}</style>
        </>
    );
}

export default CommonInPortal;
