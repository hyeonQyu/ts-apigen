import { IconCommonProps } from '@defines/iconCommonProps';

export interface ArrowProps extends Pick<IconCommonProps, 'width' | 'height'> {}

function ArrowIcon(props: ArrowProps) {
    const { width = 16, height = 10 } = props;

    return (
        <>
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 1.5L8 8.5L1 1.5" stroke="#919BC6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <style jsx>{``}</style>
        </>
    );
}

export default ArrowIcon;
