"use client";

import {useEffect, useState, useMemo} from "react";
import api from './services/api'
import {classNames} from './utils/util'

interface ActionCard {
    title: string
    img: string | null
}

enum ActionType {
    None = 'none',
    Rock = 'rock',
    Paper = 'paper',
    Scissors = 'scissors',
}

export default function Home() {

    const [yourScore, setYourScore] = useState(0)
    const [highScore, setHighScore] = useState<number | null>(null)
    const [pause, setPause] = useState(false)

    const [botAction, setBotAction] = useState<ActionCard>({title: '???', img: null})

    useEffect(() => {
        const time = setInterval(() => {
            loadHighScore()
        }, 1000)
        return () => {
            clearInterval(time)
        }
    }, [])

    function loadHighScore() {
        api.getScore().then(({highScore, score}) => {
            setHighScore(highScore)
            setYourScore(score)
        })
    }

    function botTakeAction(type: ActionType) {
        if (type === ActionType.Rock) {
            setBotAction({title: 'Rock', img: 'r.png'})
        } else if (type === ActionType.Paper) {
            setBotAction({title: 'Paper', img: 'p.png'})
        } else if (type === ActionType.Scissors) {
            setBotAction({title: 'Scissors', img: 's.png'})
        } else {
            setBotAction({title: '???', img: null})
        }
    }

    function endTurn() {
        setPause(true)
        setTimeout(() => {
            setBotAction({title: '???', img: null})
            setPause(false)
        }, 2 * 1000)
    }

    function win() {
        setYourScore(score => {
            score++
            api.postNewScore(score).then(highScore => setHighScore(highScore))
            return score
        })
    }

    function lose() {
        setYourScore(0)
    }

    async function handlePlayerAction(type: ActionType) {
        if (pause) return
        const action = await api.getBotPlayAction()
        botTakeAction(action)
        if (type === ActionType.Rock && action == ActionType.Scissors ||
            type === ActionType.Paper && action == ActionType.Rock ||
            type === ActionType.Scissors && action == ActionType.Paper) {
            win()
        } else if (type === ActionType.Rock && action == ActionType.Paper ||
            type === ActionType.Paper && action == ActionType.Scissors ||
            type === ActionType.Scissors && action == ActionType.Rock) {
            lose()
        }
        endTurn()
    }

    function handleUser(user) {
        api.user(user)
    }

    const actionCardStyle = useMemo(() => ({
        'col': true,
        'm-4': true,
        'text-center': true,
        'action-card': true,
        'player': true,
    }), [])

    return (
        <div className="container">

            <form className="row">
                <div className="col-6 offset-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" onChange={e => handleUser(e.target.value)}/>
                </div>
            </form>

            <hr/>

            <div className="row">
                <div className="col offset-6 action-label">
                    <p>Your Score: {yourScore} turn</p>
                </div>
            </div>
            <div className="row">
                <div className="col offset-6 action-label">
                    <p>High Score: {highScore ?? '-'} turn</p>
                </div>
            </div>

            <div className="row">
                <div className="col action-label">
                    <p>Bot Action: </p>
                </div>
                <div className="col m-4 text-center">
                </div>
                <div className="col m-4 text-center action-card">
                    {botAction.img ?
                        <img src={botAction.img} className='action-icon' alt=''/>
                        : <></>}
                    <h4>{botAction.title}</h4>
                </div>
                <div className="col m-4 text-center">
                </div>
            </div>

            <div className="row">
                <div className="col action-label">
                    <p>Your Action: </p>
                </div>
                <div
                    className={classNames({
                        ...actionCardStyle,
                        disable: pause
                    })}
                    onClick={() => handlePlayerAction(ActionType.Rock)}>
                    <img src='r.png' className='action-icon' alt=''/>
                    <h4>Rock</h4>
                </div>
                <div
                    className={classNames({
                        ...actionCardStyle,
                        disable: pause
                    })}
                    onClick={() => handlePlayerAction(ActionType.Paper)}>
                    <img src='p.png' className='action-icon' alt=''/>
                    <h4>Paper</h4>
                </div>
                <div
                    className={classNames({
                        ...actionCardStyle,
                        disable: pause
                    })}
                    onClick={() => handlePlayerAction(ActionType.Scissors)}>
                    <img src='s.png' className='action-icon' alt=''/>
                    <h4>Scissors</h4>
                </div>
            </div>
        </div>
    )
}
