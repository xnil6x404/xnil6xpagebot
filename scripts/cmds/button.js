module.exports.config = {
  name: "button",
  aliases: ["button"],
  description: "button",
  commandCategory: "fun",
};

module.exports.onStart = async ({ message }) => {

  await message.button("Choose an option:", [
      { label: "Option 1", payload: "OPTION_1" },
      { label: "Option 2", payload: "OPTION_2" },
      { label: "Option 3", payload: "OPTION_3" },
  ]);
};
