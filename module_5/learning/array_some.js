/*
some:
    Checks if at least one element matches a condition
*/

const players = [
    { name: "Jayesh", vip: false },
    { name: "Ram", vip: true },
    { name: "Dev", vip: true },
    { name: "Shiva", vip: false }
  ];
  
  const vip_player = players.some(player => player.vip);
  
  console.log("vip_player",vip_player);
