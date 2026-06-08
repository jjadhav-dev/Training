// Async Pattern

async function get_palyer_Data(){
    return {
        name:"jayesh",
        age:"23"
    }
}

async function get_player_wallets() {
    return {
        balance: 1000,
        currency: "USD"
    }
}

async function get_player_transaction_history() {
    return [
        { amount: 100, type: "deposit" },
        { amount: 50, type: "withdrawal" },
        { amount: 200, type: "deposit" }
    ]
}

const get_player_dashboard = async () => {
    try {
        const player_data = await get_palyer_Data();
        const player_wallets = await get_player_wallets();
        const player_transaction_history = await get_player_transaction_history();

        const player_dashboard = {player_data, player_wallets, player_transaction_history}

        return player_dashboard;
    } catch (error) {
        console.log("Error in getting player dashboard", error)
    }
}

(async function(){
    const dashboard = await get_player_dashboard();
    console.log("Player Dashboard",dashboard)
})()