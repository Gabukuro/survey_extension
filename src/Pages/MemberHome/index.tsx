import { useState, useEffect } from 'react';
import { Button, Container, Form, FormGroup } from 'react-bootstrap';
import surveyAxios from '../../Helpers/surveyAxios';
import { getItem, setItem } from '../../Helpers/chromeScripts';

import './index.css';

function MemberHome(props: any) {

    let [currentStatusJustify, setCurrentStatusJustify] = useState<string | null>(null);
    let [currentStatus, setCurrentStatus] = useState<any | null>({});
    let [teamCode, setTeamCode] = useState<string | null>(null);
    let [lastAnswerDate, setLastAnswerDate] = useState<any | null>(null);
    let [shouldAnswer, setShouldAnswer] = useState<boolean>(true);
    let [user, setUser] = useState<any | null>(props.user);
    let [team, setTeam] = useState<any | null>(props.team);

    useEffect(() => {
        getTeamInfo();
        getLastAnswerInfo();
    }, [])

    let getTeamInfo = async () => {
        let teamInfo = await getItem('teamInfo');
        setTeam(teamInfo);
    }

    let getLastAnswerInfo = async () => {
        let lastAnswerDateInfo = await getItem('lastAnswerDate');
        if(!lastAnswerDateInfo) {
            return;
        }
        setLastAnswerDate(lastAnswerDateInfo);
        setShouldAnswer(checkIsToday(lastAnswerDateInfo));
    }

    let checkIsToday = (date: Date) => {
        date = new Date(date);
        let today = new Date();
        return today.getDate() == date.getDate() &&
            today.getMonth() == date.getMonth() &&
            today.getFullYear() == date.getFullYear();
    }

    let assoc = async (): Promise<any> => {
        return surveyAxios.post('/user/assoc', { userId: user._id, teamCode: teamCode })
            .then(res => {
                setUser(res.data.data.user);
                setTeam(res.data.data.team);
                setItem('userInfo', res.data.data.user);
                setItem('teamInfo', res.data.data.team);
            })
            .catch(err => {
                console.log('err', err);
            })
    }

    const statuses = [
        {
            value: 1,
            icon: 'very_sad.png',
        },
        {
            value: 2,
            icon: 'sad.png',
        },
        {
            value: 3,
            icon: 'neutral.png',
        },
        {
            value: 4,
            icon: 'happy.png',
        },
        {
            value: 5,
            icon: 'very_happy.png',
        }
    ]

    let sendAnswer = async (): Promise<any> => {
        return surveyAxios.post('/answer', {
            userId: props.user._id,
            teamId: team._id,
            answer: currentStatus.value,
            justify: currentStatusJustify
        })
            .then(res => {
                console.log('res', res);
                setItem('lastAnswerDate', Date.now());
                setShouldAnswer(false);
            })
            .catch(err => {
                console.log('err', err);
            });
    }

    return (
        <Container>

            {!team && (
                <>
                    <Form className="d-flex mb-5" >
                        <FormGroup className="flex-grow-1 px-2">
                            <Form.Control type="text" placeholder="Código do time" onChange={(e) => setTeamCode(e.target.value)} />
                        </FormGroup>
                        <Button variant="primary" onClick={(e) => assoc()}>Associar-se</Button>
                    </Form>
                </>
            )}

            {team && !shouldAnswer && (
                <p>Oba você já respondeu o survey hoje, volte amanhã!</p>
            )}

            {team && shouldAnswer && (
                <>
                    <p>Como você se sente em relação a implementação da metodologia hoje?</p>

                    <Form className="mt-4">
                        <div className="status-options">
                            {statuses.map((status, index) => {
                                return (
                                    <Form.Check
                                        key={index}
                                        type="radio"
                                        label={
                                            <>
                                                <img src={`img/${status.icon}`} width="50px" height="50px" />
                                            </>
                                        }
                                        name={`status-${index}`}
                                        id={`status-${index}`}
                                        onClick={(e) => setCurrentStatus(status)}
                                        checked={currentStatus && currentStatus.value === status.value}
                                    />
                                )
                            })}
                        </div>

                        <Form.Group className="mt-3">
                            <Form.Label>Justificativa (opcional):</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={(e) => setCurrentStatusJustify(e.target.value)} />
                        </Form.Group>

                        <div className="d-flex justify-content-end mt-2">
                            <Button variant="primary" onClick={(e) => sendAnswer()} disabled={!currentStatus}>Enviar</Button>
                        </div>

                    </Form>
                </>

            )}
        </Container>
    )
}

export default MemberHome;