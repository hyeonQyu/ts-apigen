import React, { ReactNode } from 'react';

export interface CheckboxProps {
    checked?: boolean;
    size?: number;
    onChange?(checked: boolean): void;
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
}

function Checkbox(props: CheckboxProps) {
    const { checked = false, size = 20, onChange = () => {}, children, className, disabled = false } = props;

    return <div></div>;
}

export default Checkbox;
