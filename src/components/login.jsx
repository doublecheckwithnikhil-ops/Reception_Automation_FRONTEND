import { Button, Form, Input, message, Modal } from "antd"
import Password from "antd/es/input/Password";
import { Space } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { useLogin } from "../apis/login";

const Login = () => {
    const [formLogin] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const { mutate: userLogin, isPending } = useLogin();

    const handleSubmit = val => {
        const key = 'login-user';
        messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
        });
        userLogin(val, {
            onSuccess: (data) => {
                const { id, name, eCode, email } = data;
                sessionStorage.setItem("employess", JSON.stringify({ id, name, eCode, email }));
                login(data);
                messageApi.open({
                    key,
                    type: 'success',
                    content: 'User Login Successfully',
                });
            },
            onError: () => {
                messageApi.open({
                    key,
                    type: 'error',
                    content: 'Something went Wrong! Please Try Again',
                });
            }
        })



        // .then(res => {
        //     const { username, password } = val;
        //     sessionStorage.setItem("employess", JSON.stringify({ username, password }));
        //     login(val)
        // }).catch(err) {
        //     console.log("Something went wrong");
        // }
    }

    const {
        dispayLoginModal,
        setDisplayLoginModal,
        login,
        logout,
    } = useAppContext();

    const handleCancel = () => {
        setDisplayLoginModal(pre => !pre);
    }

    return (
        <>
            {contextHolder}
            <Modal
                title="Login"
                open={dispayLoginModal}
                onCancel={handleCancel}
                footer={null}
                width={500}
            >
                <Form
                    form={formLogin}
                    layout="vertical"
                    name="login_form"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="username"
                        label="Employee Code OR Email Id"
                        rules={[{ required: true, message: `Please enter Employee Code` }]}
                    >
                        <Input placeholder="Enter Vendor Name" />

                    </Form.Item>

                    {/* Weight Or Count */}
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: `Please enter Password` }]}
                    >
                        <Password placeholder="Enter Your Password" />

                    </Form.Item>
                    <Form.Item style={{ width: '100%', textAlign: "center" }}>
                        <Button type="default" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit" className="ml-2" loading={isPending}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Login;