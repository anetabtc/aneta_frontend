import React from 'react'

function Feedback() {
  return (
    <div className="feedback-page">
    <div className='mainmenu_feedback'>
    <a target="_blank" rel="noreferrer" href="https://anetabtc.io/"><div className="feedback-page__content-btn">anetaBTC Feedback Form</div></a>
    <a target="_blank"rel="noreferrer" href="https://discord.com/invite/ScXG76dJXM"><div className="feedback-page__content-btn">Discuss on Discord
                    <img src={require('../../assets/img/i_discord_dark.png').default} alt="aneta" id="Icons" className="dark__mode"/>
                    <img src={require('../../assets/img/i_discord.png').default} alt="aneta" id="Icons" className="sun__mode"/></div></a>
    <a target="_blank" rel="noreferrer" href="https://t.me/anetaBTC"><div className="feedback-page__content-btn">Discuss on Telegram
                    <img src={require('../../assets/img/i_tg_dark.png').default} alt="aneta" id="Icons" className="dark__mode"/>
                    <img src={require('../../assets/img/i_tg.png').default} alt="aneta" id="Icons" className="sun__mode"/></div></a>
   </div>
   </div>
  )
}

export default Feedback;
