import React, { useState } from 'react';
import { DropdownContainer, DropdownOption, DropdownOptions, DropdownSelected, Label } from './styles';
import chevronDown from './images/chevron-down.svg';
import Image from 'next/image';

interface Option {
    value: string;
    label: string;
}

interface DropDownProps {
    options: Option[];
    selected: string;
    onChange: (selected: string) => void;
    label: string;
}

function DropDown({ options, selected, onChange, label }: DropDownProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (value: string) => {
        onChange(value);
        setIsOpen(false);
    };

    const selectedLabel = options.find((option) => option.value === selected)?.label || 'Select an option';

    return (
        <DropdownContainer>
            <Label>{label}</Label>
            <DropdownSelected onClick={() => setIsOpen(!isOpen)}>
                {selectedLabel}
                <Image src={chevronDown} alt="Chevron Down" width={16} height={16} />
            </DropdownSelected>
            {isOpen && (
                <DropdownOptions>
                    {options.map((option) => (
                        <DropdownOption key={option.value} onClick={() => handleOptionClick(option.value)}>
                            {option.label}
                        </DropdownOption>
                    ))}
                </DropdownOptions>
            )}
        </DropdownContainer>
    );
}

export default DropDown;
