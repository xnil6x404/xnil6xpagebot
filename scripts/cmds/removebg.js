module.exports.config = {
  name: "hello",
  aliases: ["hi"],
  description: "Say hello!",
  commandCategory: "fun",
};

module.exports.onStart = async ({ message }) => {
  await message.reply("Hello! This is a direct text message.");
  await message.reply({
      attachment: {
          type: "image",
          url: "https://scontent.xx.fbcdn.net/v/t1.15752-9/462536071_845437394338880_4221577896187302592_n.jpg?stp=dst-jpg_p480x480&_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEDw0YrlQB3PUw35cxLzLYyOQsFdFqm3Ko5CwV0WqbcqoIh3q_Ny_zKT53F2-hyPYDkR4J5aNAk56sNuDiAqlSI&_nc_ohc=t1W5H65cqrkQ7kNvgHxQra9&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_gid=AlRFx67uruVEwC4Rr8ET7rG&oh=03_Q7cD1QGxgvvNjH6xTqPAfaj4e40PBacF6CqzVmPC83P1nTdieg&oe=674A3D41",
      },
  });
};
