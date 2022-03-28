import { useState } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import surveyAxios from '../../Helpers/surveyAxios';
import { setItem } from '../../Helpers/chromeScripts';

function LoginForm(props: any) {

    let [userName, setUserName] = useState<string | null>(null);
    let [email, setEmail] = useState<string | null>(null);
    let [role, setRole] = useState<string | null>(null);

    let user = { name: userName, email: email, role: role };

    let handleSubmit = async () => {
        let userInfo = await findOrCreateUser();
        await setItem('userInfo', userInfo);
        props.setUser(userInfo);
    }

    let findOrCreateUser = async () => {
        let user = await findUser();
        if (!user) user = await createUser();
        return user;
    }

    let findUser = async (): Promise<any> => {
        return surveyAxios.get('/user/find', { params: user })
            .then(res => {
                console.log('res', res)
                return res.data.data;
            })
            .catch(err => {
                console.log('err', err)
            });
    }

    let createUser = async (): Promise<any> => {
        return surveyAxios.post('/user', user)
            .then(res => {
                console.log('res', res)
                return res.data.data;
            })
            .catch(err => {
                console.log('err', err)
            });
    }

    return (
        <Form className="mx-4">
            <FormGroup className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" onChange={(e) => setUserName(e.target.value)}></Form.Control>
            </FormGroup>
            <FormGroup className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </FormGroup>
            <FormGroup className="mb-3">
                <Form.Label>Cargo</Form.Label>
                <Form.Select onChange={(e) => setRole(e.target.value)}>
                    <option>Selecione</option>
                    <option value="member">Membro</option>
                    <option value="leader">Líder</option>
                </Form.Select>
            </FormGroup>

            <div className="d-flex justify-content-center">
                <Button variant="primary" onClick={(e) => handleSubmit()}>Entrar</Button>
            </div>
        </Form>
    )
}

export default LoginForm;