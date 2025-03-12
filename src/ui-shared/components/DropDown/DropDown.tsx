import React, { useState, useEffect, useRef } from 'react';
import {
    DropdownContainer,
    DropdownOption,
    DropdownOptionSelected,
    DropdownOptions,
    DropdownSelected,
    Label,
} from './styles';
import chevronDown from './images/chevron-down.svg';
import checkMark from './images/checkmark.svg';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

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
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleOptionClick = (value: string) => {
        onChange(value);
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const selectedLabel = options.find((option) => option.value === selected)?.label || 'Select an option';

    return (
        <DropdownContainer ref={dropdownRef}>
            <Label>{label}</Label>
            <DropdownSelected onClick={() => setIsOpen(!isOpen)}>
                {selectedLabel}
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
                    <Image src={chevronDown} alt="Chevron Down" width={16} height={16} />
                </motion.div>
            </DropdownSelected>
            <AnimatePresence>
                {isOpen && (
                    <DropdownOptions
                        initial={{
                            opacity: 0,
                            y: 10,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: 10,
                        }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        {options.map((option) =>
                            selected === option.value ? (
                                <DropdownOptionSelected
                                    key={option.value}
                                    onClick={() => handleOptionClick(option.value)}
                                >
                                    <span>{option.label}</span>
                                    <Image src={checkMark} alt="Check Mark" width={24} height={24} />
                                </DropdownOptionSelected>
                            ) : (
                                <DropdownOption key={option.value} onClick={() => handleOptionClick(option.value)}>
                                    <span>{option.label}</span>
                                </DropdownOption>
                            )
                        )}
                    </DropdownOptions>
                )}
            </AnimatePresence>
        </DropdownContainer>
    );
}

export default DropDown;
