import Portal from '@components/common/portal/portal';
import Loading from '@components/common/loading/loading';
import ToastWrapper from '@components/common/toast/toastWrapper';

export interface CommonInPortalProps {}

function CommonInPortal(props: CommonInPortalProps) {
    const {} = props;

    return (
        <>
            <Portal>
                <Loading />
                <ToastWrapper />
            </Portal>

            <style jsx>{``}</style>
        </>
    );
}

export default CommonInPortal;
