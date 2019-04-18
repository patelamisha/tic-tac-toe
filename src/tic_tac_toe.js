import React, { Component } from 'react'
import _ from 'lodash'

class Tic_Tac_Toe extends Component {
    constructor(props) {
        super(props)

        this.state = {
            winner: null,
            player: null,
            winnerIndex: null,
            playerONE: "X",
            playerTWO: "O",
            tictactoe: Array(9).fill(null),
            mapIndex: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            winStatus: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ]
        }

        this.checkWinner = this.checkWinner.bind(this)
        this.playerTWOIndexies = this.playerTWOIndexies.bind(this)

    }

    checkWinner() {

        for (let index = 0; index < this.state.winStatus.length; index++) {
            const [a, b, c] = this.state.winStatus[index]

            if (
                this.state.tictactoe[a] === this.state.playerTWO &&
                this.state.tictactoe[b] === this.state.playerTWO &&
                this.state.tictactoe[c] === this.state.playerTWO
            ) {
                this.setState({
                    winner: this.state.playerTWO,
                    winnerIndex: [a, b, c]
                })
            } else if (
                this.state.tictactoe[a] === this.state.playerONE &&
                this.state.tictactoe[b] === this.state.playerONE &&
                this.state.tictactoe[c] === this.state.playerONE
            ) {
                this.setState({
                    winner: this.state.playerONE,
                    winnerIndex: [a, b, c]
                })
            }
        }
    }

    action() {
        const availSpot = this.emptyIndexies()
        const checkwinStatus = this.state.winStatus
        const opponentIndexes = this.playerTWOIndexies()
        let res = []
        let coverIndex = null
        checkwinStatus.map((value, key) => {
            let intersept = _.intersection(value, opponentIndexes)
            console.log(intersept)
            if (intersept.length == 2) {
                let j = _.difference(value, intersept)

                if (this.state.tictactoe[j[0]] === null) {
                    coverIndex = j[0]
                }

            }
        })

        if (coverIndex) {
            return coverIndex
        }

        checkwinStatus.map((value, key) => {
            let d = _.intersection(value, availSpot)

            if (d && !_.isEmpty(_.difference(value, d))) {
                res.push(d)
            }
        })

        let mostSpot = _.flattenDeep(res)
        let uniq = _.uniq(mostSpot)
        let spot = uniq

        let rand = spot[Math.floor(Math.random() * spot.length)]

        return rand
    }

    clickEvent = index => {
        if (this.state.winner !== null) {
            return
        }

        let newtictactoe = this.state.tictactoe;

        if (newtictactoe[index] !== null) {
            return
        }

        newtictactoe[index] = this.state.playerTWO
        this.setState({
            tictactoe: newtictactoe,
            player: this.state.playerTWO
        })

        setTimeout(() => {
            this.checkWinner()

            if (this.state.winner === null) {
                let freshtictactoe = this.state.tictactoe;
                let aiIndex = this.action();

                freshtictactoe[aiIndex] = this.state.playerONE
                this.setState({
                    tictactoe: freshtictactoe,
                    player: this.state.playerONE
                })

                setTimeout(() => {
                    this.checkWinner()
                }, 800)
            }

        }, 800);

    }

    emptyIndexies = () => {

        let fills = []
        let iterator = _.filter(this.state.tictactoe, function (value, key) {
            if (value === null) {
                fills.push(key)
            }
        })

        return fills;
    }

    playerTWOIndexies = () => {

        let fills = []
        let iterator = _.filter(this.state.tictactoe, function (value, key) {
            if (value === 'O') {
                fills.push(key)
            }
        })

        return fills;
    }

    reset(e) {
        this.setState({
            winner: null,
            player: null,
            tictactoe: Array(9).fill(null),
            winnerIndex: null
        })
    }

    render() {
        const Box = this.state.tictactoe.map((box, index) =>
            <div
                key={index}
                onClick={() => this.clickEvent(index)}
                style={
                    this.state.winnerIndex && _.indexOf(this.state.winnerIndex, index) > -1 ? { color: "#0c0c0c" } : {}
                }
                className="col box">
                {box}
            </div>
        )
        return (
            <div className="tictactoe" style={{
                width: "400px",
                margin: "10px auto"
            }}>
                {this.state.winner == this.state.playerTWO  && <div style={{
                    color: "#0c0c0c"
                }}>
                    <h2> HUMAN WIN! </h2>
                </div>}

                {this.state.winner == this.state.playerONE && <div style={{
                    color: "#0c0c0c"
                }}>
                    <h2> Computer WIn! </h2>
                </div>}

                {(this.state.winner === null && _.isEmpty(this.emptyIndexies())) && <div style={{
                    color: "#0c0c0c"
                }}>
                    <h2>OVER!</h2>
                </div>}

                <div className="tictactoe-wrapper">
                    {Box}
                </div>

                <button className="btn" type="button" onClick={(e) => this.reset(e)}>
                    {this.state.winner || _.isEmpty(this.emptyIndexies()) ? 'New Game' : 'Reset'}
                </button>

            </div>
        )
    }
}

export default Tic_Tac_Toe;