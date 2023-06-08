const addPotsButton = document.getElementById('addPots');
const potsInputField = document.getElementById('potsInputField');

const potsArray = [];

function createPots(pots) {
    const potsContainer = document.getElementById('potsContainer');
    for (let index = 0; index < pots; index++) {
        potsArray.push([]);

        const potContainer = document.createElement('div');
        potContainer.classList.add('potContainer');
        potsContainer.appendChild(potContainer);

        const h2 = document.createElement('h2');
        h2.innerText = `Pote ${index + 1}`;

        potContainer.appendChild(h2);

        const inputContainer = document.createElement('div');
        inputContainer.classList.add('input-container');

        potContainer.appendChild(inputContainer);

        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.classList.add('inputField');

        inputContainer.appendChild(textInput);

        const button = document.createElement('button');
        button.classList.add('addButton');
        button.innerText = '+';

        inputContainer.appendChild(button);

        const playerContainer = document.createElement('div');
        playerContainer.classList.add('players');

        potContainer.appendChild(playerContainer);

        button.addEventListener('click', () => {

            const playerDiv = document.createElement('div');
            playerDiv.classList.add('player-name-container');

            const player = document.createElement('span');
            player.classList.add('player-name');
            const playerName = textInput.value.substring(0, 15);
            player.innerText = playerName;

            potsArray[index].push(playerName);

            const cross = document.createElement('a');
            cross.classList.add('close');
            cross.href = '#';

            const hr = document.createElement('hr');
            cross.addEventListener('click', () => {
                playerContainer.removeChild(playerDiv);
                playerContainer.removeChild(hr);
                const playerIndex = potsArray[index].indexOf(playerName);
                potsArray[index].splice(playerIndex, 1);
            })

            playerDiv.appendChild(player);
            playerDiv.appendChild(cross);
            playerContainer.appendChild(playerDiv);
            playerContainer.appendChild(hr);
            textInput.value = '';
        });

        textInput.addEventListener('keypress', (event) => {
            if (event.key == 'Enter') {
                button.click();
            }
        })

    }
    const createTeamsButton = document.createElement('button');
    createTeamsButton.innerText = 'Create Teams';
    createTeamsButton.classList.add('addButton');
    createTeamsButton.id = 'createTeamsButton';
    createTeamsButton.addEventListener('click', createTeams);
    document.getElementById('createTeamsButton').appendChild(createTeamsButton);
}

addPotsButton.addEventListener('click', () => {
    if (!Number.isInteger(Number(potsInputField.value))) {
        potsInputField.value = '1';
        return;
    }
    const pots = potsInputField.value;
    if (pots < 1 || pots > 3) {
        potsInputField.value = '1';
        return;
    }

    addPotsButton.setAttribute('disabled', 'true');
    document.getElementById('potsSelector').style.display = 'none';
    createPots(pots);
})

function addPlayer() {

}

function createTeams() {
    const teams = [[], []];
    let assingTo = 0;
    for (let index = 0; index < potsArray.length; index++) {
        const pot = shuffle(potsArray[index]);
        for (const player of pot) {
            teams[assingTo].push(player);
            assingTo = (assingTo + 1) % 2;
        }

    }

    const teamsContainer = document.getElementById('teamsContainer');
    teamsContainer.innerHTML = '';

    let teamNum = 1;
    for (const team of teams) {
        const teamDiv = document.createElement('div');
        teamsContainer.appendChild(teamDiv);

        const h1 = document.createElement('h1');
        h1.innerText = `Team ${teamNum}`;
        teamNum++;

        teamDiv.appendChild(h1);

        for (const player of team) {
            const playerDiv = document.createElement('div');
            playerDiv.classList.add('teamPlayer');
            playerDiv.innerText = player;
            teamDiv.appendChild(playerDiv)
        }

    }
    console.log(teams);
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}