import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function TeamAnswers(props: any) {

    let [answers, setAnswers] = useState<any[] | null>(props.answers);
    let [answersCount, setAnswerCount] = useState<any | null>({});

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

    useEffect(() => {
        countAnswers();
    })

    let countAnswers = () => {

        let tempAnswersCount = [
            {
                value: 1,
                count: 0,
            },
            {
                value: 2,
                count: 0,
            },
            {
                value: 3,
                count: 0,
            },
            {
                value: 4,
                count: 0,
            },
            {
                value: 5,
                count: 0,
            }
        ];

        answers?.forEach((answer: any) => {
        })

        setAnswerCount(tempAnswersCount);
    }

    return(
        <>
            <Table>
                <thead>
                    <tr>
                        {statuses.map((status: any) => {
                            return(
                                <th key={status.value}>
                                    <img src={`/images/${status.icon}`} alt={status.icon}/>
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default TeamAnswers;