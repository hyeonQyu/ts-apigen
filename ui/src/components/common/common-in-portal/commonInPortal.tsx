import Portal from '@components/common/portal/portal';
import Loading from '@components/common/loading/loading';

export interface CommonInPortalProps {}

function CommonInPortal(props: CommonInPortalProps) {
    const {} = props;

    return (
        <>
            <Portal>
                <Loading />
            </Portal>

            <style jsx>{``}</style>
        </>
    );
}

export default CommonInPortal;
