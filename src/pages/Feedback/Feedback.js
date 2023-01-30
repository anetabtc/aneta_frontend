import React from 'react'

function Feedback() {
  return (
    <div className="feedback-page">
      {/*<h1>Feedback</h1>*/}
    <div className='mainmenu_feedback'>
    <a target="_blank" rel="noreferrer" href="https://5c3i0k2q3p5.typeform.com/to/hfymRoSr"><div className="feedback-page__content-btn">anetaBTC Feedback Form</div></a>
    <a target="_blank"rel="noreferrer" href="https://discord.com/invite/ScXG76dJXM"><div className="feedback-page__content-btn">Discuss on Discord
                    <img src={require('../img/i_discord_dark.png').default} alt="aneta" id="Icons" className="dark__mode"/>
                    <img src={require('../img/i_discord.png').default} alt="aneta" id="Icons" className="sun__mode"/></div></a>
    <a target="_blank" rel="noreferrer" href="https://t.me/anetaBTC"><div className="feedback-page__content-btn">Discuss on Telegram
                    <img src={require('../img/i_tg_dark.png').default} alt="aneta" id="Icons" className="dark__mode"/>
                    <img src={require('../img/i_tg.png').default} alt="aneta" id="Icons" className="sun__mode"/></div></a>
    {/*<a target="_blank" rel="noreferrer" href="https://anetabtc.io/"><div className="feedback-page__content-btn">Distribute Your Token</div></a>*/}
   </div>
   </div>
  )
}

export default Feedback;
