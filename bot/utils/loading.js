export const loading = (ctx) => {
  const loading_text = "⏳ Завантаження";
  const loading_end_text = "✅ Завантаження завершене";
  let message_id;

  const start_loading_message = async () => {
    message_id = await ctx.reply(loading_text);
    return loading_text;
  };

  const end_loading_message = async (minDelay = 500) => {
    if (message_id) {
      await ctx.telegram.editMessageText(
        message_id.chat.id,
        message_id.message_id,
        null,
        loading_end_text
      );

      await ctx.telegram.deleteMessage(
        message_id.chat.id,
        message_id.message_id
      );
    }
    return loading_end_text;
  };
  return { start_loading_message, end_loading_message };
};
