import { Text, TextInput, TextInputProps, View } from "react-native";
import clsx from "clsx";
import { memo } from "react";

interface FormInputProps extends TextInputProps {
    errorText?: string;
    errorTextComponent?: React.ReactNode;
}

const FormInput = memo(
    ({
        errorTextComponent,
        className,
        errorText,
        ...others
    }: FormInputProps) => {
        return (
            <View>
                <TextInput
                    {...others}
                    className={clsx(
                        "w-full h-14 bg-gray-50 rounded-lg px-4 text-base border border-gray-300",
                        className
                    )}
                />
                {errorText
                    ? errorTextComponent || (
                          <Text className={clsx("text-red-500 mt-1")}>
                              {errorText}
                          </Text>
                      )
                    : null}
            </View>
        );
    }
);

FormInput.displayName = "FormInput";

export default FormInput;
