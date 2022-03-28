import { useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Table } from "react-bootstrap";
import surveyAxios from "../../Helpers/surveyAxios";

function TeamManage(props: any) {

    let [teamName, setTeamName] = useState<string | null>(null);
    let [teams, setTeams] = useState<any[] | null>(null);
    let [user, setUser] = useState<any | null>(props.user);

    useEffect(() => {
        getTeams();
    }, [])

    let createTeam = async (): Promise<any> => {
        return surveyAxios.post('/team', { name: teamName })
            .then(res => {
                getTeams();
            })
            .catch(err => {
                console.log('err', err)
            });
    }

    let getTeams = async (): Promise<any> => {
        return surveyAxios.get(`/team/leader/${user._id}`)
            .then(res => {
                setTeams(res.data.data); 
            })
            .catch(err => {
                console.log('err', err);
            })
    }

    return (
        <Container>
            <Form className="d-flex mb-5">
                <FormGroup className="flex-grow-1 px-2">
                    <Form.Control type="text" placeholder="Nome do time" onChange={(e) => setTeamName(e.target.value)} />
                </FormGroup>
                <Button variant="primary" onClick={(e) => createTeam()}>Criar time</Button>
            </Form>

            <Table striped bordered hover className="mb-3">
                <thead>
                    <tr>
                        <th>Nome do Time</th>
                        <th>Código de Associação</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {teams && teams.map((team: any, index) => {
                        return (
                            <tr key={index}>
                                <td>{team.name}</td>
                                <td>{team.code}</td>
                                <td>Respostas</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Container>
    )
}

export default TeamManage;