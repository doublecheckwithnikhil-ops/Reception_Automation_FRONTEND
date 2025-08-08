import { Form } from 'antd';
const customForm = ({ onSubmit, initialValues, form, children }) => {
    return (
        <Form
            form={form}
            layout="vertical"
            name="add_material_form"
            onFinish={onSubmit}
            initialValues={initialValues} // Default type
        >
            {children}
        </Form>
    )

}

export default customForm;