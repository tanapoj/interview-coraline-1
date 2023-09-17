class Api {

    baseUrl(endpoint: string) {
        return `http://localhost:3000/${endpoint}?user=${this._user}`
    }

    private _user: string = ''

    user(user: string): Api {
        this._user = user
        return this
    }

    async getScore() {
        const response = await fetch(this.baseUrl('score'), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        return (await response.json())
    }

    async postNewScore(score: number) {
        const response = await fetch(this.baseUrl('score'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({score}),
        })
        return (await response.json())['highScore']
    }

    async getBotPlayAction() {
        const response = await fetch(this.baseUrl('play'))
        return (await response.json())['result']
    }
}

export default new Api()