import { Label } from '@/components/ui/label'

const LabelComponent = ({ label, errors, labelValue, ...props }) => {
    return (
        <>
            <Label
                className={`${errors && 'text-red-500'} ${props.className}`}
                htmlFor={label}
            >
                {labelValue}
            </Label>
        </>
    )
}

export default LabelComponent
