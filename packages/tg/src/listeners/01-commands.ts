import { Listener } from "../types"

const welcomeText = "Добро пожаловать!"
const subscribeSellText = "Подписка на продажу"
const subscribeBuyText = "Подписка на скупку"
const subscribeListText = "Список подписок"
const subscribeDeleteText = "Удаление подписки"
const searchSellText = "Поиск по магазинам"
const searchBuyText = "Поиск по скупкам"

const welcomeOptions = {
  reply_markup: {
    keyboard: [
      [{ text: subscribeSellText }, { text: subscribeListText }],
      [{ text: subscribeBuyText }, { text: subscribeDeleteText }],
      [{ text: searchSellText }, { text: searchBuyText }]
    ]
  }
}

const listener: Listener = (bot, msg, state, updateState, next) => {
  let runNext = true

  if (state.type === "commands") {
    const text = msg.text || ""
    if (text === subscribeSellText) {
      updateState({ type: "subscribe-sell", id: null, amount: null })
    } else if (text === subscribeBuyText) {
      updateState({ type: "subscribe-buy", id: null, amount: null })
    } else if (text === subscribeListText) {
      updateState({ type: "subscribe-list" })
    } else if (text === subscribeDeleteText) {
      updateState({ type: "subscribe-delete", id: null })
    } else if (text === searchSellText) {
      updateState({ type: "search-sell", id: null })
    } else if (text === searchBuyText) {
      updateState({ type: "search-buy", id: null })
    } else {
      bot.sendMessage(msg.chat.id, welcomeText, welcomeOptions)
      runNext = false
    }
  }

  if (runNext) {
    next()
  }
}

export default listener