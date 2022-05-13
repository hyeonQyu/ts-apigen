import React from 'react';
import { KeyValuePair } from '../../defines/keyValuePair';

export interface SelectBoxProps {
    options: KeyValuePair<string | number, string>;

    isMultiSelect?: boolean;

    disabled?: boolean;
}

function SelectBox(props: SelectBoxProps) {
    return <div></div>;
}

export default SelectBox;
