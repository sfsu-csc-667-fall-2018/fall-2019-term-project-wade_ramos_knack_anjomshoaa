
class State {
    constructor(id){
        var o = {} // empty Object
        var key = 'state';
        o[key] = []; // empty Array, which you can push() values into
        var data = {
            uuid:id,
            playerCount:0,
            pot: 0,
            deck:[],
            players:[],
            currentPlayer:'none'
        };
        o[key].push(data);
        this.json = JSON.stringify(o);
        this.uuid = id;
    }
};

module.exports = State;