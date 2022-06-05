import { useSelectBoxContext } from '@components/common/select-box/context/selectBoxContext';
import { ChangeEventHandler, MutableRefObject } from 'react';
import SearchBar from '@components/common/search-bar/searchBar';

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
            <SearchBar onChange={onChange} value={keyword} placeholder={placeholder} inputRef={searchBarRef} height={height - 2} />

            <style jsx>{``}</style>
        </>
    );
}

export default SelectBoxSearchBar;
