import { useSelectBoxContext } from '@components/common/select-box/context/selectBoxContext';
import { ChangeEventHandler, MutableRefObject } from 'react';
import SearchIcon from '@icons/search/searchIcon';

export interface SelectBoxSearchBarProps {
    keyword: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    searchBarRef: MutableRefObject<HTMLInputElement | null>;
}

function SelectBoxSearchBar(props: SelectBoxSearchBarProps) {
    const { props: contextProps, height } = useSelectBoxContext();
    const { placeholder } = contextProps;
    const { onChange, keyword, searchBarRef } = props;

    return (
        <>
            <div className={'search'}>
                <input onChange={onChange} value={keyword} placeholder={placeholder} ref={searchBarRef} />
                <SearchIcon />
            </div>

            <style jsx>{`
                .search {
                    margin-top: 5px;
                    height: ${height - 2}px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 7px 0 15px;
                }

                input {
                    width: calc(100% - 30px);
                    height: 100%;
                    border: none;
                    outline: none;
                }
            `}</style>
        </>
    );
}

export default SelectBoxSearchBar;
