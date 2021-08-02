'use strict';

const Translator = require('../components/translator.js');

module.exports = function(app) {
  const translator = new Translator();

  /**
   * handel POST request to /api/translate
   * @param  header  headers: {"Accept": "application/json","Content-type": "application/json"}
   * @param  body: { "text": 'text to translate', "locale": 'british-to-american' Or 'american-to-british'  }
   * @return  string JSON
   * @example      See tests/1_unit-tests.js. I'm Too Lazy to reWrite them here!
   */

  app.route('/api/translate')
    .post((req, res) => {
      let { text, locale } = req.body;
      let translation;

      if (text == '')
        return res.json({ error: "No text to translate" })

      else if (!locale || !text)
        return res.json({ error: "Required field(s) missing" })

      else if (locale === 'british-to-american')
        translation = translator.britishToAmerican(text);

      else if (locale === 'american-to-british')
        translation = translator.americanToBritish(text);

      else
        return res.send({ error: 'Invalid value for locale field' });


      if (translation === text)
        translation = "Everything looks good to me!"

        
      // send back the submitted text and translation with the translated text
      return res.json({
        text,
        translation
      })
    });
};
