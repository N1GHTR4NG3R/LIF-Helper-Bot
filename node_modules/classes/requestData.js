
class RequestData {
    constructor(id) {
        this.ID = id;
        this.RequestCommand = null;
        this.Item = null;
        this.Requester = null;
        this.Taker = null;
        this.Guild = null;
        this.RequestMessage = null;
        this.PendingMessage = null;
        this.AcceptedMessage = null;
        this.RoleCategoryName = null;
        this.State = "Initialized";
    }

    setRequester(requester) {
        this.Requester = requester;
        return this;
    }

    setRoleCategoryName(name) {
        this.RoleCategoryName = name;
    }

    setRequestMessage(message) {
        this.RequestMessage = message;
        return this;
    }

    setPendingMessage(message) {
        this.PendingMessage = message;
    }

    setAcceptedMessage(message) {
        this.AcceptedMessage = message;
    }

    setItem(item) {
        this.Item = item;
        return this;
    }

    setRequestCommand(reqCommand) {
        this.RequestCommand = reqCommand;
        return this;
    }

    setTaker(taker) {
        this.Taker = taker;
        return this;
    }

    setGuild(guild) {
       this.Guild = guild;
       return this;
    }

    setState(state) {
        this.State = state;
        return this;
    }

    get isInitialized() {
        return this.State == "Initialized"
    }

    get isPending() {
        return this.State == "Pending"
    }

    get isAccepted() {
        return this.State == "Accepted"
    }

    get isCompleted() {
        return this.State == "Completed"
    }
}

module.exports = RequestData;