
let questionInit = {
    "type": "list",
    "name": "userAction",
    "message": "What do you want",
    "choices": [
        "View All Minions",
        "View All Minions by Master",
        "view All Minions by Branding",
        "Add New Minion",
        "Dispose of Minion",
        "Minion Re-branding",
        "Minion Ownership Change"
    ]
};
let newMinion = [
    {
        "type": "input",
        "name": "firstName: ",
        "message": "Fist name"
    },
    {
        "type": "input",
        "name": "lastName: ",
        "message": "last name"
    },
    {
        "type": "input",
        "name": "role",
        "message": "Role: "
    },
    {
        "type": "input",
        "name": "manager",
        "message": "Master name: "
    }
];
let rebranding =  {
    "type": "input",
    "name": "role",
    "message": "New brand: "
};
let newMaster= {
    "type": "input",
    "name": "manager",
    "message": "New master: "
};
module.exports={
    questionInit:questionInit,
    newMinion:newMinion,
    rebranding:rebranding,
    newMaster:newMaster
}