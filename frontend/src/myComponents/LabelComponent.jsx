import { Label } from '@/components/ui/label'

const LabelComponent = ({ label, errors, labelValue }) => {
    return (
        <>
            <Label className={`${errors && 'text-red-500'}`} htmlFor={label}>
                {labelValue}
            </Label>
        </>
    )
}

export default LabelComponent
