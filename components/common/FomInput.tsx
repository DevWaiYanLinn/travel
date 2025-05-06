import { Text, TextInput, TextInputProps, View } from 'react-native';
import clsx from 'clsx';
import React, { memo, useState } from 'react';
interface FormInputProps extends TextInputProps {
    errorText?: string;
    errorTextComponent?: React.ReactNode;
    icons?: React.ReactNode;
    label?: string;
}

const FormInput = memo(({ errorTextComponent, className, icons, errorText, label, ...others }: FormInputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <View>
            <Text className="text-gray-600 mb-2 font-bold">{label}</Text>
            <View
                className={clsx(
                    'flex-row items-center rounded-lg border border-gray-300',
                    isFocused ? 'border-indigo-600' : undefined
                )}
            >
                {icons}
                <TextInput
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...others}
                    className={clsx('w-full text-base', className)}
                />
            </View>
            {errorText
                ? errorTextComponent || <Text className={clsx('text-red-500 text-xs mt-1')}>{errorText}</Text>
                : null}
        </View>
    );
});

FormInput.displayName = 'FormInput';

export default FormInput;
