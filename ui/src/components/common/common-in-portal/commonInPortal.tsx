import Portal from '@components/common/portal/portal';
import ToastWrapper from '@components/common/toast/toastWrapper';

export interface CommonInPortalProps {}

function CommonInPortal(props: CommonInPortalProps) {
    const {} = props;

    return (
        <>
            <Portal>
                <ToastWrapper />
            </Portal>

            <style jsx>{``}</style>
        </>
    );
}

export default CommonInPortal;
