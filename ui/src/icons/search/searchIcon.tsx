import { IconCommonProps } from '@defines/iconCommonProps';

export interface SearchIconProps extends Pick<IconCommonProps, 'opacity' | 'color'> {}

function SearchIcon(props: SearchIconProps) {
    const { opacity = 0.5, color = '#6a7684' } = props;

    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox={'0 0 20 20'}>
                <defs>
                    <style>{`
                        .a {
                            opacity: ${opacity};
                        }
                        .b {
                            fill: #fff;
                            opacity: 0;
                        }.
                        c {
                            fill: ${color};
                        }
                    `}</style>
                </defs>
                <g className="a">
                    <rect className="b" width="20" height="20" transform={'translate(20 20) rotate(180)'} />
                    <path
                        className="c"
                        d="M10.791,11.878,11.54,12.9a3.019,3.019,0,0,0,.3.354l3.071,3.015a.5.5,0,0,0,.71,0l.7-.7a.5.5,0,0,0,0-.71L13.3,11.868a2.981,2.981,0,0,0-.429-.356l-1.011-.69"
                        transform="translate(1 1)"
                    />
                    <path
                        className="c"
                        d="M7.5,2A5.5,5.5,0,1,0,13,7.5,5.5,5.5,0,0,0,7.5,2Zm0,9A3.5,3.5,0,1,1,11,7.5,3.5,3.5,0,0,1,7.5,11Z"
                        transform="translate(1 1)"
                    />
                </g>
            </svg>
        </>
    );
}

export default SearchIcon;
